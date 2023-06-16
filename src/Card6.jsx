import React from 'react';

const Card6 = ({ title, description, image }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <img src={image} alt={title} />
    </div>
  );
};

export default Card6;