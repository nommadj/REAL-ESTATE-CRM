
import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/formatters';
import { requestNotificationPermission, isPushSupported } from '../../utils/notifications';

const Profile: React.FC = () => {
    const { user, currency, exchangeRate } = useAppContext();
    const [notificationStatus, setNotificationStatus] = useState<NotificationPermission | 'unsupported'>(() => {
        if (!isPushSupported()) return 'unsupported';
        return Notification.permission;
    });

    const handleEnableNotifications = async () => {
        const permission = await requestNotificationPermission();
        setNotificationStatus(permission);
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            // Here you would typically subscribe the user and send the subscription to your server
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">My Profile</h2>
                <p className="text-gray-500 dark:text-gray-400">View and manage your account details.</p>
            </div>
            <Card>
                <div className="p-6 flex flex-col items-center">
                    <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full mb-4 ring-4 ring-blue-500 ring-opacity-50" />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{user.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 font-semibold">{user.role}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user.email}</p>
                </div>
            </Card>

             <Card>
                <div className="p-6">
                     <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Performance</h3>
                     <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Deals Closed</span>
                            <span className="font-semibold text-gray-800 dark:text-white">{user.dealsClosed}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Leads Converted</span>
                            <span className="font-semibold text-gray-800 dark:text-white">{user.leadsConverted}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Total Commission Earned</span>
                            <span className="font-semibold text-green-600 dark:text-green-400">{formatCurrency(user.totalCommissionEarned, currency, exchangeRate)}</span>
                        </div>
                     </div>
                </div>
            </Card>

            <Card>
                <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Settings</h3>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">Push Notifications</span>
                        {notificationStatus === 'granted' ? (
                            <span className="text-sm font-semibold text-green-600">Enabled</span>
                        ) : (
                            <button 
                                onClick={handleEnableNotifications}
                                disabled={notificationStatus === 'denied' || notificationStatus === 'unsupported'}
                                className="bg-blue-500 text-white font-bold py-2 px-4 text-sm rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {notificationStatus === 'denied' ? 'Permission Denied' : 'Enable'}
                            </button>
                        )}
                    </div>
                     {notificationStatus === 'unsupported' && <p className="text-xs text-red-500 mt-2">Push notifications are not supported on this browser.</p>}
                </div>
            </Card>


            <button className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
                Log Out
            </button>
        </div>
    );
};

export default Profile;