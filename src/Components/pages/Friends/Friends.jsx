//CORE
import React, { useEffect, useState } from 'react';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';

//ICON
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

//CUSTOM
import FriendsDetails from 'Components/common/FriendsDetails';
import { FriendsWrapper } from './Friends.style';
import { getWindowDimensions } from 'Helpers/Utils';

const FriendDetails = [
    {
        id: 1,
        firstName: 'Dhruv',
        lastName: 'Singh',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa tempore maiores, ipsum sed incidunt ipsa dolor tenetur aliquid veritatis asperiores!',
        isFriend: true
    },
    {
        id: 2,
        firstName: 'Ajay',
        lastName: 'Rathod',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa tempore maiores, ipsum sed incidunt ipsa dolor tenetur aliquid veritatis asperiores!',
        isFriend: false
    },
    {
        id: 3,
        firstName: 'Dhariya',
        lastName: 'Parik',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa tempore maiores, ipsum sed incidunt ipsa dolor tenetur aliquid veritatis asperiores!',
        isFriend: true
    },
    {
        id: 7,
        firstName: 'Dhruv',
        lastName: 'Singh',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa tempore maiores, ipsum sed incidunt ipsa dolor tenetur aliquid veritatis asperiores!',
        isFriend: true
    },
    {
        id: 8,
        firstName: 'Ajay',
        lastName: 'Rathod',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa tempore maiores, ipsum sed incidunt ipsa dolor tenetur aliquid veritatis asperiores!',
        isFriend: false
    },
    {
        id: 9,
        firstName: 'Dhariya',
        lastName: 'Parik',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa tempore maiores, ipsum sed incidunt ipsa dolor tenetur aliquid veritatis asperiores!',
        isFriend: true
    },
    {
        id: 5,
        firstName: 'Dhruv',
        lastName: 'Singh',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa tempore maiores, ipsum sed incidunt ipsa dolor tenetur aliquid veritatis asperiores!',
        isFriend: true
    },
    {
        id: 15,
        firstName: 'Ajay',
        lastName: 'Rathod',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa tempore maiores, ipsum sed incidunt ipsa dolor tenetur aliquid veritatis asperiores!',
        isFriend: false
    },
    {
        id: 6,
        firstName: 'Dhariya',
        lastName: 'Parik',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa tempore maiores, ipsum sed incidunt ipsa dolor tenetur aliquid veritatis asperiores!',
        isFriend: true
    }
];

const Friends = () => {
    const [searchValue, setSearchValue] = useState('');
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const handleClearSearch = () => {
        setSearchValue('');
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

    return (
        <FriendsWrapper $windowHeight={windowDimensions.height}>
            <Box className="search-wrapper">
                <TextField
                    name="search"
                    placeholder="Search your friends here"
                    variant="outlined"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e?.target?.value)}
                    className="input-field"
                    // size="small"
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
                {FriendDetails.map((friend) => (
                    <FriendsDetails key={friend.id} friendDetails={friend} />
                ))}
            </Box>
        </FriendsWrapper>
    );
};

export default Friends;
