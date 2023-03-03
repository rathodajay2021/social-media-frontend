import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ContentWrapper, WebsiteWrapper } from './Website.style';
import { getWindowDimensions } from 'Helpers/Utils.js';
import Route from 'Routes/Route';
import EventManager from 'Components/common/EventManager/EventManager';
import BottomBar from './common/BottomBar/BottomBar';

const Website = () => {
    const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);
    const showBottomBar = useSelector((state) => state.BottomNavBar.showBottomBar);

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
            <ContentWrapper
                $showBottomBar={isLoggedIn && showBottomBar}
                $windowHeight={windowDimensions.height}>
                <Route />
            </ContentWrapper>
            {isLoggedIn && showBottomBar && <BottomBar />}
            <EventManager />
        </WebsiteWrapper>
    );
};

export default Website;
