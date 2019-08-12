import React from 'react';

const Restaurant = ({info}) => {
    return (
        <div>
            <h1>{info.name}</h1>
            <h1>{info.price}</h1>
            <h1>{info.cuisine.map((type) => <p key={type}>{type}</p>)}</h1>
        </div>
    )
};

export default Restaurant;