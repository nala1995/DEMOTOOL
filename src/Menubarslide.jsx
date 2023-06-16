import {useState} from 'react';
import Card from './Card';

function Menubarslide() {

  const [cards, setCards] = useState([]);

  const handleTabClick = (tab) => {
    // Lógica para controlar las cards según la pestaña seleccionada
    let cardsToShow = [];
    
  switch (tab) {
    case 1:
      // Lógica para mostrar las cards de la pestaña 1
      cardsToShow = [{ id: 1, title: 'Card 1', description: 'Description for Card 1' },
      { id: 2, title: 'Card 2', description: 'Description for Card 2' },
      { id: 3, title: 'Card 3', description: 'Description for Card 3' }];
      break;
    case 2:
      // Lógica para mostrar las cards de la pestaña 2
      cardsToShow = [{ id: 4, title: 'Card 4', description: 'Description for Card 4' },
      { id: 5, title: 'Card 5', description: 'Description for Card 5' }];
      break;
    case 3:
      // Lógica para mostrar las cards de la pestaña 2
      cardsToShow = [{ id: 6, title: 'Card 6', description: 'Description for Card 6' },
      { id: 7, title: 'Card 7', description: 'Description for Card 7' },
      { id: 8, title: 'Card 8', description: 'Description for Card 8' },
      { id: 9, title: 'Card 9', description: 'Description for Card 9' }];
      break;
    case 4:
      // Lógica para mostrar las cards de la pestaña 2
      cardsToShow = [{ id: 10, title: 'Card 10', description: 'Description for Card 10' },
      { id: 11, title: 'Card 11', description: 'Description for Card 11' },
      { id: 12, title: 'Card 12', description: 'Description for Card 12' },
      { id: 13, title: 'Card 13', description: 'Description for Card 13' }];
      break;
    case 5:
      // Lógica para mostrar las cards de la pestaña 2
      cardsToShow = [{ id: 14, title: 'Card 14', description: 'Description for Card 14' },
      { id: 15, title: 'Card 15', description: 'Description for Card 15' },
      { id: 16, title: 'Card 16', description: 'Description for Card 16' },
      { id: 17, title: 'Card 17', description: 'Description for Card 17' }];
      break;
    case 6:
      // Lógica para mostrar las cards de la pestaña 2
      cardsToShow = [{ id: 18, title: 'Card 18', description: 'Description for Card 18' },
      { id: 19, title: 'Card 19', description: 'Description for Card 19' },
      { id: 20, title: 'Card 20', description: 'Description for Card 20' },
      { id: 21, title: 'Card 21', description: 'Description for Card 21' }];
      break;
    
    default:
      // Lógica por defecto si no se selecciona ninguna pestaña válida
      cardsToShow = [];
      break;
  }

  setCards(cardsToShow);
 // Actualiza el estado con las cards a mostrar
  };

  return (
    <div className="sidebar">
      <button onClick={() => handleTabClick(1)}>All Products in stock</button>
      <button onClick={() => handleTabClick(2)}>All Order Placed</button>
      <button onClick={() => handleTabClick(3)}>Total Revenue</button>
      <button onClick={() => handleTabClick(4)}>Average Product Price</button>
      <button onClick={() => handleTabClick(5)}>Most Selled Products</button>
      <button onClick={() => handleTabClick(6)}>Summarise Information</button>
      {/* Define botones adicionales para las otras pestañas */}
      {cards.forEach((card) => ( <Card key={card.id} title={card.title} description={card.description} /> ))}
    </div>
  );
}

export default Menubarslide;
