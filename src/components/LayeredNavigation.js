import React, { useState, useEffect, useRef, useContext} from 'react';
import RestaurantsContext from '../context/restaurants-context';
import InputRange from 'react-input-range';
import style from '../style/LayeredNavigation.module.css';
import 'react-input-range/lib/css/index.css'
import { cuisinesData } from '../data';

const LayeredNavigation = () => {
    const {filter, filterDispatch} = useContext(RestaurantsContext);
    const [cuisines, setCuisines]  = useState(filter.cuisines || []);
    const [price, setPrice]        = useState(filter.price || '');
    const [rating, setRating]      = useState(filter.rating || '');
    const [clear, setClear]        = useState({});

    const priceRef   = useRef(false);
    const ratingRef  = useRef(false);
    const cuisineRef = useRef(false);

    const applyRating = (e) => {
        ratingRef.current = true;
        setRating(Number(e.target.value));
        setClear({
            ...clear,
            rating: true
        });
    };

    const applyPrice = (price) => {
        priceRef.current = true;
        setPrice(price);
        setClear({
            ...clear,
            price: true
        });
    };

    const applyCuisine = (e) => {
        cuisineRef.current = true;
        if(e.target.checked) {
            setCuisines(cuisines.concat(e.target.value));
            setClear({
                ...clear,
                cuisines: true
            });
        } else {
            if(cuisines.length <= 1) {
                setClear({
                    ...clear,
                    cuisines: false
                });
            }
            setCuisines(cuisines.filter((cuisine) => cuisine !== e.target.value));
        }
    }

    const handleClearFilter = () => {
        setClear({});
        setCuisines([]);
        setRating('');
        setPrice('');
    }

    const getClearBtnStatus = () => !clear.rating && !clear.price && !clear.cuisines;

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
            <div className={style.clear_filter_button}>
                <button onClick={handleClearFilter} disabled={getClearBtnStatus()}>Clear Filter</button>
            </div>
            <div className={style.content}>
                <div>
                    <h3>Rating</h3>
                    <div>
                        {Array(1,2,3,4,5).map((rateValue) => (
                            <label key={rateValue} className={style.label}>
                                {Array(1,2,3,4,5).map((star) => {
                                    if(rateValue >= star) {
                                        return (<span key={[rateValue, '-', star].join('')} className={[style.star, style.star_checked].join(' ')}></span>)
                                    } else {
                                        return (<span key={[rateValue, '-', star].join('')} className={style.star}></span>)
                                    }
                                })}
                                <input type="radio" name="rating" value={rateValue} checked={rating === rateValue} onChange={applyRating} />
                                <span className={style.checkmark}></span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className={style.splitter}></div>
                <div>
                    <h3>Price</h3>
                    <div className={style.price_slider}>
                        <InputRange
                            maxValue={5}
                            minValue={1}
                            value={price || {min:1, max:5}}
                            onChange={applyPrice}
                        />
                    </div>
                </div>
                <div className={style.splitter}></div>
                <div>
                    <h3>Cuisines</h3>
                    <div>
                        {
                            cuisinesData.map((cuisine) => (
                                <label key={cuisine} className={style.label}>{cuisine}
                                    <input type="checkbox" name="checkbox[]" value={cuisine} checked={!!cuisines.find((cus) => cus === cuisine)} onChange={applyCuisine} />
                                    <span className={style.checkmark_checkbox}></span>
                                </label>
                            ))
                        }
                    </div>
                </div>
                <div className={style.splitter}></div>
            </div>
        </div>
    );
};

export default LayeredNavigation;