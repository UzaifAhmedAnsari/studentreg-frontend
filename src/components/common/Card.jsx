// src/components/common/Card.jsx

import PropTypes from 'prop-types';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-surface rounded-2xl shadow-medium hover:shadow-strong transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
