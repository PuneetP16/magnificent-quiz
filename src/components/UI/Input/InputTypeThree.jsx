import { useState } from "react";
import "./InputTypeThree.css";
export const InputTypeThree = (props) => {
	const [isVisible, setIsVisible] = useState(false);

	const {
		wrapperClassName,
		htmlFor,
		labelClassName,
		labelText,
		type,
		className,
		placeholder,
		name,
		value,
		iconClassName,
		onChange,
		toggleVisibility = null,
	} = props;

	const toggleVisibilityTwo = () => {
		setIsVisible((v) => !v);
	};

	return (
		<div className={wrapperClassName}>
			<label htmlFor={htmlFor} className={labelClassName}>
				{labelText}
			</label>
			<input
				type={type ? type : isVisible ? "text" : "password"}
				className={className}
				placeholder={placeholder}
				name={name}
				onChange={onChange}
				value={value}
				required
			/>
			<div
				onClick={toggleVisibility ? toggleVisibility : toggleVisibilityTwo}
				className="btn--icon"
			>
				<i
					className={
						iconClassName
							? iconClassName
							: `bx ${isVisible ? "bxs-hide" : "bxs-show"}`
					}
				/>
			</div>
		</div>
	);
};
