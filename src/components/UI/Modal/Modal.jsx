import { useModal } from "contexts";
import "./Modal.css";

export const Modal = ({ modalClass, children }) => {
	const { setModal } = useModal();
	const hideModal = (e) => {
		console.log(e.target.classList.contains("modal__wrapper"), "MODAL")
		if (e.target.classList.contains("modal__wrapper")) {
			setModal(false);
		}
	};
	return (
		<div
			className={`${
				modalClass ? modalClass : "modal__wrapper"
			} modal__wrapper_center_child`}
			onClick={hideModal}
		>
			{children}
		</div>
	);
};
