export const addToCart = (pizza) => ({
    type: 'ADD_TO_CART',
    payload: pizza,
});

export const deleteFromCart = (pizza) => ({
    type: 'DELETE_FROM_CART',
    payload: pizza,
});

export const removeCartItem = (element) => ({
    type: 'REMOVE_CART_ITEM',
    payload: element,
});

export const onPlusCart = (element) => ({
    type: 'ON_PLUS_CART',
    payload: element,
});
export const onMinusCart = (element) => ({
    type: 'ON_MINUS_CART',
    payload: element,
});

export const clearCart = () => ({
    type: 'CLEAR_CART',
});