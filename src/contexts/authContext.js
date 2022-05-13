import { useContext, createContext, useReducer, useEffect } from "react";
import { ROUTES } from "utils/routes";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const initialAuthState = {
	token: "",
	email: "",
	name: "",
	profilePhoto: "",
	id: "",
};

const authReducer = (state, action) => {
	switch (action.type) {
		case "AUTHENTICATION":
			return {
				...state,
				token: action.payload.token,
				email: action.payload.user.email,
				name: action.payload.user.displayName,
				profilePhoto: action.payload.user.photoURL,
				id: action.payload.user.uid,
			};

		case "LOGOUT":
			return initialAuthState;

		default:
			return state;
	}
};

export const AuthProvider = ({ children }) => {
	const token = localStorage.getItem(ROUTES.localStorageKey);

	const [authState, authDispatch] = useReducer(
		authReducer,
		JSON.parse(token) ?? initialAuthState
	);

	useEffect(() => {
		localStorage.setItem(ROUTES.localStorageKey, JSON.stringify(authState));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authState.token]);

	const value = { authState, authDispatch };
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
