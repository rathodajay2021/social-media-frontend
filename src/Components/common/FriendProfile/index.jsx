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
import Loader from '../Loader';
import LoadMore from '../LoadMore';

const PAGINATION_INIT = {
    perPage: 5,
    pageNo: 0
};

const FriendProfile = () => {
    const API = useMemo(() => new Api(), []);
    const postRef = useRef(null);
    const location = useLocation();

    const { friendId } = location.state;
    const [userData, setUserData] = useState({});
    const [userPostData, setUserPostData] = useState({});
    const [paginationInfo, setPaginationInfo] = useState(PAGINATION_INIT);
    const [friendList, setFriendList] = useState({});
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [loading, setLoading] = useState(false);

    const scrollToPostSection = () => {
        postRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handlePagination = () => {
        setPaginationInfo((prev) => {
            return {
                ...prev,
                pageNo: prev.pageNo + 1
            };
        });
    };

    const getUserData = useCallback(async () => {
        if (friendId) {
            setLoading(true);
            const response = await API.get(`${API_URL.GET_USER_DATA_URL}/${friendId}`);

            if (response?.data) {
                setUserData(response?.data?.data);
                setLoading(false);
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

    const getUserPostData = useCallback(async () => {
        if (friendId) {
            setLoading(true);
            const response = await API.post(`${API_URL.GET_USER_POST_URL}/${friendId}`, {
                data: {
                    page: paginationInfo.pageNo,
                    perPage: paginationInfo.perPage
                }
            });

            if (response) {
                setUserPostData((prev) => {
                    let arr =
                        paginationInfo.pageNo === 0
                            ? response?.data?.data?.rows
                            : prev?.data.concat(response?.data?.data?.rows);
                    return {
                        totalRecord: response?.data?.data?.count,
                        data: [...new Map(arr.map((item) => [item['postId'], item])).values()]
                    };
                });
                setLoading(false);
            }
        }
    }, [API, friendId, paginationInfo]);

    useEffect(() => {
        getFriendList();
        getUserData();
        getUserPostData();
    }, [getFriendList, getUserData, getUserPostData]);

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
            <Loader isLoading={loading} />
            <Box className="user-basic-details">
                <ImageBox className="cover-pic" $coverPic={userData?.coverPic}></ImageBox>
                <Avatar
                    className="profile-pic"
                    {...stringAvatar(
                        CreateUserName(userData?.firstName, userData?.lastName),
                        userData?.profilePic
                    )}
                />
                <Box className="user-details">
                    <Typography className="user-name">
                        {CreateUserName(userData?.firstName, userData?.lastName)}
                    </Typography>
                    <Typography className="user-bio">{userData?.bio}</Typography>
                </Box>
            </Box>
            <Box className="user-status flex f-v-center f-h-space-between">
                <Box className="user-record">
                    <Typography className="data-label flex f-h-center">
                        <GroupIcon className="details-icon" />
                    </Typography>
                    <Typography className="data flex f-h-center">{friendList?.count}</Typography>
                </Box>
                {userData?.dob && (
                    <Box className="user-record">
                        <Typography className="data-label flex f-h-center">
                            <CalendarMonthIcon className="details-icon" />
                        </Typography>
                        <Typography className="data flex f-h-center">
                            {moment(new Date(userData?.dob)).format('DD MMM')}
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
                        {userPostData?.totalRecord}
                    </Typography>
                </Box>
            </Box>
            {userPostData?.data && !!userPostData?.data.length ? (
                <Box className="users-post-list flex f-column" ref={postRef}>
                    {userPostData?.data.map((item) => (
                        <Post
                            key={item.postId}
                            postData={item}
                            userFirstName={userData?.firstName}
                            userLastName={userData?.lastName}
                            userProfilePic={userData?.profilePic}
                            allowDelete={false}
                        />
                    ))}
                    {userPostData?.data.length < userPostData?.totalRecord && (
                        <LoadMore onClickFuc={handlePagination} />
                    )}
                </Box>
            ) : (
                <NoPost wrapperHeight={250} />
            )}
        </FriendProfileWrapper>
    );
};

export default FriendProfile;
