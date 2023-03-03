import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { CreateUserName, stringAvatar } from 'Helpers/Utils';
import React from 'react';
import { FriendsDetailsWrapper } from './FriendsDetails.style';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';

const FriendsDetails = ({ friendDetails }) => {
    return (
        <FriendsDetailsWrapper>
            <Avatar
                {...stringAvatar(
                    CreateUserName(friendDetails?.firstName, friendDetails?.lastName),
                    friendDetails?.profilePic
                )}
            />
            <Box className="friend-details">
                <Typography className="friend-full-name">
                    {CreateUserName(friendDetails?.firstName, friendDetails?.lastName)}
                </Typography>
                <Typography className="friend-bio">{friendDetails?.bio}</Typography>
            </Box>
            {friendDetails?.isFriend ? (
                <IconButton>
                    <PersonAddAlt1Icon />
                </IconButton>
            ) : (
                <IconButton>
                    <PersonRemoveAlt1Icon />
                </IconButton>
            )}
        </FriendsDetailsWrapper>
    );
};

export default FriendsDetails;
