
import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { type User } from '../../types';
import Card from '../common/Card';
import TrophyIcon from '../icons/TrophyIcon';

const Leaderboard: React.FC = () => {
    const { allUsers } = useAppContext();

    const sortedUsers = React.useMemo(() => 
        [...allUsers].sort((a, b) => b.leadsConverted - a.leadsConverted), 
        [allUsers]
    );

    const getRankColor = (rank: number) => {
        if (rank === 0) return 'text-yellow-400';
        if (rank === 1) return 'text-gray-400';
        if (rank === 2) return 'text-yellow-600';
        return 'text-gray-500 dark:text-gray-400';
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Leaderboard</h2>
                <p className="text-gray-500 dark:text-gray-400">Ranking based on converted leads.</p>
            </div>
            <Card>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {sortedUsers.map((user, index) => (
                        <li key={user.id} className="p-4 flex items-center justify-between">
                           <div className="flex items-center">
                                <div className={`w-10 text-center font-bold text-lg ${getRankColor(index)}`}>
                                    {index < 3 ? <TrophyIcon className="w-6 h-6 mx-auto" /> : `#${index + 1}`}
                                </div>
                                <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full mx-4" />
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-white">{user.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.role}</p>
                                </div>
                           </div>
                           <div className="text-right">
                                <p className="font-bold text-lg text-blue-600 dark:text-blue-400">{user.leadsConverted}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">converted</p>
                           </div>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
}

export default Leaderboard;