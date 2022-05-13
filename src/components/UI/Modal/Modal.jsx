import "./Modal.css";

export const Modal = ({ modalClass, setModalVisibility, children }) => {
	const hideModal = (e) => {
		if (e.target.classList.contains("modal__wrapper")) {
			setModalVisibility(false);
		}
	};
	return (
		<div
			className={`${
				modalClass ? modalClass : "modal__wrapper"
			} modal__wrapper_center_child`}
			onClick={(e) => hideModal(e)}
		>
			{children}
		</div>
	);
};
