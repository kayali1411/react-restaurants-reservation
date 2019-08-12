import React from 'react';
import Gallery from '../gallery';

const Restaurant = ({info}) => {
    return (
        <div>
            <h1>{info.name}</h1>
            <img src={Gallery[info.id]} alt={info.name} />
            <p>price: {info.price}</p>
            <p>rating: {info.rating}</p>
            <p>cuisine: {info.cuisines.map((cuisine) => <span key={cuisine}>{cuisine}</span>)}</p>
        </div>
    )
};

export default Restaurant;