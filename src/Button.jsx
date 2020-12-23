import React from 'react';
import classNames from 'classnames';

function Button(props) {
    const {className, outline, children, onClick} = props;
    console.log(className, outline, children, onClick)
    return (
        <button
            onClick={onClick}
            className={classNames('button', className, {
                'button--outline': outline,
            })}>
            {children}
        </button>
    );
}

export default Button;