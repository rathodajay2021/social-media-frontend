import { Paper } from '@mui/material';
import styled from 'styled-components';
import { FONTS, responsive } from 'Styles/Constants';

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

            .background-img-div {
                height: inherit;
            }

            .video-player {
                height: 350px;
                position: relative;
                width: 100%;

                ${responsive.PHABLET`
                    height: 300px;
                `}

                ${responsive.MOBILE`
                    height: 250px;
                `}
            }
        }
    }
`;