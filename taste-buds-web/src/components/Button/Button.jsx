import React from 'react';
import './button.scss';

const Button = ({
	disabled,
	type,
	className,
	children,
	fullWidth,
	onClick,
}) => {
	return (
		<button
			disabled={disabled}
			type={type}
			className={className}
			style={{ width: fullWidth ? '100%' : 'initial' }}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
