
import React, { createContext, useState, useEffect, useMemo } from 'react';
import { type Project, type User, type Company, type Lead, type Task, Currency } from '../types';
import { MOCK_PROJECTS, MOCK_USER, MOCK_COMPANY, MOCK_LEADS, EXCHANGE_RATE_KES_USD, MOCK_ALL_USERS, MOCK_TASKS } from '../data/mockData';
import { getAllRequests, clearQueue } from '../utils/db';

export type Theme = 'light' | 'dark';

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  projects: Project[];
  user: User;
  company: Company;
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  deleteTask: (taskId: string) => void;
  exchangeRate: number;
  allUsers: User[];
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
        return (localStorage.getItem('theme') as Theme) || 'light';
    }
    return 'light';
  });

  const [currency, setCurrency] = useState<Currency>(Currency.KES);
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);
    if (typeof window !== 'undefined') {
        localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Effect for handling PWA background sync
  useEffect(() => {
    const handleSync = async () => {
        if (!navigator.onLine) return;
        
        console.log('Connection detected, attempting to sync offline changes...');
        try {
            const queuedRequests = await getAllRequests();
            if (queuedRequests.length === 0) {
                console.log('Sync queue is empty.');
                return;
            }

            console.log(`Syncing ${queuedRequests.length} requests...`, queuedRequests);
            // In a real app, you would loop through queuedRequests and execute them
            // with fetch(). For this demo, we'll simulate success.
            
            await clearQueue();
            console.log('Sync complete, queue cleared. In a real app, you would now re-fetch data.');
            // Example: setLeads(await fetchLeadsFromServer());

        } catch (error) {
            console.error('Error during background sync:', error);
        }
    };

    const messageListener = (event: MessageEvent) => {
        if (event.data && event.data.type === 'SYNC_LEADS') {
            handleSync();
        }
    };
    
    // Listen for messages from the service worker
    navigator.serviceWorker.addEventListener('message', messageListener);

    // Also attempt a sync when the app loads, in case it was closed while offline
    handleSync();

    return () => {
        navigator.serviceWorker.removeEventListener('message', messageListener);
    };
}, []);
  
  const setTheme = (newTheme: Theme) => {
      setThemeState(newTheme);
  };
  
  const deleteTask = (taskId: string) => {
      setTasks(currentTasks => currentTasks.filter(task => task.id !== taskId));
  };

  const contextValue = useMemo(() => ({
    theme,
    setTheme,
    currency,
    setCurrency,
    projects: MOCK_PROJECTS,
    user: MOCK_USER,
    company: MOCK_COMPANY,
    leads,
    setLeads,
    tasks,
    setTasks,
    deleteTask,
    exchangeRate: EXCHANGE_RATE_KES_USD,
    allUsers: MOCK_ALL_USERS,
  }), [theme, currency, leads, tasks]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};