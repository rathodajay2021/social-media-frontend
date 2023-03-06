import styled from 'styled-components';
import { Dialog } from '@mui/material';
import { COLORS, FONTS } from 'Styles/Constants';

export const AddPostWrapper = styled(Dialog)`
    .paper-root {
    }

    .header {
        padding: 10px 15px;
        border-bottom: 1px solid ${COLORS.LIGHT_GREY_SECONDARY};

        .add-post-title {
            font-family: ${FONTS.PRIMARY_Semi_Bold};
            font-size: 24px;
        }
    }

    .add-post-form {
        padding: 15px;
        gap: 10px;

        .form-label {
            font-family: ${FONTS.PRIMARY_Medium};
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

            .img-selector-wrapper {
                gap: 10px;

                .add-file,
                .img-display {
                    width: 150px;
                    height: 150px;
                    border: 2px dashed ${COLORS.GREY_TEXT_COLOR};
                    border-radius: 10px;

                    .add-img,
                    .limit {
                        font-size: 16px;
                    }

                    .delete-img-icon-btn {
                        background: ${COLORS.TRANSPARENT_BLACK};
                        color: ${COLORS.WHITE};
                    }
                }
            }
        }

        .add-post-btn {
            background: ${COLORS.PRIMARY};
            color: ${COLORS.WHITE};
            font-size: 16px;
            font-style: ${FONTS.PRIMARY_Medium};
            border-radius: 20px;

            &:disabled {
                background: linear-gradient(180deg, #7086ec 0%, #788ded 100%);
            }
        }
    }
`;
