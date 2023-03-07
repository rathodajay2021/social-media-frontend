//CORE
import React, { useMemo, useState } from 'react';
import { Avatar, Box, CardMedia, IconButton, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';
import moment from 'moment';

//CUSTOM
import { CreateUserName, stringAvatar } from 'Helpers/Utils';
import { CustomPopOver, PostWrapper } from './Post.style';

//ICON
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Api from 'Helpers/ApiHandler';
import { API_URL } from 'Helpers/Paths';
import { showToast } from 'Redux/App/Actions';

const SETTINGS = {
    arrows: false,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0
};

const Post = ({
    postData,
    allowDelete = false,
    userFirstName,
    userLastName,
    userProfilePic,
    onDelete
}) => {
    const API = useMemo(() => new Api(), []);
    const dispatch = useDispatch();

    const [deleteMenu, setDeleteMenu] = useState(null);
    const removePopId = deleteMenu ? 'simple-popover' : undefined;

    const handlePostDelete = async () => {
        console.log('running');
        const response = await API.delete(`${API_URL.DELETE_POST_URL}/${postData?.postId}`);

        if (response) {
            dispatch(showToast(response.data.message, 'success'));
            onDelete()
        }
    };

    return (
        <PostWrapper className="flex f-column" classes={{ root: 'post-paper' }}>
            <Box className="post-header flex f-v-center f-h-space-between">
                <Box className="user flex f-v-center">
                    <Avatar
                        {...stringAvatar(
                            CreateUserName(userFirstName, userLastName),
                            userProfilePic
                        )}
                    />
                    <Box className="user-details">
                        <Typography className="user-name">
                            {CreateUserName(userFirstName, userLastName)}
                        </Typography>
                        <Typography className="post-create-date">
                            {moment(postData?.createdAt).format('D MMM YYYY')}
                        </Typography>
                    </Box>
                </Box>
                {allowDelete && (
                    <IconButton
                        onClick={(e) => setDeleteMenu(e.currentTarget)}
                        aria-describedby={removePopId}>
                        <MoreVertIcon />
                    </IconButton>
                )}
            </Box>
            {!!postData?.postMedia.length && (
                <Box className="media">
                    <Slider {...SETTINGS}>
                        {postData.postMedia.map((item, index) => (
                            <Box
                                className={`media-file ${
                                    postData.postMedia.length - 1 !== index && 'gap'
                                }`}
                                key={index}>
                                {item?.mediaType === 'img' ? (
                                    <Box
                                        className="background-img-div"
                                        style={{
                                            backgroundImage: `url(${item.mediaPath})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}></Box>
                                ) : (
                                    <CardMedia
                                        className="background-video-div"
                                        component={'video'}
                                        src={item.mediaPath}
                                        controls
                                    />
                                )}
                            </Box>
                        ))}
                    </Slider>
                </Box>
            )}
            <Box className="post-features">
                <Typography
                    className={`ellipse ${
                        !!postData.postMedia.length ? 'description' : 'more-line-description'
                    }`}>
                    {postData?.description}
                </Typography>
            </Box>
            <CustomPopOver
                id={removePopId}
                classes={{ paper: 'popover-paper' }}
                open={Boolean(deleteMenu)}
                anchorEl={deleteMenu}
                onClose={() => setDeleteMenu(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}>
                <Typography className="delete-text" onClick={handlePostDelete}>
                    Delete
                </Typography>
            </CustomPopOver>
        </PostWrapper>
    );
};

export default Post;
