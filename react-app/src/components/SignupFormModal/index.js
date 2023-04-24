import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
			<h1 className="signupHeader">Sign Up</h1>
			<form onSubmit={handleSubmit} className="signupForm">
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					{/* Email */}
					<div className="emailParent">
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						className="signupEmail"
						required
					/>
					</div>
				</label>
				<label>
					{/* Username */}
					<div className="usernameParent">
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Username"
						className="signupUsername"
						required
					/>
					</div>
				</label>
				<label>
					{/* Password */}
					<div className="signupPasswordParent">
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						className="signupPassword"
						required
					/>
					</div>
				</label>
				<label>
					{/* Confirm Password */}
					<div className="signupConfirmPasswordParent">
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder="Confirm Password"
						className="signupConfirmPassword"
						required
					/>
					</div>
				</label>
				<div className="signUpButtonParent">
				<button type="submit" className="signUpButton">Sign Up</button>
				</div>
			</form>
		</>
	);
}

export default SignupFormModal;