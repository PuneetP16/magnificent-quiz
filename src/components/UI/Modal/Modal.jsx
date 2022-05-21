import { useModal } from "contexts";
import "./Modal.css";

export const Modal = ({ modalClass, children }) => {
	const { setModal } = useModal();
	const hideModal = (e) => {
		if (e.target.classList.contains("modal__wrapper")) {
			setModal(false);
		}
	};
	return (
		<div
			className={`${
				modalClass ? modalClass : "modal__wrapper"
			} modal__wrapper_center_child`}
		>
			{children}
		</div>
	);
};
