import React from 'react';
import { Header } from './comp';
import { Home, Cart } from './routing';
import { Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
    const [state, setState] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3004/database.json')
            .then((response) => response.json())
            .then((json) => {
                setState(json.state);
            });
    }, []);

    console.log(state);

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
