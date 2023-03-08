import { createGlobalStyle } from 'styled-components';
import { BASE_FONT_SIZE, FONTS, responsive } from './Constants';

//FONTS
import SignikaRegular from 'Assets/Fonts/Signika_Negative/SignikaNegative-Regular.ttf';
import SignikaLight from 'Assets/Fonts/Signika_Negative/SignikaNegative-Light.ttf';
import SignikaMedium from 'Assets/Fonts/Signika_Negative/SignikaNegative-Medium.ttf';
import SignikaSemiBold from 'Assets/Fonts/Signika_Negative/SignikaNegative-SemiBold.ttf';
import SignikaBold from 'Assets/Fonts/Signika_Negative/SignikaNegative-Bold.ttf';

import { isIEBrowser } from 'Helpers/Utils';
const isIE = isIEBrowser();

export const UtilityStyles = createGlobalStyle`
    * {
        box-sizing  : border-box;
        outline     : none;
    }
    
    html,
    body {
        margin: 0;
        padding: 0;
        background-color: white;
        overflow: hidden;
        -webkit-tap-highlight-color: transparent;
    }

    body {
        line-height         : 1.2;
        min-height          : 100vh;
        position            : relative;
    }

    #root {
        display: flex;
        flex-direction: column;
        ${responsive.TABLET`display : block;`}
    }

    .full-height {
        height: 100%;
    }

    .full-width {
        width: 100%;
    }

    .flex {
        display: flex;
    }

    .f-column {
        flex-direction: column;
    }

    .f-v-center { 
        align-items: center;
    }

    .f-h-center {
        justify-content: center;
    }

    .f-h-end {
        justify-content: flex-end;
    }

    .f-h-space-between {
        justify-content: space-between;
    }

    .f-wrap {
        flex-wrap: wrap;
    }
    
    .text-center {
        text-align: center;
    }

    .width-max-content {
        width: max-content;
    }

    //FONT SIZES

    p {
        font-size: ${BASE_FONT_SIZE}px
    }

    h2 {
        font-size: ${BASE_FONT_SIZE + 8}px;
        margin: 0
    }

    // BOX DESIGN LIKE BOOTSTRAP
    .visible-md {
        display: none;
        ${responsive.TABLET`display:block`}
    }
    .hidden-md {
        ${responsive.TABLET`display:none`}
    }

    .hover {
        cursor: pointer;
    }

    .elipsis {
        overflow        : hidden;
        text-overflow   : ellipsis;
        white-space     : nowrap;
    }
    
    .no-data-text {
        color       : #707070;
        font-size   : 15px;
        text-align  : center;
        width       : 100%;
    }

    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    ::-webkit-scrollbar-track {
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background-color    : rgba(162, 162, 162, 0.5); 
        border-radius       : 4px;
    }

    .text-uppercase {
        text-transform: uppercase;
    }

    //fonts
    @font-face {
        font-family: ${FONTS.PRIMARY};
        font-style: normal;
        font-weight: normal;
        /* src: ; */
        src: url(${SignikaRegular}) format('truetype');
        ${isIE && `src: url(${SignikaRegular}) format('truetype');`}
    }

    @font-face {
        font-family: ${FONTS.PRIMARY_LIGHT};
        font-style: normal;
        font-weight: normal;
        /* src: ; */
        src: url(${SignikaLight}) format('truetype');
        ${isIE && `src: url(${SignikaLight}) format('truetype');`}
    }

    @font-face {
        font-family: ${FONTS.PRIMARY_MEDIUM};
        font-style: normal;
        font-weight: normal;
        /* src: ; */
        src: url(${SignikaMedium}) format('truetype');
        ${isIE && `src: url(${SignikaMedium}) format('truetype');`}
    }
    
    @font-face {
        font-family: ${FONTS.PRIMARY_SEMI_BOLD};
        font-style: normal;
        font-weight: normal;
        /* src: ; */
        src: url(${SignikaSemiBold}) format('truetype');
        ${isIE && `src: url(${SignikaSemiBold}) format('truetype');`}
    }

    @font-face {
        font-family: ${FONTS.PRIMARY_Bold};
        font-style: normal;
        font-weight: normal;
        /* src: ; */
        src: url(${SignikaBold}) format('truetype');
        ${isIE && `src: url(${SignikaBold}) format('truetype');`}
    }
`;
