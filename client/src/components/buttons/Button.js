import React from 'react';

const Button = ({ outline, className, children, onClick }) => {
  return (
    <div className={`button ${outline ? 'button_outline' : ''} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

export default Button;