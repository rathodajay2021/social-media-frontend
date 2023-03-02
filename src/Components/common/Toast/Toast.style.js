import styled from 'styled-components';

import SnackbarContent from '@mui/material/SnackbarContent';
import { responsive } from 'Styles/Constants';
import { Snackbar } from '@mui/material';

export const SnackbarContentWrapper = styled(SnackbarContent)`
    &.themed {
        padding: 0;

        .notification-message {
            color: #000;
            font-size: 15px;
            width: 100%;
            padding: 0;
        }
        .root {
            padding: 0;
        }

        .close-icon {
            color: #a4afb7;
        }
    }

    .alert-message {
        font-size: 16px;
        padding: 0;
    }

    .alert-root {
        padding: 8px;
        max-width: 400px;

        ${responsive.PHABLET`
            max-width: 100%;
        `}

        &.success {
            background: #e1f4ed;
            border: 1px solid #bce8d8;
        }

        &.error {
            background: #ffe9e9;
            border: 1px solid #ffd0cd;
        }

        &.warning {
            background: #fff8de;
            border: 1px solid #ffebb7;
        }

        &.info {
            background: #deefff;
            border: 1px solid #b7dcff;
        }
    }

    .alert-icon {
        padding: 0;
    }

    .alert-action {
        padding: 8px;
        align-self: flex-start;
    }
    
    .close-icon-btn {
        width: 35px;
        height: 35px;
    }
`;

export const SnackbarWrapper = styled(Snackbar)`
    &.snackbar-root {
        top: 30px;
    }
`;
