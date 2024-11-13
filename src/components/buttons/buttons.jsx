import React from 'react';

const Button = (props) => {
    const { text = '', className = '', onClick, disabled = false } = props;
    return (
        <button className={className} onClick={onClick} disabled={disabled}>
            <p>{text}</p>
        </button>
    );
}

export { Button };