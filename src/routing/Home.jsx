import React, {useCallback, useEffect} from 'react';
import { Categories, Sort, Pizza, PizzaContentLoader} from "../comp";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from '../redux/action/filters'
import {categories, sort} from '../constants/Constants'
import {getPizzas} from "../redux/action/pizza";


const Home = () => {
    const dispatch = useDispatch();

    const { pizzaArray, isLoaded } = useSelector( (state) => {
        return {
            pizzaArray: state.pizzaReducer.items, //take array of pizza  from redux store
            isLoaded: state.pizzaReducer.isLoaded
        };
    });

    useEffect(() => {
        if (pizzaArray.length === 0 ) dispatch(getPizzas());
    }, []);


    const onSelectCategory = useCallback((index) => {
        dispatch(setCategory(index))
    }, []);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    onClickItem={onSelectCategory}
                    items={categories} />
                <Sort
                    variables={sort}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoaded ? pizzaArray.map((obj) => (
                        <Pizza key={obj.id}
                               isLoading={true}
                               name={obj.name}
                               image={obj.imageUrl}
                               cost={obj.price}
                               sizes={obj.sizes}
                               types={obj.types}/>)
                    ) : Array(10).fill(<PizzaContentLoader />)
                };
            </div>
        </div>
    );
};

export default Home;