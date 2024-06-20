import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
} from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProfilePhotoPreview } from '../../redux/slices/userSlice';
import Cropper from 'react-cropper';
import CloseIcon from '@mui/icons-material/Close';
import 'cropperjs/dist/cropper.css';
import './photoUpload.scss';

const PhotoUploadDialog = ({ open, setShowDialog }) => {
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(null);
	const [cropped, setCropped] = useState(null);
	const cropperRef = useRef(null);
	const dispatch = useDispatch();

	const handleClose = () => {
		setShowDialog(false);
		setFile(null);
		setPreview(null);
		setCropped(null);
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
		dispatch(setProfilePhotoPreview(cropper.getCroppedCanvas().toDataURL()));
		setShowDialog(false);
	};

	useEffect(() => {
		if (open === false) {
			setFile(null);
			setPreview(null);
			setCropped(null);
		}
	}, [open]);

	return (
		<Dialog
			id='photo-upload'
			maxWidth='xs'
			fullWidth
			open={open}
			onClose={handleClose}
		>
			<DialogTitle className='title'>Upload Profile Photo</DialogTitle>
			<IconButton
				sx={{ position: 'absolute', right: 8, top: 8 }}
				className='close'
				onClick={handleClose}
			>
				<CloseIcon />
			</IconButton>
			<DialogContent className='content' dividers>
				<MuiFileInput size='small' value={file} onChange={handleChange} />
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
				<Button disabled={!cropped} onClick={handleClick}>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default PhotoUploadDialog;
