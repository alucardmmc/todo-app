import React from 'react';

import './Button.css';

const classes = {
  button: 'button',
};

interface Props {
  title: string;
  type?: 'button' | 'submit' | 'reset';
  color?: string;
  disabled?: boolean;
  handleClick?: any;
}

const Button: React.FC<Props> = ({
  title,
  type = 'button',
  color = 'blue',
  disabled = false,
  handleClick
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${classes.button} btn--${color}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
