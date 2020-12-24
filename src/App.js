import React, {useEffect} from 'react';
import { Header } from './comp';
import { Home, Cart } from './routing';
import { Route } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { getPizzas } from "./redux/action/pizza";


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPizzas());
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