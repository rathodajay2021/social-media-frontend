import styled from 'styled-components';
import { COLORS, FONTS, responsive } from 'Styles/Constants';

export const ProfileWrapper = styled.div`
    height: ${(props) => `calc(${props?.$windowHeight}px - 120px)`};
    overflow: auto;
    position: relative;

    .user-basic-details {
        position: relative;
        height: 400px;

        .profile-pic {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: 10px solid ${COLORS.WHITE};
            border-radius: 50%;
            font-size: 40px;
            height: 130px;
            width: 130px;

            ${responsive.PHABLET`
                height: 100px;
                width: 100px;
            `}
        }

        .user-details {
            height: 50%;
            padding: 20px;

            ${responsive.PHABLET`
                padding: 50px 20px 20px;
            `}

            .user-name {
                text-transform: capitalize;
                font-size: 24px;
                font-style: ${FONTS.PRIMARY_SEMI_BOLD};
                margin: 0 0 10px 0;

                ${responsive.PHABLET`
                    text-align: center;
                `}
            }

            .user-bio {
                font-size: 20px;
                width: inherit;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;

                ${responsive.PHABLET`
                    text-align: center;
                `}
            }
        }

        .cover-pic {
            height: 50%;
            background-color: ${COLORS.MEDIUM_GREY};
        }
    }

    .user-status {
        height: 200px;
        padding: 0 15%;
        background: ${COLORS.LIGHT_GREY};

        .user-record {
            min-width: 50px;

            .data {
                font-size: 26px;
                font-style: ${FONTS.PRIMARY_BOLD};
                ${responsive.PHABLET`
                    font-size: 18px;
                `}
            }

            .data-label {
                font-size: 24px;
                font-style: ${FONTS.PRIMARY_BOLD};

                .details-icon {
                    width: 35px;
                    height: 35px;
                    color: ${COLORS.NEUTRAL_GREY};

                    ${responsive.PHABLET`
                        width: 25px;
                        height: 25px;
                    `}
                }
            }
        }
    }

    .users-post-list {
        gap: 30px;
        padding: 20px;
    }
`;
