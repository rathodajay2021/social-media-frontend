import styled from 'styled-components';
import { COLORS, FONTS } from 'Styles/Constants';

export const FriendsDetailsWrapper = styled.div`
    height: 100px;
    padding: 0px 10px;

    &:nth-child(2n + 1) {
        background: ${COLORS.LIGHT_GREY};
    }

    .user-avatar {
        height: 50px;
        width: 50px;
    }

    .friend-details {
        padding: 0 10px 0 20px;
        flex: 1;

        .friend-full-name {
            font-family: ${FONTS.PRIMARY_MEDIUM};
            font-size: 18px;
        }

        .friend-bio {
            font-family: ${FONTS.PRIMARY};
            font-size: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }
    }
`;
