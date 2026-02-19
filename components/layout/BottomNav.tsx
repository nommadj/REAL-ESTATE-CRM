
import React from 'react';
import { type View } from '../../App';
import ChartIcon from '../icons/ChartIcon';
import BuildingIcon from '../icons/BuildingIcon';
import UsersIcon from '../icons/UsersIcon';
import UserCircleIcon from '../icons/UserCircleIcon';
import TrophyIcon from '../icons/TrophyIcon';
import ClipboardListIcon from '../icons/ClipboardListIcon';
import QuestionMarkCircleIcon from '../icons/QuestionMarkCircleIcon';

interface BottomNavProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  const activeClasses = 'text-blue-600 dark:text-blue-400';
  const inactiveClasses = 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400';

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon}
      <span className="text-xs font-medium mt-1">{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { view: 'dashboard', label: 'Dashboard', icon: <ChartIcon className="w-6 h-6" /> },
    { view: 'projects', label: 'Projects', icon: <BuildingIcon className="w-6 h-6" /> },
    { view: 'leads', label: 'Leads', icon: <UsersIcon className="w-6 h-6" /> },
    { view: 'tasks', label: 'Tasks', icon: <ClipboardListIcon className="w-6 h-6" /> },
    { view: 'profile', label: 'Profile', icon: <UserCircleIcon className="w-6 h-6" /> },
  ];

  const secondaryNavItems = [
    { view: 'leaderboard', label: 'Ranking', icon: <TrophyIcon className="w-6 h-6" /> },
    { view: 'help', label: 'Help', icon: <QuestionMarkCircleIcon className="w-6 h-6" /> },
  ];

  // A simple way to group items visually
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-10 md:hidden">
      <div className="max-w-7xl mx-auto h-full flex justify-around items-center px-2">
        {navItems.map((item) => (
          <NavItem
            key={item.view}
            icon={item.icon}
            label={item.label}
            isActive={activeView === item.view}
            onClick={() => setActiveView(item.view as View)}
          />
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;