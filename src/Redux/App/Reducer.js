import { ACTION_TYPES } from './Actions';

const initState = {
    toast: {
        enable: false,
        message: '',
        variant: '',
        duration: 0
    },
    userData: {}
};

const Reducer = (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.TOAST_MESSAGE_ENABLE:
            return {
                ...state,
                toast: {
                    enable: true,
                    message: action.message,
                    variant: action.variant,
                    duration: action.duration
                }
            };

        case ACTION_TYPES.TOAST_MESSAGE_DISABLE:
            return {
                ...state,
                toast: {
                    enable: false,
                    message: '',
                    variant: ''
                }
            };

        case ACTION_TYPES.USER_PROFILE_DATA:
            return {
                ...state,
                userData: { ...action.payload }
            };

        default:
            return state;
    }
};

export default Reducer;
