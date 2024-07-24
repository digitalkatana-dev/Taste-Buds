import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	Checkbox,
	Grid,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
} from '@mui/material';
import { setFoodTypeOptions } from '../../redux/slices/appSlice';
import { setFavFoodTypes } from '../../redux/slices/userSlice';
import { not, intersection } from '../../util/helpers';
import './transfer.scss';

const TransferList = () => {
	const { foodTypeOptions } = useSelector((state) => state.app);
	const { favorites } = useSelector((state) => state.user);
	const [checked, setChecked] = useState([]);
	const dispatch = useDispatch();

	const leftChecked = intersection(checked, foodTypeOptions);
	const rightChecked = intersection(checked, favorites.foodTypes);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const handleAllRight = () => {
		dispatch(setFavFoodTypes(favorites.foodTypes.concat(foodTypeOptions)));
		dispatch(setFoodTypeOptions([]));
	};

	const handleCheckedRight = () => {
		dispatch(setFavFoodTypes(favorites.foodTypes.concat(leftChecked)));
		dispatch(setFoodTypeOptions(not(foodTypeOptions, leftChecked)));
		setChecked(not(checked, leftChecked));
	};

	const handleCheckedLeft = () => {
		dispatch(setFoodTypeOptions(foodTypeOptions.concat(rightChecked)));
		dispatch(setFavFoodTypes(not(favorites.foodTypes, rightChecked)));
		setChecked(not(checked, rightChecked));
	};

	const handleAllLeft = () => {
		dispatch(setFoodTypeOptions(foodTypeOptions.concat(favorites.foodTypes)));
		dispatch(setFavFoodTypes([]));
	};

	const customList = (items) => (
		<Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
			<List dense component='div' role='list'>
				{items.map((value) => {
					const labelId = `transfer-list-item-${value}-label`;

					return (
						<ListItemButton
							key={value}
							role='listitem'
							onClick={handleToggle(value)}
						>
							<ListItemIcon>
								<Checkbox
									checked={checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{
										'aria-labelledby': labelId,
									}}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={value} />
						</ListItemButton>
					);
				})}
			</List>
		</Paper>
	);

	return (
		<Grid
			container
			spacing={2}
			justifyContent='center'
			alignItems='center'
			id='transfer-list'
		>
			<Grid item>{customList(foodTypeOptions)}</Grid>
			<Grid item>
				<Grid container direction='column' alignItems='center'>
					<Button
						sx={{ my: 0.5 }}
						variant='outlined'
						size='small'
						onClick={handleAllRight}
						disabled={foodTypeOptions.length === 0}
						aria-label='move all right'
					>
						≫
					</Button>
					<Button
						sx={{ my: 0.5 }}
						variant='outlined'
						size='small'
						onClick={handleCheckedRight}
						disabled={leftChecked.length === 0}
						aria-label='move selected right'
					>
						&gt;
					</Button>
					<Button
						sx={{ my: 0.5 }}
						variant='outlined'
						size='small'
						onClick={handleCheckedLeft}
						disabled={rightChecked.length === 0}
						aria-label='move selected left'
					>
						&lt;
					</Button>
					<Button
						sx={{ my: 0.5 }}
						variant='outlined'
						size='small'
						onClick={handleAllLeft}
						disabled={favorites.foodTypes.length === 0}
						aria-label='move all left'
					>
						≪
					</Button>
				</Grid>
			</Grid>
			<Grid item>{customList(favorites.foodTypes)}</Grid>
		</Grid>
	);
};

export default TransferList;
