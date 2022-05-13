import { useState, useEffect, useContext, createContext } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
	const currentThemeState = localStorage.getItem("current_theme");
	const [theme, setTheme] = useState(currentThemeState ?? "light");

	const themeHandler = () => {
		setTheme((theme) => (theme === "light" ? "dark" : "light"));
	};

	useEffect(() => {
		document.documentElement.setAttribute("current_theme", theme);
		localStorage.setItem("current_theme", theme);
	}, [theme]);

	const value = { theme, themeHandler };
	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};
