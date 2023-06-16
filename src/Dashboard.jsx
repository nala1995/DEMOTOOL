import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card.jsx';
import Card2 from './Card2.jsx';
import Card3 from './Card3.jsx';
import Card4 from './Card4.jsx';
import Card5 from './Card5.jsx';
import Card6 from './Card6.jsx';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    fetchData();
    fetchData2();
    fetchData3();
    fetchData4();
    fetchData5();
    fetchData6();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData2 = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products/2');
      const newData = response.data;
      setData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData3 = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products/3');
      const newData = response.data;
      setData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData4 = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products/4');
      const newData = response.data;
      setData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData5 = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products/5');
      const newData = response.data;
      setData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData6 = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products/6');
      const newData = response.data;
      setData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCards = () => {
    setShowCards(!showCards);
  };

  return (
    <div className="card1">
      <button className="cardone" onClick={toggleCards}>
        All Products
      </button>
      <button className="cardtwo" onClick={toggleCards}>
        All Orders
      </button>
      <button className="cardthree" onClick={toggleCards}>
        Revenue
      </button>
      <button className="cardfour" onClick={toggleCards}>
        Average Price
      </button>
      <button className="cardfive" onClick={toggleCards}>
        Most Sold
      </button>
      <button className="cardsix" onClick={toggleCards}>
        All Information
      </button>
      {showCards && (
        <div className="card-container">
          {data.map((item) => (
            <Card key={item.id} title={item.title} description={item.description} image={item.image} alt={item.title} />
          ))}
          <Card2 keytitle="Card 2" description="Description for card 2" image="url_to_image_2" alt="Card 2" />
          <Card3 title="Card 3" description="Description for Card 3" image="url_to_image_3" alt="Card 3" />
          <Card4 title="Card 4" description="Description for Card 4" image="url_to_image_4" alt="Card 4" />
          <Card5 title="Card 5" description="Description for Card 5" image="url_to_image_5" alt="Card 5" />
          <Card6 title="Card 6" description="Description for Card 6" image="url_to_image_6" alt="Card 6" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
