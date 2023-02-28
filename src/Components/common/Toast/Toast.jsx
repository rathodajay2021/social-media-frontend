import React from 'react';
import { Alert, IconButton } from '@mui/material';
import { SnackbarContentWrapper, SnackbarWrapper } from './Toast.style';

import { ReactComponent as SuccessIcon } from 'Assets/images/Toast/success.svg';
import { ReactComponent as InfoIcon } from 'Assets/images/Toast/info.svg';
import { ReactComponent as WarningIcon } from 'Assets/images/Toast/warning.svg';
import { ReactComponent as ErrorIcon } from 'Assets/images/Toast/error.svg';
import CloseIcon from '@mui/icons-material/Close';

const Toast = (props) => {
    return (
        <SnackbarWrapper
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
            classes={{ root: 'snackbar-root' }}
            autoHideDuration={props.duration || 3000}
            open={props.open}
            onClose={props.handleClose}>
            <SnackbarContentWrapper
                className={'themed'}
                aria-describedby="client-snackbar"
                classes={{
                    message: 'notification-message',
                    root: 'root'
                }}
                message={
                    props.open && (
                        <Alert
                            action={
                                <IconButton
                                    size="medium"
                                    className="close-icon-btn"
                                    onClick={() => props.handleClose()}>
                                    <CloseIcon className="close-svg" />
                                </IconButton>
                            }
                            severity={props.variant || 'success'}
                            className="f-v-center"
                            classes={{
                                message: 'alert-message',
                                root: `alert-root ${props.variant}`,
                                icon: 'alert-icon',
                                action: 'alert-action'
                            }}
                            iconMapping={{
                                error: <ErrorIcon />,
                                success: <SuccessIcon />,
                                info: <InfoIcon />,
                                warning: <WarningIcon />
                            }}>
                            {props.message}
                        </Alert>
                    )
                }
            />
        </SnackbarWrapper>
    );
};

export default Toast;
