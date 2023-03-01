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
                font-family: ${FONTS.PRIMARY_Medium};
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
            height: 120px;
            
            .btn {
                background: ${COLORS.PRIMARY_DARK};
                color: ${COLORS.WHITE};
                box-shadow: 5px 5px 16px rgba(0, 0, 0, 0.1);
                font-family: ${FONTS.PRIMARY_Medium};
                font-size: 20px;
                border-radius: 35px;

                &:hover{
                    background: ${COLORS.WHITE};
                    border: 2px solid ${COLORS.PRIMARY_DARK};
                    color: ${COLORS.PRIMARY_DARK};
                }

                &.sign-up-btn{
                    margin: auto 0 0 0;
                }
            }
        }
    }
`;
