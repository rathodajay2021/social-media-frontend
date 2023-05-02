//CORE
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Avatar, Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

//ICONS
import SearchIcon from '@mui/icons-material/Search';

//CUSTOM
import { ChatUsersWrapper } from './ChatUsers.style';
import { CreateUserName, getWindowDimensions, stringAvatar } from 'Helpers/Utils';
import { API_URL } from 'Helpers/Paths';
import { PAGINATION_INIT } from 'Helpers/Constants';
import Api from 'Helpers/ApiHandler';
import Loader from 'Components/common/Loader';
import LoadMore from 'Components/common/LoadMore';

const ChatUsers = (props) => {
    const API = useMemo(() => new Api(), []);
    const UserProfileData = useSelector((state) => state.App.userData);
    const [searchUser, setSearchUser] = useState('');
    const [userList, setUserList] = useState({
        data: [],
        totalRecord: 0
    });
    const [paginationInfo, setPaginationInfo] = useState(PAGINATION_INIT);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [loading, setLoading] = useState(false);

    const handlePagination = () => {
        setPaginationInfo((prev) => {
            return {
                ...prev,
                pageNo: prev.pageNo + 1
            };
        });
    };

    const handleKeyDown = (e) => {
        e.keyCode === 13 && handleSearch();
    };

    const handleSearch = () => {
        setPaginationInfo((prev) => {
            return { ...prev, pageNo: 0, search: searchUser };
        });
    };

    const getUsersList = useCallback(async () => {
        if (UserProfileData.id) {
            setLoading(true);
            const response = await API.post(`${API_URL.GET_USER_LIST_URL}/${UserProfileData.id}`, {
                data: {
                    perPage: paginationInfo.perPage,
                    page: paginationInfo.pageNo,
                    search: paginationInfo.search
                }
            });

            if (response) {
                setUserList((prev) => {
                    let arr =
                        paginationInfo.pageNo === 0
                            ? response?.data?.data?.rows
                            : prev.data.concat(response?.data?.data?.rows);
                    return {
                        totalRecord: response?.data?.data?.count,
                        data: [...new Map(arr.map((item) => [item['userId'], item])).values()]
                    };
                });
            }
            setLoading(false);
        }
    }, [API, UserProfileData.id, paginationInfo]);

    useEffect(() => {
        getUsersList();
    }, [getUsersList]);

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
        <ChatUsersWrapper
            $windowHeight={windowDimensions.height}
            $ChatUsersDisplay={props?.userChat?.userId ? 'none' : 'block'}>
            <Box className="header">
                <Box className="flex f-v-center user-details">
                    <Avatar
                        className="user-avatar"
                        {...stringAvatar(
                            CreateUserName(UserProfileData?.firstName, UserProfileData?.lastName),
                            UserProfileData?.profilePic
                        )}
                    />
                    <Typography className="user-name">
                        {CreateUserName(UserProfileData?.firstName, UserProfileData?.lastName)}
                    </Typography>
                </Box>
                <TextField
                    name="search"
                    value={searchUser}
                    onChange={(e) => setSearchUser(e?.target?.value)}
                    className="input-field"
                    placeholder="Search users"
                    size="small"
                    onKeyDown={handleKeyDown}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleSearch}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                        classes: {
                            focused: 'input-focused',
                            notchedOutline: 'input-outline'
                        }
                    }}
                />
            </Box>
            <Box className="users-list">
                <Loader isLoading={loading} loadingText={'Loading...'} />
                {userList?.data.map((user) => (
                    <Box
                        key={user?.userId}
                        className={`user flex f-v-center hover ${
                            props?.userChat?.userId === user?.userId && 'selected-user'
                        }`}
                        onClick={() => props.setUserChat(user)}>
                        <Avatar
                            className="user-avatar"
                            {...stringAvatar(
                                CreateUserName(user?.firstName, user?.lastName),
                                user?.profilePic
                            )}
                        />
                        <Box>
                            <Typography className="user-name">
                                {CreateUserName(user?.firstName, user?.lastName)}
                            </Typography>
                        </Box>
                    </Box>
                ))}
                {userList?.data.length < userList?.totalRecord && (
                    <LoadMore onClickFuc={handlePagination} />
                )}
            </Box>
        </ChatUsersWrapper>
    );
};

export default ChatUsers;
