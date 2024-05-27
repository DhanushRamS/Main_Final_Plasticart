// IonIcon.js
import React from "react";
import PropTypes from "prop-types";

const IonIcon = ({ icon, size, color }) => {
  return (
    <ion-icon icon={icon} style={{ fontSize: size, color: color }}></ion-icon>
  );
};

IonIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
};

IonIcon.defaultProps = {
  size: "24px",
  color: "inherit",
};

export default IonIcon;
