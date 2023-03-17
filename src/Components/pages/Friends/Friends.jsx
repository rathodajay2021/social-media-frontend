//CORE
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { cloneDeep } from 'lodash';

//ICON
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

//CUSTOM
import FriendsDetails from 'Components/common/FriendsDetails';
import { FriendsWrapper } from './Friends.style';
import { getWindowDimensions } from 'Helpers/Utils';
import Api from 'Helpers/ApiHandler';
import { API_URL } from 'Helpers/Paths';
import { useSelector } from 'react-redux';
import { PAGINATION_INIT } from 'Helpers/Constants';
import Loader from 'Components/common/Loader';
import LoadMore from 'Components/common/LoadMore';

const Friends = () => {
    const API = useMemo(() => new Api(), []);
    const userDetails = useSelector((state) => state.App.userData);

    const [friendsList, setFriendsList] = useState({
        data: [],
        totalRecord: 0
    });
    const [paginationInfo, setPaginationInfo] = useState(PAGINATION_INIT);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClearSearch = () => {
        setSearchValue('');
        setPaginationInfo((prev) => {
            return { ...prev, search: '' };
        });
    };

    const handleSearch = (search) => {
        setPaginationInfo((prev) => {
            return {
                ...prev,
                pageNo: 0,
                search
            };
        });
    };

    const handlePagination = () => {
        setPaginationInfo((prev) => {
            return {
                ...prev,
                pageNo: prev.pageNo + 1
            };
        });
    };

    const resetFriendApi = (id) => {
        let tempFriendList = cloneDeep(friendsList?.data);
        const index = tempFriendList.findIndex((item) => item?.userId === id);
        tempFriendList[index].isFriend = !tempFriendList[index].isFriend;
        setFriendsList((prev) => {
            return { ...prev, data: tempFriendList };
        });
    };

    const getFriendList = useCallback(async () => {
        if (userDetails.id) {
            setLoading(true);
            const response = await API.post(`${API_URL.GET_USER_LIST_URL}/${userDetails.id}`, {
                data: {
                    perPage: paginationInfo.perPage,
                    page: paginationInfo.pageNo,
                    search: paginationInfo.search
                }
            });

            if (response) {
                setFriendsList((prev) => {
                    let arr =
                        paginationInfo.pageNo === 0
                            ? response?.data?.data?.rows
                            : prev.data.concat(response?.data?.data?.rows);
                    return {
                        totalRecord: response?.data?.data?.count,
                        data: [...new Map(arr.map((item) => [item['userId'], item])).values()]
                    };
                });
                setLoading(false);
            }
        }
    }, [API, userDetails.id, paginationInfo]);

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
        setLoading(true);
        const debounce = setTimeout(() => {
            handleSearch(searchValue);
        }, 2000);

        return () => clearTimeout(debounce);
    }, [searchValue]);

    useEffect(() => {
        getFriendList();
    }, [getFriendList]);

    return (
        <FriendsWrapper $windowHeight={windowDimensions.height}>
            <Box className="search-wrapper">
                <TextField
                    name="search"
                    placeholder="Search your friends here"
                    variant="outlined"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e?.target?.value.replace(/[^a-zA-Z ]/g, ''))}
                    className="input-field"
                    fullWidth
                    InputProps={{
                        classes: {
                            focused: 'input-focused',
                            notchedOutline: 'input-outline'
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                        endAdornment: searchValue && (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClearSearch}
                                    className="clear-search-icon">
                                    <CloseIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </Box>
            <Box className="friend-list">
                <Loader isLoading={loading} loadingText={'Loading...'} />
                {friendsList?.data.map((friend) => (
                    <FriendsDetails
                        key={friend.userId}
                        friendDetails={friend}
                        resetFriendApi={resetFriendApi}
                    />
                ))}
                {friendsList?.data.length < friendsList?.totalRecord && (
                    <LoadMore onClickFuc={handlePagination} />
                )}
            </Box>
        </FriendsWrapper>
    );
};

export default Friends;
