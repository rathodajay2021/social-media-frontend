import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ContentWrapper, WebsiteWrapper } from './Website.style';
import { getWindowDimensions } from 'Helpers/Utils.js';
import Route from 'Routes/Route';
import EventManager from 'Components/common/EventManager';
import BottomBar from './common/BottomBar';
import { userProfileData } from 'Redux/App/Actions';

const Website = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);
    const showBottomBar = useSelector((state) => state.BottomNavBar.showBottomBar);

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        user?.id && dispatch(userProfileData(user))
    }, [user, dispatch]);

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <WebsiteWrapper>
            <ContentWrapper
                $bottomBarHeight={isLoggedIn && showBottomBar ? 60 : 0}
                $windowHeight={windowDimensions.height}>
                <Route />
            </ContentWrapper>
            {isLoggedIn && showBottomBar && <BottomBar />}
            <EventManager />
        </WebsiteWrapper>
    );
};

export default Website;
