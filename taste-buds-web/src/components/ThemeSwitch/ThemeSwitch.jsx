import { alpha, styled } from '@mui/material/styles';
import { Switch } from '@mui/material';

const ThemeSwitch = styled(Switch)(({ theme }) => ({
	'& .MuiSwitch-switchBase.Mui-checked': {
		color: '#daa520',
		'&:hover': {
			backgroundColor: alpha('#daa520', theme.palette.action.hoverOpacity),
		},
	},
	'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
		backgroundColor: '#daa520',
	},
}));

export default ThemeSwitch;
