import React, { useState } from "react";
import LoginForm from "./LoginForm";
import IonIcon from "./Icon";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { appAuth, appFirestore } from "../../config";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
// import "./style.css";

const RegisterForm = ({ toggleLoginForm }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsConditions, setTermsConditions] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    if (termsConditions) {
      createUserWithEmailAndPassword(appAuth, email, password)
        .then(async (user) => {
          await setDoc(
            doc(appFirestore, "USER", email),
            {
              name: username,
              email: email,
              points: 0,
            },
            { merge: true }
          );
          navigate("/scanner", {
            state: {
              name: user.name,
              email: user.email,
            },
          });
        })
        .catch((error) => {
          setRegistrationError("Unable to sign in... Try again later");
        });
    } else {
      setRegistrationError("You have to agree to terms and conditions");
    }
  };

  return (
    <div>
      {!showLoginForm ? (
        <div className="py-6">
          <h2>Registration</h2>
          <form id="registrationForm" onSubmit={handleRegisterSubmit}>
            {/* Registration form inputs */}
            <div className="input-box">
              <span className="icon">
                <IonIcon icon="person"></IonIcon>
              </span>
              <input
                id="uname"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="uname">Username</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <IonIcon icon="mail-sharp"></IonIcon>
              </span>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <IonIcon icon="lock-closed-sharp"></IonIcon>
              </span>
              <input
                id="passwd"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="passwd">Password</label>
            </div>
            <label>
              <input
                type="checkbox"
                value={termsConditions}
                required
                onChange={(e) => setTermsConditions(e.target.value)}
              />{" "}
              I agree to the terms & conditions
            </label>
            <button type="submit" className="btn">
              Register
            </button>
          </form>
          {registrationError && <p className="error">{registrationError}</p>}
          {registrationSuccess && (
            <p className="error">{registrationSuccess}</p>
          )}
          {!showLoginForm && (
            <div className="login-register">
              <p>
                Already have an account?
                <a href="#" onClick={() => toggleLoginForm()}>
                  Login
                </a>
              </p>
            </div>
          )}
        </div>
      ) : (
        <LoginForm toggleLoginForm={() => setShowLoginForm(false)} />
      )}
    </div>
  );
};

export default RegisterForm;
