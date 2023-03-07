//CORE
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';

//CUSTOM
import { ProfileWrapper } from './Profile.style';
import { CreateUserName, stringAvatar } from 'Helpers/Utils';
import { hideNavBar, showNavBar } from 'Redux/BottomBar/Actions';
import Post from 'Components/common/Post';
import Api from 'Helpers/ApiHandler';
import { API_URL } from 'Helpers/Paths';
import { ImageBox } from 'Styles/CommonStyle';

const TEMP_BIO =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti nam voluptatibus ad. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti nam voluptatibus ad.';

const Profile = () => {
    const dispatch = useDispatch();
    const API = useMemo(() => new Api(), []);

    const [userPostData, setUserPostData] = useState({});
    const [userDetails, setUserDetails] = useState([]);
    const [resetUser, setResetUser] = useState(true);

    const handleRefetchUserPost = () => {
        setResetUser((prev) => !prev);
    };

    const getUserData = useCallback(async () => {
        const response = await API.get(`${API_URL.GET_USER_POST_URL}/${userDetails?.id}`);

        if (response) {
            setUserPostData(response?.data);
        }
    }, [API, userDetails]);

    useEffect(() => {
        getUserData();
    }, [getUserData, resetUser]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (user) {
            setUserDetails(user);
        }

        dispatch(showNavBar());

        return () => dispatch(hideNavBar());
    }, [dispatch]);
    return (
        <ProfileWrapper>
            <Box className="user-basic-details">
                <ImageBox className="cover-pic" $coverPic={userPostData?.coverPic}></ImageBox>
                <Avatar
                    className="profile-pic"
                    {...stringAvatar(
                        CreateUserName(userPostData?.firstName, userPostData?.lastName),
                        userPostData?.profilePic,
                        130,
                        130
                    )}
                />
                <Box className="user-details">
                    <Typography className="user-name">
                        {CreateUserName(userPostData?.firstName, userPostData?.lastName)}
                    </Typography>
                    <Typography className="user-bio">{userPostData?.bio || TEMP_BIO}</Typography>
                </Box>
            </Box>
            <Box className="user-status flex f-v-center f-h-space-between">
                <Box className="user-record">
                    <Typography className="data flex f-h-center">No</Typography>
                    <Typography className="data-label flex f-h-center">Friends</Typography>
                </Box>
                <Box className="user-record">
                    <Typography className="data flex f-h-center">No</Typography>
                    <Typography className="data-label flex f-h-center">DOB</Typography>
                </Box>
                <Box className="user-record">
                    <Typography className="data flex f-h-center">No</Typography>
                    <Typography className="data-label flex f-h-center">Posts</Typography>
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
                <Box className='no-post'>
                    <Typography className='no-post-text'>No post yet</Typography>
                </Box>
            )}
        </ProfileWrapper>
    );
};

export default Profile;
