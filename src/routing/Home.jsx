import React, {useCallback, useEffect} from 'react';
import { Categories, Sort, Pizza, PizzaContentLoader} from "../comp";
import { useDispatch, useSelector } from "react-redux";
import {setCategory, setSortBy} from '../redux/action/filters'
import {categories, sort} from '../constants/Constants'
import {getPizzas} from "../redux/action/pizza";


const Home = () => {
    const dispatch = useDispatch();

    const { pizzaArray, isLoaded, filters } = useSelector( (state) => {
        return {
            pizzaArray: state.pizzaReducer.items, //take array of pizza  from redux store
            isLoaded: state.pizzaReducer.isLoaded,
            filters: state.filtersReducer
        };
    });

    useEffect(() => {
        dispatch(getPizzas(filters.category, filters.sortBy));
    }, [filters.category, filters.sortBy]);


    const onSelectCategory = useCallback((index) => {
        dispatch(setCategory(index))
    }, []);

    const onSelectSortType= useCallback((type) => {
        dispatch(setSortBy(type))
    }, []);


    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategoryIndex={filters.category}
                    onClickItem={onSelectCategory}
                    items={categories} />
                <Sort
                    activeSortType={filters.sortBy}
                    variables={sort}
                    onClickSortType={onSelectSortType}
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
                    ) : Array(10).fill(0).map((el, key) => <PizzaContentLoader key={key}/>)
                }
            </div>
        </div>
    );
};

export default Home;