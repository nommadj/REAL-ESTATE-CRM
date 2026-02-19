
/**
 * Checks if Push Manager and Notifications API are supported by the browser.
 */
export const isPushSupported = (): boolean => {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
};

/**
 * Requests permission from the user to show notifications.
 * @returns {Promise<NotificationPermission>} The user's permission choice.
 */
export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!isPushSupported()) {
    console.warn('Push notifications are not supported in this browser.');
    return 'denied';
  }
  return await Notification.requestPermission();
};

// VAPID public key would be sourced from your server in a real application
const VAPID_PUBLIC_KEY = 'YOUR_VAPID_PUBLIC_KEY_HERE';

/**
 * Subscribes the user to push notifications.
 * This would be called after getting permission.
 */
export const subscribeUserToPush = async (): Promise<PushSubscription | null> => {
    if (!isPushSupported()) return null;
    
    const registration = await navigator.serviceWorker.ready;
    const existingSubscription = await registration.pushManager.getSubscription();

    if (existingSubscription) {
        console.log('User is already subscribed.');
        return existingSubscription;
    }

    try {
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: VAPID_PUBLIC_KEY,
        });
        console.log('User subscribed successfully.');
        // In a real app, you would send this subscription object to your server
        // e.g., sendSubscriptionToServer(subscription);
        return subscription;
    } catch (error) {
        console.error('Failed to subscribe the user: ', error);
        return null;
    }
};