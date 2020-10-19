import React from 'react';

const Button = ({ outline, className, children, onClick }) => {
  return (
    <a href="/cart.html" className={`button ${outline ? 'button-outline' : ''} ${className}`}>
      {children}
    </a>
  );
}

export default Button;