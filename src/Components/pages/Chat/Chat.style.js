import { Box } from '@mui/material';
import { COLORS, FONTS, responsive } from 'Styles/Constants';
import styled from 'styled-components';

export const ChatWrapper = styled(Box)`
    height: 100%;
    width: 100%;
    background: ${COLORS.SKY_BLUE};

    .container {
        width: 60%;
        height: 100%;

        ${responsive.TABLET`
            width: 100%;
        `}

        .msg-container {
            height: max-content;
            overflow-y: auto;
            gap: 10px;
            padding: 10px 10px 0 10px;
            position: relative;

            &::-webkit-scrollbar {
                display: none;
            }

            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */

            .msg-wrapper {
                width: fit-content;
                max-width: 45%;
                padding: 10px;

                ${responsive.PHABLET`
                    max-width: 70%;
                `}

                ${responsive.MOBILE`
                    max-width: 80%;
                `}
    
                &.msg-send {
                    align-self: flex-end;
                    border-radius: 10px 10px 0 10px;
                    background: ${COLORS.WHITE};
                    color: ${COLORS.GREY_TEXT_COLOR};
                }

                &.msg-received {
                    border-radius: 10px 10px 10px 0;
                    background: ${COLORS.PRIMARY};
                    color: ${COLORS.WHITE};
                }
            }

            .scroll-to-bottom-icon {
                position: sticky;
                bottom: 0;
                left: 100%;
                width: 45px;
                background: ${COLORS.WHITE};
            }
        }

        .no-chat-container {
            text-align: center;
            height: 100%;

            .msg-icon {
                height: 100px;
                width: 100px;
                color: ${COLORS.MEDIUM_GREY};
            }

            .title {
                font-size: 22px;
                color: ${COLORS.MEDIUM_GREY};
                text-transform: capitalize;
                font-family: ${FONTS.PRIMARY_BOLD};
            }

            .sub-title {
                font-size: 16px;
                color: ${COLORS.GREY_TEXT_COLOR};
                font-family: ${FONTS.PRIMARY_MEDIUM};
            }
        }

        .input-field-wrapper {
            margin: auto 0 0 0;
            padding: 10px;

            .input-field {
                width: 100%;
                padding: auto 15px;
                border-radius: 10px;
                background: ${COLORS.WHITE};

                .input-outline {
                    border: none;
                }
            }
        }
    }
`;
