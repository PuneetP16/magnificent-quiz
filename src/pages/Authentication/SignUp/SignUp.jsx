import { useState } from "react";
import { Link } from "react-router-dom";
import { InputTypeOne, InputTypeThree, InputTypeTwo, Toast } from "components";
import { useAlert, useAuth, useTheme } from "contexts";
import { useDocumentTitle } from "customHooks";
import { bxIcons } from "data/icons";
import "./SignUp.css";
import { emailSignupHandler } from "utils/firebaseServices";

export const SignUp = () => {
	useDocumentTitle("Signup | MS");
	const initialSignUpData = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		consent: "	",
	};

	const [confirmPass, setConfirmPass] = useState({
		value: "",
		isEqual: false,
	});

	const [signUpData, setSignUpData] = useState(initialSignUpData);

	const { theme } = useTheme();

	const { authDispatch } = useAuth();

	const onChangeHandler = (e) => {
		if (e.target.name === "confirmPassword") {
			setConfirmPass((s) => ({ ...s, value: e.target.value }));
		}

		setSignUpData((obj) => ({
			...obj,
			[e.target.name]:
				e.target.value === "on" ? e.target.checked : e.target.value,
		}));
	};

	const emailRegex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

	const onSubmitHandler = (e) => {
		e.preventDefault();

		if (signUpData.password !== confirmPass.value) {
			Toast("warning", "password doesn't match", theme);
			return;
		}

		if (
			signUpData.password.match(passwordRegex) &&
			signUpData.email.match(emailRegex)
		) {
			emailSignupHandler(
				signUpData.email,
				signUpData.password,
				authDispatch,
				theme
			);
			setSignUpData(initialSignUpData);
		} else {
			Toast(
				"warning",
				"Minimum 8 char, 1 Uppercase, 1 Lowercase, 1 number & 1 Special Character required",
				theme
			);

			return;
		}
	};

	return (
		<main>
			<div className="center">
				<form onSubmit={onSubmitHandler} className="form flex" method="get">
					<h2 className="h3">Sign Up</h2>
					<InputTypeOne
						wrapperClassName="form__item form__first_name form__input_box"
						htmlFor="first_name"
						labelClassName="label"
						labelText="First Name"
						type="text"
						className="input_box"
						placeholder="John"
						name="firstName"
						onChange={onChangeHandler}
						value={signUpData["firstName"]}
					/>
					<InputTypeOne
						wrapperClassName="form__item form__last_name form__input_box"
						htmlFor="last_name"
						labelClassName="label"
						labelText="Last Name"
						type="text"
						className="input_box"
						placeholder="Doe"
						name="lastName"
						onChange={onChangeHandler}
						value={signUpData["lastName"]}
					/>
					<InputTypeOne
						wrapperClassName="form__item form__email form__input_box"
						htmlFor="email"
						labelClassName="label"
						labelText="Email Address"
						type="email"
						className="input_box"
						placeholder="JohnDoe@email.com"
						name="email"
						onChange={onChangeHandler}
						value={signUpData["email"]}
					/>
					<InputTypeThree
						wrapperClassName="form__item form__password form__input_box"
						htmlFor="password"
						labelClassName="label"
						labelText="Password"
						className="input_box"
						placeholder="Enter Password..."
						name="password"
						onChange={onChangeHandler}
						value={signUpData["password"]}
					/>
					<InputTypeThree
						wrapperClassName="form__item form__password form__input_box"
						htmlFor="password"
						labelClassName="label"
						labelText="Confirm Password"
						className="input_box"
						placeholder="Enter Same Password..."
						name="confirmPassword"
						onChange={onChangeHandler}
						value={confirmPass.value}
					/>
					<section className="form__item form__actions">
						<InputTypeTwo
							wrapperClassName="form__item form__actions"
							type="checkbox"
							className="checkbox"
							placeholder=""
							id="consent"
							htmlFor="consent"
							labelText="I accept all Terms & Conditions"
							required={true}
							name="consent"
							onChange={onChangeHandler}
						/>
					</section>
					<button className="form__signup_btn btn btn--primary">Sign Up</button>
					<Link className="btn btn--primary btn--icon" to="/login">
						Already have an Account? Login
						{bxIcons.rightArrow}
					</Link>
				</form>
			</div>
		</main>
	);
};
