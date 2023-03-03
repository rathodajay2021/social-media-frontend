import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DeleteDialogWrapper } from './DeleteDialog.style';

const DeleteDialog = ({ text, onConfirm, onClose }) => {
    return (
        <DeleteDialogWrapper open={true} onClose={() => onClose()} classes={{ paper: 'root' }}>
            <Typography className="delete-dialog-title">{text}</Typography>
            <Box className="flex">
                <Button className="btn confirm-btn" onClick={() => onConfirm()}>
                    yes
                </Button>
                <Button className="btn cancel-btn" onClick={() => onClose()}>
                    no
                </Button>
            </Box>
        </DeleteDialogWrapper>
    );
};

export default DeleteDialog;
