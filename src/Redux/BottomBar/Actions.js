export const ACTION_TYPES = {
    SELECTED_MENU: 'SELECTED_MENU',
    SHOW_BOTTOM_BAR: 'SHOW_BOTTOM_BAR',
    HIDE_BOTTOM_BAR: 'HIDE_BOTTOM_BAR'
};

export const showBottomBar = () => {
    return {
        type: ACTION_TYPES.SHOW_BOTTOM_BAR
    };
};

export const hideBottomBar = () => {
    return {
        type: ACTION_TYPES.HIDE_BOTTOM_BAR
    };
};

export const selectMenu = (state) => {
    return {
        payload: state,
        type: ACTION_TYPES.SELECTED_MENU
    };
};
