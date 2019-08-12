import React, { useState, useEffect, useContext} from 'react';
import RestaurantContext from '../context/restaurants-context';

const LayeredNavigation = () => {
    const { filter, filterDispatcj } = useContext(RestaurantContext);
    const [ cuisine, setCuisine ]    = useState(filter.cuisine || '');
    const [ price, setPrice ]        = useState(filter.price || { min: 1, max: 5});
    const [ rating, setRating ]      = useState(filter.rating || '');

    const applyRating = (e) => {
        setRating(Number(e.target.value));
    };

    const applyMinPrice = (e) => {
        setPrice({
            ...price,
            min: Number(e.target.value)
        })
    };

    const applyMaxPrice = (e) => {
        setPrice({
            ...price,
            max: Number(e.target.value)
        })
    };

    useEffect(() => {
        console.log([cuisine, price, rating]);
    }, [cuisine, price, rating]);

    return (
        <div>
            <div>
                <h3>Rating</h3>
                <div>
                    <input type="radio" name="rating" value="1" checked={rating === 1} onChange={applyRating} /><span>1</span><br/>
                    <input type="radio" name="rating" value="2" checked={rating === 2} onChange={applyRating} /><span>2</span><br/>
                    <input type="radio" name="rating" value="3" checked={rating === 3} onChange={applyRating} /><span>3</span><br/>
                    <input type="radio" name="rating" value="4" checked={rating === 4} onChange={applyRating} /><span>4</span><br/>
                    <input type="radio" name="rating" value="5" checked={rating === 5} onChange={applyRating} /><span>5</span><br/>
                </div>
            </div>
            <div>
                <h3>Price</h3>
                <div>
                    <input type="range" value={price.min} onChange={applyMinPrice} min="1" max="5" step="1" />
                    <input type="range" value={price.max} onChange={applyMaxPrice} min="1" max="5" step="1" />
                </div>
            </div>
        </div>
    );
};

export default LayeredNavigation;