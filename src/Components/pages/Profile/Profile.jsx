//CORE
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';
import moment from 'moment';

//CUSTOM
import { ProfileWrapper } from './Profile.style';
import { CreateUserName, getWindowDimensions, stringAvatar } from 'Helpers/Utils';
import Post from 'Components/common/Post';
import Api from 'Helpers/ApiHandler';
import { API_URL } from 'Helpers/Paths';
import { ImageBox } from 'Styles/CommonStyle';

//ICON
import NoPost from 'Components/common/NoPost';
import NavBar from 'Components/common/NavBar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';

const TEMP_BIO =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti nam voluptatibus ad. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti nam voluptatibus ad.';

const Profile = () => {
    const dispatch = useDispatch();
    const API = useMemo(() => new Api(), []);

    const [userPostData, setUserPostData] = useState({});
    const [userDetails, setUserDetails] = useState([]);
    const [resetUser, setResetUser] = useState(true);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const handleRefetchUserPost = () => {
        setResetUser((prev) => !prev);
    };

    const getUserData = useCallback(async () => {
        const response = await API.get(`${API_URL.GET_USER_POST_URL}/${userDetails?.id}`);

        if (response?.data) {
            setUserPostData(response?.data);
        }
    }, [API, userDetails]);

    useEffect(() => {
        getUserData();
    }, [getUserData, resetUser]);

    useEffect(() => {
        userPostData?.id && localStorage.setItem('userInfo', JSON.stringify(userPostData));
    }, [userPostData]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (user) {
            setUserDetails(user);
        }
    }, [dispatch]);

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
        <>
            <NavBar resetData={handleRefetchUserPost} />
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
                        <Typography className="user-bio">
                            {userPostData?.bio || TEMP_BIO}
                        </Typography>
                    </Box>
                </Box>
                <Box className="user-status flex f-v-center f-h-space-between">
                    <Box className="user-record">
                        <Typography className="data-label flex f-h-center">Friends</Typography>
                        <Typography className="data flex f-h-center">No</Typography>
                    </Box>
                    <Box className="user-record">
                        <Typography className="data-label flex f-h-center">
                            <CalendarMonthIcon className="details-icon" />
                        </Typography>
                        <Typography className="data flex f-h-center">
                            {moment(new Date(userPostData?.dob)).format('DD MMM')}
                        </Typography>
                    </Box>
                    <Box className="user-record">
                        <Typography className="data-label flex f-h-center">
                            <LocalPostOfficeIcon className="details-icon" />
                        </Typography>
                        <Typography className="data flex f-h-center">0</Typography>
                    </Box>
                </Box>
                {userPostData?.post_data && !!userPostData?.post_data.length ? (
                    <Box className="users-post-list flex f-column">
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
