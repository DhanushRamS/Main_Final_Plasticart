//Header.js
import React, { useState } from "react";
// import "./style.css";
import LoginForm from "./LoginForm";
import styles from "./Vendor.module.css";

const Header = () => {
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

  const openLoginForm = () => {
    setIsLoginFormOpen(true);
  };

  const closeLoginForm = () => {
    setIsLoginFormOpen(false);
  };

  return (
    <>
      <header
        className={`${styles.header} flex justify-between items-center w-full !p-3`}
      >
        <h2 className={`${styles.logo} font-bold text-3xl`}>PlastiCart</h2>
        <nav className="">
          <ul className={styles.navigation}>
            <li className="hidden lg:block">
              <a href="#">Home</a>
            </li>
            <li className="hidden lg:block">
              <a href="#about">About</a>
            </li>
            <li className="hidden lg:block mr-4">
              <a href="#">Contact Us</a>
            </li>
            <li>
              <button
                className="bg-blue-500 p-3 text-white hover:bg-blue-700"
                onClick={openLoginForm}
              >
                Login
              </button>
            </li>
          </ul>
        </nav>
      </header>
      {isLoginFormOpen && <LoginForm onClose={closeLoginForm} />}
    </>
  );
};

export default Header;
