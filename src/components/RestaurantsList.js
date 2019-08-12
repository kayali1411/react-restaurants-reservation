import React, { useState, useEffect, useContext } from 'react';
import RestaurantsContext from '../context/restaurants-context';
import Restaurant from './Restaurant';
import Data from '../restaurantsData';

const RestaurantsList = () => {
    const [restaurants, setRestaurants] = useState(Data);
    const {filter} = useContext(RestaurantsContext);

    useEffect(() => {
        setRestaurants(restaurants
            .filter((restaurant) => true)
            .sort((a,b) => {
                if(filter.sortBy === 'text') {
                    return (a.name > b.name && filter.sortType === 'ASC') ? 1 : -1;
                }
                if(filter.sortBy === 'price') {
                    return (a.price > b.price && filter.sortType === 'ASC') ? 1 : -1;
                }
                if(filter.sortBy === 'rating') {
                    return (a.rating > b.rating && filter.sortType === 'ASC') ? 1 : -1;
                }
            }));
    }, [filter]);

    return (
        <div>
            {restaurants.map((restaurant) => <Restaurant key={restaurant.name} info={restaurant} />)}
        </div>
    );
};

export default RestaurantsList;