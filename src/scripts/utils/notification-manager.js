import { convertBase64ToUint8Array } from './index';
import CONFIG from '../config';
import { generateSubscribeButtonTemplate, generateUnsubscribeButtonTemplate } from '../templates/story-templates';

export default class NotificationManager {
  static #apiModel = null;

  static async init(apiModel) {
    this.#apiModel = apiModel;
    await this.#checkNotificationSupport();
    
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
            }
          } catch (error) {
            console.error('Error subscribing:', error);
          }
        });
      }
    }
  }

  static async checkSubscription() {
    try {
      // First check localStorage
      const storedSubscription = localStorage.getItem('pushSubscription');
      if (storedSubscription) {
        // If we have stored subscription, consider it as subscribed
        return true;
      }
      
      // If no stored subscription, check current subscription
      const serviceWorkerRegistration = await navigator.serviceWorker?.ready;
      const subscription = await serviceWorkerRegistration?.pushManager.getSubscription();
      
      if (subscription) {
        // Store valid subscription if found
        localStorage.setItem('pushSubscription', JSON.stringify(subscription));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error checking subscription:', error);
      return false;
    }
  }

  static async #checkNotificationSupport() {
    if (!('Notification' in window)) {
      console.log('Browser tidak mendukung notifikasi');
      return false;
    }

    if (!('serviceWorker' in navigator)) {
      console.log('Browser tidak mendukung service worker');
      return false;
    }

    try {
      // Add more logging
      console.log('Registering service worker...');
      const registration = await navigator.serviceWorker?.ready;
      console.log('Service Worker ready:', registration);
      console.log('VAPID Key:', CONFIG.VAPID_PUBLIC_KEY); // Check VAPID key
      return true;
    } catch (error) {
      console.error('Service Worker not ready:', error);
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

      // Add logging for debugging
      console.log('Creating push subscription...');
      const pushSubscription = await serviceWorkerRegistration?.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertBase64ToUint8Array(CONFIG.VAPID_PUBLIC_KEY)
      });

      const data = pushSubscription.toJSON();
      console.log('Push subscription created:', data);

      // Log the API call
      console.log('Sending subscription to server...');
      const response = await this.#apiModel.subscribePushNotification({
        endpoint: data.endpoint,
        keys: {
          p256dh: data.keys.p256dh,
          auth: data.keys.auth,
        },
      });
      console.log('Server response:', response);

      localStorage.setItem('pushSubscription', JSON.stringify(pushSubscription));
      this.updateSubscribeButtonState(subscribeButton, true);
      
      console.log('Successfully subscribed to push messages');
      return pushSubscription;
    } catch (error) {
      console.error('Gagal melakukan subscribe:', error.message);
      console.error('Full error:', error); // Log full error
      localStorage.removeItem('pushSubscription');
      throw error;
    }
  }

  static async unsubscribePushMessage(subscribeButton) {
    try {
      // First check localStorage
      const storedSubscription = localStorage.getItem('pushSubscription');
      if (storedSubscription) {
        const parsedSubscription = JSON.parse(storedSubscription);
        
        // Unsubscribe from server using stored data
        await this.#apiModel.unsubscribePushNotification({
          endpoint: parsedSubscription.endpoint,
        });
        
        // Clear localStorage
        localStorage.removeItem('pushSubscription');
        
        // Also try to unsubscribe from service worker if available
        try {
          const serviceWorkerRegistration = await navigator.serviceWorker?.ready;
          const subscription = await serviceWorkerRegistration?.pushManager.getSubscription();
          if (subscription) {
            await subscription.unsubscribe();
          }
        } catch (swError) {
          console.warn('Could not unsubscribe from service worker:', swError);
          // Continue anyway since we've already unsubscribed from server
        }
        
        this.updateSubscribeButtonState(subscribeButton, false);
        return;
      }

      // Fallback to old behavior if no localStorage data
      const serviceWorkerRegistration = await navigator.serviceWorker?.ready;
      const subscription = await serviceWorkerRegistration?.pushManager.getSubscription();
      if (subscription) {
        await this.#apiModel.unsubscribePushNotification({
          endpoint: subscription.endpoint,
        });
        await subscription.unsubscribe();
      }
      
      localStorage.removeItem('pushSubscription');
      this.updateSubscribeButtonState(subscribeButton, false);
    } catch (error) {
      console.error('Gagal melakukan unsubscribe:', error.message);
      throw error;
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
          console.log('masuk sini1');
          await this.unsubscribePushMessage(button);
        });
      }
    } else {
      button.innerHTML = generateSubscribeButtonTemplate();
      const subscribeButton = button.querySelector('#subscribe-button');
      if (subscribeButton) {
        subscribeButton.addEventListener('click', async () => {
          console.log('masuk sini2');
          const isPermissionGranted = await this.requestPermission();
          if (isPermissionGranted) {
            await this.subscribePushMessage(button);
          }
        });
      }
    }
  }
}