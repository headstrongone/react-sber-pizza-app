import React, {useState} from 'react';
function Categories({items}){
    const [state, setState] = useState(0);

    const onSelectItem = (index) => {
        setState(index);
    }
    return (
        <div className="categories">
            <ul>
                {items.map((item, index) => (
                    <li
                        className={ state === index ? 'active' : '' }
                        onClick={ () => onSelectItem(index) }
                        key={ ` ${item}_${index}`}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;