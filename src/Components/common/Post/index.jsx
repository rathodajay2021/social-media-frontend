//CORE
import React from 'react';
import { Avatar, Box, CardMedia, Typography } from '@mui/material';
import Slider from 'react-slick';

//CUSTOM
import { CreateUserName, stringAvatar } from 'Helpers/Utils';
import { PostWrapper } from './Post.style';

const Post = ({ postData }) => {
    const SETTINGS = {
        arrows: false,
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0
    };

    return (
        <PostWrapper className="flex f-column" classes={{ root: 'post-paper' }}>
            <Box className="user flex f-v-center">
                <Avatar
                    {...stringAvatar(
                        CreateUserName(postData?.firstName, postData?.lastName),
                        postData?.profilePic
                    )}
                />
                <Box className="user-details">
                    <Typography className="user-name">
                        {CreateUserName(postData?.firstName, postData?.lastName)}
                    </Typography>
                    <Typography className="post-create-date">{postData?.createdAt}</Typography>
                </Box>
            </Box>
            {!!postData?.media.length && (
                <Box className="media">
                    <Slider {...SETTINGS}>
                        {postData.media.map((item, index) => (
                            <Box
                                className={`media-file ${
                                    postData.media.length - 1 !== index && 'gap'
                                }`}
                                key={index}>
                                {item?.mediaType === 'img' ? (
                                    <Box
                                        className="background-img-div"
                                        style={{
                                            backgroundImage: `url(${item.url})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}></Box>
                                ) : (
                                    <CardMedia
                                        className="background-video-div"
                                        component={'video'}
                                        src={item.url}
                                        // autoPlay
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
                        !!postData.media.length ? 'description' : 'more-line-description'
                    }`}>
                    {postData?.description}
                </Typography>
            </Box>
        </PostWrapper>
    );
};

export default Post;
