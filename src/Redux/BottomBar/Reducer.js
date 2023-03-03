import { ACTION_TYPES } from './Actions';

const initState = {
    selectedMenu: 0,
    showBottomBar: true,
    showNavBar: false
};

const Reducer = (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SHOW_BOTTOM_BAR:
            return { ...state, showBottomBar: true };

        case ACTION_TYPES.HIDE_BOTTOM_BAR:
            return { ...state, showBottomBar: false };

        case ACTION_TYPES.SELECTED_MENU:
            return { ...state, selectedMenu: action.payload };

        case ACTION_TYPES.SHOW_NAV_BAR:
            return { ...state, showNavBar: true };

        case ACTION_TYPES.HIDE_NAV_BAR:
            return { ...state, showNavBar: false };

        default:
            return state;
    }
};

export default Reducer;
