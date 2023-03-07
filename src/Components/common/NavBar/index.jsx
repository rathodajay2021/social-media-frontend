//CORE
import React, { useState } from 'react';
import { Box, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

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

const NavBar = () => {
    const dispatch = useDispatch();

    const [openMenu, setOpenMenu] = useState(null);
    const [logoutDialog, setLogoutDialog] = useState(false);
    const [addPostDialog, setAddPostDialog] = useState(false);

    const handleLogout = () => {
        setOpenMenu(null);
        setLogoutDialog(true);
    };

    const handleAddPost = () => {
        
        setAddPostDialog(false)
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
                    onClose={() => setOpenMenu(false)}>
                    <MenuItem>Edit Profile</MenuItem>
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
        </NavBarWrapper>
    );
};

export default NavBar;
