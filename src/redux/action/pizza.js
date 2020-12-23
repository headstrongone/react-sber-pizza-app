const setPizza= (items) => ({
    type: 'SET_PIZZA',
    payload: items,
});


const deletePizza = (items) => ({
    type: 'DELETE_PIZZA',
    payload: items,
});