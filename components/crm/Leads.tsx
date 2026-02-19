
import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import Card from '../common/Card';
import { type Lead } from '../../types';
import { addRequestToQueue } from '../../utils/db';

const LeadStatusBadge: React.FC<{ status: Lead['status'] }> = ({ status }) => {
    const statusColors = {
        'New': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        'Contacted': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        'Qualified': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        'Lost': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}>{status}</span>;
};

const Leads: React.FC = () => {
    const { leads, setLeads } = useAppContext();

    const handleStatusChange = async (leadId: string, newStatus: Lead['status']) => {
        // 1. Optimistic UI Update
        const updatedLeads = leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l);
        setLeads(updatedLeads);

        // 2. Prepare request for server
        const requestBody = { status: newStatus };
        const requestUrl = `/api/leads/${leadId}`; // Simulated API endpoint

        // 3. Check for online status and attempt fetch
        if (!navigator.onLine) {
            console.log('Offline. Queuing request for background sync.');
            await addRequestToQueue({ url: requestUrl, method: 'PUT', body: requestBody });
            if ('serviceWorker' in navigator && 'SyncManager' in window) {
                // FIX: Cast `sw` to `any` to access the `sync` property for Background Sync API.
                navigator.serviceWorker.ready.then(sw => (sw as any).sync.register('sync-leads'));
            }
            return;
        }

        try {
            const response = await fetch(requestUrl, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            // In a real app, you'd handle non-ok responses
            if (!response.ok) console.error('Server update failed');
            else console.log('Lead updated online successfully');
            
        } catch (error) {
            console.log('Fetch failed, queuing request for background sync.', error);
            await addRequestToQueue({ url: requestUrl, method: 'PUT', body: requestBody });
             if ('serviceWorker' in navigator && 'SyncManager' in window) {
                // FIX: Cast `sw` to `any` to access the `sync` property for Background Sync API.
                navigator.serviceWorker.ready.then(sw => (sw as any).sync.register('sync-leads'));
            }
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Lead Management</h2>
                <p className="text-gray-500 dark:text-gray-400">Track and manage your potential clients.</p>
            </div>
            <div className="space-y-4">
                {leads.map(lead => (
                    <Card key={lead.id} className="p-4">
                        <div className="flex justify-between items-start gap-4">
                            <div>
                                <p className="font-bold text-gray-800 dark:text-white">{lead.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{lead.phone}</p>
                            </div>
                            <div className="flex-shrink-0">
                               <select
                                    value={lead.status}
                                    onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead['status'])}
                                    className="text-xs font-semibold rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                                    <option value="New">New</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Qualified">Qualified</option>
                                    <option value="Lost">Lost</option>
                                </select>
                            </div>
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                           Source: {lead.source} | Last Contacted: {lead.lastContacted}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Leads;