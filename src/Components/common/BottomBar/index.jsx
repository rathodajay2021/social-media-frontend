//CORE
import React, { useEffect, useState } from 'react';
import { Avatar, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//icon
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import NotificationsIcon from '@mui/icons-material/Notifications';

//CUSTOM
import { CreateUserName, getWindowDimensions, stringAvatar } from 'Helpers/Utils';
import { selectMenu } from 'Redux/BottomBar/Actions';
import { BREAKPOINTS_VALUE, COLORS } from 'Styles/Constants';
import {
    URL_FRIEND_PAGE,
    URL_HOME_PAGE,
    URL_NOTIFICATION_PAGE,
    URL_PROFILE_PAGE
} from 'Helpers/Paths';

const BOTTOM_NAVIGATION_BAR = {
    height: 60
};

const BottomBar = () => {
    const selectedMenu = useSelector((state) => state.BottomNavBar.selectedMenu);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState([]);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (user) {
            setUserDetails(user);
        }

        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <BottomNavigation
            showLabels={windowDimensions.width > BREAKPOINTS_VALUE.TABLET}
            sx={{
                height: BOTTOM_NAVIGATION_BAR.height,
                borderTop: `1px solid ${COLORS.LIGHT_GREY_SECONDARY}`
            }}
            value={selectedMenu}
            onChange={(event, newValue) => dispatch(selectMenu(newValue))}>
            <BottomNavigationAction
                label="Post"
                onClick={() => navigate(URL_HOME_PAGE)}
                icon={<HomeIcon />}
            />
            <BottomNavigationAction
                label="Friends"
                onClick={() => navigate(URL_FRIEND_PAGE)}
                icon={<GroupIcon />}
            />
            <BottomNavigationAction
                label="Notification"
                onClick={() => navigate(URL_NOTIFICATION_PAGE)}
                icon={<NotificationsIcon />}
            />
            <BottomNavigationAction
                label="Profile"
                onClick={() => navigate(URL_PROFILE_PAGE)}
                icon={
                    <Avatar
                        {...stringAvatar(
                            CreateUserName(userDetails?.firstName, userDetails?.lastName),
                            userDetails?.profilePic
                        )}
                    />
                }
            />
        </BottomNavigation>
    );
};

export default BottomBar;
