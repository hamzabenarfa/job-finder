import React, { useEffect, useState } from 'react';
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
      text: 'Nombre de candidatures par mois',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Nombre de candidatures',
        color: '#666',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
      ticks: {
        stepSize: 1, // Ensure steps are incremented by 1
        precision: 0, // Ensure no decimal places
      },
    },
    x: {
      title: {
        display: true,
        text: 'Mois',
        color: '#666',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
  },
};

export const BarChart: React.FC = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Candidatures',
        data: [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('kpi/candidatures/monthly');
        const rawData = response.data;
        const labels = Object.keys(rawData);
        const values = Object.values(rawData).map(Number); // Ensure all values are integers

        setData({
          labels,
          datasets: [
            {
              label: 'Candidatures',
              data: values,
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        });
      } catch (error) {
        console.error('There was an error fetching the data!', error);
      }
    };

    fetchData();
  }, []);

  return <Bar options={options} data={data} />;
};

export default BarChart;