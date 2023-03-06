//CORE
import React, { useEffect } from 'react'
import { Box, Typography, Avatar } from '@mui/material'
import { useDispatch } from 'react-redux'

//CUSTOM
import { ProfileWrapper } from './Profile.style'
import { CreateUserName, stringAvatar } from 'Helpers/Utils'
import { hideNavBar, showNavBar } from 'Redux/BottomBar/Actions'
import Post from 'Components/common/Post'

const IMG_URL =
  'https://s3.ap-south-1.amazonaws.com/openxcell-development-private/tao_calligraphy/program/images/program-images/original/1675402201943.jpeg';

const VIDEO_URL =
  'https://openxcell-development-public.s3.ap-south-1.amazonaws.com/photobooth/users/3/media/1669714089421_204942.mp4';

const USER_DETAILS = {
  firstName: 'ajay',
  lastName: 'Rathod',
  bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti nam voluptatibus ad. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti nam voluptatibus ad.',
  coverPic: '',
  profilePic: ""
}

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
  }
];

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showNavBar());

    return () => dispatch(hideNavBar());
  }, [dispatch]);
  return (
    <ProfileWrapper>
      <Box className='user-basic-details'>
        <Box className="cover-pic"
          style={{
            backgroundImage: `url(${USER_DETAILS.coverPic})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></Box>
        <Avatar className="profile-pic"
          {...stringAvatar(
            CreateUserName(USER_DETAILS?.firstName, USER_DETAILS?.lastName),
            USER_DETAILS?.profilePic,
            130,
            130
          )}
        />
        <Box className="user-details">
          <Typography className='user-name'>{CreateUserName(USER_DETAILS?.firstName, USER_DETAILS?.lastName)}</Typography>
          <Typography className="user-bio">{USER_DETAILS?.bio}</Typography>
        </Box>
      </Box>
      <Box className="user-status flex f-v-center f-h-space-between">
        <Box className="user-record">
          <Typography className="data flex f-h-center">No</Typography>
          <Typography className='data-label flex f-h-center'>Friends</Typography>
        </Box>
        <Box className="user-record">
          <Typography className="data flex f-h-center">No</Typography>
          <Typography className='data-label flex f-h-center'>DOB</Typography>
        </Box>
        <Box className="user-record">
          <Typography className="data flex f-h-center">No</Typography>
          <Typography className='data-label flex f-h-center'>Posts</Typography>
        </Box>
      </Box>
      <Box className="users-post-list flex f-column">
        {HOME_PAGE_DATA.map((item) => (
          <Post key={item.id} postData={item} />
        ))}
      </Box>
    </ProfileWrapper>
  )
}

export default Profile