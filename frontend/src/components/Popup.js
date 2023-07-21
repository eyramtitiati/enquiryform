import React from 'react';
import './Popup.css';

const Popup = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Popup;
