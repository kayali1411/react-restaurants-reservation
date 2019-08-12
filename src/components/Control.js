import React, { useState, useEffect, useRef, useContext } from 'react';
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
        <div>
            <div>
                <label htmlFor="sort-by">Sort By</label>
                <select name="sort-by" id="sort-by" onChange={handleSortBy} value={sortBy}>
                    <option value="text">A - Z</option>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                </select>
            </div>
            <div>
                <button onClick={handleSortType} data-value="ASC" data-active={sortType === 'ASC'}>ASC</button>
                <button onClick={handleSortType} data-value="DSC" data-active={sortType === 'DSC'}>DSC</button>
            </div>
        </div>
    );
}

export default Control;