import React from 'react';
import { FaCheckCircle, FaHourglassHalf } from 'react-icons/fa'; // Icons for status

const ProjectOverview = () => {
  const projects = [
    { name: 'Project A', startDate: '01/01/2023', endDate: '12/31/2023', status: 'In Progress' },
    { name: 'Project B', startDate: '06/01/2023', endDate: '11/30/2023', status: 'Completed' },
    // Add more projects here
  ];

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-100 shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6 animate__animated animate__fadeIn">
        Project Overview
      </h2>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 animate__animated animate__fadeIn animate__delay-1s"
          >
            <h3 className="text-2xl font-bold text-gray-700 mb-3">{project.name}</h3>
            <p className="mb-3 text-gray-600"><strong>Start Date:</strong> {project.startDate}</p>
            <p className="mb-4 text-gray-600"><strong>End Date:</strong> {project.endDate}</p>

            {/* Status Section with Gradient Colors and Icons */}
            <div className="flex items-center space-x-2 mb-4">
              <span
                className={`px-3 py-2 text-white rounded-full text-sm font-semibold ${
                  project.status === 'Completed'
                    ? 'bg-gradient-to-r from-green-400 to-blue-500'
                    : 'bg-gradient-to-r from-yellow-400 to-red-500'
                }`}
              >
                {project.status === 'Completed' ? (
                  <FaCheckCircle className="inline mr-1" />
                ) : (
                  <FaHourglassHalf className="inline mr-1" />
                )}
                {project.status}
              </span>
            </div>

            {/* Status Message */}
            {project.status === 'Completed' && (
              <span className="text-sm text-green-400">Project successfully finished!</span>
            )}
            {project.status === 'In Progress' && (
              <span className="text-sm text-yellow-400">Ongoing, working towards completion.</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectOverview;
