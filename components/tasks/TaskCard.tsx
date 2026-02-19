
import React, { useState } from 'react';
import Card from '../common/Card';
import { type Task, TaskStatus, type User } from '../../types';
import { useAppContext } from '../../hooks/useAppContext';
import TaskModal from './TaskModal';
import ConfirmationModal from '../common/ConfirmationModal';
import { addRequestToQueue } from '../../utils/db';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';

interface TaskCardProps {
    task: Task;
    assignedUser?: User;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, assignedUser }) => {
    const { tasks, setTasks, deleteTask } = useAppContext();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
    const handleStatusChange = (newStatus: TaskStatus) => {
        // Optimistic UI update
        const updatedTask = { ...task, status: newStatus };
        const updatedTasks = tasks.map(t => t.id === task.id ? updatedTask : t);
        setTasks(updatedTasks);
        
        const requestUrl = `/api/tasks/${task.id}`;
        addRequestToQueue({ url: requestUrl, method: 'PUT', body: updatedTask });
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
            navigator.serviceWorker.ready.then(sw => (sw as any).sync.register('sync-tasks'));
        }
    };

    const handleDelete = () => {
        if (!task.id) return;
        
        // Optimistic UI update
        deleteTask(task.id);
        setIsDeleteModalOpen(false);

        const requestUrl = `/api/tasks/${task.id}`;
        addRequestToQueue({ url: requestUrl, method: 'DELETE', body: null });
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
            navigator.serviceWorker.ready.then(sw => (sw as any).sync.register('sync-tasks'));
        }
    };
    
    return (
        <>
            <Card className="p-4">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <p className="font-bold text-gray-800 dark:text-white">{task.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{task.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                        <select
                            value={task.status}
                            onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
                            className="text-xs font-semibold rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value={TaskStatus.ToDo}>To Do</option>
                            <option value={TaskStatus.InProgress}>In Progress</option>
                            <option value={TaskStatus.Completed}>Completed</option>
                        </select>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                        <span>Due: <span className="font-medium text-gray-600 dark:text-gray-300">{task.dueDate}</span></span>
                         {assignedUser && (
                            <div className="flex items-center mt-1">
                                <img src={assignedUser.avatarUrl} alt={assignedUser.name} className="w-5 h-5 rounded-full mr-2" />
                                <span>{assignedUser.name}</span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => setIsEditModalOpen(true)} className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                            <PencilIcon className="w-4 h-4"/>
                        </button>
                        <button onClick={() => setIsDeleteModalOpen(true)} className="text-gray-500 hover:text-red-600 dark:hover:text-red-400">
                            <TrashIcon className="w-4 h-4"/>
                        </button>
                    </div>
                </div>
            </Card>

            {isEditModalOpen && <TaskModal taskToEdit={task} onClose={() => setIsEditModalOpen(false)} />}
            {isDeleteModalOpen && (
                <ConfirmationModal
                    title="Delete Task"
                    message="Are you sure you want to delete this task? This action cannot be undone."
                    onConfirm={handleDelete}
                    onCancel={() => setIsDeleteModalOpen(false)}
                />
            )}
        </>
    );
};

export default TaskCard;