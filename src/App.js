import {
	Alert,
	Aside,
	AsideMobile,
	Footer,
	Header,
	Loader,
	SearchBoxMobile,
} from "components";
import { useAlert, useAuth, useLoader } from "contexts";
import { Category, Home, Login, NotFound, Quiz, SignUp } from "pages";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ROUTES } from "utils/routes";
import "./App.css";
import "./responsive.css";

function App() {
	const { pathname } = useLocation();
	const { alert } = useAlert();
	const { authState } = useAuth();
	const { loader } = useLoader();

	const isAuth = !!authState?.token;

	const isAuthPage = pathname === "/login" || pathname === "/signup";
	const isNotFoundPage = pathname === "/pagenotfound";

	const injectPageCss = () => {
		if (isNotFoundPage) {
			return "not_found_page";
		}
		if (isAuthPage) {
			return "body auth";
		}
		return "body home";
	};

	return (
		<>
			<ToastContainer />
			<div className={`App ${injectPageCss()}`}>
				{alert.visibility && <Alert />}
				{pathname !== ROUTES.notFound && <Header />}

				{isAuthPage || isNotFoundPage ? null : <Aside />}

				<Routes>
					<Route path={ROUTES.home} element={<Home />} />
					<Route path={ROUTES.category} element={<Category />} />
					<Route path={ROUTES.question} element={<Quiz />} />
					<Route
						path={ROUTES.profile}
						element={
							<h3 style={{ paddingTop: "2rem" }}>
								profile Page Under Construction...
							</h3>
						}
					/>
					<Route
						path={ROUTES.leaderboard}
						element={
							<h3 style={{ paddingTop: "2rem" }}>
								leaderboard Page Under Construction...
							</h3>
						}
					/>
					<Route
						path={ROUTES.settings}
						element={
							<h3 style={{ paddingTop: "2rem" }}>
								Settings Page Under Construction...
							</h3>
						}
					/>
					<Route path={ROUTES.support} element={<>Support Page</>} />
					<Route
						path={ROUTES.login}
						element={isAuth ? <Navigate to="/" replace /> : <Login />}
					/>
					<Route
						path={ROUTES.signup}
						element={isAuth ? <Navigate to="/" replace /> : <SignUp />}
					/>
					<Route path={ROUTES.loader} element={<Loader />} />
					<Route path={ROUTES.notFound} element={<NotFound />} />
					<Route
						path={ROUTES.unknown}
						element={<Navigate to={ROUTES.notFound} replace />}
					/>
				</Routes>
				{isAuthPage || isNotFoundPage ? null : <AsideMobile />}
				{(pathname !== ROUTES.notFound ||
					(pathname !== ROUTES.login && loader)) && <Footer />}
				{loader && <Loader />}
			</div>
		</>
	);
}

export default App;
