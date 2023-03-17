import styled from 'styled-components';
import { COLORS, FONTS } from 'Styles/Constants';

export const HomePageWrapper = styled.div`
    height: ${(props) => `calc(${props?.$windowHeight}px - 120px)`};
    overflow: auto;
    position: relative;

    .users-post-list {
        gap: 30px;
        padding: 20px;
    }

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
            transition: all 0.3s ease-in-out;
        }

        .load-more-icon {
            color: ${COLORS.PRIMARY};
        }
    }
`;
