import styled from 'styled-components';
import { Dialog } from '@mui/material';
import { COLORS, FONTS } from 'Styles/Constants';

export const AddPostWrapper = styled(Dialog)`
    .paper-root {
    }
    
    .header {
        padding: 10px;
        border-bottom: 1px solid ${COLORS.LIGHT_GREY_SECONDARY};

        .add-post-title {
            font-family: ${FONTS.PRIMARY_Semi_Bold};
            font-size: 24px;
        }
    }
`;
