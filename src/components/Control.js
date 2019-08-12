import React, { useState, useEffect, useContext } from 'react';
import RestaurantsContext from '../context/restaurants-context';

const Control = () => {
    const {filter, filterDispatch} = useContext(RestaurantsContext);
    const [sortBy, setSortBy]      = useState(filter.sortBy);
    const [sortType, setSortType]  = useState(filter.sortType);

    const handleSortBy = (e) => {

        setSortBy(e.target.value);
    };

    const handleSortType = (e) => {
        setSortType(e.target.getAttribute('data-value'));
    }

    useEffect(() => {
       console.log('componentDidMount!');
    }, []);

    useEffect(() => {
        filterDispatch({ type: 'SET_SORT_BY', sortBy });
        console.log('sort by');
    }, [sortBy]);

    useEffect(() => {
        filterDispatch({ type: 'SET_SORT_TYPE', sortType });
        console.log('sort type');
    }, [sortType]);

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