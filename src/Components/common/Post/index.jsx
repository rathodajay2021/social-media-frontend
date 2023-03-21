//CORE
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import OutsideClickHandler from 'react-outside-click-handler';

//ICON
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

//CUSTOM
import {
    CreateUserName,
    getTotalTimeInMins,
    getWindowDimensions,
    stringAvatar
} from 'Helpers/Utils';
import { PostWrapper } from './Post.style';
import Api from 'Helpers/ApiHandler';
import { API_URL, URL_FRIEND_PROFILE_PAGE } from 'Helpers/Paths';
import { showToast } from 'Redux/App/Actions';
import { ReadMore } from '../ReadMore';
import AddPost from '../AddPost';
import { BREAKPOINTS_VALUE } from 'Styles/Constants';
import VideoControls from './VideoControls';

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
    redirect = false
}) => {
    const API = useMemo(() => new Api(), []);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    const [deleteMenu, setDeleteMenu] = useState(null);
    const [addPostDialog, setAddPostDialog] = useState(false);
    const removePopId = deleteMenu ? 'simple-popover' : undefined;
    const [videoPlay, setVideoPlay] = useState(false);
    const [videoPlayerHeight, setVideoPlayerHeight] = useState(350);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const [videoLengthInSeconds, setVideoLengthInSeconds] = useState(0);
    const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(0);
    const [duration, setDuration] = useState('00:00');
    const [elapsedTime, setElapsedTime] = useState('00:00');

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
            if (entry.intersectionRatio < 0.5) {
                setVideoPlay(false);
            }
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(handleViewChange, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
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

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions(getWindowDimensions());
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (windowDimensions?.width) {
            if (windowDimensions?.width > BREAKPOINTS_VALUE.PHABLET) {
                setVideoPlayerHeight(350);
            } else if (windowDimensions?.width > BREAKPOINTS_VALUE.MOBILE) {
                setVideoPlayerHeight(300);
            } else {
                setVideoPlayerHeight(250);
            }
        }
    }, [windowDimensions?.width]);

    useEffect(() => {
        if (videoPlay) {
            var interval = setInterval(() => {
                let time = getTotalTimeInMins(playerRef.current.getCurrentTime());
                setElapsedTimeInSeconds(playerRef.current.getCurrentTime());
                setElapsedTime(time);
            }, 1000);
            return;
        }

        clearInterval(interval);

        return () => {
            setVideoPlay(false);
            clearInterval(interval);
        };
    }, [videoPlay]);

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
                    <IconButton
                        onClick={(e) => setDeleteMenu(e.currentTarget)}
                        aria-describedby={removePopId}>
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
                                    <Box
                                        className="background-img-div"
                                        style={{
                                            backgroundImage: `url(${item.mediaPath})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}></Box>
                                ) : (
                                    <OutsideClickHandler
                                        onOutsideClick={() => {
                                            setVideoPlay(false);
                                        }}>
                                        <Box ref={videoRef} className="video-player">
                                            <ReactPlayer
                                                ref={playerRef}
                                                playing={videoPlay}
                                                url={item.mediaPath}
                                                width="100%"
                                                height={`${videoPlayerHeight}px`}
                                                onPlay={() => setVideoPlay(true)}
                                                onPause={() => setVideoPlay(false)}
                                                onDuration={(duration) => {
                                                    setDuration(getTotalTimeInMins(duration));
                                                    setVideoLengthInSeconds(playerRef?.current?.getDuration());
                                                }}
                                                controls={false}
                                            />
                                            <VideoControls
                                                videoPlay={videoPlay}
                                                ref={playerRef}
                                                setVideoPlay={setVideoPlay}
                                                duration={duration}
                                                elapsedTime={elapsedTime}
                                                videoLengthInSeconds={videoLengthInSeconds}
                                                elapsedTimeInSeconds={elapsedTimeInSeconds}
                                                setElapsedTimeInSeconds={setElapsedTimeInSeconds}
                                            />
                                        </Box>
                                    </OutsideClickHandler>
                                )}
                            </Box>
                        ))}
                    </Slider>
                </Box>
            )}
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
