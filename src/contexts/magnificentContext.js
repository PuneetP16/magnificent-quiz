import { createContext, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import {
	ThemeProvider,
	AuthProvider,
	LoaderProvider,
	ScrollToTopProvider,
	AlertProvider,
	QuizProvider,
} from "contexts";
import { ModalProvider } from "./modalContext";

const MagnificentContext = createContext();

export const useMagnificent = () => useContext(MagnificentContext);

export const MagnificentProvider = ({ children }) => {
	const value = "";
	return (
		<MagnificentContext.Provider value={value}>
			<BrowserRouter>
				<LoaderProvider>
					<AlertProvider>
						<ModalProvider>
							<ScrollToTopProvider>
								<AuthProvider>
									<ThemeProvider>
										<LoaderProvider>
											<QuizProvider>{children}</QuizProvider>
										</LoaderProvider>
									</ThemeProvider>
								</AuthProvider>
							</ScrollToTopProvider>
						</ModalProvider>
					</AlertProvider>
				</LoaderProvider>
			</BrowserRouter>
		</MagnificentContext.Provider>
	);
};
