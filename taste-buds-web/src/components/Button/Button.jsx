import { Button as Template } from '@mui/material';
import './button.scss';

const Button = ({
	disabled,
	type,
	variant,
	size,
	fullWidth,
	className,
	onClick,
	children,
}) => {
	return (
		<Template
			disabled={disabled}
			type={type}
			variant={variant}
			size={size}
			fullWidth={fullWidth}
			className={className}
			onClick={onClick}
		>
			{children}
		</Template>
	);
};

export default Button;
