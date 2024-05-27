import React, { useState } from "react";
import styles from "./AdminAuth.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { appAuth, appFirestore } from "../../config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AdminRegisterForm = ({ toggleForm }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      createUserWithEmailAndPassword(appAuth, email, password)
        .then(async (user) => {
          await setDoc(
            doc(appFirestore, "ADMIN", email),
            {
              name: username,
              email: email,
            },
            { merge: true }
          );
          navigate("/admin-dashboard", {
            state: {
              name: user.name,
              email: user.email,
            },
          });
        })
        .catch((error) => {
          setErrorMessage("Unable to sign in... Try again later");
        });
    } catch (error) {
      console.error("Error submitting form data:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.adminAuthBox}>
      <h2>Admin Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.forlabel}>
            Username
          </label>
          <input
            className={styles.forinput}
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
          Register
        </button>
      </form>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      <p className={styles.toggleText}>
        Already have an account? <span onClick={toggleForm}>Login here</span>
      </p>
    </div>
  );
};

export default AdminRegisterForm;
