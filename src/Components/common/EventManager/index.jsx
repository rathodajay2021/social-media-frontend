import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import Toast from 'Components/common/Toast';
import { hideToast } from 'Redux/App/Actions';

const EventManager = (props) => {
    const toast = useSelector((state) => state.App.toast);
    const dispatch = useDispatch();

    return (
        <Toast
            open={toast.enable}
            message={toast.message}
            variant={toast.variant}
            duration={toast.duration}
            handleClose={() => dispatch(hideToast())}
        />
    );
};

export default EventManager;
