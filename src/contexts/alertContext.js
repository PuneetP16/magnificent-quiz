import { useState, useContext, createContext } from "react";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
	const [alert, setAlert] = useState({ visibility: false, text: "", type: "" });

	const value = { alert, setAlert };
	return (
		<AlertContext.Provider value={value}>{children}</AlertContext.Provider>
	);
};
