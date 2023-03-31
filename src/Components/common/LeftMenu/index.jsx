//CORE
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Divider, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

//icon
import NewspaperIcon from '@mui/icons-material/Newspaper';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';

//CUSTOM
import { LeftMenuWrapper } from './LeftMenu.style';
import { CreateUserName, stringAvatar } from 'Helpers/Utils';
import { API_URL } from 'Helpers/Paths';
import Api from 'Helpers/ApiHandler';

const LeftMenu = ({ $windowHeight }) => {
    const UserProfileData = useSelector((state) => state.App.userData);
    const API = useMemo(() => new Api(), []);

    const [friendList, setFriendList] = useState({
        data: [],
        totalRecord: 0
    });

    const getFriendList = useCallback(async () => {
        if (UserProfileData?.id) {
            const response = await API.get(`${API_URL.GET_FRIEND_LIST_URL}/${UserProfileData?.id}`);

            if (response) {
                setFriendList({
                    data: response?.data?.data?.rows,
                    totalRecord: response?.data?.data?.count
                });
            }
        }
    }, [API, UserProfileData.id]);

    useEffect(() => {
        getFriendList();
    }, [getFriendList]);

    return (
        <LeftMenuWrapper $windowHeight={$windowHeight}>
            <Box className="left-menu-position flex f-column">
                <Paper className="paper" classes={{ root: 'post-paper' }}>
                    <Typography className="title">Menu</Typography>
                    <Divider />
                    <Box className="menu-options flex f-column">
                        <Box className="option flex f-v-center hover">
                            <InsertPhotoOutlinedIcon className="option-icon" />
                            <Typography className="option-label">gallery</Typography>
                        </Box>
                        <Box className="option flex f-v-center hover">
                            <VideoCameraBackOutlinedIcon className="option-icon" />
                            <Typography className="option-label">go live</Typography>
                        </Box>
                        <Box className="option flex f-v-center hover">
                            <SportsEsportsOutlinedIcon className="option-icon" />
                            <Typography className="option-label">games</Typography>
                        </Box>
                    </Box>
                </Paper>
                <Paper className="paper" classes={{ root: 'post-paper' }}>
                    <Typography className="title">Friends</Typography>
                    <Divider />
                    <Box className="menu-options friend-menu flex f-column">
                        {!!friendList.data.length ? (
                            friendList.data.map((item) => (
                                <Box key={item?.userId} className="option flex f-v-center hover">
                                    <Avatar
                                        {...stringAvatar(
                                            CreateUserName(item?.firstName, item?.lastName),
                                            item?.profilePic,
                                            40,
                                            40
                                        )}
                                    />
                                    <Typography className="option-label">
                                        {CreateUserName(item?.firstName, item?.lastName)}
                                    </Typography>
                                </Box>
                            ))
                        ) : (
                            <Box className="no-friend flex f-v-center f-h-center">
                                <Typography className="no-friend-msg">no friend yet</Typography>
                            </Box>
                        )}
                    </Box>
                </Paper>
                <Paper className="paper" classes={{ root: 'post-paper' }}>
                    <Typography className="title">Feeds</Typography>
                    <Divider />
                    <Box className="menu-options flex f-column">
                        <Box className="option flex f-v-center hover">
                            <NewspaperIcon className="option-icon" />
                            <Typography className="option-label">news feed</Typography>
                        </Box>
                        <Box className="option flex f-v-center hover">
                            <MilitaryTechOutlinedIcon className="option-icon" />
                            <Typography className="option-label">achievement</Typography>
                        </Box>
                        <Box className="option flex f-v-center hover">
                            <LocationOnOutlinedIcon className="option-icon" />
                            <Typography className="option-label">latest event</Typography>
                        </Box>
                        <Box className="option flex f-v-center hover">
                            <EmailOutlinedIcon className="option-icon" />
                            <Typography className="option-label">messages</Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </LeftMenuWrapper>
    );
};

export default LeftMenu;