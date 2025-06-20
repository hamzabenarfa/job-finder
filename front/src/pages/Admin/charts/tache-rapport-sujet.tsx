// @ts-nocheck
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axiosInstance from '@/axios-instance';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Nombre de tâches par sujet',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Nombre de tâches',
        color: '#666',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
      ticks: {
        stepSize: 1,
        precision: 0,
      },
    },
    x: {
      title: {
        display: true,
        text: 'Sujet',
        color: '#666',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
  },
};

export function TacheRapportSujet() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/kpi/countByCategorie');
        const data = response.data;
        const labels = Object.keys(data);
        const dataset = {
          label: 'Nombre de tâches',
          data: Object.values(data).map(Number), // Ensure all values are integers
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        };

        setChartData({
          labels,
          datasets: [dataset],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <Bar options={options} data={chartData} />;
}