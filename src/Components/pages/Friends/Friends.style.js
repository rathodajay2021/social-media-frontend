import styled from 'styled-components';
import { COLORS, FONTS } from 'Styles/Constants';

export const FriendsWrapper = styled.div`
    .search-wrapper {
        padding: 20px;

        .input-field {
            border-radius: 40px;
            background: ${COLORS.LIGHT_GREY};

            .input-focused {
                border: none;
            }

            .input-outline {
                border-radius: 40px;
                border: none;
            }

            .clear-search-icon {
                background: ${COLORS.WHITE_SMOKE};
            }
        }
    }

    .friend-list {
        height: ${(props) => `calc(${props?.$windowHeight}px - 156px)`};
        overflow: auto;
        position: relative;

        .load-more {
            width: fit-content;
            margin: 0 auto;
            min-height: 60px;

            &:hover {
                .load-more-text {
                    margin: 0 0 5px 0;
                }
            }

            .load-more-text {
                text-transform: capitalize;
                font-style: ${FONTS.PRIMARY_BOLD};
                font-size: 16px;
                color: ${COLORS.PRIMARY};
                transition: all 0.3s ease-in-out
            }

            .load-more-icon {
                color: ${COLORS.PRIMARY};
            }
        }
    }
`;
