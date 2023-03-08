import React, { useEffect, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import styled from 'styled-components';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import { FONTS } from 'Styles/Constants';
import { getWindowDimensions } from 'Helpers/Utils';

const NoPost = ({ wrapperHeight }) => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <NoPostWrapper
            sx={{ height: wrapperHeight || windowDimensions?.height - 120 }}
            className="flex f-column f-v-center f-h-center">
            <IconButton className="icon-btn">
                <PhotoCameraOutlinedIcon className="no-post-icon" />
            </IconButton>
            <Typography className="no-post-text">No posts yet</Typography>
        </NoPostWrapper>
    );
};

export default NoPost;

const NoPostWrapper = styled(Box)`
    .no-post-icon {
        height: 40px;
        width: 40px;
    }

    .no-post-text {
        font-family: ${FONTS.PRIMARY_SEMI_BOLD};
        font-size: 20px;
        text-transform: capitalize;
    }
`;
