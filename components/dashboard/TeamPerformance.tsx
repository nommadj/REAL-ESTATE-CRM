
import React from 'react';
import { type TeamMember } from '../../types';
import Card from '../common/Card';
import { useAppContext } from '../../hooks/useAppContext';
import { formatCurrency } from '../../utils/formatters';

interface TeamPerformanceProps {
  team: TeamMember[];
}

const TeamPerformance: React.FC<TeamPerformanceProps> = ({ team }) => {
    const { currency, exchangeRate } = useAppContext();

    const totalTeamDeals = team.reduce((acc, member) => acc + member.dealsClosed, 0);
    const totalTeamCommission = team.reduce((acc, member) => acc + member.totalCommissionEarned, 0);

  return (
    <div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Team Performance</h3>
        <Card>
            <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Team Deals</p>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalTeamDeals}</p>
                    </div>
                     <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Team Commission</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{formatCurrency(totalTeamCommission, currency, exchangeRate)}</p>
                    </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Team Members</h4>
                    <ul className="space-y-3">
                        {team.map(member => (
                            <li key={member.id} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <img src={member.avatarUrl} alt={member.name} className="w-8 h-8 rounded-full mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-800 dark:text-white">{member.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{member.leadsConverted} leads converted</p>
                                    </div>
                                </div>
                                <span className="text-sm font-semibold text-gray-800 dark:text-white">{member.dealsClosed} deals</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Card>
    </div>
  );
};

export default TeamPerformance;
