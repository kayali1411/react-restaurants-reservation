import React, { useState, useEffect, useRef, useContext} from 'react';
import RestaurantsContext from '../context/restaurants-context';

const LayeredNavigation = () => {
    const {filter, filterDispatch} = useContext(RestaurantsContext);
    const [cuisines, setCuisines]  = useState(filter.cuisines || []);
    const [price, setPrice]        = useState(filter.price || { min: 1, max: 5});
    const [rating, setRating]      = useState(filter.rating || '');

    const priceRef   = useRef(false);
    const ratingRef  = useRef(false);
    const cuisineRef = useRef(false);

    const applyRating = (e) => {
        ratingRef.current = true;
        setRating(Number(e.target.value));
    };

    const applyMinPrice = (e) => {
        priceRef.current = true;
        setPrice({
            ...price,
            min: Number(e.target.value)
        })
    };

    const applyMaxPrice = (e) => {
        priceRef.current = true;
        setPrice({
            ...price,
            max: Number(e.target.value)
        })
    };

    const applyCuisine = (e) => {
        cuisineRef.current = true;
        setCuisines(cuisines.concat(e.target.value));
    }

    useEffect(() => {
        if(cuisineRef.current) {
            console.log(cuisines);
            filterDispatch({ type: 'SET_CUISINE', cuisines });
        }
    }, [cuisines]);

    useEffect(() => {
        if(priceRef.current) {
            console.log(price);
            filterDispatch({ type: 'SET_PRICE', price });
        }
    }, [price]);

    useEffect(() => {
        if(ratingRef.current) {
            console.log(rating);
            filterDispatch({ type: 'SET_RATING', rating });
        }
    }, [rating]);

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
            <div>
                <h3>Cuisines</h3>
                <input type="checkbox" name="cuisine[]" value="burger" checked={!!cuisines.find((cuisine) => cuisine === 'burger')} onChange={applyCuisine} /><span>burger</span><br/>
                <input type="checkbox" name="cuisine[]" value="indian" checked={!!cuisines.find((cuisine) => cuisine === 'indian')} onChange={applyCuisine} /><span>indian</span><br/>
                <input type="checkbox" name="cuisine[]" value="bbq" checked={!!cuisines.find((cuisine) => cuisine === 'bbq')} onChange={applyCuisine} /><span>bbq</span><br/>
            </div>
        </div>
    );
};

export default LayeredNavigation;