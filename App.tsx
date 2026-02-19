
import React, { useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import ProjectList from './components/projects/ProjectList';
import ProjectDetails from './components/projects/ProjectDetails';
import { type Project } from './types';
import Leads from './components/crm/Leads';
import Profile from './components/profile/Profile';
import Leaderboard from './components/leaderboard/Leaderboard';
import Tasks from './components/tasks/Tasks';
import HelpGuide from './components/help/HelpGuide';

export type View = 'dashboard' | 'projects' | 'leads' | 'tasks' | 'leaderboard' | 'profile' | 'help';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleBackToList = () => {
    setSelectedProject(null);
  };

  const renderContent = () => {
    if (selectedProject) {
      return <ProjectDetails project={selectedProject} onBack={handleBackToList} />;
    }
    switch (activeView) {
      case 'dashboard':
        return <Dashboard onSelectProject={handleSelectProject} />;
      case 'projects':
        return <ProjectList onSelectProject={handleSelectProject} />;
      case 'leads':
        return <Leads />;
      case 'tasks':
        return <Tasks />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <Profile />;
      case 'help':
          return <HelpGuide />;
      default:
        return <Dashboard onSelectProject={handleSelectProject} />;
    }
  };

  return (
    <AppProvider>
      <Layout activeView={activeView} setActiveView={setActiveView}>
        {renderContent()}
      </Layout>
    </AppProvider>
  );
};

export default App;