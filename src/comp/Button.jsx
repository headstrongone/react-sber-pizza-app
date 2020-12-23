import React from 'react';
import classNames from 'classnames';

function Button(props) {
    const {className, outline, children, onClick} = props;
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