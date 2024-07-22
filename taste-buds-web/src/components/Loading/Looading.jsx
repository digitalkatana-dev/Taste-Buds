import { CircularProgress } from '@mui/material';
import './loading.scss';

const Looading = ({ size }) => {
	return <CircularProgress id='loading' size={size} />;
};

export default Looading;
