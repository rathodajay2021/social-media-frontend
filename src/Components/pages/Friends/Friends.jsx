//CORE
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';

//ICON
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

//CUSTOM
import FriendsDetails from 'Components/common/FriendsDetails';
import { FriendsWrapper } from './Friends.style';
import { CreateUserName, getWindowDimensions } from 'Helpers/Utils';
import Api from 'Helpers/ApiHandler';
import { API_URL } from 'Helpers/Paths';
import { useSelector } from 'react-redux';

const Friends = () => {
    const API = useMemo(() => new Api(), []);
    const userDetails = useSelector((state) => state.App.userData);

    const [searchValue, setSearchValue] = useState('');
    const [friendsList, setFriendsList] = useState([]);
    const [searchFriendList, setSearchFriendList] = useState([]);
    const [resetFriendList, setResetFriendList] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const handleClearSearch = () => {
        setSearchValue('');
    };

    const handleFriendSearch = useCallback(() => {
        let temSearchData = friendsList.filter((friend) =>
            CreateUserName(friend.firstName, friend.lastName)
                .toLowerCase()
                .match(searchValue.toLowerCase())
        );
        setSearchFriendList(temSearchData)
    }, [friendsList, searchValue]);

    const resetFriendApi = () => {
        setResetFriendList((prev) => !prev);
    };

    const getFriendList = useCallback(async () => {
        if (userDetails.id) {
            const response = await API.get(`${API_URL.GET_USER_LIST_URL}/${userDetails.id}`);

            if (response) {
                setFriendsList(response?.data?.data);
            }
        }
    }, [API, userDetails.id]);

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
        getFriendList();
    }, [getFriendList, resetFriendList]);

    useEffect(() => {
        handleFriendSearch();
    }, [handleFriendSearch]);

    return (
        <FriendsWrapper $windowHeight={windowDimensions.height}>
            <Box className="search-wrapper">
                <TextField
                    name="search"
                    placeholder="Search your friends here"
                    variant="outlined"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e?.target?.value.replace(/[^a-zA-Z ]/g, ""))}
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
                {searchFriendList.map((friend) => (
                    <FriendsDetails
                        key={friend.userId}
                        friendDetails={friend}
                        resetFriendApi={resetFriendApi}
                    />
                ))}
            </Box>
        </FriendsWrapper>
    );
};

export default Friends;
