import "./CTA.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ThemeToggle } from "components/UI/ThemeToggle/ThemeToggle";
import { useAlert, useAuth } from "../../../../contexts";
import { ROUTES } from "utils/routes";

export const CTA = () => {
	const { authState, authDispatch } = useAuth();
	const { pathname } = useLocation();
	const { setAlert } = useAlert();
	const isAuth = !!authState?.token;

	const logoutHandler = () => {
		if (isAuth) {
			localStorage.removeItem(ROUTES.localStorageKey);
			authDispatch({
				type: "LOGOUT",
			});
			setAlert((a) => ({
				...a,
				visibility: true,
				text: "Logged Out",
				type: "alert--success",
			}));
		}
	};

	const isLoginPage = (() => pathname === "/login")();
	const getBtnName = (() =>
		isAuth ? "Logout" : pathname === "/login" ? "Sign Up" : "Login")();
	const getBtnIcon = (() =>
		isAuth ? (
			<i className="bx bx-log-out"></i>
		) : isLoginPage ? (
			<i className="bx bx-user-plus"></i>
		) : (
			<i className="bx bx-log-in"></i>
		))();
	const getLinkPath = (() =>
		isAuth ? "/" : pathname === "/login" ? "/signup" : "/login")();

	return (
		<div className="header__nav_btns">
			<Link
				onClick={logoutHandler}
				className={`btn btn--primary btn--icon auth__btn ${
					isAuth ? "auth__btn--logout" : ""
				}`}
				to={getLinkPath}
			>
				{getBtnName}
				{getBtnIcon}
			</Link>
			<ThemeToggle />
		</div>
	);
};
