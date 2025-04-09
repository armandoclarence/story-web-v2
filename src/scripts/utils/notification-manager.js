import { convertBase64ToUint8Array } from './index';
import CONFIG from '../config';
import { generateSubscribeButtonTemplate, generateUnsubscribeButtonTemplate } from '../templates/story-templates';

export default class NotificationManager {
  static #apiModel = null;

  static init(apiModel) {
    this.#apiModel = apiModel;
    this.#checkNotificationSupport();
  }

  static async checkSubscription() {
    try {
      const serviceWorkerRegistration = await navigator.serviceWorker.ready;
      const subscription = await serviceWorkerRegistration.pushManager.getSubscription();
      return !!subscription;
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

    return true;
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
    try {
      const serviceWorkerRegistration = await navigator.serviceWorker.ready;
      const isSubscribed = await this.checkSubscription();

      const pushSubscription = await serviceWorkerRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertBase64ToUint8Array(CONFIG.VAPID_PUBLIC_KEY)
      });

      const data = pushSubscription.toJSON();

      this.#apiModel.subscribePushNotification({
        endpoint: data.endpoint,
        keys: {
          p256dh: data.keys.p256dh,
          auth: data.keys.auth,
        },
      });

      localStorage.setItem('pushSubscription', JSON.stringify(pushSubscription));
      
      this.updateSubscribeButtonState(subscribeButton, true);
      
      return pushSubscription;
    } catch (error) {
      console.error('Gagal melakukan subscribe:', error.message);
      throw error;
    }
  }

  static async unsubscribePushMessage(subscribeButton) {
    try {
      const serviceWorkerRegistration = await navigator.serviceWorker.ready;
      const subscription = await serviceWorkerRegistration.pushManager.getSubscription();
      const isSubscribed = await this.checkSubscription();
      if(!isSubscribed) return;

      await this.#apiModel.unsubscribePushNotification({
        endpoint: subscription.endpoint,
      });
      await subscription.unsubscribe();
      localStorage.removeItem('pushSubscription');
      
      this.updateSubscribeButtonState(subscribeButton, false);
    } catch (error) {
      console.error('Gagal melakukan unsubscribe:', error.message);
      throw error;
    }
  }

  static async updateSubscribeButtonState(button, isSubscribed) {
    if (!button) return;

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