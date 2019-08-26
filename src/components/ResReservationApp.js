import React, { useReducer } from 'react';
import Header from './Header';
import RestaurantsList from './RestaurantsList';
import LayeredNavigation from './LayeredNavigation';
import Control from './Control';
import filterReducer from '../reducers/filters';
import RestaurantsContext from '../context/restaurants-context';

const App = () => {
    const [filter, filterDispatch] = useReducer(filterReducer, {sortBy: 'text', sortType: 'ASC'})
    const store = {
        filter,
        filterDispatch
    }

    return (
        <RestaurantsContext.Provider value={store}>
            <Header/>
            <Control/>
            <LayeredNavigation/>
            <RestaurantsList/>
        </RestaurantsContext.Provider>
    );
};

export default App;
