export const ACTION_TYPES = {
    TOAST_MESSAGE_ENABLE: 'TOAST_MESSAGE_ENABLE',
    TOAST_MESSAGE_DISABLE: 'TOAST_MESSAGE_DISABLE'
};

export const showToast = (message, variant, duration = 0) => {
    return {
        type: ACTION_TYPES.TOAST_MESSAGE_ENABLE,
        message: message || '',
        variant: variant || '',
        duration: duration
    };
};
export const hideToast = () => {
    return {
        type: ACTION_TYPES.TOAST_MESSAGE_DISABLE
    };
};
