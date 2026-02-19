
import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { formatCurrency } from '../../utils/formatters';
import StatCard from './StatCard';
import ChartIcon from '../icons/ChartIcon';
import BuildingIcon from '../icons/BuildingIcon';
import UsersIcon from '../icons/UsersIcon';
import ProjectCard from '../projects/ProjectCard';
import { type Project, UserRole } from '../../types';
import TeamPerformance from './TeamPerformance';

interface DashboardProps {
    onSelectProject: (project: Project) => void;
}

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
};

const Dashboard: React.FC<DashboardProps> = ({ onSelectProject }) => {
  const { user, projects, currency, exchangeRate, leads } = useAppContext();

  const activeProjects = projects.filter(p => p.status === 'Active');

  const canViewTeamPerformance = (user.role === UserRole.Company || user.role === UserRole.Broker) && user.team && user.team.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{getGreeting()}, {user.name}!</h2>
        <p className="text-gray-500 dark:text-gray-400">Here's your performance summary for today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          icon={<ChartIcon className="w-6 h-6" />}
          title="Commission Earned"
          value={formatCurrency(user.totalCommissionEarned, currency, exchangeRate)}
          colorClass="text-green-500"
        />
        <StatCard
          icon={<BuildingIcon className="w-6 h-6" />}
          title="Active Projects"
          value={activeProjects.length.toString()}
          colorClass="text-blue-500"
        />
        <StatCard
          icon={<UsersIcon className="w-6 h-6" />}
          title="New Leads"
          value={leads.filter(l => l.status === 'New').length.toString()}
          colorClass="text-yellow-500"
        />
      </div>

       {canViewTeamPerformance && <TeamPerformance team={user.team!} />}

       <div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Active Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeProjects.map(project => (
                <ProjectCard key={project.id} project={project} onClick={() => onSelectProject(project)} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
