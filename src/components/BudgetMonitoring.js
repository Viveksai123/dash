import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaDollarSign } from 'react-icons/fa';  // For icon

// Registering Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetMonitoring = () => {
  // Data for the pie chart
  const data = {
    labels: ['Expenses', 'Remaining Budget'],
    datasets: [
      {
        data: [60000, 40000], // Total Expenses and Remaining Budget
        backgroundColor: ['#FF5733', '#28A745'], // Red for Expenses, Green for Remaining Budget
        hoverOffset: 4,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `$${tooltipItem.raw.toLocaleString()}`; // Format numbers with commas
          },
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 animate__animated animate__fadeIn text-center">
        <FaDollarSign className="inline-block mr-2 text-green-500" />
        Budget Monitoring
      </h2>

      <div className="flex justify-between mb-4">
        <p><strong>Total Budget:</strong> $100,000</p>
        <p><strong>Expenses:</strong> $60,000</p>
      </div>

      <div className="mb-6">
        <Pie data={data} options={options} />
      </div>

      <div className="bg-gray-200 h-4 rounded-full mt-4">
        <div className="bg-green-500 h-full rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
      </div>

      <p className="mt-4"><strong>Remaining Budget:</strong> $40,000</p>
    </div>
  );
};

export default BudgetMonitoring;
