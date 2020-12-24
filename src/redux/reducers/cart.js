const initialState = {
    totalItems: {},
    totalPrice: 0,
    totalCount: 0
};

const cart = (state = initialState, action) => {
    if (action.type === 'SET_TOTAL_PRICE'){
        return {
            ...state,
            totalPrice: action.payload,
        };
    }
    if (action.type === 'SET_TOTAL_COUNT') {
        return {
            ...state,
            totalCount: action.payload,
        };
    }
    if (action.type === 'SET_TOTAL_ITEMS') {
        return {
            ...state,
            totalItems: action.payload,
        };
    }
    if (action.type === 'ADD_TO_CART') {
        const newItems = {
            ...state.totalItems,
            [action.payload.id]: !state.totalItems[action.payload.id] ? [action.payload] :
                [...state.totalItems[action.payload.id], action.payload],
        };
        return {
            ...state,
            totalItems: newItems,
            totalCount: [].concat.apply([], Object.values(newItems)).length,
            totalPrice: [].concat.apply([], Object.values(newItems)).reduce((sum, element) => element.price + sum, 0),
        };
    }
    return state;
};

export default cart;