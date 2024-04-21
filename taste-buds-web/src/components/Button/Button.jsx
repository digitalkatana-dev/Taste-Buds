import React from 'react';
import './button.scss';

const Button = ({ type, className, children, fullWidth, onClick }) => {
	return (
		<button
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
