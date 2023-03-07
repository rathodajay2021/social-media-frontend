import { Box } from '@mui/material';
import styled from 'styled-components';

export const ImageBox = styled(Box)`
    background-image: ${(props) => (props?.$coverPic ? `url(${props?.$coverPic})` : '')};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
`;
