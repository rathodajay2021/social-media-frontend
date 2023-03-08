import { Button } from '@mui/material';
import styled from 'styled-components';
import { COLORS, FONTS } from 'Styles/Constants';

export const CustomButtonWrapper = styled(Button)`
    box-shadow: 5px 5px 16px rgba(0, 0, 0, 0.1);
    font-family: ${FONTS.PRIMARY_MEDIUM};
    padding: 8px 20px;

    &.btn-outline {
        background: transparent;
        color: ${COLORS.PRIMARY_DARK};
        border: 2px solid ${COLORS.PRIMARY_DARK};
        transition: all 0.3s ease-out;

        &:hover {
            color: ${COLORS.WHITE};
        }
    }

    &.btn-primary {
        background: ${COLORS.PRIMARY_DARK};
        color: ${COLORS.WHITE};
        border: 2px solid ${COLORS.PRIMARY_DARK};
    }

    &.btn-medium {
        font-size: 18px;
    }

    &.btn-large {
        font-size: 20px;
    }

    &.rounded {
        border-radius: 30px;
    }

    &.btn-disabled {
        color: ${COLORS.WHITE} !important;
        background: linear-gradient(180deg, #7086ec 0%, #788ded 100%);
        border: 2px solid #7086ec;
    }
`;
