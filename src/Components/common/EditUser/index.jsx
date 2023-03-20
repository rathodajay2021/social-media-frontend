//CORE
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    Avatar,
    Box,
    Divider,
    FormHelperText,
    IconButton,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';

//ICONS
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

//CUSTOM
import { EditUserWrapper } from './EditUser.style';
import { ImageBox } from 'Styles/CommonStyle';
import { CreateUserName, stringAvatar } from 'Helpers/Utils';
import CustomButton from '../CustomBtn/CustomButton';
import Api from 'Helpers/ApiHandler';
import { API_URL } from 'Helpers/Paths';
import CODES from 'Helpers/StatusCodes';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from 'Redux/App/Actions';

const TEXT_LENGTH = 255;

const IMG_FILE_TYPE = 'image/png, image/jpeg, image/jpg';

const FORM_INIT_VALUE = {
    firstName: '',
    lastName: '',
    bio: '',
    dob: null
};

const FORM_VALIDATION = Yup.object({
    firstName: Yup.string().required('Please enter your first name'),
    lastName: Yup.string().required('Please enter your last name')
});

const EditUser = ({ onClose, onConfirm }) => {
    const API = useMemo(() => new Api(), []);
    const UserProfileData = useSelector((state) => state.App.userData);
    const dispatch = useDispatch();
    const coverPicRef = useRef(null);
    const profilePicRef = useRef(null);
    const userFormInnerRef = useRef(null);

    const [coverPicFile, setCoverPicFile] = useState({
        file: {},
        url: ''
    });
    const [profilePicFile, setProfilePicFile] = useState({
        file: {},
        url: ''
    });

    const coverPicFileHandler = (e) => {
        setCoverPicFile({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        });
    };

    const profilePicFileHandler = (e) => {
        setProfilePicFile({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        });
    };

    const deleteCoverPicHandler = () => {
        setCoverPicFile({
            file: {},
            url: null
        });
    };

    const deleteProfilePicHandler = () => {
        setProfilePicFile({
            file: {},
            url: null
        });
    };

    const userFromSubmit = async (values) => {
        const formData = new FormData();
        formData.append('coverPic', coverPicFile?.file);
        formData.append('profilePic', profilePicFile?.file);
        formData.append('coverPicUrl', coverPicFile?.url);
        formData.append('profilePicUrl', profilePicFile?.url);
        formData.append('firstName', values?.firstName);
        formData.append('lastName', values?.lastName);
        formData.append('bio', values?.bio);
        !!values.dob &&
            formData.append('dob', moment(values?.dob, 'DD/MM/YYYY').format('YYYY-MM-DD'));

        const response = await API.put(`${API_URL.EDIT_USER_URL}/${UserProfileData?.id}`, {
            data: formData,
            isMultipart: true
        });

        if (response.status === CODES.SUCCESS) {
            dispatch(showToast(response?.data?.message, 'success'));
            onConfirm();
        }
    };

    const getUserDetails = useCallback(async () => {
        const response = await API.get(`${API_URL.GET_USER_DATA_URL}/${UserProfileData?.id}`);

        if (response?.data && response.status === CODES.SUCCESS) {
            userFormInnerRef.current.setFieldValue('firstName', response?.data?.data?.firstName);
            userFormInnerRef.current.setFieldValue('lastName', response?.data?.data?.lastName);
            userFormInnerRef.current.setFieldValue('bio', response?.data?.data?.bio || '');
            userFormInnerRef.current.setFieldValue(
                'dob',
                !!response?.data?.data?.dob
                    ? moment(new Date(response?.data?.data?.dob)).format('DD/MM/YYYY')
                    : null
            );
            setCoverPicFile({ file: {}, url: response?.data?.data?.coverPic });
            setProfilePicFile({ file: {}, url: response?.data?.data?.profilePic });
        }
    }, [API, UserProfileData]);

    useEffect(() => {
        getUserDetails();
    }, [getUserDetails]);

    return (
        <EditUserWrapper open onClose={onClose} fullWidth maxWidth="sm">
            <Box className="edit-profile-header flex f-v-center f-h-space-between">
                <Typography className="title">edit user</Typography>
                <IconButton className="close-icon" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            <Formik
                innerRef={userFormInnerRef}
                initialValues={FORM_INIT_VALUE}
                onSubmit={userFromSubmit}
                validationSchema={FORM_VALIDATION}>
                {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
                    <>
                        <Box className="edit-form">
                            <input
                                type="file"
                                name="coverPic"
                                className="coverPic"
                                accept={IMG_FILE_TYPE}
                                ref={coverPicRef}
                                onChange={coverPicFileHandler}
                            />
                            <input
                                type="file"
                                name="profilePic"
                                className="profilePic"
                                accept={IMG_FILE_TYPE}
                                ref={profilePicRef}
                                onChange={profilePicFileHandler}
                            />
                            <ImageBox
                                className="cover-pic-display flex f-h-end"
                                $coverPic={coverPicFile.url}>
                                <Tooltip title="Edit" placement="bottom">
                                    <IconButton
                                        className="icon-btn"
                                        onClick={() => coverPicRef?.current?.click()}>
                                        <EditIcon className="action-icon" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete" placement="bottom">
                                    <IconButton
                                        className="icon-btn"
                                        onClick={deleteCoverPicHandler}>
                                        <DeleteIcon className="action-icon" />
                                    </IconButton>
                                </Tooltip>
                            </ImageBox>
                            <Box className="profile-pic-wrapper flex f-v-center f-h-center f-column">
                                <Box className="profile-avatar-div">
                                    <Avatar
                                        {...stringAvatar(
                                            CreateUserName(
                                                UserProfileData?.firstName,
                                                UserProfileData?.lastName
                                            ),
                                            profilePicFile.url
                                        )}
                                        className="profile-pic-avatar"
                                    />
                                    {profilePicFile.url && (
                                        <Tooltip title="Delete" placement="top">
                                            <IconButton
                                                className="icon-btn"
                                                onClick={deleteProfilePicHandler}>
                                                <DeleteIcon className="action-icon" />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Box>
                                <Typography
                                    className="profile-pic-text hover"
                                    onClick={() => profilePicRef?.current?.click()}>
                                    change profile pic
                                </Typography>
                            </Box>

                            <Box className="user-form">
                                <Box className="user-name flex">
                                    <Box className="filed-wrapper user-name-field">
                                        <Typography className="form-label">first name :</Typography>
                                        <TextField
                                            variant="outlined"
                                            name="firstName"
                                            className="input-field"
                                            placeholder="Enter you first name"
                                            value={values?.firstName}
                                            onChange={handleChange}
                                            InputProps={{
                                                classes: {
                                                    focused: 'input-focused',
                                                    notchedOutline: 'input-outline'
                                                }
                                            }}
                                        />
                                        <FormHelperText error>
                                            {touched?.firstName && errors?.firstName}
                                        </FormHelperText>
                                    </Box>
                                    <Box className="filed-wrapper user-name-field">
                                        <Typography className="form-label">last name :</Typography>
                                        <TextField
                                            variant="outlined"
                                            name="lastName"
                                            className="input-field"
                                            placeholder="Enter you last name"
                                            value={values?.lastName}
                                            onChange={handleChange}
                                            InputProps={{
                                                classes: {
                                                    focused: 'input-focused',
                                                    notchedOutline: 'input-outline'
                                                }
                                            }}
                                        />
                                        <FormHelperText error>
                                            {touched?.lastName && errors?.lastName}
                                        </FormHelperText>
                                    </Box>
                                </Box>
                                <Box className="filed-wrapper">
                                    <Typography className="form-label">bio :</Typography>
                                    <TextField
                                        variant="outlined"
                                        name="bio"
                                        className="input-field"
                                        placeholder="Tell us something about yourself"
                                        value={values?.bio}
                                        onChange={handleChange}
                                        inputProps={{ maxLength: TEXT_LENGTH }}
                                        multiline
                                        maxRows={6}
                                        minRows={6}
                                        InputProps={{
                                            classes: {
                                                focused: 'input-focused',
                                                notchedOutline: 'input-outline'
                                            }
                                        }}
                                    />
                                    <FormHelperText className="bio-char-limit">{`${
                                        values?.bio.slice(0, TEXT_LENGTH).length
                                    }/${TEXT_LENGTH}`}</FormHelperText>
                                </Box>
                                <Box className="field-wrapper">
                                    <Typography className="form-label">DOB :</Typography>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            inputFormat="DD/MM/YYYY"
                                            value={
                                                !!values.dob
                                                    ? moment(values.dob, 'DD/MM/YYYY')
                                                    : null
                                            }
                                            name="dob"
                                            onChange={(newValue) => {
                                                setFieldValue(
                                                    'dob',
                                                    moment(new Date(newValue.$d)).format(
                                                        'DD/MM/YYYY'
                                                    )
                                                );
                                            }}
                                            className="input-field"
                                            InputProps={{
                                                classes: {
                                                    focused: 'input-focused',
                                                    notchedOutline: 'input-outline'
                                                }
                                            }}
                                            maxDate={new Date()}
                                            renderInput={(params) => {
                                                return (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        fullWidth
                                                        autoComplete="off"
                                                    />
                                                );
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Box>
                            </Box>
                        </Box>
                        <Divider />
                        <Box className="submit-btn-section flex f-h-center">
                            <CustomButton fullWidth btnRounder={true} onClick={handleSubmit}>
                                save changes
                            </CustomButton>
                        </Box>
                    </>
                )}
            </Formik>
        </EditUserWrapper>
    );
};

export default EditUser;
