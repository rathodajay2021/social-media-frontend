//CORE
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';

//CUSTOM
import Post from 'Components/common/Post';
import { HomePageWrapper } from './HomePage.style';
import Api from 'Helpers/ApiHandler';
import { API_URL } from 'Helpers/Paths';
import NoPost from 'Components/common/NoPost';
import NavBar from 'Components/common/NavBar';
import { getWindowDimensions } from 'Helpers/Utils';

const HomePage = () => {
    const API = useMemo(() => new Api(), []);

    const [postData, setPostData] = useState([]);
    const [resetPost, setResetPost] = useState(false)
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const getAllPostData = useCallback(async () => {
        const response = await API.get(API_URL.GET_ALL_POST_URL);

        if (response) {
            setPostData(response?.data);
        }
    }, [API]);

    const postResetHandler = () => {
        setResetPost(prev => !prev)
    }

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        getAllPostData();
    }, [getAllPostData, resetPost]);

    return (
        <>
            <NavBar resetData={() => postResetHandler()} />
            <HomePageWrapper $windowHeight={windowDimensions.height}>
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
        </>
    );
};

export default HomePage;
