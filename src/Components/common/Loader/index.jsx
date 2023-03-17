import { Backdrop, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { COLORS } from 'Styles/Constants';

const Loader = ({ backdropCustomStyle, isLoading, loadingText }) => {
    return (
        <Backdrop
            sx={{
                zIndex: 1100,
                position: 'absolute',
                ...backdropCustomStyle
            }}
            open={isLoading}>
            <MasterLoaderWrapper>
                <CircularProgressWrapper classes={{ root: 'circular-progress' }} />

                {loadingText && <Typography className="loading-text">{loadingText}</Typography>}
            </MasterLoaderWrapper>
        </Backdrop>
    );
};

export default Loader;

export const MasterLoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100vw;

    .loading-text {
        color: ${COLORS.WHITE};
    }
`;

export const CircularProgressWrapper = styled(CircularProgress)`
    &.circular-progress {
        color: ${COLORS.PRIMARY};
    }
`;
