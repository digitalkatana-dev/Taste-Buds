import { Button, styled } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import { useSelector } from 'react-redux';
import './uploadBtn.scss';

const VisuallyHiddenInput = styled(MuiFileInput)({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

const FileInput = ({ placeholder, value, onChange }) => {
	const { theme } = useSelector((state) => state.app);

	return (
		<Button
			id='upload-btn'
			className={theme === 'dark' ? 'dark' : ''}
			component='label'
			role={undefined}
			variant='standard'
			tabIndex={-1}
		>
			{placeholder}
			<VisuallyHiddenInput size='small' value={value} onChange={onChange} />
		</Button>
	);
};

export default FileInput;
