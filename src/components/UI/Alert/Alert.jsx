import { bxIcons } from "data/icons";
import { useEffect } from "react";
import { useAlert } from "../../../contexts";
import "./Alert.css";

export const Alert = () => {
	const { alert, setAlert } = useAlert();
	const onClickHandler = () => {
		setAlert((s) => ({
			...s,
			visibility: !s.visibility,
		}));
	};

	const { text, visibility, type } = alert;

	useEffect(() => {
		const timeOutId = setTimeout(() => {
			setAlert((s) => ({
				...s,
				visibility: false,
			}));
		}, 2000);

		return () => clearTimeout(timeOutId);
	}, [setAlert, alert.visibility]);

	return visibility ? (
		<div className={`alert ${type} alert--dismissable`}>
			{text}
			<button
				onClick={onClickHandler}
				className="btn btn--icon btn--close--transparent alert--btn__dismiss btn--circular"
			>
				{bxIcons.cross}
			</button>
		</div>
	) : null;
};
