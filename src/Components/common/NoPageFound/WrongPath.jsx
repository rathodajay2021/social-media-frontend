//CORE
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideBottomBar, showBottomBar } from 'Redux/BottomBar/Actions';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

//CUSTOM
import { ImageBox } from 'Styles/CommonStyle';
import { COLORS, FONTS, responsive } from 'Styles/Constants';
import CustomButton from '../CustomBtn/CustomButton';
import { URL_HOME_PAGE } from 'Helpers/Paths';

//IMAGES
import noPageFound from 'Assets/images/noPageFound/noPageFound.png';

const WrongPath = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);

    useEffect(() => {
        dispatch(hideBottomBar());

        return () => isLoggedIn && dispatch(showBottomBar());
    }, [dispatch, isLoggedIn]);

    return (
        <WrongPathWrapper className="flex f-column f-v-center f-h-center">
            <ImageBox $coverPic={noPageFound} className="image-box"></ImageBox>
            <Typography className="error-code">404</Typography>
            <Typography className="error-message">page not found</Typography>
            <CustomButton
                onClick={() => navigate(URL_HOME_PAGE)}
                btnStyle={'btn-outline'}
                btnRounder={true}>
                go to home
            </CustomButton>
        </WrongPathWrapper>
    );
};

export default WrongPath;

const WrongPathWrapper = styled.div`
    height: 100vh;

    .image-box {
        height: 200px;
        width: 400px;

        ${responsive.MOBILE`
            width: 280px;
        `}
    }

    .error-code {
        font-family: ${FONTS.PRIMARY_BOLD};
        color: ${COLORS.MEDIUM_GREY};
        font-size: 60px;

        ${responsive.MOBILE`
            font-size: 40px;
        `}
    }

    .error-message {
        font-family: ${FONTS.PRIMARY_BOLD};
        color: ${COLORS.MEDIUM_GREY};
        font-size: 30px;
        text-transform: capitalize;
        margin: 0 0 10px 0;

        ${responsive.MOBILE`
            font-size: 20px;
        `}
    }
`;
