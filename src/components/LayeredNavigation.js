import React, { useState, useEffect, useRef, useContext} from 'react';
import RestaurantsContext from '../context/restaurants-context';
import style from '../style/LayeredNavigation.module.css';
import { cuisinesData } from '../data';

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
        if(e.target.checked) {
            setCuisines(cuisines.concat(e.target.value));
        } else {
            setCuisines(cuisines.filter((cuisine) => cuisine !== e.target.value));
        }
    }

    useEffect(() => {
        if(cuisineRef.current) {
            filterDispatch({ type: 'SET_CUISINE', cuisines });
        }
    }, [cuisines]);

    useEffect(() => {
        if(priceRef.current) {
            filterDispatch({ type: 'SET_PRICE', price });
        }
    }, [price]);

    useEffect(() => {
        if(ratingRef.current) {
            filterDispatch({ type: 'SET_RATING', rating });
        }
    }, [rating]);

    return (
        <div className={[style.layered_navigation].join(' ')}>
            <div>
                <h3>Rating</h3>
                <div>
                    <label className={style.label}>1
                        <input type="radio" name="rating" value="1" checked={rating === 1} onChange={applyRating} />
                        <span className={style.checkmark}></span>
                    </label>
                    <label className={style.label}>2
                        <input type="radio" name="rating" value="2" checked={rating === 2} onChange={applyRating} />
                        <span className={style.checkmark}></span>
                    </label>
                    <label className={style.label}>3
                        <input type="radio" name="rating" value="3" checked={rating === 3} onChange={applyRating} />
                        <span className={style.checkmark}></span>
                    </label>
                    <label className={style.label}>4
                        <input type="radio" name="rating" value="4" checked={rating === 4} onChange={applyRating} />
                        <span className={style.checkmark}></span>
                    </label>
                    <label className={style.label}>5
                        <input type="radio" name="rating" value="5" checked={rating === 5} onChange={applyRating} />
                        <span className={style.checkmark}></span>
                    </label>
                </div>
            </div>
            <div className={style.splitter}></div>
            <div>
                <h3>Price</h3>
                <div>
                    <input type="range" value={price.min} onChange={applyMinPrice} min="1" max="5" step="1" />
                    <input type="range" value={price.max} onChange={applyMaxPrice} min="1" max="5" step="1" />
                </div>
            </div>
            <div className={style.splitter}></div>
            <div>
                <h3>Cuisines</h3>
                <div>
                    {
                        cuisinesData.map((cuisine) => (
                            <div key={cuisine}>
                                <input type="checkbox" name="checkbox[]" value={cuisine} checked={!!cuisines.find((cus) => cus === cuisine)} onChange={applyCuisine} />
                                <span>{cuisine}</span>
                                <br/>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={style.splitter}></div>
        </div>
    );
};

export default LayeredNavigation;