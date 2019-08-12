const filtersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CUISINE':
            return {
                ...state,
                cuisine: action.cuisine
            }
        case 'SET_PRICE':
            return {
                ...state,
                price: action.price
            }
        case 'SET_RATING':
            return {
                ...state,
                rating: action.rating
            }
        case 'SET_SORT':
            return {
                ...state,
                sortBy: action.sortBy,
                sortType: action.sortType
            }
        default:
            return state
    }
}

export default filtersReducer;