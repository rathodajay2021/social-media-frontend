import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ContentWrapper, WebsiteWrapper } from './Website.style';
import { getWindowDimensions } from 'Helpers/Utils.js';
import Route from 'Routes/Route';
import EventManager from 'Components/common/EventManager';
import BottomBar from './common/BottomBar';
import NavBar from './common/NavBar';

const Website = () => {
    const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);
    const showBottomBar = useSelector((state) => state.BottomNavBar.showBottomBar);
    const showNavBar = useSelector((state) => state.BottomNavBar.showNavBar);

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

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
            {isLoggedIn && showNavBar && <NavBar />}
            <ContentWrapper
                $bottomBarHeight={isLoggedIn && showBottomBar ? 60 : 0}
                $navBarHeight={isLoggedIn && showNavBar ? 60 : 0}
                $windowHeight={windowDimensions.height}>
                <Route />
            </ContentWrapper>
            {isLoggedIn && showBottomBar && <BottomBar />}
            <EventManager />
        </WebsiteWrapper>
    );
};

export default Website;
