import React, { useState, useEffect, useContext } from 'react';
import RestaurantsContext from '../context/restaurants-context';
import Restaurant from './Restaurant';
import Data from '../restaurantsData';

const RestaurantsList = () => {
    const [restaurants, setRestaurants] = useState(Data);
    const {filter} = useContext(RestaurantsContext);

    useEffect(() => {
        setRestaurants(Data
            .filter((restaurant) => {
                const priceMatch   = filter.price !== undefined ? restaurant.price >= filter.price.min && restaurant.price <= filter.price.max : true;
                const ratingMatch  = filter.rating !== undefined ? restaurant.rating === Number(filter.rating) : true;
                const cuisineMatch = filter.cuisines !== undefined ? !!restaurant.cuisines.filter((cuisine) => filter.cuisines.indexOf(cuisine) !== -1) : true;

                return priceMatch && ratingMatch && cuisineMatch;
            })
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