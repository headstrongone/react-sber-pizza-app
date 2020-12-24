export const addToCart = (pizza) => ({
    type: 'ADD_TO_CART',
    payload: pizza,
});

export const deleteFromCart = (pizza) => ({
    type: 'DELETE_FROM_CART',
    payload: pizza,
});