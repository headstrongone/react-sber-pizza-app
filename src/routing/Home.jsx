import React from 'react';
import {Categories, Sort, Pizza} from "../comp";

const Home = () => {
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
             <Pizza />
             <Pizza />
             <Pizza />
             <Pizza />
             <Pizza />
             <Pizza />
             <Pizza />
            </div>
        </div>
    );
};

export default Home;