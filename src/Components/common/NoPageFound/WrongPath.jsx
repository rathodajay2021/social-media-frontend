//CORE
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideBottomBar, showBottomBar } from 'Redux/BottomBar/Actions';

//CUSTOM
import { ImageBox } from 'Styles/CommonStyle';

//IMAGES
import noPageFoundImg from 'Assets/images/noPageFound/pageNotFound.png';

const WRONG_PATH_STYLE = {
    height: '100vh',
    width: '100vw'
};

const WrongPath = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);

    useEffect(() => {
        dispatch(hideBottomBar());

        return () => isLoggedIn && dispatch(showBottomBar());
    }, [dispatch, isLoggedIn]);

    return <ImageBox $coverPic={noPageFoundImg} style={WRONG_PATH_STYLE}></ImageBox>;
};

export default WrongPath;
