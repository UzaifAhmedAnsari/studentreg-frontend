// src/components/common/Button.jsx

import PropTypes from 'prop-types';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false }) => {
  const baseStyles = 'px-8 py-3.5 font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed text-base relative overflow-hidden transform active:scale-95';
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary shadow-medium hover:shadow-strong transform hover:-translate-y-1',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary shadow-medium hover:shadow-strong transform hover:-translate-y-1',
    danger: 'bg-accent text-white hover:bg-red-600 focus:ring-accent shadow-medium hover:shadow-strong transform hover:-translate-y-1',
    ghost: 'bg-transparent text-body hover:bg-primary-lightest hover:text-primary focus:ring-primary shadow-none',
    outline: 'bg-transparent text-primary border border-primary hover:bg-primary hover:text-white focus:ring-primary shadow-medium',
    'outline-light': 'bg-transparent text-white border border-white hover:bg-white hover:text-primary focus:ring-white shadow-medium',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost', 'outline', 'outline-light']),
    className: PropTypes.string,
    disabled: PropTypes.bool,
};

export default Button;
