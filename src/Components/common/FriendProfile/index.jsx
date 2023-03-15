//CORE
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

//ICON
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import GroupIcon from '@mui/icons-material/Group';

//CUSTOM
import Api from 'Helpers/ApiHandler';
import { FriendProfileWrapper } from './FriendProfile.style';
import { CreateUserName, getWindowDimensions, stringAvatar } from 'Helpers/Utils';
import { API_URL } from 'Helpers/Paths';
import NoPost from '../NoPost';
import Post from '../Post';
import { ImageBox } from 'Styles/CommonStyle';

const FriendProfile = () => {
    const API = useMemo(() => new Api(), []);
    const postRef = useRef(null);
    const location = useLocation();

    const { friendId } = location.state;
    const [userPostData, setUserPostData] = useState({});
    const [friendList, setFriendList] = useState({});
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const scrollToPostSection = () => {
        postRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const getUserData = useCallback(async () => {
        if (friendId) {
            const response = await API.get(`${API_URL.GET_USER_POST_URL}/${friendId}`);

            if (response?.data) {
                setUserPostData(response?.data?.data);
            }
        }
    }, [API, friendId]);

    const getFriendList = useCallback(async () => {
        if (friendId) {
            const response = await API.get(`${API_URL.GET_FRIEND_LIST_URL}/${friendId}`);

            if (response) {
                setFriendList(response.data);
            }
        }
    }, [API, friendId]);

    useEffect(() => {
        getFriendList();
        getUserData();
    }, [getFriendList, getUserData]);

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
        <FriendProfileWrapper $windowHeight={windowDimensions.height}>
            <Box className="user-basic-details">
                <ImageBox className="cover-pic" $coverPic={userPostData?.coverPic}></ImageBox>
                <Avatar
                    className="profile-pic"
                    {...stringAvatar(
                        CreateUserName(userPostData?.firstName, userPostData?.lastName),
                        userPostData?.profilePic
                    )}
                />
                <Box className="user-details">
                    <Typography className="user-name">
                        {CreateUserName(userPostData?.firstName, userPostData?.lastName)}
                    </Typography>
                    <Typography className="user-bio">{userPostData?.bio}</Typography>
                </Box>
            </Box>
            <Box className="user-status flex f-v-center f-h-space-between">
                <Box className="user-record">
                    <Typography className="data-label flex f-h-center">
                        <GroupIcon className="details-icon" />
                    </Typography>
                    <Typography className="data flex f-h-center">{friendList?.count}</Typography>
                </Box>
                {userPostData?.dob && (
                    <Box className="user-record">
                        <Typography className="data-label flex f-h-center">
                            <CalendarMonthIcon className="details-icon" />
                        </Typography>
                        <Typography className="data flex f-h-center">
                            {moment(new Date(userPostData?.dob)).format('DD MMM')}
                        </Typography>
                    </Box>
                )}
                <Box className="user-record">
                    <Typography
                        className="data-label flex f-h-center hover"
                        onClick={scrollToPostSection}>
                        <LocalPostOfficeIcon className="details-icon" />
                    </Typography>
                    <Typography className="data flex f-h-center">
                        {userPostData?.post_data && userPostData?.post_data.length}
                    </Typography>
                </Box>
            </Box>
            {userPostData?.post_data && !!userPostData?.post_data.length ? (
                <Box className="users-post-list flex f-column" ref={postRef}>
                    {userPostData?.post_data.map((item) => (
                        <Post
                            key={item.postId}
                            postData={item}
                            userFirstName={userPostData?.firstName}
                            userLastName={userPostData?.lastName}
                            userProfilePic={userPostData?.profilePic}
                            allowDelete={false}
                        />
                    ))}
                </Box>
            ) : (
                <NoPost wrapperHeight={250} />
            )}
        </FriendProfileWrapper>
    );
};

export default FriendProfile;
