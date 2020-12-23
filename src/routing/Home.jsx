import React from 'react';
import {Categories, Sort, Pizza} from "../comp";

const Home = (props) => {
    return (
        <div className="container">
            <div className="content__top">
                <Categories items={[
                    'Все',
                    'Мясные',
                    'Вегетерианские',
                    'Гриль',
                    'Острые',
                    'Закрытые'
                ]} />
                <Sort variables={[
                    'популярности',
                    'цене',
                    'алфавиту'
                ]} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    props.values.map((obj) => (
                        <Pizza key={obj.id} name={obj.name} image={obj.imageUrl} cost={obj.price} sizes={obj.sizes} types={obj.types}/>))
                }
            </div>
        </div>
    );
};

export default Home;