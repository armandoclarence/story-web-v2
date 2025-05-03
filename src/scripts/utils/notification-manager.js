import { convertBase64ToUint8Array } from './index';
import CONFIG from '../config';
import { generateSubscribeButtonTemplate, generateUnsubscribeButtonTemplate } from '../templates/story-templates';

export default class NotificationManager {
  static #apiModel = null;

  static async init(apiModel) {
    this.#apiModel = apiModel;
    
    // Check device and feature support first
    const supportCheck = await this.#checkNotificationSupport();
    if (!supportCheck) {
      this.#handleUnsupportedDevice();
      return false;
    }
    
    // Try to set up the button multiple times
    let attempts = 0;
    const maxAttempts = 5;
    const setupButton = async () => {
      if (attempts >= maxAttempts) {
        console.log('Failed to find notification container after maximum attempts');
        return;
      }
      
      await this.#setupNotificationButton();
      const container = document.getElementById('push-notification-container');
      if (!container) {
        attempts++;
        setTimeout(setupButton, 1000); // Try again in 1 second
      }
    };
    
    await setupButton();
  }

  static async #checkNotificationSupport() {
    // Check if running on mobile
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (!('Notification' in window)) {
      console.log('Browser tidak mendukung notifikasi');
      return false;
    }

    if (!('serviceWorker' in navigator)) {
      console.log('Browser tidak mendukung service worker');
      return false;
    }

    // iOS Safari doesn't support push notifications
    if (isIOS) {
      console.log('Push notifications tidak didukung di iOS');
      return false;
    }

    // Check PushManager support for mobile
    if (isMobile && !('PushManager' in window)) {
      console.log('Push notifications tidak didukung di perangkat ini');
      return false;
    }

