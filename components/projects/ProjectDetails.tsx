
import React from 'react';
import { type Project } from '../../types';
import Card from '../common/Card';
import InventoryStatus from './InventoryStatus';
import { useAppContext } from '../../hooks/useAppContext';
import { formatCurrency } from '../../utils/formatters';

interface ProjectDetailsProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onBack }) => {
    const { currency, exchangeRate } = useAppContext();
    const expectedCommission = project.averagePrice * project.inventory.total * (project.commissionPercentage / 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button onClick={onBack} className="mr-4 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{project.name}</h2>
      </div>

      <Card>
        <img className="h-64 w-full object-cover" src={project.imageUrl} alt={project.name} />
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-500 dark:text-gray-400">Location</p>
              <p className="text-gray-800 dark:text-white">{project.location}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-500 dark:text-gray-400">Developer</p>
              <p className="text-gray-800 dark:text-white">{project.developer}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-500 dark:text-gray-400">Property Type</p>
              <p className="text-gray-800 dark:text-white">{project.propertyType}</p>
            </div>
             <div>
              <p className="font-semibold text-gray-500 dark:text-gray-400">Average Price</p>
              <p className="text-gray-800 dark:text-white">{formatCurrency(project.averagePrice, currency, exchangeRate)}</p>
            </div>
          </div>
        </div>
      </Card>
      
      <Card>
        <div className="p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Inventory Dashboard</h3>
            <InventoryStatus inventory={project.inventory} />
        </div>
      </Card>

      <Card>
        <div className="p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Commission Details</h3>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <p className="text-gray-500 dark:text-gray-400">Commission Rate</p>
                    <p className="font-semibold text-gray-800 dark:text-white">{project.commissionPercentage}%</p>
                </div>
                 <div className="flex justify-between">
                    <p className="text-gray-500 dark:text-gray-400">Expected Commission (Total)</p>
                    <p className="font-semibold text-green-600 dark:text-green-400">{formatCurrency(expectedCommission, currency, exchangeRate)}</p>
                </div>
            </div>
        </div>
      </Card>

    </div>
  );
};

export default ProjectDetails;
