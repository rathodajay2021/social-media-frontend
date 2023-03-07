import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route as ReactRoute, useNavigate } from 'react-router-dom';
import {
    URL_HOME_PAGE,
    URL_LOGIN,
    URL_RESET_PASSWORD,
    URL_SIGN_UP,
    URL_WELCOME_PAGE
} from 'Helpers/Paths';
import { SignUp } from 'Components/pages/SignUp';
import { Login } from 'Components/pages/Login';
import { WelcomePage } from 'Components/pages/WelcomePage';
import ProtectedRoute from './ProtectedRoute';
import RoutesList from './RouteList';
import { ResetPassword } from 'Components/pages/ResetPassword';
import WrongPath from 'Components/common/NoPageFound/WrongPath';

const BEFORE_LOGIN_ACCESSIBLE_PATHS = [
    URL_LOGIN,
    URL_SIGN_UP,
    URL_RESET_PASSWORD,
    URL_WELCOME_PAGE,
    URL_RESET_PASSWORD
];

const Route = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);
    const userInfo = useSelector((state) => state.Auth.userInfo);

    useEffect(() => {
        if (isLoggedIn && BEFORE_LOGIN_ACCESSIBLE_PATHS?.includes(window?.location?.pathname)) {
            navigate(URL_HOME_PAGE);
        }
    }, [isLoggedIn, navigate, userInfo]);

    return (
        <Routes>
            <ReactRoute path={URL_LOGIN} element={<Login />} />
            <ReactRoute path={URL_SIGN_UP} element={<SignUp />} />
            <ReactRoute path={URL_WELCOME_PAGE} element={<WelcomePage />} />
            <ReactRoute path={URL_RESET_PASSWORD} element={<ResetPassword />} />
            {RoutesList.map((route, index) => (
                <React.Fragment key={index}>
                    {route.hasChildren ? (
                        <ReactRoute
                            path={route.path}
                            element={<ProtectedRoute>{route.Component}</ProtectedRoute>}>
                            {route.children}
                        </ReactRoute>
                    ) : (
                        <ReactRoute
                            path={route.path}
                            element={<ProtectedRoute>{route.Component}</ProtectedRoute>}
                        />
                    )}
                </React.Fragment>
            ))}
            <ReactRoute path='*' element={<WrongPath />} />
        </Routes>
    );
};

export default Route;
