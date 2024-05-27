import React from "react";
import styles from "./Start.module.css";

const Start = () => {
  const handleLoginUser = () => {
    window.location.href = "http://localhost:3000/Userhome";
  };

  const handleLoginVendor = () => {
    window.location.href = "http://localhost:3000/vendor-auth";
  };

  const handleLoginAdmin = () => {
    window.location.href = "http://localhost:3000/admin-auth";
  };

  return (
    <div className={`h-screen flex flex-col justify-center items-center`}>
      <div className={styles.wel}>
        <h1>Welcome to PlastiCart</h1>
        <p>Your one-stop solution for recycling</p>
      </div>
      <ul className={styles.startul}>
        <li className={styles.startli}>
          <button
            className={styles.startbtnLoginpopup}
            onClick={handleLoginUser}
          >
            Login as User
          </button>
        </li>
        <li className={styles.startli}>
          <button
            className={styles.startbtnLoginpopup}
            onClick={handleLoginVendor}
          >
            Login as Vendor
          </button>
        </li>
        <li className={styles.startli}>
          <button
            className={styles.startbtnLoginpopup}
            onClick={handleLoginAdmin}
          >
            Login as Admin
          </button>
        </li>
      </ul>
      <div className={styles.bgShape1}></div>
      <div className={styles.bgShape2}></div>
      <div className={styles.bgShape3}></div>
    </div>
  );
};

export default Start;
