import styled from 'styled-components';
import { COLORS, FONTS, responsive } from 'Styles/Constants';
import OTPBackgroundImage from 'Assets/images/wallpaper/loginBackground1.webp';
import OTPMailImage from 'Assets/images/mail/2716560.jpg';

export const VerifyEmailWrapper = styled.div`
    background-image: url(${OTPBackgroundImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100vh;
    width: 100%;

    .container {
        border-radius: 5px;
        width: 50%;
        min-height: 80%;
        background: ${COLORS.WHITE};
        padding: 20px;
        position: relative;

        ${responsive.TABLET`
            width: 70%;
        `}

        ${responsive.PHABLET_500`
            width: 90%;
        `}

        .mail-img {
            background-image: url(${OTPMailImage});
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            height: 370px;
            width: 380px;
            margin: 0 auto;

            ${responsive.TABLET`
                height: 300px;
                width: 300px;
            `}

            ${responsive.PHABLET_500`
                height: 250px;
                width: 250px;
            `}
        }

        .back-icon {
            display: flex;
            align-items: center;
            margin: 10px 0 0 0;
            position: absolute;
            top: 10px;
        }

        .data {
            width: 100%;
            padding: 0 15px;

            .title {
                font-family: ${FONTS.PRIMARY_SEMI_BOLD};
                font-size: 38px;
                text-transform: capitalize;
                margin-bottom: 20px;

                ${responsive.TABLET`
                    font-size: 30px;
                `}
            }

            .email-msg,
            .links {
                font-family: ${FONTS.PRIMARY_MEDIUM};
                font-size: 18px;
                color: ${COLORS.MEDIUM_GREY};

                ${responsive.TABLET`
                    font-size: 16px;
                `}

                .email, .link {
                    color: ${COLORS.BLACK};
                }

                .link {
                    color: ${COLORS.PRIMARY};
                    text-decoration: underline;
                }
            }

            .input-fields {
                margin: 0 0 20px 0;
                display: flex;
                justify-content: space-between;

                .root {
                    width: 50px;
                    border-bottom: 1px solid ${COLORS.PRIMARY};
                    border-color: transparent;
                    margin: 0 10px;

                    ${responsive.PHABLET`
                        width: 25px;
                    `}

                    &.error {
                        border-bottom: 1px solid #bc1218;
                    }
                    
                    input {
                        text-align: center;
                        font-size: 24px;

                        ${responsive.PHABLET`
                            font-size: 18px;
                        `}
                    }
                }

                .input-root {
                    border-bottom: none;
                    color: #bc1218;

                    ::before {
                        border-bottom: none;
                    }
                }
            }

            .invalid-otp-msg {
                font-size: 18px;

                ${responsive.TABLET`
                    font-size: 16px;
                `}
            }
        }
    }
`;
