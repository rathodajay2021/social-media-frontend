//CORE
import React, { useMemo, useState } from 'react';
import {
    Box,
    FormHelperText,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

//ICON
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

//CUSTOM
import { ResetPasswordWrapper } from './ResetPassword.style';
import { API_URL, URL_LOGIN } from 'Helpers/Paths';
import { PASSWORD_REGEX } from 'Helpers/Constants';
import Api from 'Helpers/ApiHandler';
import CODES from 'Helpers/StatusCodes';
import { showToast } from 'Redux/App/Actions';
import CustomButton from 'Components/common/CustomBtn/CustomButton';

const formOneInitValue = {
    email: ''
};

const formTwoInitValue = {
    password: '',
    confirmPassword: ''
};

const formOneValidationSchema = Yup.object({
    email: Yup.string()
        .required('Please enter your email address')
        .email('Please enter valid email address')
});

const formTwoValidationSchema = Yup.object({
    password: Yup.string()
        .required('Please enter your password')
        .matches(
            PASSWORD_REGEX,
            'Password must contain one upper case, one lowercase, one special character, one digit and must be of 10 characters'
        ),
    confirmPassword: Yup.string()
        .required('Please enter your password')
        .oneOf([Yup.ref('password'), null], 'Password Do not match')
});

const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const API = useMemo(() => new Api(), []);

    const [formOrder, setFormOrder] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

    const handleFormOneSubmit = async (values) => {
        const response = await API.post(API_URL.VALIDATE_USER_URL, {
            data: values
        });
        if (response.status === CODES.SUCCESS && response?.data?.isUserVerified) {
            setUserEmail(values.email);
            setFormOrder((prev) => !prev);
        }
        dispatch(showToast(response?.data?.message, 'warning'));
    };

    const handleFormTwoSubmit = async (values) => {
        const reqBody = {
            email: userEmail,
            password: values.password
        };
        const response = await API.put(API_URL.RESET_PASSWORD_URL, {
            data: reqBody
        });
        if (response?.status === CODES.SUCCESS && response?.data?.isUserVerified) {
            dispatch(showToast(response?.data?.message));
            navigate(URL_LOGIN);
            return;
        }
        dispatch(showToast(response?.data?.message));
    };

    return (
        <ResetPasswordWrapper className="flex f-h-center">
            <Box className="reset-password-screen flex f-column f-v-center">
                <Box className="heading flex f-v-center">
                    <Typography className="title">
                        {formOrder ? 'reset ' : 'new '} password
                    </Typography>
                </Box>
                {formOrder && (
                    <Formik
                        initialValues={formOneInitValue}
                        validationSchema={formOneValidationSchema}
                        onSubmit={handleFormOneSubmit}>
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleSubmit,
                            setFieldValue
                        }) => (
                            <Box className="reset-password-field flex f-column">
                                <Box className="field-wrapper">
                                    <TextField
                                        variant="outlined"
                                        name="email"
                                        className="input-field"
                                        placeholder="Email address or phone number"
                                        value={values?.email}
                                        onChange={handleChange}
                                        InputProps={{
                                            classes: {
                                                root: 'input-field-root',
                                                focused: 'input-focused',
                                                notchedOutline: 'input-outline'
                                            }
                                        }}
                                    />
                                    <FormHelperText error>
                                        {touched?.email && errors?.email}
                                    </FormHelperText>
                                </Box>
                                <CustomButton
                                    btnSize="btn-large"
                                    btnRounder={true}
                                    onClick={handleSubmit}>
                                    Continue
                                </CustomButton>
                            </Box>
                        )}
                    </Formik>
                )}
                {!formOrder && (
                    <Formik
                        initialValues={formTwoInitValue}
                        validationSchema={formTwoValidationSchema}
                        onSubmit={handleFormTwoSubmit}>
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleSubmit,
                            setFieldValue
                        }) => (
                            <Box className="reset-password-field flex f-column">
                                <Box className="field-wrapper">
                                    <TextField
                                        variant="outlined"
                                        className="input-field"
                                        name="password"
                                        placeholder="Password"
                                        type={passwordVisibility ? 'text' : 'password'}
                                        value={values?.password}
                                        onChange={handleChange}
                                        InputProps={{
                                            classes: {
                                                root: 'password-field-root',
                                                focused: 'input-focused',
                                                notchedOutline: 'input-outline'
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            setPasswordVisibility((prev) => !prev)
                                                        }>
                                                        {passwordVisibility ? (
                                                            <VisibilityIcon />
                                                        ) : (
                                                            <VisibilityOffIcon />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <FormHelperText error>
                                        {touched?.password && errors?.password}
                                    </FormHelperText>
                                </Box>
                                <Box className="field-wrapper">
                                    <TextField
                                        variant="outlined"
                                        className="input-field"
                                        name="confirmPassword"
                                        placeholder="Confirm password"
                                        type={confirmPasswordVisibility ? 'text' : 'password'}
                                        value={values?.confirmPassword}
                                        onChange={handleChange}
                                        InputProps={{
                                            classes: {
                                                root: 'password-field-root',
                                                focused: 'input-focused',
                                                notchedOutline: 'input-outline'
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            setConfirmPasswordVisibility(
                                                                (prev) => !prev
                                                            )
                                                        }>
                                                        {confirmPasswordVisibility ? (
                                                            <VisibilityIcon />
                                                        ) : (
                                                            <VisibilityOffIcon />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <FormHelperText error>
                                        {touched?.confirmPassword && errors?.confirmPassword}
                                    </FormHelperText>
                                </Box>
                                <CustomButton
                                    btnSize="btn-large"
                                    btnRounder={true}
                                    onClick={handleSubmit}>
                                    reset password
                                </CustomButton>
                            </Box>
                        )}
                    </Formik>
                )}
                <Box className="login-container flex f-h-center">
                    Already have an account?{' '}
                    <Box className="login-text" onClick={() => navigate(URL_LOGIN)}>
                        login
                    </Box>
                </Box>
            </Box>
        </ResetPasswordWrapper>
    );
};

export default ResetPassword;
