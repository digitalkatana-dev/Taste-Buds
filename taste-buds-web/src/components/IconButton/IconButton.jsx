import { IconButton as Frame } from '@mui/material';
import { useSelector } from 'react-redux';
import './iconBtn.scss';

const IconButton = ({ className, children, onClick }) => {
	const { activeUser } = useSelector((state) => state.user);
	const theme = activeUser?.theme;

	return (
		<Frame
			className={
				theme === 'dark'
					? `icon-btn ${className} dark`
					: `icon-btn ${className}`
			}
			onClick={onClick}
		>
			{children}
		</Frame>
	);
};

export default IconButton;
