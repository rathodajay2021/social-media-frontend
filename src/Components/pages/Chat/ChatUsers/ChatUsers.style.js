import { COLORS, FONTS, responsive } from 'Styles/Constants';
import styled from 'styled-components';

export const ChatUsersWrapper = styled.div`
    width: 30%;
    height: 100%;

    ${responsive.TABLET`
        width: 100%;
        display: ${(props) => `${props?.$ChatUsersDisplay}`};
    `}

    .header {
        background: ${COLORS.PRIMARY};
        color: ${COLORS.WHITE};
        padding: 10px;

        .title {
            font-size: 22px;
            font-family: ${FONTS.PRIMARY_SEMI_BOLD};
            margin: 0 0 10px 0;
        }

        .user-details {
            gap: 10px;

            .user-avatar {
                width: 55px;
                height: 55px;
            }

            .user-name {
                font-size: 18px;
                font-family: ${FONTS.PRIMARY_MEDIUM};
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }

        .input-field {
            width: 100%;
            padding: auto 15px;
            border-radius: 10px;
            background: ${COLORS.WHITE};
            margin: 10px 0 0 0;

            .input-outline {
                border: none;
            }
        }
    }

    .users-list {
        height: ${(props) => `calc(${props?.$windowHeight}px - 186px)`};
        overflow: auto;

        &::-webkit-scrollbar {
            display: none;
        }

        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */

        .user {
            gap: 10px;
            padding: 10px;
            border-bottom: 1px solid ${COLORS.LIGHT_GREY};

            &:last-child {
                border: none;
            }

            &:hover {
                background: ${COLORS.PRIMARY};
                color: ${COLORS.WHITE};
            }

            &.selected-user {
                background: ${COLORS.PRIMARY};
                color: ${COLORS.WHITE};
            }

            .user-avatar {
                width: 55px;
                height: 55px;
            }

            .user-name {
                font-size: 18px;
                font-family: ${FONTS.PRIMARY_MEDIUM};
                text-transform: capitalize;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
`;
