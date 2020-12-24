import { combineReducers } from 'redux';
import filtersReducer from './filters'
import pizzaReducer from './pizza'
import cartReducer from './cart'

const rootReducer = combineReducers({
    filtersReducer,
    pizzaReducer,
    cartReducer
});


export default rootReducer;
