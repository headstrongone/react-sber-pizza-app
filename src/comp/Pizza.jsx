import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Button from "./Button";

const Pizza = ({ id, name, cost, image, types, sizes, addPizzaToCard, deletePizzaFromCard, totalAdded}) => {
    const [size, setSize] = useState(0);
    const [type, setType] = useState(0);
    const [price, setPrice] = useState(0);
    const [indexOfImage, setIndexOfImage] = useState(0);

    const onSelectSize = (index) => {
        setSize(index);
        setPrice(index);
    }


    const onSelectType = (index) => {
        setType(index);
        setIndexOfImage(index);
    }

    const handleAddPizza = () => {
        const _price = cost[price];
        const _type = types[type];
        const _size = sizes[size];
        const obj = {
          id,
          name,
          image,
          price: _price,
            size: _size,
            type: _type
        };
        addPizzaToCard(obj)
    };

    const handleDeletePizza = () => {
        const _price = cost[price];
        const _type = types[type];
        const _size = sizes[size];
        const obj = {
            id,
            name,
            image,
            price: _price,
            size: _size,
            type: _type
        };
        deletePizzaFromCard(obj)
    };

    return (
        <div className="pizza-block">
            <img
                className="pizza-block__image"
                src={image[indexOfImage]}
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
                            {`${item} см`}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">{`${cost[price]} ₽`}</div>
                <div className="pizza-block__buttons">
                    <Button
                        onClick={handleAddPizza}
                        className='button--add'
                        outline>
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
                        {totalAdded ? <i>{totalAdded}</i> : ''}
                    </Button>
                    <Button
                        onClick={handleDeletePizza}
                        className='button--add'
                        outline>
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017
                             -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998
                             4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                            />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    );
};

Pizza.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.arrayOf(PropTypes.string).isRequired,
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