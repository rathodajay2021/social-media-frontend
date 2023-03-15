//CORE
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

//ICON
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import GroupIcon from '@mui/icons-material/Group';

//CUSTOM
import { ProfileWrapper } from './Profile.style';
import { CreateUserName, getWindowDimensions, stringAvatar } from 'Helpers/Utils';
import Post from 'Components/common/Post';
import Api from 'Helpers/ApiHandler';
import { API_URL, URL_FRIEND_PAGE } from 'Helpers/Paths';
import { ImageBox } from 'Styles/CommonStyle';
import NoPost from 'Components/common/NoPost';
import NavBar from 'Components/common/NavBar';

const Profile = () => {
    const API = useMemo(() => new Api(), []);
    const postRef = useRef(null);
    const UserProfileData = useSelector((state) => state.App.userData);
    const navigate = useNavigate();

    const [userPostData, setUserPostData] = useState({});
    const [resetUser, setResetUser] = useState(true);
    const [friendList, setFriendList] = useState(0);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const handleRefetchUserPost = () => {
        setResetUser((prev) => !prev);
    };

    const scrollToPostSection = () => {
        postRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const getUserData = useCallback(async () => {
        if (UserProfileData?.id) {
            const response = await API.get(`${API_URL.GET_USER_POST_URL}/${UserProfileData?.id}`);

            if (response?.data) {
                setUserPostData(response?.data?.data);
            }
        }
    }, [API, UserProfileData]);

    const getFriendList = useCallback(async () => {
        if (UserProfileData?.id) {
            const response = await API.get(`${API_URL.GET_FRIEND_LIST_URL}/${UserProfileData?.id}`);

            if (response) {
                setFriendList(response?.data?.data?.count);
            }
        }
    }, [API, UserProfileData.id]);

    useEffect(() => {
        getUserData();
    }, [getUserData, resetUser]);

    useEffect(() => {
        getFriendList();
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [getFriendList]);

    return (
        <>
            <NavBar addReset={handleRefetchUserPost} />
            <ProfileWrapper $windowHeight={windowDimensions.height}>
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
                            <IconButton onClick={() => navigate(URL_FRIEND_PAGE)}>
                                <GroupIcon className="details-icon" />
                            </IconButton>
                        </Typography>
                        <Typography className="data flex f-h-center">{friendList}</Typography>
                    </Box>
                    {userPostData?.dob && (
                        <Box className="user-record">
                            <Typography className="data-label flex f-h-center">
                                <IconButton>
                                    <CalendarMonthIcon className="details-icon" />
                                </IconButton>
                            </Typography>
                            <Typography className="data flex f-h-center">
                                {moment(new Date(userPostData?.dob)).format('DD MMM')}
                            </Typography>
                        </Box>
                    )}
                    <Box className="user-record">
                        <Typography className="data-label flex f-h-center">
                            <IconButton onClick={scrollToPostSection}>
                                <LocalPostOfficeIcon className="details-icon" />
                            </IconButton>
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
                                allowDelete={true}
                                onDelete={handleRefetchUserPost}
                            />
                        ))}
                    </Box>
                ) : (
                    <NoPost wrapperHeight={250} />
                )}
            </ProfileWrapper>
        </>
    );
};

export default Profile;
