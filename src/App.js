import React, {useEffect} from 'react';
import { Header } from './comp';
import { Home, Cart } from './routing';
import { Route } from 'react-router-dom';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPizza } from "./redux/action/pizza";


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('http://localhost:3004/database.json').then(({data}) => {
            dispatch(setPizza(data.pizzaList)); //push data to redux store
        });
    }, []);

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Route path="/" component={Home} exact/>
                <Route path="/cart" component={Cart} exact/>
            </div>
        </div>
    );
}

export default App;