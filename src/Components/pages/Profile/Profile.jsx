//CORE
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';

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
import LoadMore from 'Components/common/LoadMore';
import Loader from 'Components/common/Loader';
import LeftMenu from 'Components/common/LeftMenu';
import { BREAKPOINTS_VALUE } from 'Styles/Constants';

const PAGINATION_INIT = {
    perPage: 5,
    pageNo: 0
};

const Profile = () => {
    const API = useMemo(() => new Api(), []);
    const postRef = useRef(null);
    const UserProfileData = useSelector((state) => state.App.userData);
    const navigate = useNavigate();
    const location = useLocation();

    const [userPostData, setUserPostData] = useState({
        data: [],
        totalRecord: 0
    });
    const [userData, setUserData] = useState({});
    const [resetUser, setResetUser] = useState(true);
    const [friendList, setFriendList] = useState(0);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [paginationInfo, setPaginationInfo] = useState(PAGINATION_INIT);
    const [loading, setLoading] = useState(false);

    const handleRefetchUserPost = () => {
        setResetUser((prev) => !prev);
    };

    const scrollToPostSection = () => {
        postRef?.current && postRef.current.scrollIntoView({ behavior: 'smooth' });
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
        if (UserProfileData?.id || location?.state?.friendId) {
            setLoading(true);
            const response = await API.get(
                `${API_URL.GET_USER_DATA_URL}/${location?.state?.friendId || UserProfileData?.id}`
            );

            if (response?.data) {
                setUserData(response?.data?.data);
                setLoading(false);
            }
        }
    }, [API, UserProfileData, location?.state?.friendId]);

    const getUserPostData = useCallback(async () => {
        if (UserProfileData?.id || location?.state?.friendId) {
            setLoading(true);
            const response = await API.post(
                `${API_URL.GET_USER_POST_URL}/${location?.state?.friendId || UserProfileData?.id}`,
                {
                    data: {
                        page: paginationInfo.pageNo,
                        perPage: paginationInfo.perPage
                    }
                }
            );

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
    }, [API, UserProfileData, paginationInfo, location?.state?.friendId]);

    const getFriendList = useCallback(async () => {
        if (UserProfileData?.id || location?.state?.friendId) {
            setLoading(true);
            const response = await API.get(
                `${API_URL.GET_FRIEND_LIST_URL}/${location?.state?.friendId || UserProfileData?.id}`
            );

            if (response) {
                setFriendList(response?.data?.data?.count);
                setLoading(false);
            }
        }
    }, [API, UserProfileData.id, location?.state?.friendId]);

    useEffect(() => {
        getUserData();
        getUserPostData();
    }, [getUserData, getUserPostData, resetUser]);

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
                <Loader isLoading={loading} />
                <Box className="flex">
                    {windowDimensions.width > BREAKPOINTS_VALUE.TABLET && (
                        <LeftMenu $windowHeight={windowDimensions.height} />
                    )}
                    <Box className="profile-area">
                        <Box className="user-basic-details">
                            <ImageBox
                                className="cover-pic"
                                $coverPic={userData?.coverPic}></ImageBox>
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
                                    <IconButton onClick={() => navigate(URL_FRIEND_PAGE)}>
                                        <GroupIcon className="details-icon" />
                                    </IconButton>
                                </Typography>
                                <Typography className="data flex f-h-center">
                                    {friendList}
                                </Typography>
                            </Box>
                            {userData?.dob && (
                                <Box className="user-record">
                                    <Typography className="data-label flex f-h-center">
                                        <IconButton>
                                            <CalendarMonthIcon className="details-icon" />
                                        </IconButton>
                                    </Typography>
                                    <Typography className="data flex f-h-center">
                                        {moment(new Date(userData?.dob)).format('DD MMM')}
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
                                        allowDelete={true}
                                        onDelete={handleRefetchUserPost}
                                        userProfileData={UserProfileData}
                                        setTotalPostData={setUserPostData}
                                        allPostData={userPostData}
                                    />
                                ))}
                                {userPostData?.data.length < userPostData?.totalRecord && (
                                    <LoadMore onClickFuc={handlePagination} />
                                )}
                            </Box>
                        ) : (
                            <NoPost wrapperHeight={250} />
                        )}
                    </Box>
                </Box>
            </ProfileWrapper>
        </>
    );
};

export default Profile;
