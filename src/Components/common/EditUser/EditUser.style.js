import styled from 'styled-components';
import { Dialog } from '@mui/material';
import { COLORS, FONTS, responsive } from 'Styles/Constants';

export const EditUserWrapper = styled(Dialog)`
    .edit-profile-header {
        padding: 10px 15px;

        .title {
            font-family: ${FONTS.PRIMARY_SEMI_BOLD};
            font-size: 24px;
            text-transform: capitalize;
        }
    }

    .edit-form {
        padding: 0 0 15px 0;
        max-height: 700px;
        overflow-y: auto;

        .coverPic,
        .profilePic {
            display: none;
        }

        .cover-pic-display {
            height: 200px;
            background-color: ${COLORS.MEDIUM_GREY};
            gap: 10px;
            padding: 10px 15px 0 0;

            .icon-btn {
                height: 40px;
                width: 40px;
                background: ${COLORS.TRANSPARENT_BLACK};

                .action-icon {
                    color: ${COLORS.WHITE};
                }
            }
        }

        .profile-pic-wrapper {
            height: 200px;

            .profile-avatar-div {
                position: relative;

                .icon-btn {
                    height: 40px;
                    width: 40px;
                    background: ${COLORS.TRANSPARENT_BLACK};
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);

                    .action-icon {
                        color: ${COLORS.WHITE};
                    }
                }

                .profile-pic-avatar {
                    font-size: 40px;
                    height: 130px;
                    width: 130px;
                }
            }

            .profile-pic-text {
                color: ${COLORS.URL_TEXT};
                font-size: 20px;
                text-transform: capitalize;
                text-decoration: underline;
            }
        }

        .user-form {
            padding: 0 15px;

            .user-name {
                gap: 15px;

                ${responsive.MOBILE`
                    flex-direction: column;
                `}
            }

            .filed-wrapper {
                &.user-name-field {
                    width: 50%;

                    ${responsive.MOBILE`
                        width: 100%;
                    `}
                }

                .form-label {
                    font-size: 18px;
                    font-family: ${FONTS.PRIMARY_MEDIUM};
                    text-transform: capitalize;
                }

                .input-field {
                    width: 100%;
                    padding: auto 15px;

                    .input-focused {
                        border: none;
                    }

                    .input-outline {
                        border: 1px solid ${COLORS.TEXT_LIGHT};
                    }
                }
            }
        }
    }

    .submit-btn-section {
        padding: 15px;
    }
`;
