import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route as ReactRoute, useNavigate } from "react-router-dom";
import {
  URL_HOME_PAGE,
  URL_LOGIN,
  URL_RESET_PASSWORD,
  URL_SIGN_UP,
} from "Helpers/Paths";
import { SignUp } from "Components/pages/SignUp";
import { Login } from "Components/pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import RoutesList from "./RouteList";

const BEFORE_LOGIN_ACCESSIBLE_PATHS = [
  URL_LOGIN,
  URL_SIGN_UP,
  URL_RESET_PASSWORD,
];

const Route = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);
  const userInfo = useSelector((state) => state.Auth.userInfo);

  useEffect(() => {
    if (
      isLoggedIn &&
      BEFORE_LOGIN_ACCESSIBLE_PATHS?.includes(window?.location?.pathname)
    ) {
      navigate(URL_HOME_PAGE);
    }
  }, [isLoggedIn, navigate, userInfo]);

  return (
    <Routes>
      <ReactRoute path={URL_LOGIN} element={<Login />} />
      <ReactRoute path={URL_SIGN_UP} element={<SignUp />} />
      {RoutesList.map((route, index) => (
        <React.Fragment key={index}>
          {route.hasChildren ? (
            <ReactRoute
              path={route.path}
              element={<ProtectedRoute>{route.Component}</ProtectedRoute>}
            >
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
    </Routes>
  );
};

export default Route;
