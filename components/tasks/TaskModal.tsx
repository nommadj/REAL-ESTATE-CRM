
import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { type Task, TaskStatus } from '../../types';
import Modal from '../common/Modal';
import { addRequestToQueue } from '../../utils/db';
import { v4 as uuidv4 } from 'uuid';

interface TaskModalProps {
  onClose: () => void;
  taskToEdit?: Task;
}

const TaskModal: React.FC<TaskModalProps> = ({ onClose, taskToEdit }) => {
  const { allUsers, tasks, setTasks } = useAppContext();
  const [title, setTitle] = useState(taskToEdit?.title || '');
  const [description, setDescription] = useState(taskToEdit?.description || '');
  const [dueDate, setDueDate] = useState(taskToEdit?.dueDate || '');
  const [assignedTo, setAssignedTo] = useState(taskToEdit?.assignedTo || '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const taskData: Task = {
        id: taskToEdit?.id || uuidv4(),
        title,
        description,
        dueDate,
        assignedTo,
        status: taskToEdit?.status || TaskStatus.ToDo,
    };
    
    // Optimistic UI Update
    if (taskToEdit) {
        setTasks(tasks.map(t => t.id === taskToEdit.id ? taskData : t));
    } else {
        setTasks([taskData, ...tasks]);
    }
    
    // Queue for sync
    const requestUrl = taskToEdit ? `/api/tasks/${taskToEdit.id}` : '/api/tasks';
    const method = taskToEdit ? 'PUT' : 'POST';
    addRequestToQueue({ url: requestUrl, method, body: taskData });
     if ('serviceWorker' in navigator && 'SyncManager' in window) {
        navigator.serviceWorker.ready.then(sw => (sw as any).sync.register('sync-tasks'));
    }

    onClose();
  };

  return (
    <Modal title={taskToEdit ? 'Edit Task' : 'Create Task'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assign To</label>
          <select
            id="assignedTo"
            value={assignedTo}
            onChange={e => setAssignedTo(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="" disabled>Select a team member</option>
            {allUsers.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">
                Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                {taskToEdit ? 'Save Changes' : 'Create Task'}
            </button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;