import React, {useCallback} from 'react';
import { Categories, Sort, Pizza } from "../comp";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from '../redux/action/filters'
import {categories, sort} from '../constants/Constants'


const Home = () => {
    const dispatch = useDispatch();

    const { pizzaArray } = useSelector( (state) => {
        return {
            pizzaArray: state.pizzaReducer.items, //take array of pizza  from redux store
        };
    });

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
                    pizzaArray.map((obj) => (
                        <Pizza key={obj.id} name={obj.name} image={obj.imageUrl} cost={obj.price} sizes={obj.sizes} types={obj.types}/>))
                }
            </div>
        </div>
    );
};

export default Home;