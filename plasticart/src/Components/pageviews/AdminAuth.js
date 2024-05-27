import React, { useState } from "react";
import AdminLoginForm from "./AdminLoginForm";
import AdminRegisterForm from "./AdminRegisterForm";
import { useNavigate } from "react-router-dom";
import styles from "./AdminAuth.module.css";

const AdminAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/admin-dashboard");
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={styles.adminAuthContainer}>
      {isLogin ? (
        <AdminLoginForm toggleForm={toggleForm} onLogin={handleLogin} />
      ) : (
        <AdminRegisterForm toggleForm={toggleForm} />
      )}
    </div>
  );
};

export default AdminAuth;
