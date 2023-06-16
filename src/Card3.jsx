import React from 'react';

const Card3 = ({ title, description, image }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <img src={image} alt={title} />
    </div>
  );
};

export default Card3;