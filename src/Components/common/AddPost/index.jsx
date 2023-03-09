//CORE
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    Box,
    CardMedia,
    Divider,
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
import { ImageBox } from 'Styles/CommonStyle';
import CustomButton from '../CustomBtn/CustomButton';

const ACCEPT_FILE_TYPE =
    'image/png, image/jpeg, image/jpg, video/mp4, video/webm, audio/ogg, video/x-msvideo, video/x-matroska';

const IMAGE_TYPE_FILE = ['image/png', 'image/jpeg', 'image/jpg'];

const AddPost = ({ onClose, onConfirm }) => {
    const fileUpload = useRef(null);
    const dispatch = useDispatch();
    const API = useMemo(() => new Api(), []);

    const [selectedMediaUrls, setSelectedMediaUrls] = useState([]);
    const [selectedMediaFiles, setSelectedMediaFiles] = useState([]);
    const [description, setDescription] = useState('');
    const [userDetails, setUserDetails] = useState({});

    const handleFileHandler = (e) => {
        const selectedFiles = e.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        selectedFilesArray.forEach((element) => {
            setSelectedMediaUrls((prev) => {
                return [...prev, { url: URL.createObjectURL(element), mediaType: element.type }];
            });
        });

        setSelectedMediaFiles(selectedFilesArray);
    };

    const handleDeleteMedia = (media, index) => {
        const tempMediaFiles = [...selectedMediaFiles];
        tempMediaFiles.splice(index, 1);
        setSelectedMediaFiles(tempMediaFiles);
        setSelectedMediaUrls((prev) => prev.filter((e) => e !== media));
    };

    const DeleteMediaUi = (mediaUrl, index) => {
        return (
            <Tooltip title="Delete" placement="top">
                <IconButton
                    className="delete-img-icon-btn"
                    onClick={() => handleDeleteMedia(mediaUrl, index)}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        );
    };

    const handleFileUploadClick = () => {
        fileUpload.current.click();
    };

    const handleSubmit = async () => {
        if (!(!!description.length || !!selectedMediaUrls.length)) {
            dispatch(
                showToast(
                    'You need to select at least one img or need to write a description',
                    'error'
                )
            );
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < selectedMediaFiles.length; i++) {
            formData.append(`mediaData`, selectedMediaFiles[i]);
        }
        formData.append('description', description);

        const response = await API.post(`${API_URL.ADD_POST_URL}/${userDetails?.id}`, {
            data: formData,
            isMultipart: true
        });

        if (response?.status === CODES.SUCCESS && response?.data?.isSuccess) {
            dispatch(showToast(response?.data?.message));
            onConfirm();
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
            <Divider />
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
                    <Box className="flex media-selector-wrapper flex f-wrap">
                        {!!selectedMediaUrls.length &&
                            selectedMediaUrls.map((mediaDetails, index) => (
                                <React.Fragment key={mediaDetails.url}>
                                    {IMAGE_TYPE_FILE.includes(mediaDetails.mediaType) ? (
                                        <ImageBox
                                            className="img-display flex f-v-center f-h-center"
                                            $coverPic={mediaDetails.url}>
                                            {DeleteMediaUi(mediaDetails, index)}
                                        </ImageBox>
                                    ) : (
                                        <Box className="video-wrapper">
                                            <CardMedia
                                                className="video-display flex f-v-center f-h-center"
                                                component={'video'}
                                                src={mediaDetails.url}
                                                controls
                                            />
                                            {DeleteMediaUi(mediaDetails, index)}
                                        </Box>
                                    )}
                                </React.Fragment>
                            ))}
                        {selectedMediaUrls.length < MEDIA_LIMIT && (
                            <Box
                                className="add-file flex f-v-center f-h-center f-column hover"
                                onClick={handleFileUploadClick}>
                                <Typography className="add-media">+ Add Media</Typography>
                                <Typography className="limit">
                                    {`up to ${MEDIA_LIMIT} media files`}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    {selectedMediaUrls.length > MEDIA_LIMIT && (
                        <FormHelperText
                            error>{`You can't upload media files more than ${MEDIA_LIMIT}, Please delete ${
                            selectedMediaUrls.length - MEDIA_LIMIT
                        } media file`}</FormHelperText>
                    )}
                    <input
                        className="file-selector"
                        type="file"
                        name="mediaData"
                        accept={ACCEPT_FILE_TYPE}
                        ref={fileUpload}
                        onChange={handleFileHandler}
                        multiple
                    />
                </Box>
                <CustomButton
                    btnRounder={true}
                    onClick={handleSubmit}
                    disabled={selectedMediaUrls.length > MEDIA_LIMIT}>
                    Add Post
                </CustomButton>
            </Box>
        </AddPostWrapper>
    );
};

export default AddPost;
