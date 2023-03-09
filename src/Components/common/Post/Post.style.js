import { Paper, Popover } from '@mui/material';
import styled from 'styled-components';
import { COLORS, FONTS, responsive } from 'Styles/Constants';

export const PostWrapper = styled(Paper)`
    padding: 10px;
    gap: 15px;

    &.post-paper {
        box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.15);
    }

    .post-header {
        .user {
            gap: 15px;

            .user-details {
                .user-name {
                    font-family: ${FONTS.PRIMARY_MEDIUM};
                    text-transform: capitalize;
                }

                .post-create-date {
                    font-family: ${FONTS.PRIMARY};
                }
            }
        }
    }

    .media {
        margin-bottom: 25px;

        .media-file {
            height: 350px;
            width: 100%;
            cursor: grab;

            ${responsive.PHABLET`
                height: 300px;
            `}

            ${responsive.MOBILE`
                height: 250px;
            `}

            &.gap {
                padding: 0 10px 0 0;
            }

            .background-img-div,
            .background-video-div {
                height: inherit;
            }
        }
    }

    .post-features {
        .ellipse {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;

            &.description {
                -webkit-line-clamp: 2;
            }

            &.more-line-description {
                -webkit-line-clamp: 10;
            }
        }
    }
`;

export const CustomPopOver = styled(Popover)`
    .popover-paper {
        padding: 5px;
        background: ${COLORS.ALERT_BG};

        .delete-text {
            color: ${COLORS.ALERT_TEXT};
            font-style: ${FONTS.PRIMARY_MEDIUM};
            font-size: 18px;
        }
    }
`;
