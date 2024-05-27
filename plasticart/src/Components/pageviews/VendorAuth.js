import React, { useState } from "react";
import VendorLoginForm from "./VendorLoginForm";
import VendorRegisterForm from "./VendorRegisterForm";
import styles from "./VendorAuth.module.css";

const VendorAuth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={styles.vendorAuthContainer}>
      {isLogin ? (
        <VendorLoginForm toggleForm={toggleForm} onLogin={onLogin} />
      ) : (
        <VendorRegisterForm toggleForm={toggleForm} />
      )}
    </div>
  );
};

export default VendorAuth;
