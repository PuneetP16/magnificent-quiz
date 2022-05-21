import { Link } from "react-router-dom";
import { useState } from "react";
import { InputTypeOne, InputTypeThree, InputTypeTwo, Toast } from "components";
import { useDocumentTitle } from "customHooks";
import "./Login.css";
import { bxIcons } from "data/icons";
import { useAlert, useAuth, useTheme } from "contexts";
import {
	emailLoginHandler,
	googleLoginHandler,
	facebookLoginHandler,
} from "utils/firebaseServices";
import { ROUTES } from "utils/routes";

export const Login = () => {
	useDocumentTitle("Login | MS");

	const [isVisible, setIsVisible] = useState(false);
	const { authDispatch } = useAuth();
	const { theme } = useTheme();

	const [loginData, setLoginData] = useState({
		email: "test@test.com",
		password: "test@Test1",
		rememberMe: "",
	});

	const toggleVisibility = () => {
		setIsVisible((visible) => !visible);
	};

	const onChangeHandler = (e) => {
		const value = e.target.value;
		const name = e.target.name;
		setLoginData((prevData) => {
			return {
				...prevData,
				[name]: value === "on" ? e.target.checked : value,
			};
		});
	};

	const googleSigninHandler = () => {
		googleLoginHandler(authDispatch, theme);
	};
	const facebookSigninHandler = () => {
		facebookLoginHandler(authDispatch, theme);
	};

	const emailRegex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const onSubmitHandler = (e) => {
		e.preventDefault();

		if (loginData.email.trim() === "" || loginData.password.trim() === "") {
			Toast("warning", "Input cannot be blank, try again", theme);
		} else {
			if (loginData.email.match(emailRegex)) {
				emailLoginHandler(
					loginData.email,
					loginData.password,
					authDispatch,
					theme
				);
			} else {
				Toast("warning", "Entered email is wrong, please try again", theme);
			}
		}
	};

	return (
		<main>
			<div className="center">
				<form
					onSubmit={(e) => e.preventDefault()}
					className="form flex"
					method="get"
				>
					<h2 className="h3">Login</h2>
					<InputTypeOne
						wrapperClassName="form__item form__email form__input_box"
						htmlFor="email"
						labelClassName="label"
						labelText="Email Address"
						type="email"
						className="input_box"
						placeholder="yours@mail.com"
						name="email"
						onChange={onChangeHandler}
						value={loginData["email"]}
					/>

					<InputTypeThree
						wrapperClassName="form__item form__password form__input_box"
						htmlFor="password"
						labelClassName="label"
						labelText="Password"
						className="input_box"
						placeholder="********"
						name="password"
						onChange={onChangeHandler}
						value={loginData["password"]}
						type={isVisible ? "text" : "password"}
						iconClassName={`bx ${isVisible ? "bxs-hide" : "bxs-show"}`}
						toggleVisibility={toggleVisibility}
					/>
					<section className="form__item form__actions">
						<InputTypeTwo
							wrapperClassName="remember_me"
							type="checkbox"
							className="checkbox"
							placeholder=""
							name="rememberMe"
							id="remember_me"
							htmlFor="remember_me"
							labelClassName="checkbox"
							labelText="Remember me"
							onClick={onChangeHandler}
							value={loginData.rememberMe}
							required={false}
						/>

						<button
							onClick={(e) => {
								e.preventDefault();
							}}
							className="btn btn--primary btn--link forgot_pass"
						>
							Forgot your Password?
						</button>
					</section>
					<button
						onClick={onSubmitHandler}
						className="form__login_btn btn btn--primary"
					>
						Login
					</button>
					<button
						onClick={googleSigninHandler}
						className="form__login_btn form__google btn btn--outline--primary"
					>
						{bxIcons.google}
						<span>Login with Google</span>
					</button>
					<button
						onClick={facebookSigninHandler}
						className="form__login_btn form__google btn btn--outline--primary"
					>
						{bxIcons.facebook}
						<span>Login with Facebook</span>
					</button>
					<Link className="form__signup_btn btn btn--icon" to={ROUTES.signup}>
						New here? Create New Account
						{bxIcons.rightArrow}
					</Link>
				</form>
			</div>
		</main>
	);
};
