import styled from 'styled-components';
import { COLORS, FONTS } from 'Styles/Constants';

export const LeftMenuWrapper = styled.div`
    position: relative;
    width: 20%;

    .left-menu-position {
        position: sticky;
        left: 10px;
        top: 10px;
        width: calc(100% - 10px);
        height: ${(props) => `calc(${props?.$windowHeight}px - 120px - 20px)`};
        gap: 10px;

        .paper {
            &.post-paper {
                box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.15);
            }

            .title {
                padding: 10px;
                font-family: ${FONTS.PRIMARY_MEDIUM};
                font-size: 24px;
            }

            .menu-options {
                padding: 10px;
                gap: 10px;

                .option {
                    gap: 10px;

                    .option-icon {
                        color: ${COLORS.GREY_TEXT_COLOR};
                        height: 30px;
                        width: 30px;
                    }

                    .option-label {
                        font-size: 18px;
                        text-transform: capitalize;
                        font-family: ${FONTS.PRIMARY};
                    }
                }
            }

            .friend-menu {
                max-height: 250px;
                overflow: auto;

                .no-friend {
                    height: 100px;

                    .no-friend-msg {
                        font-size: 18px;
                        text-transform: capitalize;
                        font-family: ${FONTS.PRIMARY};
                    }
                }
            }
        }
    }
`;
