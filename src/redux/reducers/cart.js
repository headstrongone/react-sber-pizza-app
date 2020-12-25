const initialState = {
    totalItems: {},
    totalPrice: 0,
    totalCount: 0
};

const getTotalPrice = arr => arr.reduce((sum, obj) => obj.price + sum, 0);

const _get = (obj, path) => {
    const [firstKey, ...keys] = path.split('.');
    return keys.reduce((val, key) => {
        return val[key];
    }, obj[firstKey]);
};

const getTotalSum = (obj, path) => {
    return Object.values(obj).reduce((sum, obj) => {
        const value = _get(obj, path);
        return sum + value;
    }, 0);
};



const cart = (state = initialState, action) => {
    if (action.type === 'SET_TOTAL_PRICE'){
        return {
            ...state,
            totalPrice: action.payload,
        };
    }

    if (action.type === 'CLEAR_CART'){
        return {
            totalItems: {},
            totalPrice: 0,
            totalCount: 0,
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

    if (action.type === 'REMOVE_CART_ITEM') {
        const newItems = {
            ...state.totalItems,
        }

        const price = newItems[action.payload].totalPrice;
        const count = newItems[action.payload].totalItems.length;

        delete newItems[action.payload]
        console.log(count)

        return {
            ...state,
            totalItems: newItems,
            totalPrice: state.totalPrice - price,
            totalCount: state.totalCount - count,
        };
    }

    if (action.type === 'ADD_TO_CART') {
        const currentPizzaItems = !state.totalItems[action.payload.id] ?
            [action.payload] :
            [...state.totalItems[action.payload.id].totalItems, action.payload];

        const newItems = {
            ...state.totalItems,
            [action.payload.id]: {
                totalItems: currentPizzaItems,
                totalPrice: getTotalPrice(currentPizzaItems),
            },
        };

        const _items = Object.values(newItems).map(obj => obj.totalItems);
        const allPizzas = [].concat.apply([], _items);
        const totalPrice = getTotalPrice(allPizzas);

        return {
            ...state,
            totalItems: newItems,
            totalCount: allPizzas.length,
            totalPrice: totalPrice,
        };
    }


    if (action.type === 'ON_PLUS_CART') {
        const newObjItems = [
            ...state.totalItems[action.payload].totalItems,
            state.totalItems[action.payload].totalItems[0],
        ];
        const newItems = {
            ...state.totalItems,
            [action.payload]: {
                totalItems: newObjItems,
                totalPrice: getTotalPrice(newObjItems),
            },
        };

        const totalCount = getTotalSum(newItems, 'totalItems.length');
        const totalPrice = getTotalSum(newItems, 'totalPrice');

        return {
            ...state,
            totalItems: newItems,
            totalCount,
            totalPrice,
        };
    }

    if (action.type === 'ON_MINUS_CART') {
        const oldItems = state.totalItems[action.payload].totalItems;
        const newObjItems = oldItems.length > 1 ?
            state.totalItems[action.payload].totalItems.slice(1)
            : oldItems;

        const newItems = {
            ...state.totalItems,
            [action.payload]: {
                totalItems: newObjItems,
                totalPrice: getTotalPrice(newObjItems),
            },
        };

        const totalCount = getTotalSum(newItems, 'totalItems.length');
        const totalPrice = getTotalSum(newItems, 'totalPrice');

        return {
            ...state,
            totalItems: newItems,
            totalCount,
            totalPrice,
        };
    }




    return state;
};

export default cart;