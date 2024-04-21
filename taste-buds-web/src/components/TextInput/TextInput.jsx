import { FormControl, TextField } from '@mui/material';
import './textInput.scss';

const TextInput = ({
	fullWidth,
	autoCap,
	className,
	disabled,
	type,
	label,
	size,
	margin,
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
				size={size}
				margin={margin}
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
