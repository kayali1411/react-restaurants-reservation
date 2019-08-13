import React from 'react';
import Gallery from '../gallery';
import style from '../style/Restaurant.module.css';

const Restaurant = ({info}) => {
    return (
        <div className={[style.item, style.box_shadow].join(' ')}>
            <h2>{info.name}</h2>
            <img src={Gallery[info.id]} alt={info.name} />
            <p>price: {info.price}</p>
            <p>rating: {info.rating}</p>
            <p>cuisine: {info.cuisines.map((cuisine) => <span key={cuisine}>{cuisine}</span>)}</p>
        </div>
    )
};

export default Restaurant;