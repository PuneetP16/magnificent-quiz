import { useState, useContext, createContext } from "react";

const LoaderContext = createContext();

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
	const [loader, setLoader] = useState(false);

	const toggleLoader = () => {
		setLoader((loader) => !loader);
	};

	const value = { loader, toggleLoader };
	return (
		<LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
	);
};
