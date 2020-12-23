import React from 'react';
import { Header } from './comp';
import { Home, Cart } from './routing';
import { Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";

function App() {
    const [state, setState] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3004/database.json').then(({ data } ) => {
            setState(data.pizzaList)
        });

        // fetch('http://localhost:3004/database.json')
        //     .then((response) => response.json())
        //     .then((json) => {
        //         setState(json.pizzaList);
        //     });

    }, []);

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Route path="/" render={() => <Home values={state}/>} exact/>
                <Route path="/cart" component={Cart} exact/>
            </div>
        </div>
    );
}

export default App;
