import styled from 'styled-components';
import { COLORS, FONTS, responsive } from 'Styles/Constants';

export const WelcomePageWrapper = styled.div`
    height: 100%;
    width: 100%;
    background: ${COLORS.PRIMARY};

    .welcome-field {
        margin: 150px 0 0 0;
        background: ${COLORS.WHITE};
        height: fit-content;
        width: 30%;
        padding: 30px;
        border-radius: 15px;
        justify-content: end;
        gap: 30px;

        ${responsive.DISPLAY_1550`
            width: 45%;
        `}

        ${responsive.TABLET`
            width: 65%;
        `}

        ${responsive.MOBILE`
            width: 75%;
        `}

        .heading {
            .title {
                font-size: 48px;
                font-family: ${FONTS.PRIMARY_MEDIUM};
                text-transform: capitalize;
            }

            .description {
                font-size: 18px;
                font-family: ${FONTS.PRIMARY};
                width: 70%;
            }
        }

        .btn-section {
            gap: 20px;
        }
    }
`;
