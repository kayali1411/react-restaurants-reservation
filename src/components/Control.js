import React, { useState, useEffect, useRef, useContext } from 'react';
import style from '../style/Control.module.css';
import RestaurantsContext from '../context/restaurants-context';

const Control = () => {
    const {filter, filterDispatch} = useContext(RestaurantsContext);
    const [sortBy, setSortBy]      = useState(filter.sortBy);
    const [sortType, setSortType]  = useState(filter.sortType);

    const componentMounted = useRef(false);

    const handleSortBy = (e) => {
        setSortBy(e.target.value);
    };

    const handleSortType = (e) => {
        setSortType(e.target.getAttribute('data-value'));
    }

    useEffect(() => {
        if(!componentMounted.current) {
            componentMounted.current = true;
        } else {
            filterDispatch({ type: 'SET_SORT', sortBy, sortType });
        }
    }, [sortBy, sortType]);

    return (
        <div className={[style.control, style.box_shadow].join(' ')}>
            <div className={style.selected_filter_block}>
                {!!filter.price && (
                    <div className={[style.selected_filter, style.box_shadow].join(' ')}>
                        min price: {filter.price.min}
                    </div>
                )}
                {!!filter.price && (
                    <div className={[style.selected_filter, style.box_shadow].join(' ')}>
                        max price: {filter.price.max}
                    </div>
                )}
                {!!filter.rating && (
                    <div className={[style.selected_filter, style.box_shadow].join(' ')}>
                        rating: {filter.rating}
                    </div>
                )}
                {!!filter.cuisines && filter.cuisines.map((cuisine) => (
                    <div className={[style.selected_filter, style.box_shadow].join(' ')} key={cuisine}>
                        cuisine: {cuisine}
                    </div>
                ))}
            </div>
            <div className={style.sort_by}>
                <label className={style.sort_by_label} htmlFor="sort-by">Sort By</label>
                <select className={[style.select, style.box_shadow].join(' ')} name="sort-by" id="sort-by" onChange={handleSortBy} value={sortBy}>
                    <option value="text">A - Z</option>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                </select>
            </div>
            <div className={style.sort_type}>
                <button className={[style.button, style.box_shadow].join(' ')} onClick={handleSortType} data-value="ASC" data-active={sortType === 'ASC'}>ASC</button>
                <button className={[style.button, style.box_shadow].join(' ')} onClick={handleSortType} data-value="DSC" data-active={sortType === 'DSC'}>DSC</button>
            </div>
        </div>
    );
}

export default Control;