const initialState = {
    totalItems: {},
    totalPrice: 0,
    totalCount: 0
};

const getPizzaSizePrice = (currentPizzaItems, _size) => {
    return currentPizzaItems
        .filter(({size}) => size === _size)
        .reduce((sum, obj) => obj.price + sum, 0);
};

const getPizzaSizeCount = (currentPizzaItems, _size) => {
    return currentPizzaItems
        .filter(({size}) => size === _size)
        .reduce((sum, obj) =>  sum + 1, 0);
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
        const Items = {
            ...state.totalItems,
        }
        const _size = action.payload.size;

        const filterArray = Items[action.payload.id].totalItems.filter(({size}) => size !== _size);

        const totalPriceBySize = {
            totalPrice25: getPizzaSizePrice(filterArray, 25),
            totalPrice30: getPizzaSizePrice(filterArray, 30),
            totalPrice35: getPizzaSizePrice(filterArray, 35),
        };

        const totalCountBySize = {
            totalCount25: getPizzaSizeCount(filterArray, 25),
            totalCount30: getPizzaSizeCount(filterArray, 30),
            totalCount35: getPizzaSizeCount(filterArray, 35),
        };

        const newItems = {
            ...state.totalItems,
            [action.payload.id]: {
                totalItems: filterArray,
                totalPrice: getTotalPrice(filterArray),
                totalPriceBySize,
                totalCountBySize,
            },
        };

        const totalCount = getTotalSum(newItems, 'totalItems.length');
        const totalPrice = getTotalSum(newItems, 'totalPrice');

        return {
            ...state,
            totalItems: newItems,
            totalPrice: totalPrice,
            totalCount: totalCount,
        };
    }

    if (action.type === 'ADD_TO_CART') {
        const currentPizzaItems = !state.totalItems[action.payload.id] ?
            [action.payload] :
            [...state.totalItems[action.payload.id].totalItems, action.payload];

       const totalPriceBySize = {
            totalPrice25: getPizzaSizePrice(currentPizzaItems, 25),
            totalPrice30: getPizzaSizePrice(currentPizzaItems, 30),
            totalPrice35: getPizzaSizePrice(currentPizzaItems, 35),
       };

        const totalCountBySize = {
            totalCount25: getPizzaSizeCount(currentPizzaItems, 25),
            totalCount30: getPizzaSizeCount(currentPizzaItems, 30),
            totalCount35: getPizzaSizeCount(currentPizzaItems, 35),
        };

       const newItems = {
            ...state.totalItems,
            [action.payload.id]: {
                totalItems: currentPizzaItems,
                totalPrice: getTotalPrice(currentPizzaItems),
                totalPriceBySize,
                totalCountBySize,
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

    if (action.type === 'DELETE_FROM_CART') {

        const currentPizzaItems = !state.totalItems[action.payload.id] ?
            [action.payload] :
            [...state.totalItems[action.payload.id].totalItems];


            for (let i = 0; i < currentPizzaItems.length; i++){
                if (action.payload.type === currentPizzaItems[i].type && action.payload.size === currentPizzaItems[i].size){
                    currentPizzaItems.splice(i, 1);
                    break;
                }
            }


        const totalPriceBySize = {
            totalPrice25: getPizzaSizePrice(currentPizzaItems, 25),
            totalPrice30: getPizzaSizePrice(currentPizzaItems, 30),
            totalPrice35: getPizzaSizePrice(currentPizzaItems, 35),
        };

        const totalCountBySize = {
            totalCount25: getPizzaSizeCount(currentPizzaItems, 25),
            totalCount30: getPizzaSizeCount(currentPizzaItems, 30),
            totalCount35: getPizzaSizeCount(currentPizzaItems, 35),
        };


        const newItems = {
            ...state.totalItems,
            [action.payload.id]: {
                totalItems: currentPizzaItems,
                totalPrice: getTotalPrice(currentPizzaItems),
                totalPriceBySize,
                totalCountBySize,
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
            ...state.totalItems[action.payload.id].totalItems,
            action.payload,
        ];



        const totalPriceBySize = {
            totalPrice25: getPizzaSizePrice(newObjItems, 25),
            totalPrice30: getPizzaSizePrice(newObjItems, 30),
            totalPrice35: getPizzaSizePrice(newObjItems, 35),
        };

        const totalCountBySize = {
            totalCount25: getPizzaSizeCount(newObjItems, 25),
            totalCount30: getPizzaSizeCount(newObjItems, 30),
            totalCount35: getPizzaSizeCount(newObjItems, 35),
        };

        const newItems = {
            ...state.totalItems,
            [action.payload.id]: {
                totalItems: newObjItems,
                totalPrice: getTotalPrice(newObjItems),
                totalPriceBySize,
                totalCountBySize,
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
        const newObjItems = state.totalItems[action.payload.id].totalItems

        if (newObjItems.length > 1){
            for (let i = 0; i < newObjItems.length; i++){
                if (action.payload.type === newObjItems[i].type && action.payload.size === newObjItems[i].size){
                    newObjItems.splice(i, 1);
                    break;
                }
            }
        }

        const totalPriceBySize = {
            totalPrice25: getPizzaSizePrice(newObjItems, 25),
            totalPrice30: getPizzaSizePrice(newObjItems, 30),
            totalPrice35: getPizzaSizePrice(newObjItems, 35),
        };

        const totalCountBySize = {
            totalCount25: getPizzaSizeCount(newObjItems, 25),
            totalCount30: getPizzaSizeCount(newObjItems, 30),
            totalCount35: getPizzaSizeCount(newObjItems, 35),
        };


        const newItems = {
            ...state.totalItems,
            [action.payload.id]: {
                totalItems: newObjItems,
                totalPrice: getTotalPrice(newObjItems),
                totalPriceBySize,
                totalCountBySize,
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