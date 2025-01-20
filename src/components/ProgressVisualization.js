import React from 'react';

const ProgressVisualization = ({ progress }) => {
  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105">
      <h2 className="text-2xl font-bold mb-4 text-gradient bg-clip-text">
        Project Progress
      </h2>
      <div className="h-2 bg-gray-600 rounded-full mb-4">
        {/* Animated Progress Bar */}
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-2 text-xl">{progress}% Completed</p>
      {/* Icon for progress */}
      <div className="flex items-center mt-4 space-x-2">
        <span className="text-xl text-yellow-400 animate-pulse">
          <i className="fas fa-tasks"></i>
        </span>
        <span className="text-lg text-gray-300">Progressing smoothly...</span>
      </div>
    </div>
  );
};

export default ProgressVisualization;
