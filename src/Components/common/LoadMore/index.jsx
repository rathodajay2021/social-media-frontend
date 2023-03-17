import React from 'react';
import { Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import styled from 'styled-components';
import { COLORS, FONTS } from 'Styles/Constants';

const LoadMore = ({ onClickFuc }) => {
    return (
        <LoadMoreWrapper
            className="load-more flex f-column f-v-center hover"
            onClick={onClickFuc}>
            <Typography className="load-more-text">load more</Typography>
            <ArrowDownwardIcon className="load-more-icon" />
        </LoadMoreWrapper>
    );
};

export default LoadMore;

const LoadMoreWrapper = styled.div`
    width: fit-content;
    margin: 0 auto;
    min-height: 60px;

    &:hover {
        .load-more-text {
            margin: 0 0 5px 0;
        }
    }

    .load-more-text {
        text-transform: capitalize;
        font-style: ${FONTS.PRIMARY_BOLD};
        font-size: 16px;
        color: ${COLORS.PRIMARY};
        transition: all 0.3s ease-in-out;
    }

    .load-more-icon {
        color: ${COLORS.PRIMARY};
    }
`;
