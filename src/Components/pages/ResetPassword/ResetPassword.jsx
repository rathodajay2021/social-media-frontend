//CORE
import React, { useState } from 'react';
import {
    Box,
    Button,
    FormHelperText,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

//ICON
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

//CUSTOM
import { ResetPasswordWrapper } from './ResetPassword.style';
import { URL_LOGIN } from 'Helpers/Paths';

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
            /(?=[A-Za-z0-9@#$%^&+!=\\/\]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&<>*~.:+`-])(?=.{10,}).*$/g,
            'Password must contain one upper case, one lowercase, one special character, one digit and must be of 10 characters'
        ),
    confirmPassword: Yup.string()
        .required('Please enter your password')
        .oneOf([Yup.ref('password'), null], 'Password Do not match')
});

const ResetPassword = () => {
    const Navigate = useNavigate();

    const [formOrder, setFormOrder] = useState(true);
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

    const handleFormOneSubmit = (values) => {
        console.log('🚀 ~ file: ResetPassword.jsx:17 ~ handleFormOneSubmit ~ values:', values);
        setFormOrder((prev) => !prev);
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
                                <Button className="submit-btn" onClick={handleSubmit}>
                                    Continue
                                </Button>
                            </Box>
                        )}
                    </Formik>
                )}
                {!formOrder && (
                    <Formik
                        initialValues={formTwoInitValue}
                        validationSchema={formTwoValidationSchema}
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
                                <Button className="submit-btn" onClick={handleSubmit}>
                                    reset password
                                </Button>
                            </Box>
                        )}
                    </Formik>
                )}
                <Box className="login-container flex f-h-center">
                    Already have an account?{' '}
                    <Box className="login-text" onClick={() => Navigate(URL_LOGIN)}>
                        login
                    </Box>
                </Box>
            </Box>
        </ResetPasswordWrapper>
    );
};

export default ResetPassword;
