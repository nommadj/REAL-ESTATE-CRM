
import React from 'react';
import { type Project, ProjectStatus } from '../../types';
import Card from '../common/Card';
import InventoryStatus from './InventoryStatus';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const StatusBadge: React.FC<{ status: ProjectStatus }> = ({ status }) => {
  const statusStyles = {
    [ProjectStatus.Active]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    [ProjectStatus.Completed]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    [ProjectStatus.Upcoming]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  };
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <Card onClick={onClick} className="flex flex-col">
      <img className="h-48 w-full object-cover" src={project.imageUrl} alt={project.name} />
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{project.name}</h3>
          <StatusBadge status={project.status} />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{project.location}</p>
        
        <div className="mt-auto">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Inventory Status</p>
            <InventoryStatus inventory={project.inventory} />
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
