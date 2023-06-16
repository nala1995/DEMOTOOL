import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import './App.css';
import Menubarslide from './Menubarslide';
import Dashboard from './Dashboard';

function App() {
  const [productsData, setProductsData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [activeTab, setActiveTab] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchDataAndGenerateChartData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProductsData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataAndGenerateChartData();
  }, []);

  useEffect(() => {
    const generateChartData = () => {
      const labels = [];
      const data = [];

      for (let i = 0; i < productsData.length; i++) {
        labels.push(productsData[i].title);
        data.push(productsData[i].price);
      }

      setChartData({
        labels,
        datasets: [
          {
            label: 'Precio de productos',
            data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    };

    generateChartData();
  }, [productsData]);

  return (
    <>
      <Menubarslide handleTabClick={handleTabClick} />
      <div className="app">
        <Dashboard activeTab={activeTab} />
      </div>
      <h1>Graficar el número total de productos</h1>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </>
  );
}

export default App;
