
import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import ProjectCard from './ProjectCard';
import { type Project, ProjectStatus } from '../../types';

interface ProjectListProps {
  onSelectProject: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ onSelectProject }) => {
  const { projects } = useAppContext();
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'All'>('All');

  const filteredProjects = projects.filter(p => statusFilter === 'All' || p.status === statusFilter);
  
  const filterOptions: {label: string, value: ProjectStatus | 'All'}[] = [
      { label: 'All', value: 'All' },
      { label: 'Active', value: ProjectStatus.Active },
      { label: 'Completed', value: ProjectStatus.Completed },
      { label: 'Upcoming', value: ProjectStatus.Upcoming },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">All Projects</h2>
        <p className="text-gray-500 dark:text-gray-400">Browse and manage all available projects.</p>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {filterOptions.map(option => (
             <button
              key={option.value}
              onClick={() => setStatusFilter(option.value)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 whitespace-nowrap
                ${statusFilter === option.value
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              {option.label}
            </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onClick={() => onSelectProject(project)} />
            ))
        ) : (
            <p className="text-gray-500 dark:text-gray-400 md:col-span-2 lg:col-span-3 text-center">No projects match the current filter.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
