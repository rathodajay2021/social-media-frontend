import React from 'react';
import { CustomButtonWrapper } from './CustomButton.style';

const BTN_STYLES = ['btn-primary', 'btn-outline'];
const BTN_SIZES = ['btn-medium', 'btn-large'];

const CustomButton = ({ children, btnStyle, btnSize, onClick, btnRounder = false, ...props }) => {
    const checkButtonStyle = BTN_STYLES.includes(btnStyle) ? btnStyle : BTN_STYLES[0];
    const checkButtonSize = BTN_SIZES.includes(btnSize) ? btnSize : BTN_SIZES[0];

    return (
        <CustomButtonWrapper
            variant="contained"
            className={`${checkButtonSize} ${checkButtonStyle} ${btnRounder && 'rounded'}`}
            onClick={onClick}
            classes={{
                disabled: 'btn-disabled'
            }}
            {...props}>
            {children}
        </CustomButtonWrapper>
    );
};

export default CustomButton;
