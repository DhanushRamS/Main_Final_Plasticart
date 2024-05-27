import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Wrapper from "./Wrapper";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import AboutUs from "./AboutUs";
import Popup from "./Popup";
import Icon from "./Icon";
import "./style.css";

const Home = () => {
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false);
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(false);
  const [isWrapperOpen, setIsWrapperOpen] = useState(false);

  const openLoginForm = () => {
    setIsLoginFormOpen(true);
    setIsWrapperOpen(true);
  };

  const closeLoginForm = () => {
    setIsLoginFormOpen(false);
  };

  const openRegisterForm = () => {
    setIsRegisterFormOpen(true);
    setIsWrapperOpen(true);
  };

  const closeRegisterForm = () => {
    setIsRegisterFormOpen(false);
  };

  const openAboutUs = () => {
    setIsAboutUsOpen(true);
  };

  const closeAboutUs = () => {
    setIsAboutUsOpen(false);
  };

  const handleCloseWrapper = () => {
    setIsWrapperOpen(false);
  };

  return (
    <div>
      <Header
        openLoginForm={openLoginForm}
        openRegisterForm={openRegisterForm}
        openAboutUs={openAboutUs}
      />
      <Main />
      <Popup />
      <Wrapper
        isOpen={isWrapperOpen}
        onClose={() => {
          handleCloseWrapper();
          closeLoginForm();
          closeRegisterForm();
        }}
      >
        {isLoginFormOpen && <LoginForm onClose={closeLoginForm} />}
        {isRegisterFormOpen && <RegisterForm onClose={closeRegisterForm} />}
      </Wrapper>
      <AboutUs isOpen={isAboutUsOpen} onClose={closeAboutUs} />
    </div>
  );
};

export default Home;
