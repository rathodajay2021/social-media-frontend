import styled from 'styled-components';
import { Dialog } from '@mui/material';
import { COLORS, FONTS } from 'Styles/Constants';

export const AddPostWrapper = styled(Dialog)`
    .header {
        padding: 10px 15px;

        .add-post-title {
            font-family: ${FONTS.PRIMARY_SEMI_BOLD};
            font-size: 24px;
        }
    }

    .add-post-form {
        padding: 15px;
        gap: 10px;

        .form-label {
            font-family: ${FONTS.PRIMARY_MEDIUM};
            font-size: 18px;
        }

        .field-wrapper {
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

            .file-selector {
                display: none;
            }

            .media-selector-wrapper {
                gap: 10px;

                .add-file,
                .img-display {
                    width: 150px;
                    height: 150px;
                    border: 2px dashed ${COLORS.GREY_TEXT_COLOR};
                    border-radius: 10px;

                    .add-media,
                    .limit {
                        font-size: 16px;
                    }

                    .delete-img-icon-btn {
                        background: ${COLORS.TRANSPARENT_BLACK};
                        color: ${COLORS.WHITE};
                    }
                }

                .video-wrapper {
                    position: relative;
                    width: 150px;
                    height: 150px;
                    border: 2px dashed ${COLORS.GREY_TEXT_COLOR};
                    border-radius: 10px;
                    overflow: hidden;

                    .video-display {
                        width: inherit;
                        height: inherit;
                        border-radius: 10px;
                    }

                    .delete-img-icon-btn {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: ${COLORS.TRANSPARENT_BLACK};
                        color: ${COLORS.WHITE};
                    }
                }
            }
        }
    }
`;
