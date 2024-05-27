import React, { useState } from "react";
import styles from "./VendorAuth.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { appAuth, appFirestore } from "../../config";
import { doc, setDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

const VendorRegisterForm = ({ toggleForm }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsConditions, setTermsConditions] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(appAuth, email, password)
      .then(async (user) => {
        await setDoc(
          doc(appFirestore, "VENDOR", email),
          {
            name: username,
            email: email,
          },
          { merge: true }
        );
        navigate("/dashboard", {
          state: {
            name: user.name,
            email: user.email,
          },
        });
      })
      .catch((error) => {
        setErrorMessage("Unable to sign in... Try again later");
      });
  };

  return (
    <div className={styles.vendorAuthBox}>
      <h2>Vendor Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.forlabel}>
            Name
          </label>
          <input
            className={`${styles.forinput} !bg-white`}
            type="text"
            id="name"
            name="name"
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

export default VendorRegisterForm;
