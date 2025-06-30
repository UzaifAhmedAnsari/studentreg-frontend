// src/components/common/Input.jsx

import PropTypes from 'prop-types';

const Input = ({ id, label, type = 'text', placeholder, value, onChange, required = false, className = '' }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-heading mb-1.5">
        {label}
      </label>
      <div className="mt-1">
        <input
          type={type}
          name={id}
          id={id}
          className={`block w-full rounded-lg border-border-light shadow-soft focus:border-primary focus:ring-primary sm:text-base px-4 py-2.5 transition-all duration-200 placeholder-body/70 text-heading ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;
