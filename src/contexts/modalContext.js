import { useState, useContext, createContext } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
	const [modal, setModal] = useState(false);

	const value = { modal, setModal };
	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
};
