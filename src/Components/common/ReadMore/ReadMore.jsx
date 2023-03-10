//CORE
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';

//CUSTOM
import { FONTS } from 'Styles/Constants';

const TEXT_LENGTH = 250

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <ReadMoreWrapper>
            <Typography component={'span'}>
                {isReadMore ? text.slice(0, TEXT_LENGTH) : text}
                {text.length > TEXT_LENGTH && <Typography
                    component={'span'}
                    onClick={toggleReadMore}
                    className="read-or-hide hover">
                    {isReadMore ? '...read more' : ' show less'}
                </Typography>}
            </Typography>
        </ReadMoreWrapper>
    );
};

export default ReadMore;

const ReadMoreWrapper = styled.div`
    .read-or-hide {
        font-family: ${FONTS.PRIMARY_BOLD};
    }
`;
