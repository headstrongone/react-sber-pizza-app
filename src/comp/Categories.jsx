import React, {memo} from 'react';
import PropTypes from "prop-types";

const Categories = memo(function Categories({activeCategoryIndex, items, onClickItem}){
    return (
        <div className="categories">
            <ul>
                {items.map((item, index) => (
                    <li
                        className={ activeCategoryIndex === index ? 'active' : '' }
                        onClick={ () => onClickItem(index) }
                        key={ ` ${item}_${index}`}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
});

Categories.propTypes = {
    activeCategoryIndex: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClickItem: PropTypes.func
};

Categories.defaultProps = {
    activeCategoryIndex: 0,
    items: []
};

export default Categories;