import React from 'react';
import { Header } from './comp';
import { Home, Cart } from './routing';
import { Route } from 'react-router-dom';
import axios from "axios";
import { connect } from 'react-redux';
import { setPizza } from "./redux/action/pizza";

class App extends React.Component {

    componentDidMount() {
        axios.get('http://localhost:3004/database.json').then(({ data } ) => {
            this.props.savePizza(data.pizzaList);
        });
    }

    render() {
        return (
            <div className="wrapper">
                <Header />
                <div className="content">
                    <Route path="/" render={() => <Home values={this.props.items}/>} exact/>
                    <Route path="/cart" component={Cart} exact/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.pizzaReducer.items
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        savePizza: (items) => dispatch(setPizza(items)),
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
