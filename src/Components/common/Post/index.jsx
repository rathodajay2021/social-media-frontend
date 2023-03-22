//CORE
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    Avatar,
    Box,
    CardMedia,
    Collapse,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Typography
} from '@mui/material';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';

//ICON
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

//CUSTOM
import { CreateUserName, stringAvatar } from 'Helpers/Utils';
import { PostWrapper } from './Post.style';
import Api from 'Helpers/ApiHandler';
import { API_URL, URL_FRIEND_PROFILE_PAGE } from 'Helpers/Paths';
import { showToast } from 'Redux/App/Actions';
import { ReadMore } from '../ReadMore';
import AddPost from '../AddPost';
import { ImageBox } from 'Styles/CommonStyle';
import CommentDetails from '../CommentDetails';

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
    onDelete,
    redirect = false,
    userProfileData,
    setTotalPostData,
    allPostData
}) => {
    const API = useMemo(() => new Api(), []);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const videoRef = useRef(null);

    const [deleteMenu, setDeleteMenu] = useState(null);
    const [addPostDialog, setAddPostDialog] = useState(false);
    const [collapseDialog, setCollapseDialog] = useState(false);

    const handleEditPost = () => {
        setAddPostDialog(true);
        setDeleteMenu(null);
    };

    const handleEditPostMedia = () => {
        setAddPostDialog(false);
        onDelete();
    };

    const handlePostDelete = async () => {
        const response = await API.delete(`${API_URL.DELETE_POST_URL}/${postData?.postId}`);

        if (response) {
            dispatch(showToast(response.data.message, 'success'));
            onDelete();
        }
    };

    const handleRedirectToFriend = () => {
        if (redirect) {
            navigate(URL_FRIEND_PROFILE_PAGE, { state: { friendId: postData.user.userId } });
        }
    };

    const handleViewChange = useCallback((entries) => {
        for (let entry of entries) {
            if (entry.intersectionRatio > 0.9) {
                videoRef?.current && videoRef?.current.play();
            } else {
                videoRef?.current && videoRef?.current.pause();
            }
        }
    }, []);

    const handleLike = async () => {
        let response;
        const data = {
            userId: userProfileData?.id,
            postId: postData?.postId
        };
        if (postData?.userLiked) {
            //remove like
            response = await API.delete(API_URL.DELETE_LIKE_URL, {
                data
            });
        } else {
            //add like
            response = await API.post(API_URL.ADD_LIKE_URL, {
                data
            });
        }

        if (response) {
            const tempPostData = [...allPostData?.data];
            const index = tempPostData.findIndex((item) => item.postId === postData?.postId);
            tempPostData[index] = {
                ...tempPostData[index],
                userLiked: !tempPostData[index].userLiked,
                likesCount: tempPostData[index].likesCount + (postData?.userLiked ? -1 : 1)
            };
            setTotalPostData((prev) => {
                return { ...prev, data: tempPostData };
            });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleViewChange, {
            root: null,
            rootMargin: '0px',
            threshold: 0.9
        });

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [handleViewChange]);

    return (
        <PostWrapper className="flex f-column" classes={{ root: 'post-paper' }}>
            <Box className="post-header flex f-v-center f-h-space-between">
                <Box className="user flex f-v-center">
                    <Avatar
                        {...stringAvatar(
                            CreateUserName(userFirstName, userLastName),
                            userProfilePic
                        )}
                        className={`${redirect && 'hover'}`}
                        onClick={handleRedirectToFriend}
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
                    <IconButton onClick={(e) => setDeleteMenu(e.currentTarget)} >
                        <MoreVertIcon />
                    </IconButton>
                )}
            </Box>
            <ReadMore>{postData?.description}</ReadMore>
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
                                    <ImageBox
                                        className="background-img-div"
                                        $coverPic={item.mediaPath}
                                    />
                                ) : (
                                    <OutsideClickHandler
                                        onOutsideClick={() => {
                                            videoRef?.current.pause();
                                        }}>
                                        <CardMedia
                                            component={'video'}
                                            ref={videoRef}
                                            src={item.mediaPath}
                                            controls
                                            className="video-player"
                                            muted
                                        />
                                    </OutsideClickHandler>
                                )}
                            </Box>
                        ))}
                    </Slider>
                </Box>
            )}
            <Box className="likes-comments flex">
                <Box>
                    {postData?.userLiked ? (
                        <IconButton className="liked" onClick={handleLike}>
                            <FavoriteIcon />
                        </IconButton>
                    ) : (
                        <IconButton onClick={handleLike}>
                            <FavoriteBorderIcon />
                        </IconButton>
                    )}
                    {!!postData?.likesCount && postData?.likesCount}
                </Box>
                <Box>
                    <IconButton onClick={() => setCollapseDialog((prev) => !prev)}>
                        <ChatBubbleOutlineIcon />
                    </IconButton>
                    {!!postData?.commentCount && postData?.commentCount}
                </Box>
            </Box>
            <Collapse in={collapseDialog}>
                <CommentDetails postData={postData} collapseDialog={collapseDialog} />
            </Collapse>
            <Menu
                open={Boolean(deleteMenu)}
                anchorEl={deleteMenu}
                onClose={() => setDeleteMenu(null)}>
                <MenuItem onClick={handleEditPost}>
                    <EditIcon />
                    Edit
                </MenuItem>
                <Divider />
                <MenuItem className="delete-text hover" onClick={handlePostDelete}>
                    <DeleteIcon />
                    Delete
                </MenuItem>
            </Menu>
            {addPostDialog && (
                <AddPost
                    onClose={() => setAddPostDialog(false)}
                    onConfirm={handleEditPostMedia}
                    postId={postData?.postId}
                    isEdit={true}
                />
            )}
        </PostWrapper>
    );
};

export default Post;
