import axios from "axios";

//dispatch - redux middleware for working with async functions
export const getPizzas = () => (dispatch) => {
    // dispatch(setLoaded(false));
    dispatch({
        type: 'SET_LOADED',
        payload: false
    });
    axios.get('http://localhost:3000/pizzaList').then(({data}) => {
        dispatch(setPizza(data)); //push data to redux store
    });
};


export const setLoaded = (payload) => ({
   type: 'SET_LOADED',
   payload,
});


export const setPizza = (items) => ({
    type: 'SET_PIZZA',
    payload: items,
});

