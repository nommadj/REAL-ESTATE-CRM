
import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { type Project, type Lead, type Task } from '../../types';

interface GlobalSearchProps {
    onClose: () => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ onClose }) => {
    const { projects, leads, tasks } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProjects = useMemo(() => 
        projects.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())),
        [projects, searchTerm]
    );

    const filteredLeads = useMemo(() =>
        leads.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase())),
        [leads, searchTerm]
    );

    const filteredTasks = useMemo(() =>
        tasks.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase())),
        [tasks, searchTerm]
    );
    
    // Handle Escape key to close
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const renderSection = (title: string, items: (Project | Lead | Task)[]) => {
        if (items.length === 0) return null;
        
        return (
            <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-4 mt-4 mb-2">{title}</h3>
                <ul>
                    {items.map(item => (
                        <li key={`${title}-${item.id}`} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            <p className="font-medium text-gray-800 dark:text-white">{'name' in item ? item.name : item.title}</p>
                            {'location' in item && <p className="text-xs text-gray-500 dark:text-gray-400">{item.location}</p>}
                            {'phone' in item && <p className="text-xs text-gray-500 dark:text-gray-400">{item.phone}</p>}
                            {'dueDate' in item && <p className="text-xs text-gray-500 dark:text-gray-400">Due: {item.dueDate}</p>}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg mt-16 mx-4" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <input
                        type="text"
                        placeholder="Search projects, leads, tasks..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        autoFocus
                        className="w-full bg-transparent border-none focus:ring-0 text-lg text-gray-900 dark:text-white"
                    />
                </div>
                <div className="max-h-96 overflow-y-auto">
                    {searchTerm ? (
                        <>
                            {renderSection('Projects', filteredProjects)}
                            {renderSection('Leads', filteredLeads)}
                            {renderSection('Tasks', filteredTasks)}
                             {filteredProjects.length === 0 && filteredLeads.length === 0 && filteredTasks.length === 0 && (
                                <p className="p-4 text-center text-gray-500 dark:text-gray-400">No results found.</p>
                            )}
                        </>
                    ) : (
                        <p className="p-4 text-center text-gray-500 dark:text-gray-400">Start typing to search.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GlobalSearch;