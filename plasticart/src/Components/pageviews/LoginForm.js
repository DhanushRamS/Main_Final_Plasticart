import React, { useState } from "react";
import IonIcon from "./Icon";
import RegisterForm from "./RegisterForm";
import Wrapper from "./Wrapper"; // Import the Wrapper component
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { appAuth } from "../../config";
// import "./style.css";

const LoginForm = ({ onClose }) => {
  // Pass onClose prop
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(appAuth, email, password)
      .then((user) => {
        localStorage.setItem("email", user.email);
        localStorage.setItem("username", user.name);
        navigate("/scanner", {
          state: {
            name: user.name,
            email: user.email,
          },
        });
      })
      .catch((error) => {
        setError("Unable to sign in. Please try again later...");
      });
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

  };

  return (
    <Wrapper isOpen={true} onClose={onClose}>
      {/* Use Wrapper component */}
      {!showRegisterForm ? (
        <div>
          <h2>Login</h2>
          <form id="loginForm" onSubmit={handleLogin}>
            {/* Login form inputs */}
            <div className="input-box">
              <span className="icon">
                <IonIcon icon="mail-sharp"></IonIcon>
              </span>
              <input
                id="email-login"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email-login">Email</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <IonIcon icon="lock-closed"></IonIcon>
              </span>
              <input
                id="passwd-login"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="passwd-login">Password</label>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <div id="errorContainer">{error}</div>
          </form>
          <div className="login-register">
            <p>
              Don't have an account?
              <a href="#" onClick={() => setShowRegisterForm(true)}>
                Register
              </a>
            </p>
          </div>
        </div>
      ) : (
        <RegisterForm toggleLoginForm={() => setShowRegisterForm(false)} />
      )}
    </Wrapper>
  );
};

export default LoginForm;
