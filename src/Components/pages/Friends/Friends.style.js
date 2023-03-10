import styled from 'styled-components';
import { COLORS } from 'Styles/Constants';

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

            .clear-search-icon{
                background: ${COLORS.WHITE_SMOKE};
            }
        }
    }

    .friend-list {
        height: ${(props) => `calc(${props?.$windowHeight}px - 156px)`};
        overflow: auto;
    }
`;
