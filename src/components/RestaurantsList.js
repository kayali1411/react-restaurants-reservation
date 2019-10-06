import React, { useState, useEffect, useContext } from 'react';
import RestaurantsContext from '../context/restaurants-context';
import Restaurant from './Restaurant';
import style from '../style/RestaurantsList.module.css';
import { restaurantsData } from '../data';

const RestaurantsList = () => {
    const [restaurants, setRestaurants] = useState(restaurantsData);
    const {filter} = useContext(RestaurantsContext);

    useEffect(() => {
        setRestaurants(restaurantsData
            .filter((restaurant) => {
                const priceMatch   = !!filter.price ? restaurant.price >= filter.price.min && restaurant.price <= filter.price.max : true;
                const ratingMatch  = !!filter.rating ? restaurant.rating === Number(filter.rating) : true;
                const cuisineMatch = !!filter.cuisines && filter.cuisines.length > 0  ? restaurant.cuisines.find((cuisine) => filter.cuisines.indexOf(cuisine) > -1) : true;

                return priceMatch && ratingMatch && cuisineMatch;
            })
            .sort((a,b) => {
                if(filter.sortBy === 'text' && filter.sortType === 'ASC') {
                    return a.name > b.name ? 1 : -1;
                }
                if(filter.sortBy === 'text' && filter.sortType === 'DSC') {
                    return a.name < b.name ? 1 : -1;
                }
                if(filter.sortBy === 'price' && filter.sortType === 'ASC') {
                    return a.price > b.price ? 1 : -1;
                }
                if(filter.sortBy === 'price' && filter.sortType === 'DSC') {
                    return a.price < b.price ? 1 : -1;
                }
                if(filter.sortBy === 'rating' && filter.sortType === 'ASC') {
                    return a.rating > b.rating ? 1 : -1;
                }
                if(filter.sortBy === 'rating' && filter.sortType === 'DSC') {
                    return a.rating < b.rating ? 1 : -1;
                }
            }));
    }, [filter]);

    return (
        <div className={style.grid}>
            {restaurants.length > 0 && (
                <div className={style.items_block}>
                    {restaurants.map((restaurant) => <Restaurant key={restaurant.name} info={restaurant} />)}
                </div>
            )}
            {restaurants.length === 0 && (
                <div className={style.empty_list}>
                    <h1>No Restaurants Available</h1>
                </div>
            )}
        </div>
    );
};

export default RestaurantsList;