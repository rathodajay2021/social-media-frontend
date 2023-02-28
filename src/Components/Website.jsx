import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ContentWrapper, WebsiteWrapper } from './Website.style';
import { getWindowDimensions } from 'Helpers/Utils.js';
import Route from 'Routes/Route';
import EventManager from 'Components/common/EventManager/EventManager';

const Website = () => {
    const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);

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
            <ContentWrapper $showBottomBar={isLoggedIn} $windowHeight={windowDimensions.height}>
                <Route />
            </ContentWrapper>
            <EventManager />
        </WebsiteWrapper>
    );
};

export default Website;
