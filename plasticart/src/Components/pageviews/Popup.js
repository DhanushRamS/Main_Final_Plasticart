// Popup.js
import React from "react";
// import "./style.css";

const Popup = ({ isOpen, onClose, children }) => {
  return isOpen ? (
    <div className="wrapper active-popup">
      {" "}
      {/* Add active-popup class if isOpen is true */}
      <div className="popup-inner">
        <button className="icon-close" onClick={onClose}>
          {" "}
          {/* Use icon-close for closing */}
          &times;
        </button>
        {children}
      </div>
    </div>
  ) : null;
};

export default Popup;
