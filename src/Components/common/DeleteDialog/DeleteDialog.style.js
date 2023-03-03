import styled from 'styled-components';
import { Dialog } from '@mui/material';
import { COLORS, responsive } from 'Styles/Constants';

export const DeleteDialogWrapper = styled(Dialog)`
    .root {
        padding: 50px 20px;
        background: ${COLORS.WHITE};
        box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.15);
        border-radius: 24px;
        align-items: center;
        max-width: 600px;
    }

    .delete-dialog-title {
        color: ${COLORS.GREY_TEXT_COLOR};
        font-size: 24px;
        text-align: center;
        max-width: 80%;
        ${responsive.PHABLET`
            font-size: 18px;
        `}
    }

    .btn {
        width: 161px;
        height: 57px;
        margin: 20px 0 0;
        font-size: 16px;

        ${responsive.PHABLET`
            width: 80px;
            font-size: 14px;
            height: 48px;
        `}
        
        &:last-child {
            margin-left: 10px;
        }

        &.confirm-btn {
            background: ${COLORS.PRIMARY_DARK};
            border-radius: 12px;
            color: #fff;
        }

        &.cancel-btn {
            background: #fff;
            border: 2px solid ${COLORS.PRIMARY};
            border-radius: 12px;
        }
    }
`;
