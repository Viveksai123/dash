import React from 'react';
import { FaCheckCircle, FaHourglassHalf } from 'react-icons/fa'; // Icons for status

const TaskTracking = () => {
  const tasks = [
    { taskName: 'Task 1', description: 'Description of Task 1', deadline: '02/01/2023', status: 'In Progress', progress: 40 },
    { taskName: 'Task 2', description: 'Description of Task 2', deadline: '03/01/2023', status: 'Completed', progress: 100 },
    // Add more tasks here
  ];

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-100 shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6 animate__animated animate__fadeIn">
        Task Tracking
      </h2>
      <div className="space-y-6">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 animate__animated animate__fadeIn animate__delay-1s"
          >
            <h4 className="text-2xl font-bold text-gray-700 mb-2">{task.taskName}</h4>
            <p className="mb-3 text-gray-600"><strong>Description:</strong> {task.description}</p>
            <p className="mb-4 text-gray-600"><strong>Deadline:</strong> {task.deadline}</p>

            {/* Status Section with Gradient Colors and Icons */}
            <div className="flex items-center space-x-2 mb-4">
              <span
                className={`px-3 py-2 text-white rounded-full text-sm font-semibold ${
                  task.status === 'Completed'
                    ? 'bg-gradient-to-r from-green-400 to-blue-500'
                    : 'bg-gradient-to-r from-yellow-400 to-red-500'
                }`}
              >
                {task.status === 'Completed' ? (
                  <FaCheckCircle className="inline mr-1" />
                ) : (
                  <FaHourglassHalf className="inline mr-1" />
                )}
                {task.status}
              </span>
            </div>

            {/* Progress Bar for In Progress Tasks */}
            {task.status === 'In Progress' && (
              <div className="bg-gray-200 h-2 rounded-full mt-4">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full"
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
            )}
            {task.status === 'In Progress' && (
              <p className="mt-2 text-sm text-blue-500">{task.progress}% Completed</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskTracking;
