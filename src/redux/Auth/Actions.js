export const ACTION_TYPES = {
    LOGIN_USER: 'LOGIN_USER',
    LOGOUT_USER: 'LOGOUT_USER',
}

export const loginUser = (data) => {
    const accessToken = data?.accessToken;
    delete data?.accessToken;
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return {
        type: ACTION_TYPES.LOGIN_USER,
        userInfo: data,
        accessToken
    };
};

export const logoutUser = () => {
    localStorage.clear();
    return {
        type: ACTION_TYPES.LOGOUT_USER
    };
};