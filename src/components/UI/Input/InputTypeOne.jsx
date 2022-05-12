import "./InputTypeOne.css";
export const InputTypeOne = (props) => {
	const {
		wrapperClassName,
		htmlFor,
		labelClassName,
		labelText,
		type,
		className,
		placeholder,
		name,
		onChange,
		value,
	} = props;
	return (
		<div className={wrapperClassName}>
			<label htmlFor={htmlFor} className={labelClassName}>
				{labelText}
			</label>
			<input
				value={value}
				name={name}
				type={type}
				className={className}
				placeholder={placeholder}
				onChange={onChange}
				required
			/>
		</div>
	);
};
