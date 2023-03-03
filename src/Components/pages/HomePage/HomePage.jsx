//CORE
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';

//CUSTOM
import Post from 'Components/common/Post';
import { hideNavBar, showNavBar } from 'Redux/BottomBar/Actions';
import { HomePageWrapper } from './HomePage.style';

const IMG_URL =
    'https://s3.ap-south-1.amazonaws.com/openxcell-development-private/tao_calligraphy/program/images/program-images/original/1675402201943.jpeg';

const VIDEO_URL =
    'https://openxcell-development-public.s3.ap-south-1.amazonaws.com/photobooth/users/3/media/1669714089421_204942.mp4';

const HOME_PAGE_DATA = [
    {
        id: 1,
        firstName: 'Ajay',
        lastName: 'Rathod',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi repudiandae reprehenderit laboriosam ab iure?',
        profilePic: '',
        media: [
            { url: IMG_URL, mediaType: 'img' },
            { url: VIDEO_URL, mediaType: 'video' },
            { url: IMG_URL, mediaType: 'img' },
            { url: IMG_URL, mediaType: 'img' }
        ],
        createdAt: '14/02/2022'
    },
    {
        id: 3,
        firstName: 'Ajay',
        lastName: 'Rathod',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi repudiandae reprehenderit laboriosam ab iure?',
        profilePic: '',
        media: [
            { url: IMG_URL, mediaType: 'img' },
            { url: VIDEO_URL, mediaType: 'video' },
            { url: IMG_URL, mediaType: 'img' },
            { url: IMG_URL, mediaType: 'img' }
        ],
        createdAt: '14/02/2022'
    },
    {
        id: 2,
        firstName: 'Ajay',
        lastName: 'Rathod',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi repudiandae reprehenderit laboriosam ab iure? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi repudiandae reprehenderit laboriosam ab iure? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi repudiandae reprehenderit laboriosam ab iure?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi repudiandae reprehenderit laboriosam ab iure?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi repudiandae reprehenderit laboriosam ab iure?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi repudiandae reprehenderit laboriosam ab iure?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi repudiandae reprehenderit laboriosam ab iure?',
        profilePic: '',
        media: [],
        createdAt: '14/02/2022'
    }
];

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showNavBar());

        return () => dispatch(hideNavBar());
    }, [dispatch]);

    return (
        <HomePageWrapper>
            <Box className="users-post-list flex f-column">
                {HOME_PAGE_DATA.map((item) => (
                    <Post key={item.id} postData={item} />
                ))}
            </Box>
        </HomePageWrapper>
    );
};

export default HomePage;
