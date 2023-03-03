//CORE
import React from 'react';
import { Box, IconButton, TextField, Typography } from '@mui/material';

//ICON
import CloseIcon from '@mui/icons-material/Close';

//CUSTOM
import { AddPostWrapper } from './AddPost.style';
import { Formik } from 'formik';

const INIT_VALUES = {
    description: ''
};

const AddPost = ({ onClose }) => {
    const handleAddPostSubmit = () => {};

    return (
        <AddPostWrapper open fullScreen onClose={onClose} classes={{ paper: 'paper-root' }}>
            <Box className="flex f-v-center f-h-space-between header">
                <Typography className="add-post-title">Add Post</Typography>
                <IconButton onClick={() => onClose()}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Formik initialValues={INIT_VALUES} onSubmit={handleAddPostSubmit}>
                {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
                    <Box>
                        <Box className="field-wrapper">
                            <Typography className="form-label">Description :</Typography>
                            <TextField
                                variant="outlined"
                                name="description"
                                className="input-field"
                                placeholder="Something to say about your post?"
                                multiline
                                maxRows={6}
                                minRows={6}
                                fullWidth
                                value={values?.description}
                                onChange={handleChange}
                                InputProps={{
                                    classes: {
                                        root: 'input-field-root',
                                        focused: 'input-focused',
                                        notchedOutline: 'input-outline'
                                    }
                                }}
                            />
                            {/* <FormHelperText error>{touched?.email && errors?.email}</FormHelperText> */}
                        </Box>
                    </Box>
                )}
            </Formik>
        </AddPostWrapper>
    );
};

export default AddPost;
