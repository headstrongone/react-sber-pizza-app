import React from 'react';
import { Header} from './comp';
import { Home, Cart } from './routing';
import { Route } from 'react-router-dom';

function App() {
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
