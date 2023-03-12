//CORE
import React, { useMemo } from 'react';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

//ICONS
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';

//CUSTOM
import { CreateUserName, stringAvatar } from 'Helpers/Utils';
import { FriendsDetailsWrapper } from './FriendsDetails.style';
import Api from 'Helpers/ApiHandler';
import { API_URL } from 'Helpers/Paths';
import { showToast } from 'Redux/App/Actions';

const FriendsDetails = ({ friendDetails, resetFriendApi }) => {
    const dispatch = useDispatch();
    const API = useMemo(() => new Api(), []);
    const userDetails = useSelector((state) => state.App.userData);

    const removeFriendHandler = async () => {
        const response = await API.delete(API_URL.REMOVE_FRIEND_URL, {
            data: {
                userId1: userDetails.id,
                userId2: friendDetails.userId
            }
        });

        if (response) {
            dispatch(showToast(response.data.message));
            resetFriendApi();
        }
    };

    const addFriendHandler = async () => {
        const response = await API.post(API_URL.ADD_FRIEND_URL, {
            data: {
                userId1: userDetails.id,
                userId2: friendDetails.userId
            }
        });

        if (response) {
            dispatch(showToast(response.data.message));
            resetFriendApi();
        }
    };

    return (
        <FriendsDetailsWrapper className="flex f-v-center f-h-space-between">
            <Avatar
                className="user-avatar"
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
                <IconButton onClick={removeFriendHandler}>
                    <PersonRemoveAlt1Icon />
                </IconButton>
            ) : (
                <IconButton onClick={addFriendHandler}>
                    <PersonAddAlt1Icon />
                </IconButton>
            )}
        </FriendsDetailsWrapper>
    );
};

export default FriendsDetails;
