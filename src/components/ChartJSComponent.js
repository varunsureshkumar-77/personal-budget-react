import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const ChartJSComponent = ({ data, type = 'doughnut' }) => {
  if (!data || !data.myBudget || data.myBudget.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p>Loading chart data...</p>
      </div>
    );
  }

  const generateColors = (count) => {
    const colors = [
      '#FF1744',
      '#00E676',
      '#FF9800',
      '#2196F3',
      '#E91E63',
      '#00BCD4',
      '#8BC34A',
      '#FFC107'
    ];
    return colors.slice(0, count);
  };

  const labels = data.myBudget.map(item => item.title);
  const budgets = data.myBudget.map(item => item.budget);
  const backgroundColors = generateColors(labels.length);
  const borderColors = backgroundColors.map(color => color.replace('0.2', '1'));

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Budget Amount ($)',
        data: budgets,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value} (${percentage}%)`;
          }
        }
      }
    },
    ...(type === 'bar' && {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '$' + value;
            }
          }
        }
      }
    })
  };

  return (
    <div style={{ height: '400px', position: 'relative' }}>
      {type === 'doughnut' ? (
        <Doughnut data={chartData} options={options} />
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

export default ChartJSComponent;
