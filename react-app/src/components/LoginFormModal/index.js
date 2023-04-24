import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };
  const handleDemoClick = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  return (
    <>
      <h1 className="loginHeader">Log In</h1>
      <form onSubmit={handleSubmit} className="loginForm">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="emailInput">
        <label>
          {/* Email */}
          <div className="emailParent">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="email"
          />
          </div>
        </label>
        </div>
        <label>
          {/* Password */}
          <div className="passwordParent">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="password"
            required
          />
          </div>
        </label>
        <div className="loginButtonParent">
        <button type="submit" className="loginButton">Log In</button>
        </div>
        <div className="demoButtonParent">
        <button onClick={handleDemoClick} className="demoButton">Demo</button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
