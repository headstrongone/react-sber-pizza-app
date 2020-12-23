import { combineReducers } from 'redux';
import filtersReducer from './filters'
import pizzaReducer from './pizza'

const rootReducer = combineReducers({
    filtersReducer,
    pizzaReducer
});


export default rootReducer;
