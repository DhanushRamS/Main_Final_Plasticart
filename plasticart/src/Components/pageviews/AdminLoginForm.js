import React, { useState } from "react";
import styles from "./AdminAuth.module.css";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { appAuth } from "../../config";

const AdminLoginForm = ({ toggleForm, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleLoginSuccess = (email, token) => {
    onLogin(email); // Pass email to parent component
    localStorage.setItem("token", token); // Store token in localStorage
    navigate("/admin-dashboard"); // Redirect to admin page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      signInWithEmailAndPassword(appAuth, email, password)
        .then(async (user) => {
          console.log(user);
          setSuccessMessage("Login successful!");
          setErrorMessage("");
          navigate("/admin-dashboard", {
            state: {
              email: email,
            },
          });
        })
        .catch((error) => {
          setErrorMessage("Unable to sign in. Please try again later...");
        });
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  return (
    <div className={styles.adminAuthBox}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.forlabel}>
            Email
          </label>
          <input
            className={styles.forinput}
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.forlabel}>
            Password
          </label>
          <input
            className={styles.forinput}
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.authButton}>
          Login
        </button>
      </form>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      <p className={styles.toggleText}>
        Don't have an account? <span onClick={toggleForm}>Register here</span>
      </p>
    </div>
  );
};

export default AdminLoginForm;