    try {
      console.log('Registering service worker...');
      const registration = await navigator.serviceWorker?.ready;
      console.log('Service Worker ready:', registration);
      console.log('VAPID Key:', CONFIG.VAPID_PUBLIC_KEY);
      return true;
    } catch (error) {
      console.error('Service Worker not ready:', error);
      return false;
    }
  }

  static #handleUnsupportedDevice() {
    const container = document.getElementById('push-notification-container');
    if (!container) return;

    container.innerHTML = `
      <button class="notification-button" disabled title="Notifikasi tidak didukung di perangkat ini">
        <i class="fas fa-bell-slash"></i>
        <span>Notifikasi Tidak Didukung</span>
      </button>
    `;

    // Add styles for disabled button
    const styles = `
      .notification-button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        opacity: 0.7;
      }
    `;
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }

  static async #setupNotificationButton() {
    const notificationContainer = document.getElementById('push-notification-container');
    console.log('Notification container:', notificationContainer);
    
    if (!notificationContainer) {
      console.log('Notification container not found');
      return;
    }
    
    console.log('Setting up notification button');
    
    // Clear any existing content and event listeners
    notificationContainer.innerHTML = '';
    
    try {
      // Check subscription status
      const isSubscribed = await this.checkSubscription();
      console.log('Is subscribed:', isSubscribed);
      
      // Set initial button state
      if (isSubscribed) {
        notificationContainer.innerHTML = generateUnsubscribeButtonTemplate();
        const unsubscribeButton = notificationContainer.querySelector('#unsubscribe-button');
        if (unsubscribeButton) {
          unsubscribeButton.addEventListener('click', async () => {
            try {
              console.log('Unsubscribe clicked');
              await this.unsubscribePushMessage(notificationContainer);
            } catch (error) {
              console.error('Error unsubscribing:', error);
              alert('Gagal berhenti berlangganan. Silakan coba lagi.');
            }
          });
        }
      } else {
        notificationContainer.innerHTML = generateSubscribeButtonTemplate();
        const subscribeButton = notificationContainer.querySelector('#subscribe-button');
        if (subscribeButton) {
          subscribeButton.addEventListener('click', async () => {
            try {
              console.log('Subscribe clicked');
              const isPermissionGranted = await this.requestPermission();
              if (isPermissionGranted) {
                await this.subscribePushMessage(notificationContainer);
              } else {
                alert('Mohon izinkan notifikasi untuk mendapatkan pemberitahuan.');
              }
            } catch (error) {
              console.error('Error subscribing:', error);
              if (error.name === 'NotAllowedError') {
                alert('Mohon izinkan notifikasi di pengaturan browser Anda.');
              } else {
                alert('Gagal berlangganan. Silakan coba lagi.');
              }
            }
          });
        }
      }
    } catch (error) {
      console.error('Error setting up notification button:', error);
      notificationContainer.innerHTML = generateSubscribeButtonTemplate();
    }
  }

  static async checkSubscription() {
    try {
      // Get current browser's subscription
      const serviceWorkerRegistration = await navigator.serviceWorker?.ready;
      const currentSubscription = await serviceWorkerRegistration?.pushManager.getSubscription();
      
      console.log('Current subscription:', currentSubscription);

      if (currentSubscription) {
        // If we have an active subscription, store it and return true
        localStorage.setItem('pushSubscription', JSON.stringify(currentSubscription));
        return true;
      } else {
        // No active subscription, clean up localStorage
        localStorage.removeItem('pushSubscription');
        return false;
      }
    } catch (error) {
      console.error('Error checking subscription status:', error);
      return false;
    }
  }

  static async requestPermission() {
    const result = await Notification.requestPermission();
    if (result === 'denied') {
      console.log('Notifikasi tidak diizinkan');
      return false;
    }

    if (result === 'default') {
      console.log('Pengguna menutup kotak dialog permintaan izin');
      return false;
    }

    return true;
  }

  static async subscribePushMessage(subscribeButton) {
    console.log('Subscribing to push messages');
    try {
      const serviceWorkerRegistration = await navigator.serviceWorker?.ready;
      
      // Check if there's an existing subscription first
      const existingSubscription = await serviceWorkerRegistration?.pushManager.getSubscription();
      if (existingSubscription) {
        // If subscription exists, just store it and return
        localStorage.setItem('pushSubscription', JSON.stringify(existingSubscription));
        this.updateSubscribeButtonState(subscribeButton, true);
        return existingSubscription;
      }

      console.log('Creating new push subscription...');
      const pushSubscription = await serviceWorkerRegistration?.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertBase64ToUint8Array(CONFIG.VAPID_PUBLIC_KEY)
      });
      console.log(pushSubscription);

      const data = pushSubscription.toJSON();
      console.log('Push subscription created:', data);

      console.log('Sending subscription to server...');
      const response = await this.#apiModel.subscribePushNotification({
        endpoint: data.endpoint,
        keys: {
          p256dh: data.keys.p256dh,
          auth: data.keys.auth,
        }
      });
      console.log('Server response:', response);

      localStorage.setItem('pushSubscription', JSON.stringify(pushSubscription));
      this.updateSubscribeButtonState(subscribeButton, true);
      
      console.log('Successfully subscribed to push messages');
      return pushSubscription;
    } catch (error) {
      console.error('Failed to subscribe:', error);
      localStorage.removeItem('pushSubscription');
      throw error;
    }
  }

  static async unsubscribePushMessage(subscribeButton) {
    try {
      const serviceWorkerRegistration = await navigator.serviceWorker?.ready;
      const subscription = await serviceWorkerRegistration?.pushManager.getSubscription();
  
      if (subscription) {
        console.log('Existing subscription found:', subscription);
  
        // Unsubscribe from server first
        const data = subscription.toJSON();
        await this.#apiModel.unsubscribePushNotification({
          endpoint: data.endpoint,
        });
  
        // Unsubscribe from push manager
        const success = await subscription.unsubscribe();
        console.log('Unsubscribed from push manager:', success);
  
        localStorage.removeItem('pushSubscription');
        this.updateSubscribeButtonState(subscribeButton, false);
        console.log('Successfully unsubscribed from push messages');
      } else {
        console.log('No active subscription found to unsubscribe');
      }
    } catch (error) {
      console.error('Failed to unsubscribe:', error);
      throw error;
    }
  }
  static async unsubscribePushMessage(subscribeButton) {
    try {
      const serviceWorkerRegistration = await navigator.serviceWorker?.ready;
      const subscription = await serviceWorkerRegistration?.pushManager.getSubscription();
  
      if (subscription) {
        console.log('Existing subscription found:', subscription);
  
        // Unsubscribe from server first
        const data = subscription.toJSON();
        await this.#apiModel.unsubscribePushNotification({
          endpoint: data.endpoint,
        });
  
        // Unsubscribe from push manager
        const success = await subscription.unsubscribe();
        console.log('Unsubscribed from push manager:', success);
  
        localStorage.removeItem('pushSubscription');
        this.updateSubscribeButtonState(subscribeButton, false);
        console.log('Successfully unsubscribed from push messages');
      } else {
        console.log('No active subscription found to unsubscribe');
      }
    } catch (error) {
      console.error('Failed to unsubscribe:', error);
    }
  }

  static async updateSubscribeButtonState(button, isSubscribed) {
    console.log(button);
    if (!button) return;
    console.log(isSubscribed);
    if (isSubscribed) {
      button.innerHTML = generateUnsubscribeButtonTemplate();
      const unsubscribeButton = button.querySelector('#unsubscribe-button');
      if (unsubscribeButton) {
        unsubscribeButton.addEventListener('click', async () => {
          await this.unsubscribePushMessage(button);
        });
      }
    } else {
      button.innerHTML = generateSubscribeButtonTemplate();
      const subscribeButton = button.querySelector('#subscribe-button');
      if (subscribeButton) {
        subscribeButton.addEventListener('click', async () => {
          const isPermissionGranted = await this.requestPermission();
          if (isPermissionGranted) {
            await this.subscribePushMessage(button);
          }
        });
      }
    }
  }
}