import "./InputTypeTwo.css";
export const InputTypeTwo = (props) => {
	const {
		wrapperClassName,
		htmlFor,
		labelClassName,
		labelText,
		type,
		className,
		placeholder,
		name,
		id,
		required,
		onChange,
		onClick,
	} = props;
	return (
		<div className={wrapperClassName}>
			{required ? (
				<input
					type={type}
					className={className}
					placeholder={placeholder}
					name={name}
					id={id}
					onChange={onChange}
					onClick={onClick}
					required
				/>
			) : (
				<input
					type={type}
					className={className}
					placeholder={placeholder}
					name={name}
					onClick={onClick}
					onChange={onChange}
					id={id}
				/>
			)}
			<label htmlFor={htmlFor} className={labelClassName}>
				{labelText}
			</label>
		</div>
	);
};
