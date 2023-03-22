import { Popover } from '@mui/material';
import styled from 'styled-components';
import { COLORS, FONTS } from 'Styles/Constants';

export const CommentDetailsWrapper = styled.div`
    .comments {
        gap: 10px;
        max-height: 300px;
        overflow: auto;

        .comment-box {
            gap: 15px;

            .user-name {
                font-family: ${FONTS.PRIMARY_BOLD};
            }

            .comment-options {
                align-self: start;
                margin: 0 0 0 auto;
            }
        }
    }

    .divider {
        margin: 10px 0;
    }

    .input-field {
        .input-focused,
        .input-outline {
            border: none;
        }
    }
`;

export const PopOverWrapper = styled(Popover)`
    .popover-paper {
        border-radius: 30px;
        display: flex;
        justify-content: space-between;

        .edit-box {
            background: ${COLORS.PRIMARY_LIGHT};
        }

        .delete-box {
            background: ${COLORS.LIKED_RED};
        }

        .icon {
            color: ${COLORS.WHITE};
        }
    }
`;
