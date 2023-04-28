//CORE
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

//CUSTOM
import Post from 'Components/common/Post';
import { HomePageWrapper } from './HomePage.style';
import Api from 'Helpers/ApiHandler';
import { API_URL } from 'Helpers/Paths';
import NoPost from 'Components/common/NoPost';
import NavBar from 'Components/common/NavBar';
import { getWindowDimensions } from 'Helpers/Utils';
import { PAGINATION_INIT } from 'Helpers/Constants';
import Loader from 'Components/common/Loader';
import LoadMore from 'Components/common/LoadMore';
import LeftMenu from 'Components/common/LeftMenu';
import { BREAKPOINTS_VALUE } from 'Styles/Constants';

const HomePage = () => {
    const API = useMemo(() => new Api(), []);
    const userProfileData = useSelector((state) => state?.App.userData);

    const [postData, setPostData] = useState({
        data: [],
        totalRecord: 0
    });
    const [resetPost, setResetPost] = useState(false);
    const [paginationInfo, setPaginationInfo] = useState(PAGINATION_INIT);
    const [loading, setLoading] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const getAllPostData = useCallback(async () => {
        if (userProfileData?.id) {
            setLoading(true);
            const response = await API.post(`${API_URL.GET_ALL_POST_URL}/${userProfileData?.id}`, {
                data: {
                    perPage: paginationInfo.perPage,
                    page: paginationInfo.pageNo
                }
            });

            if (response) {
                setPostData((prev) => {
                    let arr =
                        paginationInfo.pageNo === 0
                            ? response?.data?.data?.rows
                            : prev.data.concat(response?.data?.data?.rows);

                    return {
                        data: [...new Map(arr.map((item) => [item['postId'], item])).values()],
                        totalRecord: response?.data?.data?.count
                    };
                });
                setLoading(false);
            }
        }
    }, [API, paginationInfo, userProfileData?.id]);

    const handlePagination = () => {
        setPaginationInfo((prev) => {
            return { ...prev, pageNo: prev.pageNo + 1 };
        });
    };

    const postResetHandler = () => {
        setResetPost((prev) => !prev);
    };

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
            <HomePageWrapper $windowHeight={windowDimensions.height} className="flex">
                <Loader isLoading={loading} loadingText={'Loading...'} />
                {windowDimensions.width > BREAKPOINTS_VALUE.TABLET && (
                    <LeftMenu $windowHeight={windowDimensions.height} />
                )}
                <Box className="post-area flex f-column">
                    {!!postData?.data.length ? (
                        <>
                            <Box className="users-post-list flex f-column">
                                {postData?.data.map((item) => (
                                    <Post
                                        key={item.postId}
                                        postData={item}
                                        userFirstName={item?.user?.firstName}
                                        userLastName={item?.user?.lastName}
                                        userProfilePic={item?.user?.profilePic}
                                        allowDelete={false}
                                        redirect={true}
                                        userProfileData={userProfileData}
                                        setTotalPostData={setPostData}
                                        allPostData={postData}
                                    />
                                ))}
                            </Box>
                            {postData?.data?.length < postData?.totalRecord && (
                                <LoadMore onClickFuc={handlePagination} />
                            )}
                        </>
                    ) : (
                        <NoPost />
                    )}
                </Box>
            </HomePageWrapper>
        </>
    );
};

export default HomePage;
