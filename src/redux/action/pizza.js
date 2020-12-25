import axios from "axios";

//dispatch - redux middleware for working with async functions
export const getPizzas = (category, sortBy) => (dispatch) => {
    dispatch(setLoaded(false));
    axios.get(`/pizzaList?${category ?
        `category=${category}` : ``}&_sort=${sortBy}&_order=asc`).then(({data}) => {
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

