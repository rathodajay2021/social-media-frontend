import styled from 'styled-components';
import { COLORS, FONTS, responsive } from 'Styles/Constants';

export const ResetPasswordWrapper = styled.div`
    height: 100%;
    width: 100%;
    background: ${COLORS.PRIMARY};

    .reset-password-screen {
        margin: 150px 0 0 0;
        background: ${COLORS.WHITE};
        height: fit-content;
        width: 30%;
        padding: 30px;
        border-radius: 15px;

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
            width: 100%;
            margin-bottom: 30px;

            .title {
                font-size: 40px;
                font-family: ${FONTS.PRIMARY_Medium};
                text-transform: capitalize;
            }
        }

        .reset-password-field {
            width: 100%;
            gap: 10px;
        }

        .field-wrapper {
            .input-field {
                width: 100%;
                padding: auto 15px;

                .input-field-root {
                    border-radius: 40px;
                }

                .password-field-root {
                    border-radius: 40px 0 0 40px;
                }

                .input-focused {
                    border: none;
                }

                .input-outline {
                    border: 1px solid ${COLORS.TEXT_LIGHT};
                    border-radius: 40px;
                }
            }
        }

        .submit-btn {
            background: ${COLORS.PRIMARY_DARK};
            color: ${COLORS.WHITE};
            box-shadow: 5px 5px 16px rgba(0, 0, 0, 0.1);
            font-family: ${FONTS.PRIMARY_Medium};
            font-size: 20px;
            border-radius: 35px;
        }

        .login-container {
            margin: 10px 0 0 0;
            .login-text {
                margin: 0 0 0 5px;
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
`;
