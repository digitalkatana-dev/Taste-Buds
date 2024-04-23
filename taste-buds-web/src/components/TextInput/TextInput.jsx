import { FormControl, TextField } from '@mui/material';
import './textInput.scss';

const TextInput = ({
	fullWidth,
	autoCap,
	className,
	disabled,
	type,
	label,
	placeholder,
	size,
	margin,
	multiline,
	rows,
	maxRows,
	value,
	onFocus,
	onChange,
	InputProps,
	error,
}) => {
	return (
		<FormControl fullWidth={fullWidth}>
			<TextField
				autoCapitalize={autoCap}
				className={className}
				disabled={disabled}
				type={type}
				label={label}
				placeholder={placeholder}
				size={size}
				margin={margin}
				multiline={multiline}
				rows={rows}
				maxRows={maxRows}
				value={value}
				onFocus={onFocus}
				onChange={onChange}
				InputProps={InputProps}
			/>
			{error && <h6 className='error'>{error}</h6>}
		</FormControl>
	);
};

export default TextInput;
