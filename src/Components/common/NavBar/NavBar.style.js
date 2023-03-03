import styled from 'styled-components';
import { COLORS, FONTS } from 'Styles/Constants';

export const NavBarWrapper = styled.div`
    height: 60px;
    border-bottom: 1px solid ${COLORS.LIGHT_GREY_SECONDARY};
    padding: 0 15px;

    .nav-title{
        font-family: ${FONTS.PRIMARY_Bold};
        font-size: 25px;
    }
`;
