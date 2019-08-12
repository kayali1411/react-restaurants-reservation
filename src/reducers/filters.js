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
        case 'SORT_BY_TEXT':
            return {
                ...state,
                sortBy: 'text'
            }
        case 'SORT_BY_PRICE':
            return {
                ...state,
                sortBy: 'price'
            }
        case 'SORT_BY_RATE':
            return {
                ...state,
                sortBy: 'rating'
            }
        case 'SORT_TYPE':
            return {
                ...state,
                sortType: action.sortType
            }
        default:
            return state
    }
}

export default filtersReducer;