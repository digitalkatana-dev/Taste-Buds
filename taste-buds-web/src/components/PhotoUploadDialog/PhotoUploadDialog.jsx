import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPhotoOpen, setPhotoDialogType } from '../../redux/slices/appSlice';
import { setPhotoPreview } from '../../redux/slices/userSlice';
import { capitalizeFirstLetterOfEachWord } from '../../util/helpers';
import Cropper from 'react-cropper';
import CloseIcon from '@mui/icons-material/Close';
import FileInput from '../FileInput/FileInput';
import 'cropperjs/dist/cropper.css';
import './photoUpload.scss';

const PhotoUploadDialog = () => {
	const { theme, photoOpen, photoDialogType } = useSelector(
		(state) => state.app
	);
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(null);
	const [cropped, setCropped] = useState(null);
	const cropperRef = useRef(null);
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(setPhotoOpen(false));
		setFile(null);
		setPreview(null);
		setCropped(null);
		setTimeout(() => {
			dispatch(setPhotoDialogType(''));
		}, 500);
	};

	const onCrop = () => {
		const cropper = cropperRef.current?.cropper;
		// console.log(cropper.getCroppedCanvas().toDataURL());
		setCropped(cropper.getCroppedCanvas());
	};

	const handleChange = (selectedFile) => {
		setFile(selectedFile);

		if (selectedFile) {
			const reader = new FileReader();
			reader.onload = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(selectedFile);
		} else {
			setPreview(null);
			setCropped(null);
		}
	};

	const handleClick = () => {
		const cropper = cropperRef.current?.cropper;
		dispatch(setPhotoPreview(cropper.getCroppedCanvas().toDataURL()));
		dispatch(setPhotoOpen(false));
		setTimeout(() => {
			dispatch(setPhotoDialogType(''));
		}, 500);
	};

	useEffect(() => {
		if (photoOpen === false) {
			setFile(null);
			setPreview(null);
			setCropped(null);
		}
	}, [photoOpen]);

	return (
		<Dialog
			id='photo-upload'
			className={theme === 'dark' ? 'dark' : ''}
			maxWidth='xs'
			fullWidth
			open={photoOpen}
			onClose={handleClose}
		>
			<DialogTitle className='title'>{`Upload ${capitalizeFirstLetterOfEachWord(
				photoDialogType
			)} Photo`}</DialogTitle>
			<IconButton
				sx={{ position: 'absolute', right: 8, top: 8 }}
				className='close'
				onClick={handleClose}
			>
				<CloseIcon />
			</IconButton>
			<DialogContent className='content' dividers>
				<FileInput
					placeholder='Choose a photo...'
					value={file}
					onChange={handleChange}
				/>
				<div className='image-preview-container'>
					{preview && (
						<Cropper
							src={preview}
							initialAspectRatio={1 / 1}
							guides={false}
							background={false}
							crop={onCrop}
							ref={cropperRef}
						/>
					)}
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button disabled={!cropped} className='save-btn' onClick={handleClick}>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default PhotoUploadDialog;
