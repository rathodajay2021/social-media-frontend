import styled from 'styled-components';
import { COLORS, FONTS } from 'Styles/Constants';

export const ProfileWrapper = styled.div`
    height: ${(props) => `calc(${props?.$windowHeight}px - 120px)`};
    overflow: auto;

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
        }

        .user-details {
            height: 50%;
            padding: 20px;

            .user-name {
                text-transform: capitalize;
                font-size: 24px;
                font-style: ${FONTS.PRIMARY_SEMI_BOLD};
                margin: 0 0 10px 0;
            }

            .user-bio {
                font-size: 20px;
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
            }

            .data-label {
                font-size: 24px;
                font-style: ${FONTS.PRIMARY_BOLD};

                .details-icon{
                    width: 35px;
                    height: 35px;
                    color: ${COLORS.NEUTRAL_GREY}
                }
            }
        }
    }

    .users-post-list {
        gap: 30px;
        padding: 20px;
    }
`;
