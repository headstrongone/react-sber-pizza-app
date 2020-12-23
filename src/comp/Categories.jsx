import React from 'react';

const Categories = (props) => {
    const {items}  = props;
    return (
        <div className="categories">
            <ul>
                <li className='active'>Все</li>
                {items.map((item, index) => (
                    <li key={`${item}_${index}`}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;