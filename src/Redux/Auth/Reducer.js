import { ACTION_TYPES } from './Actions';

const initState = {
    isLoggedIn: localStorage.getItem('isLoggedIn'),
    accessToken: localStorage.getItem('accessToken'),
};

const Reducer = (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_USER:
            return {
                ...state,
                accessToken: action.accessToken,
                isLoggedIn: true
            };
        case ACTION_TYPES.LOGOUT_USER:
            return {
                ...state,
                isLoggedIn: false,
                accessToken: null
            };
        default:
            return state;
    }
};

export default Reducer;