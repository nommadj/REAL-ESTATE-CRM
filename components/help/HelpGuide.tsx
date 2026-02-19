
import React, { useState } from 'react';
import Card from '../common/Card';

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 dark:text-white"
            >
                <span>{title}</span>
                <svg
                    className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {isOpen && (
                <div className="p-4 pt-0 text-gray-600 dark:text-gray-300">
                    {children}
                </div>
            )}
        </div>
    );
};


const HelpGuide: React.FC = () => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Help Guide</h2>
                <p className="text-gray-500 dark:text-gray-400">Find answers to common questions about the CRM.</p>
            </div>
            <Card>
                <AccordionItem title="What is Offline Sync?">
                    <p>
                        This app works even when you're offline! Any changes you make, like updating a lead's status, are saved securely on your device. Once you reconnect to the internet, all your changes will be automatically synced with the server.
                    </p>
                </AccordionItem>
                 <AccordionItem title="How do I manage Leads?">
                    <p>
                        Navigate to the 'Leads' tab from the bottom menu. Here you can see a list of all your leads. To update a lead, simply tap the status dropdown (e.g., 'New', 'Contacted') and select a new status. The change is saved instantly, even offline.
                    </p>
                </AccordionItem>
                <AccordionItem title="How do Tasks work?">
                     <p>
                        The 'Tasks' tab helps you keep track of your to-do items. You can see tasks assigned to you, filter them by status, and update their progress. This ensures you never miss an important follow-up or deadline.
                    </p>
                </AccordionItem>
                <AccordionItem title="What is the Leaderboard?">
                     <p>
                        The 'Ranking' tab shows a company-wide leaderboard based on the number of leads each agent has successfully converted. It's a fun way to foster friendly competition and recognize top performers.
                    </p>
                </AccordionItem>
                 <AccordionItem title="How do I enable Notifications?">
                     <p>
                        Go to the 'Profile' tab and find the Settings section. Click the 'Enable' button for Push Notifications. Your browser will ask for permission. Once granted, you'll receive alerts for important events.
                    </p>
                </AccordionItem>
            </Card>
        </div>
    );
};

export default HelpGuide;