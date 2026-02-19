
import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { TaskStatus, type Task } from '../../types';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import PlusIcon from '../icons/PlusIcon';

const Tasks: React.FC = () => {
  const { tasks, allUsers } = useAppContext();
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'All'>('All');
  const [userFilter, setUserFilter] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTasks = tasks.filter(t => 
    (statusFilter === 'All' || t.status === statusFilter) &&
    (userFilter === 'All' || t.assignedTo === userFilter)
  );

  const statusFilterOptions: {label: string, value: TaskStatus | 'All'}[] = [
      { label: 'All Statuses', value: 'All' },
      { label: 'To Do', value: TaskStatus.ToDo },
      { label: 'In Progress', value: TaskStatus.InProgress },
      { label: 'Completed', value: TaskStatus.Completed },
  ];
  
  const userFilterOptions = [
      { label: 'All Users', value: 'All' },
      ...allUsers.map(user => ({ label: user.name, value: user.id }))
  ];
  
  const userMap = new Map(allUsers.map(user => [user.id, user]));

  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Task Management</h2>
          <p className="text-gray-500 dark:text-gray-400">Stay on top of your responsibilities.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'All')}
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
          >
              {statusFilterOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
          <select
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
          >
              {userFilterOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>

        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                  <TaskCard key={task.id} task={task} assignedUser={userMap.get(task.assignedTo)} />
              ))
          ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">No tasks match the current filters.</p>
          )}
        </div>
      </div>
      
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-20 right-4 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 z-20"
        aria-label="Create new task"
      >
        <PlusIcon className="w-6 h-6" />
      </button>

      {isModalOpen && <TaskModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Tasks;