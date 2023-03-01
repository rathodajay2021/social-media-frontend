import React, { Fragment } from 'react';
import { Navigate } from 'react-router-dom';

import { URL_WELCOME_PAGE } from 'Helpers/Paths';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

const ProtectedRoute = (props) => {
    const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);

    return (
        <Box style={{ height: 'inherit' }}>
            {!isLoggedIn ? <Navigate replace to={URL_WELCOME_PAGE} /> : <Fragment>{props.children}</Fragment>}
        </Box>
    );
}

export default ProtectedRoute;