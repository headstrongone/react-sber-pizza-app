import {createStore, compose, applyMiddleware} from "redux";
import rootReducer from "./reducers";
import ReduxThunk from 'redux-thunk';

//Используя библиотеку redux-thunk, добавляем redux middleware для
//работы с ассинхронной функцией getPizza в /action/pizza.js

const composeEnhancer =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(ReduxThunk))
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;