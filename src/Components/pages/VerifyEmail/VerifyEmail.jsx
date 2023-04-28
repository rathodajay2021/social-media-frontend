//CORE
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, FormHelperText, IconButton, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//ICON
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

//CUSTOM
import { VerifyEmailWrapper } from './VerifyEmail.style';
import { showToast, userProfileData } from 'Redux/App/Actions';
import Api from 'Helpers/ApiHandler';
import { API_URL, URL_HOME_PAGE } from 'Helpers/Paths';
import Loader from 'Components/common/Loader';
import CODES from 'Helpers/StatusCodes';
import { loginUser } from 'Redux/Auth/Actions';

const VerifyEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const inputRef3 = useRef();
    const inputRef4 = useRef();
    const inputRef5 = useRef();
    const inputRef6 = useRef();
    const REFS = [inputRef1, inputRef2, inputRef3, inputRef4, inputRef5, inputRef6];
    const API = useMemo(() => new Api(), []);

    const [isValidOTP, setIsValidOTP] = useState(false);
    const [code, setCode] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const hideEmailId = (email) => {
        if (!email) return;
        if (email.includes('@')) {
            const index = email.indexOf('@');
            return email.slice(0, 2) + '*'.repeat(index - 4) + email.slice(index - 2, email.length);
        } else {
            return (
                email.slice(0, 2) +
                '*'.repeat(email.length - 4) +
                email.slice(email.length - 2, email.length)
            );
        }
    };

    const backButton = (e) => {
        if (e.keyCode === 8) {
            let newCode = [...code];

            newCode.pop();
            setCode(newCode);

            if (!newCode?.length) {
                inputRef1.current.value = '';
                inputRef1.current.focus();
            }
            if (newCode?.length === 1) {
                inputRef2.current.value = '';
                inputRef2.current.focus();
            }
            if (newCode?.length === 2) {
                inputRef3.current.value = '';
                inputRef3.current.focus();
            }
            if (newCode?.length === 3) {
                inputRef4.current.value = '';
                inputRef4.current.focus();
            }
            if (newCode?.length === 4) {
                inputRef5.current.value = '';
                inputRef5.current.focus();
            }
            if (newCode?.length === 5) {
                inputRef6.current.value = '';
                inputRef6.current.focus();
            }
        }
    };

    const onPaste = (value) => {
        const arr = value.split('');

        if (!arr?.length) return;

        inputRef1.current.value = arr[0] || '';
        inputRef2.current.value = arr[1] || '';
        inputRef3.current.value = arr[2] || '';
        inputRef4.current.value = arr[3] || '';
        inputRef5.current.value = arr[4] || '';
        inputRef6.current.value = arr[5] || '';

        if (arr?.length < 6) {
            dispatch(showToast('Please enter valid otp.', 'info'));
            return;
        }
        inputRef6.current.focus();
        setCode(arr);
    };

    const changeFocus = (e, ref, id) => {
        let newCode = [...code];
        newCode[id] = e.target.value;

        if (!e.target.value) return;

        if (ref === inputRef1) inputRef1.current.focus();
        if (ref === inputRef2) inputRef2.current.focus();
        if (ref === inputRef3) inputRef3.current.focus();
        if (ref === inputRef4) inputRef4.current.focus();
        if (ref === inputRef5) inputRef5.current.focus();
        if (ref === inputRef6) inputRef6.current.focus();
        setCode(newCode);
    };

    const verifyOtp = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await API.post(API_URL.VERIFY_OTP_URL, {
                data: {
                    email: location?.state?.email,
                    otp: code.join(''),
                    password: location?.state?.password
                }
            });

            if (response.status === CODES.SUCCESS) {
                setIsValidOTP(false);
                dispatch(loginUser(response?.data?.data));
                dispatch(userProfileData(response?.data?.data));
                navigate(URL_HOME_PAGE);
            }
            setIsLoading(false);
        } catch (error) {
            if (error?.response?.status === CODES.VALIDATION_ERROR) {
                setIsValidOTP(true);
            }
            setIsLoading(false);
            console.log('🚀 ~ file: VerifyEmail.jsx:118 ~ resendOtp ~ error:', error);
        }
    }, [API, location?.state?.email, location?.state?.password, code, dispatch, navigate]);

    const resendOtp = async() => {
        try {
            setIsLoading(true);
            setCode([]);
            REFS.forEach((item) => (item.current.value = ''));

            const response = await API.post(API_URL.RESEND_OTP_URL, {
                data: { email: location?.state?.email }
            });

            if (response.status === CODES.SUCCESS) {
                dispatch(showToast(response?.data?.message));
            }
            inputRef1.current.focus();
            setIsValidOTP(false);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log('🚀 ~ file: VerifyEmail.jsx:118 ~ resendOtp ~ error:', error);
        }
    };

    useEffect(() => {
        if (code.length === REFS?.length) {
            verifyOtp();
        }
    }, [verifyOtp, code, REFS?.length]);

    useEffect(() => {
        inputRef1.current.focus();
    }, []);

    return (
        <VerifyEmailWrapper className="flex f-v-center f-h-center">
            <Loader isLoading={isLoading} />
            <Box className="container">
                <Box className="mail-img"></Box>
                <IconButton className="back-icon" onClick={() => navigate(-1)}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                <Box className="data flex f-column f-v-center">
                    <Typography className="title">OTP Verification</Typography>
                    <Typography className="email-msg">
                        Enter the OTP sent to{' '}
                        <Typography component={'span'} className="email">
                            {hideEmailId(location?.state?.email)}
                        </Typography>
                    </Typography>
                    <Box className="input-fields">
                        {REFS.map((item, index) => (
                            <TextField
                                key={index}
                                variant="standard"
                                type="tel"
                                classes={{
                                    root: `root ${isValidOTP && 'error'}`
                                }}
                                inputProps={{
                                    maxLength: 1
                                }}
                                InputProps={{
                                    classes: {
                                        root: `${isValidOTP && 'input-root'}`
                                    }
                                }}
                                inputRef={item}
                                onPaste={(e) => onPaste(e.clipboardData.getData('Text'))}
                                onKeyUp={backButton}
                                onChange={(e) => changeFocus(e, REFS[index + 1], index)}
                            />
                        ))}
                    </Box>
                    {isValidOTP && (
                        <FormHelperText error className="invalid-otp-msg">
                            Invalid OTP. Please try again.
                        </FormHelperText>
                    )}
                    <Box className="links flex">
                        <Typography className="text">
                            Don't receive the OTP?{' '}
                            <Typography
                                component={'span'}
                                className="link hover"
                                onClick={resendOtp}>
                                Resend OTP
                            </Typography>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </VerifyEmailWrapper>
    );
};

export default VerifyEmail;
