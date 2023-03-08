//CORE
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';

//CUSTOM
import Post from 'Components/common/Post';
import { hideNavBar, showNavBar } from 'Redux/BottomBar/Actions';
import { HomePageWrapper } from './HomePage.style';
import Api from 'Helpers/ApiHandler';
import { API_URL } from 'Helpers/Paths';
import NoPost from 'Components/common/NoPost';

const HomePage = () => {
    const dispatch = useDispatch();
    const API = useMemo(() => new Api(), []);

    const [postData, setPostData] = useState([]);

    const getAllPostData = useCallback(async () => {
        const response = await API.get(API_URL.GET_ALL_POST_URL);

        if (response) {
            setPostData(response?.data);
        }
    }, [API]);

    useEffect(() => {
        dispatch(showNavBar());

        return () => dispatch(hideNavBar());
    }, [dispatch]);

    useEffect(() => {
        getAllPostData();
    }, [getAllPostData]);

    return (
        <HomePageWrapper>
            {!!postData.length ? (
                <Box className="users-post-list flex f-column">
                    {postData.map((item) => (
                        <Post
                            key={item.postId}
                            postData={item}
                            userFirstName={item?.user?.firstName}
                            userLastName={item?.user?.lastName}
                            userProfilePic={item?.user?.profilePic}
                            allowDelete={false}
                        />
                    ))}
                </Box>
            ) : (
                <NoPost />
            )}
        </HomePageWrapper>
    );
};

export default HomePage;
