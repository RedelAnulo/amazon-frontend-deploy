import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import classes from "./SignUp.module.css";
import { auth } from "../../Utility/Firebase";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";
function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState({
		signIn: false,
		signUP: false,
	});

	const [{ user }, dispatch] = useContext(DataContext);
	const navigate = useNavigate();
	const navStateData = useLocation();
	console.log(navStateData);
	// console.log(user);

	const authHandler = async (e) => {
		e.preventDefault();
		console.log(e.target.name);
		if (e.target.name == "signin") {
			// firbase auth
			setLoading({ ...loading, signIn: true });
			signInWithEmailAndPassword(auth, email, password)
				.then((userInfo) => {
					dispatch({
						type: Type.SET_USER,
						user: userInfo.user,
					});
					setLoading({ ...loading, signIn: false });
					navigate(navStateData?.state?.redirect || "/");
				})
				.catch((err) => {
					setError(err.message);
					setLoading({ ...loading, signIn: false });
				});
		} else {
			setLoading({ ...loading, signUP: true });
			createUserWithEmailAndPassword(auth, email, password)
				.then((userInfo) => {
					dispatch({
						type: Type.SET_USER,
						user: userInfo.user,
					});
					setLoading({ ...loading, signUP: false });
					navigate(navStateData?.state?.redirect || "/");
				})
				.catch((err) => {
					setError(err.message);
					setLoading({ ...loading, signUP: false });
				});
		}
	};

	// console.log(password, email);

	return (
		<section className={classes.login}>
			{/* Logo     */}
			<Link to={"/"}>
				<img
					src="https://pngimg.com/uploads/amazon/amazon_PNG7.png"
					alt="Logo Of Sign in/Up Page"
				/>
			</Link>
			{/* Form */}

			<div className={classes.login__container}>
				<h1>Sign In</h1>
				{
					navStateData?.state?.msg && (
						<small
						style={{
							padding:"5px",
							textAlign:"center",
							color:"red",
							fontWeight:"bold"
						}}
						>{navStateData?.state?.msg}</small>
					)
				}
				<form action="">
					<div>
						<label htmlFor="email">Email</label>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							id="email"
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							id="password"
						/>
					</div>
					<button
						name="signin"
						type="submit"
						onClick={authHandler}
						className={classes.login__signInButton}
					>
						{loading.signIn ? (
							<ClipLoader color="#000" size={15}></ClipLoader>
						) : (
							"Sign In"
						)}
					</button>
				</form>
				{/* Agreement */}
				<p>
					By signing-in you agree to the AMAZON FAKE CLONE conditions of Use &
					sale. Please see our privacy Notice, our cookies Notice and our
					Interest-Based Ads Notice.
				</p>
				{/* Create account btn */}
				<button
					name="signUp"
					type="submit"
					onClick={authHandler}
					className={classes.login__registerButton}
				>
					{loading.signUP ? (
						<ClipLoader color="#000" size={15}></ClipLoader>
					) : (
						"Create your Amazon Account"
					)}
				</button>
				{error && (
					<small style={{ paddongTop: "5px", color: "red" }}>{error}</small>
				)}
			</div>
		</section>
	);
}

export default Auth;
