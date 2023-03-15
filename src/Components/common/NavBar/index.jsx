//CORE
import React, { useMemo, useState } from 'react';
import { Box, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

//ICON
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

//CUSTOM
import { APP_NAME } from 'Helpers/Constants';
import { NavBarWrapper } from './NavBar.style';
import DeleteDialog from '../DeleteDialog';
import { logoutUser } from 'Redux/Auth/Actions';
import AddPost from '../AddPost';
import EditUser from '../EditUser';
import { userProfileData } from 'Redux/App/Actions';
import { API_URL } from 'Helpers/Paths';
import Api from 'Helpers/ApiHandler';

const NavBar = ({
    resetData = () => {
        return null;
    },
    addReset = () => {
        return null;
    }
}) => {
    const dispatch = useDispatch();
    const UserProfileData = useSelector((state) => state.App.userData);
    const API = useMemo(() => new Api(), []);

    const [openMenu, setOpenMenu] = useState(null);
    const [logoutDialog, setLogoutDialog] = useState(false);
    const [addPostDialog, setAddPostDialog] = useState(false);
    const [editUserDialog, setEditUserDialog] = useState(false);

    const handleLogout = () => {
        setOpenMenu(null);
        setLogoutDialog(true);
    };

    const handleAddPost = () => {
        addReset()
        resetData();
        setAddPostDialog(false);
    };

    const handleUserProfileEdit = () => {
        setEditUserDialog(true);
        setOpenMenu(null);
    };

    const handleEditUser = async () => {
        const response = await API.get(`${API_URL.GET_USER_POST_URL}/${UserProfileData?.id}`);

        if (response?.data) {
            response?.data?.data?.id && dispatch(userProfileData(response?.data?.data));
            response?.data?.data?.id && localStorage.setItem('userInfo', JSON.stringify(response?.data?.data));
        }

        resetData();
        setEditUserDialog(false);
    };

    return (
        <NavBarWrapper className="flex f-v-center f-h-space-between">
            <Typography className="nav-title">{APP_NAME}</Typography>
            <Box>
                <IconButton onClick={() => setAddPostDialog(true)}>
                    <AddToPhotosIcon />
                </IconButton>
                <IconButton onClick={(e) => setOpenMenu(e.currentTarget)}>
                    <MenuIcon />
                </IconButton>
                <Menu
                    anchorEl={openMenu}
                    open={Boolean(openMenu)}
                    onClose={() => setOpenMenu(null)}>
                    <MenuItem onClick={handleUserProfileEdit}>Edit Profile</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                        <LogoutIcon />
                        Logout
                    </MenuItem>
                </Menu>
            </Box>
            {logoutDialog && (
                <DeleteDialog
                    text={`Are you sure you wan't to logout`}
                    onClose={() => setLogoutDialog(false)}
                    onConfirm={() => dispatch(logoutUser())}
                />
            )}
            {addPostDialog && (
                <AddPost onClose={() => setAddPostDialog(false)} onConfirm={handleAddPost} />
            )}
            {editUserDialog && (
                <EditUser onClose={() => setEditUserDialog(false)} onConfirm={handleEditUser} />
            )}
        </NavBarWrapper>
    );
};

export default NavBar;
