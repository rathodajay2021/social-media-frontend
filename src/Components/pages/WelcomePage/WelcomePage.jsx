import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { WelcomePageWrapper } from './WelcomePage.style';
import { APP_NAME } from 'Helpers/Constants';
import { URL_LOGIN, URL_SIGN_UP } from 'Helpers/Paths';

const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <WelcomePageWrapper className="flex f-h-center">
            <Box className="welcome-field flex f-column">
                <Box className="heading">
                    <Typography className="title">{APP_NAME}</Typography>
                    <Typography className="description">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati illo
                        nobis nesciunt accusantium aut!
                    </Typography>
                </Box>
                <Box className="btn-section flex f-column">
                    <Button className="btn login-btn" onClick={() => navigate(URL_LOGIN)}>
                        login
                    </Button>
                    <Button className="btn sign-up-btn" onClick={() => navigate(URL_SIGN_UP)}>
                        sign up
                    </Button>
                </Box>
            </Box>
        </WelcomePageWrapper>
    );
};

export default WelcomePage;
