import { createContext, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import {
	ThemeProvider,
	AuthProvider,
	LoaderProvider,
	ScrollToTopProvider,
	AlertProvider,
} from "contexts";

const MagnificentContext = createContext();

export const useMagnificent = () => useContext(MagnificentContext);

export const MagnificentProvider = ({ children }) => {
	const value = "";
	return (
		<MagnificentContext.Provider value={value}>
			<BrowserRouter>
				<LoaderProvider>
					<AlertProvider>
						<ScrollToTopProvider>
							<AuthProvider>
								<ThemeProvider>
									<LoaderProvider>{children}</LoaderProvider>
								</ThemeProvider>
							</AuthProvider>
						</ScrollToTopProvider>
					</AlertProvider>
				</LoaderProvider>
			</BrowserRouter>
		</MagnificentContext.Provider>
	);
};
