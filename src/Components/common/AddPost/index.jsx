//CORE
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    Box,
    Button,
    FormHelperText,
    IconButton,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { useDispatch } from 'react-redux';

//ICON
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

//CUSTOM
import { AddPostWrapper } from './AddPost.style';
import { MEDIA_LIMIT } from 'Helpers/Constants';
import { showToast } from 'Redux/App/Actions';
import Api from 'Helpers/ApiHandler';
import { API_URL } from 'Helpers/Paths';
import CODES from 'Helpers/StatusCodes';

const AddPost = ({ onClose, onConfirm }) => {
    const fileUpload = useRef(null);
    const dispatch = useDispatch();
    const API = useMemo(() => new Api(), []);

    const [selectedImages, setSelectedImages] = useState([]);
    const [imgFiles, setImgFiles] = useState([]);
    const [description, setDescription] = useState('');
    const [userDetails, setUserDetails] = useState({});

    const handleFileHandler = (e) => {
        const selectedFiles = e.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        const imgArray = selectedFilesArray.map((file) => URL.createObjectURL(file));

        setImgFiles(selectedFilesArray);
        setSelectedImages(imgArray);
    };

    const handleFileUploadClick = () => {
        fileUpload.current.click();
    };

    const handleSubmit = async () => {
        if (!(!!description.length || !!selectedImages.length)) {
            dispatch(
                showToast(
                    'You need to select at least one img or need to write a description',
                    'error'
                )
            );
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < imgFiles.length; i++) {
            formData.append(`mediaData`, imgFiles[i]);
        }
        formData.append('description', description);

        const response = await API.post(`${API_URL.ADD_POST_URL}/${userDetails?.id}`, {
            data: formData,
            description,
            isMultipart: true
        });

        if (response?.status === CODES.SUCCESS && response?.data?.isSuccess) {
            dispatch(showToast(response?.data?.message))
            onConfirm()
        }
    };

    useEffect(() => {
        setUserDetails(JSON.parse(localStorage.getItem('userInfo')));
    }, []);

    return (
        <AddPostWrapper
            open
            fullWidth
            maxWidth="sm"
            onClose={onClose}
            classes={{ paper: 'paper-root' }}>
            <Box className="flex f-v-center f-h-space-between header">
                <Typography className="add-post-title">Add Post</Typography>
                <IconButton onClick={() => onClose()}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box className="add-post-form flex f-column">
                <Box className="field-wrapper">
                    <Typography className="form-label">Description :</Typography>
                    <TextField
                        variant="outlined"
                        name="description"
                        className="input-field"
                        placeholder="Something to say about your post?"
                        multiline
                        maxRows={4}
                        minRows={4}
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e?.target?.value)}
                        InputProps={{
                            classes: {
                                focused: 'input-focused',
                                notchedOutline: 'input-outline'
                            }
                        }}
                    />
                </Box>
                <Box className="field-wrapper">
                    <Typography className="form-label">Media</Typography>
                    <Box className="flex img-selector-wrapper flex f-wrap">
                        {!!selectedImages.length &&
                            selectedImages.map((image) => (
                                <Box
                                    key={image}
                                    className="img-display flex f-v-center f-h-center"
                                    style={{
                                        backgroundImage: `url(${image})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}>
                                    <Tooltip title="Delete" placement="top">
                                        <IconButton
                                            className="delete-img-icon-btn"
                                            onClick={() =>
                                                setSelectedImages((prev) =>
                                                    prev.filter((e) => e !== image)
                                                )
                                            }>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            ))}
                        {selectedImages.length < MEDIA_LIMIT && (
                            <Box
                                className="add-file flex f-v-center f-h-center f-column hover"
                                onClick={handleFileUploadClick}>
                                <Typography className="add-img">+ Add Images</Typography>
                                <Typography className="limit">
                                    {`up to ${MEDIA_LIMIT} media files`}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    {selectedImages.length > MEDIA_LIMIT && (
                        <FormHelperText
                            error>{`You can't upload images more than ${MEDIA_LIMIT}, Please delete ${
                            selectedImages.length - MEDIA_LIMIT
                        } images`}</FormHelperText>
                    )}
                    <input
                        className="file-selector"
                        type="file"
                        name="mediaData"
                        accept="image/png, image/jpeg, image/jpg"
                        ref={fileUpload}
                        onChange={handleFileHandler}
                        multiple
                    />
                </Box>
                <Button
                    className="add-post-btn"
                    onClick={handleSubmit}
                    disabled={selectedImages.length > MEDIA_LIMIT}>
                    Add Post
                </Button>
            </Box>
        </AddPostWrapper>
    );
};

export default AddPost;
