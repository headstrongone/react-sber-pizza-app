const initialState = {
    totalItems: {},
    totalPrice: 0,
    totalCount: 0
};

    const getPizzaSizePrice = (currentPizzaItems, _type, _size) => {
        return currentPizzaItems
        .filter(({size, type}) => type === _type && size === _size)
        .reduce((sum, obj) => obj.price + sum, 0);
    };

const getPizzaSizeCount = (currentPizzaItems, _type, _size) => {
    return currentPizzaItems
    .filter(({type, size}) => type === _type && size === _size)
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
    };

    const _size = action.payload.size;
    const _type = action.payload.type;

    const filterArray = Items[action.payload.id].totalItems.filter(({type, size}) => _size + _type !== size + type);

    const totalPriceBySize = {
        totalPrice25: getPizzaSizePrice(filterArray, 'Стандартная', 25),
        totalPrice30: getPizzaSizePrice(filterArray, 'Стандартная', 30),
        totalPrice35: getPizzaSizePrice(filterArray, 'Стандартная', 35),
    };

    const totalCountBySize = {
        totalCount25: getPizzaSizeCount(filterArray, 'Стандартная', 25),
        totalCount30: getPizzaSizeCount(filterArray, 'Стандартная', 30),
        totalCount35: getPizzaSizeCount(filterArray, 'Стандартная', 35),
    };

    const totalPriceBySizeThin = {
        totalPrice25: getPizzaSizePrice(filterArray, 'Тонкая', 25),
        totalPrice30: getPizzaSizePrice(filterArray, 'Тонкая', 30),
        totalPrice35: getPizzaSizePrice(filterArray, 'Тонкая', 35),
    };

    const totalCountBySizeThin = {
        totalCount25: getPizzaSizeCount(filterArray, 'Тонкая', 25),
        totalCount30: getPizzaSizeCount(filterArray, 'Тонкая', 30),
        totalCount35: getPizzaSizeCount(filterArray, 'Тонкая', 35),
    };

    const newItems = {
        ...state.totalItems,
        [action.payload.id]: {
        totalItems: filterArray,
        totalPrice: getTotalPrice(filterArray),
        totalPriceBySize,
        totalCountBySize,
        totalPriceBySizeThin,
        totalCountBySizeThin,
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
                totalPrice25: getPizzaSizePrice(currentPizzaItems, 'Стандартная', 25),
                totalPrice30: getPizzaSizePrice(currentPizzaItems, 'Стандартная', 30),
                totalPrice35: getPizzaSizePrice(currentPizzaItems, 'Стандартная', 35),
            };

            const totalCountBySize = {
                totalCount25: getPizzaSizeCount(currentPizzaItems, 'Стандартная', 25),
                totalCount30: getPizzaSizeCount(currentPizzaItems, 'Стандартная', 30),
                totalCount35: getPizzaSizeCount(currentPizzaItems, 'Стандартная', 35),
            };


            const totalPriceBySizeThin = {
                totalPrice25: getPizzaSizePrice(currentPizzaItems, 'Тонкая', 25),
                totalPrice30: getPizzaSizePrice(currentPizzaItems, 'Тонкая', 30),
                totalPrice35: getPizzaSizePrice(currentPizzaItems, 'Тонкая', 35),
            };

            const totalCountBySizeThin = {
                totalCount25: getPizzaSizeCount(currentPizzaItems, 'Тонкая', 25),
                totalCount30: getPizzaSizeCount(currentPizzaItems, 'Тонкая', 30),
                totalCount35: getPizzaSizeCount(currentPizzaItems, 'Тонкая', 35),
            };


       const newItems = {
            ...state.totalItems,
            [action.payload.id]: {
                totalItems: currentPizzaItems,
                totalPrice: getTotalPrice(currentPizzaItems),
                totalPriceBySize,
                totalCountBySize,
                totalPriceBySizeThin,
                totalCountBySizeThin,
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
            totalPrice25: getPizzaSizePrice(currentPizzaItems, 'Стандартная', 25),
            totalPrice30: getPizzaSizePrice(currentPizzaItems, 'Стандартная', 30),
            totalPrice35: getPizzaSizePrice(currentPizzaItems, 'Стандартная', 35),
        };

        const totalCountBySize = {
            totalCount25: getPizzaSizeCount(currentPizzaItems, 'Стандартная', 25),
            totalCount30: getPizzaSizeCount(currentPizzaItems, 'Стандартная', 30),
            totalCount35: getPizzaSizeCount(currentPizzaItems, 'Стандартная', 35),
        };


        const totalPriceBySizeThin = {
            totalPrice25: getPizzaSizePrice(currentPizzaItems, 'Тонкая', 25),
            totalPrice30: getPizzaSizePrice(currentPizzaItems, 'Тонкая', 30),
            totalPrice35: getPizzaSizePrice(currentPizzaItems, 'Тонкая', 35),
        };

        const totalCountBySizeThin = {
            totalCount25: getPizzaSizeCount(currentPizzaItems, 'Тонкая', 25),
            totalCount30: getPizzaSizeCount(currentPizzaItems, 'Тонкая', 30),
            totalCount35: getPizzaSizeCount(currentPizzaItems, 'Тонкая', 35),
        };


        const newItems = {
            ...state.totalItems,
            [action.payload.id]: {
                totalItems: currentPizzaItems,
                totalPrice: getTotalPrice(currentPizzaItems),
                totalPriceBySize,
                totalCountBySize,
                totalPriceBySizeThin,
                totalCountBySizeThin,
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
            totalPrice25: getPizzaSizePrice(newObjItems, 'Стандартная', 25),
            totalPrice30: getPizzaSizePrice(newObjItems, 'Стандартная', 30),
            totalPrice35: getPizzaSizePrice(newObjItems, 'Стандартная', 35),
        };

        const totalCountBySize = {
            totalCount25: getPizzaSizeCount(newObjItems, 'Стандартная', 25),
            totalCount30: getPizzaSizeCount(newObjItems, 'Стандартная', 30),
            totalCount35: getPizzaSizeCount(newObjItems, 'Стандартная', 35),
        };


        const totalPriceBySizeThin = {
            totalPrice25: getPizzaSizePrice(newObjItems, 'Тонкая', 25),
            totalPrice30: getPizzaSizePrice(newObjItems, 'Тонкая', 30),
            totalPrice35: getPizzaSizePrice(newObjItems, 'Тонкая', 35),
        };

        const totalCountBySizeThin = {
            totalCount25: getPizzaSizeCount(newObjItems, 'Тонкая', 25),
            totalCount30: getPizzaSizeCount(newObjItems, 'Тонкая', 30),
            totalCount35: getPizzaSizeCount(newObjItems, 'Тонкая', 35),
        }

        const newItems = {
            ...state.totalItems,
            [action.payload.id]: {
                totalItems: newObjItems,
                totalPrice: getTotalPrice(newObjItems),
                totalPriceBySize,
                totalCountBySize,
                totalPriceBySizeThin,
                totalCountBySizeThin,
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
            totalPrice25: getPizzaSizePrice(newObjItems, 'Стандартная', 25),
            totalPrice30: getPizzaSizePrice(newObjItems, 'Стандартная', 30),
            totalPrice35: getPizzaSizePrice(newObjItems, 'Стандартная', 35),
        };

        const totalCountBySize = {
            totalCount25: getPizzaSizeCount(newObjItems, 'Стандартная', 25),
            totalCount30: getPizzaSizeCount(newObjItems, 'Стандартная', 30),
            totalCount35: getPizzaSizeCount(newObjItems, 'Стандартная', 35),
        };


        const totalPriceBySizeThin = {
            totalPrice25: getPizzaSizePrice(newObjItems, 'Тонкая', 25),
            totalPrice30: getPizzaSizePrice(newObjItems, 'Тонкая', 30),
            totalPrice35: getPizzaSizePrice(newObjItems, 'Тонкая', 35),
        };

        const totalCountBySizeThin = {
            totalCount25: getPizzaSizeCount(newObjItems, 'Тонкая', 25),
            totalCount30: getPizzaSizeCount(newObjItems, 'Тонкая', 30),
            totalCount35: getPizzaSizeCount(newObjItems, 'Тонкая', 35),
        };


        const newItems = {
            ...state.totalItems,
            [action.payload.id]: {
                totalItems: newObjItems,
                totalPrice: getTotalPrice(newObjItems),
                totalPriceBySize,
                totalCountBySize,
                totalPriceBySizeThin,
                totalCountBySizeThin,
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