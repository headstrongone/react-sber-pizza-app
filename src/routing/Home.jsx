import React, {useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {categories, sort} from '../constants/Constants'
import { Categories, Sort, Pizza, PizzaContentLoader} from "../comp";
import { getPizzas } from "../redux/action/pizza";
import { addToCart, deleteFromCart }from '../redux/action/cart.js';
import {setCategory, setSortBy} from '../redux/action/filters'


const Home = () => {
    const dispatch = useDispatch();

    const { pizzaArray, isLoaded, filters, cartItems } = useSelector( (state) => {
        return {
            pizzaArray: state.pizzaReducer.items, //take array of pizza  from redux store
            isLoaded: state.pizzaReducer.isLoaded,
            cartItems: state.cartReducer.totalItems,
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

    const onAddPizzaToCard = useCallback((pizza) => {
        dispatch(addToCart(pizza))
    }, []);

    const onPizzaDeleteFromCard = useCallback((pizza) => {
        dispatch(deleteFromCart(pizza));
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
            <div className="content__items">
                {
                    isLoaded ? pizzaArray.map((obj) => (
                        <Pizza key={obj.id}
                               id={obj.id}
                               name={obj.name}
                               image={obj.imageUrl}
                               cost={obj.price}
                               sizes={obj.sizes}
                               types={obj.types}
                               addPizzaToCard={onAddPizzaToCard}
                               deletePizzaFromCard={onPizzaDeleteFromCard}
                               totalAdded={cartItems[obj.id] ? cartItems[obj.id].totalItems.length : ''}
                        />)
                    ) : Array(10).fill(0).map((el, key) => <PizzaContentLoader key={key}/>)
                }
            </div>
        </div>
    );
};

export default Home;