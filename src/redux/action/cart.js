export const addToCart = (pizza) => ({
    type: 'ADD_TO_CART',
    payload: pizza,
});

export const deleteFromCart = (pizza) => ({
    type: 'DELETE_FROM_CART',
    payload: pizza,
});

export const removeCartItem = (id) => ({
    type: 'REMOVE_CART_ITEM',
    payload: id,
});

export const onPlusCart = (id) => ({
    type: 'ON_PLUS_CART',
    payload: id,
});
export const onMinusCart = (id) => ({
    type: 'ON_MINUS_CART',
    payload: id,
});

export const clearCart = () => ({
    type: 'CLEAR_CART',
});