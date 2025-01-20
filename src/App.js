import React from 'react';
import ProjectOverview from './components/ProjectOverview';
import TaskTracking from './components/TaskTracking';
import ProgressVisualization from './components/ProgressVisualization';
import BudgetMonitoring from './components/BudgetMonitoring';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css'; // Import the Tailwind CSS file


function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-2 md:col-span-1 lg:col-span-1">
          <ProjectOverview />
        </div>
        <div className="col-span-2 md:col-span-1 lg:col-span-1">
          <TaskTracking />
        </div>
        <div className="col-span-2 md:col-span-1 lg:col-span-1">
        <ErrorBoundary>
      <ProgressVisualization progress={75} />  {/* Ensure you are passing valid data */}
    </ErrorBoundary>
        </div>
        <div className="col-span-2 md:col-span-1 lg:col-span-1">
          <BudgetMonitoring />
        </div>
      </div>
    </div>
  );
}

export default App;
