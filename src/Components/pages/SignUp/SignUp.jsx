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
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

//ICON
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

//CUSTOM
import { SignUpWrapper } from './SignUp.style';
import { URL_LOGIN } from 'Helpers/Paths';

const SignUpInitValue = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const validationSchema = Yup.object({
    firstName: Yup.string().required('Please enter first name'),
    lastName: Yup.string().required('Please enter last name'),
    email: Yup.string()
        .required('Please enter your email address')
        .email('Please enter valid email address'),
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

const SignUp = () => {
    const Navigate = useNavigate();
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

    const handleSubmit = (values) => {
        console.log('🚀 ~ file: SignUp.jsx:19 ~ handleSubmit ~ values:', values);
    };

    return (
        <SignUpWrapper className="flex f-h-center">
            <Box className="sign-up-screen flex f-column f-v-center">
                <Box className="heading flex f-v-center">
                    <Typography className="title">create account</Typography>
                </Box>
                <Formik
                    initialValues={SignUpInitValue}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}>
                    {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
                        <Box className="sign-up-field flex f-column">
                            <Box className="user-name flex">
                                <Box className="field-wrapper">
                                    <TextField
                                        variant="outlined"
                                        name="firstName"
                                        className="input-field"
                                        placeholder="First Name"
                                        value={values?.firstName}
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
                                        {touched?.firstName && errors?.firstName}
                                    </FormHelperText>
                                </Box>
                                <Box className="field-wrapper">
                                    <TextField
                                        name="lastName"
                                        variant="outlined"
                                        className="input-field"
                                        placeholder="Last Name"
                                        value={values?.lastName}
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
                                        {touched?.lastName && errors?.lastName}
                                    </FormHelperText>
                                </Box>
                            </Box>
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
                            <Button className="sign-up-btn" onClick={handleSubmit}>
                                Sign up
                            </Button>
                            <Box className="login-container flex f-h-center">
                                Already have an account?{' '}
                                <Box className="login-text" onClick={() => Navigate(URL_LOGIN)}>
                                    login
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Formik>
            </Box>
        </SignUpWrapper>
    );
};

export default SignUp;
