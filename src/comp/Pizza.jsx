import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const Pizza = ({ name, cost, image, types, sizes }) => {
    const [size, setSize] = useState(0);
    const [type, setType] = useState(0);
    const [price, setPrice] = useState(0);

    const onSelectSize = (index) => {
        setSize(index);
        setPrice(index);
    }

    const onSelectType = (index) => {
        setType(index);
    }

    return (
        <div className="pizza-block">
            <img
                className="pizza-block__image"
                src={image}
                alt="Pizza"
            />
            <h4 className="pizza-block__title">{name}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {types &&
                    types.map((item, index) =>  (
                        <li
                            onClick={() => onSelectType(index)}
                            className={type === index ? 'active' : ''}
                            key={`${item}_${index}`}>
                            {item}
                        </li>
                    ))}
                </ul>
                <ul>
                    {sizes &&
                    sizes.map((item, index) =>  (
                        <li
                            onClick={() => onSelectSize(index)}
                            className={size === index ? 'active' : ''}
                            key={`${item}_${index}`}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">{`от ${cost[price]} Р`}</div>
                <div className="button button--outline button--add">
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    <i>2</i>
                </div>
            </div>
        </div>
    );
};

Pizza.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    cost: PropTypes.array.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    sizes: PropTypes.arrayOf(PropTypes.number).isRequired
};
Pizza.defaultProps = {
    name: 'testing',
    image: '',
    cost: [999, 999, 999],
    types: ['test', 'test'],
    sizes: [1, 2, 3]
}
export default Pizza;