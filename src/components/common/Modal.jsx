// src/components/common/Modal.jsx

import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Button from './Button';

// SVG Icon for X
const XIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      {/* Backdrop with transition */}
      <div
        className="fixed inset-0 bg-black bg-opacity-60 z-50 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content with transitions and better shadow */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface rounded-2xl shadow-xl z-50 w-full max-w-md p-8 transition-all duration-300 ease-out transform scale-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-start justify-between border-b border-border-light pb-4 mb-4">
          <h2 id="modal-title" className="text-2xl font-extrabold text-heading">
            {title}
          </h2>
          <Button variant="ghost" onClick={onClose} className="p-2 rounded-full hover:bg-primary-lightest">
            <XIcon size={24} className="text-body" />
          </Button>
        </div>
        <div className="mt-4 text-body">{children}</div>
      </div>
    </>,
    document.getElementById('modal-root')
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
