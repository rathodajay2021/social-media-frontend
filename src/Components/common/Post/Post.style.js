import { Paper } from '@mui/material';
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

            .video-player {
                height: inherit;
                position: relative;
            }
        }
    }
`;

export const VideoPlayerControlsWrapper = styled.div`
    position: absolute;
    bottom: 0;
    height: 40%;
    width: 100%;
    background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.8267682072829132) 2%,
        rgba(182, 182, 182, 0) 72%
    );
    justify-content: end;

    .icon-style {
        color: ${COLORS.WHITE};
        /* border: 1px solid red; */
    }

    .player-controls {
        /* padding: 0; */

        .pause-play {
            gap: 5px;

            .video-time {
                color: ${COLORS.WHITE};
            }
        }
    }

    .progress-bar {
        width: inherit;
        padding: 0 15px;
        color: ${COLORS.WHITE};

        .slider-root{
            color: ${COLORS.GREY_TEXT_COLOR};
            
            .slider-thumb{
                display: none;
            }
    
            .slider-track{
                color: ${COLORS.LIGHT_GREY};
                transition: all .3s ease-in-out;
            }
        }

    }
`;
