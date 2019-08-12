import React from 'react';

const Restaurant = ({info}) => {
    return (
        <div>
            <h1>{info.name}</h1>
            <p>price: {info.price}</p>
            <p>rating: {info.rating}</p>
            <p>cuisine: {info.cuisine.map((type) => <span key={type}>{type}</span>)}</p>
        </div>
    )
};

export default Restaurant;