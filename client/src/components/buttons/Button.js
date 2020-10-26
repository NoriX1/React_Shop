import React from 'react';
import PropTypes from 'prop-types';

const Button = React.memo(function Button({ outline, className, children, onClick }) {
  return (
    <div className={`button ${outline ? 'button_outline' : ''} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
});

Button.propTypes = {
  outline: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onClick: PropTypes.func
}

Button.defaultProps = {
  outline: false,
  children: []
}

export default Button;