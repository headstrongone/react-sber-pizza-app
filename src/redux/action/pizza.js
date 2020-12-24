import axios from "axios";

export const setPizza = (items) => ({
    type: 'SET_PIZZA',
    payload: items,
});

//dispatch - redux middleware for working with async functions
export const getPizzas = () => (dispatch) => {
    axios.get('http://localhost:3000/pizzaList').then(({data}) => {
        dispatch(setPizza(data)); //push data to redux store
    });
};

