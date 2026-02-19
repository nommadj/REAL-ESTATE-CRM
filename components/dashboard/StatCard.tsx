
import React from 'react';
import Card from '../common/Card';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, colorClass }) => {
  return (
    <Card className="p-4">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${colorClass} bg-opacity-10 mr-4`}>
          <div className={colorClass}>{icon}</div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-xl font-bold text-gray-800 dark:text-white">{value}</p>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
