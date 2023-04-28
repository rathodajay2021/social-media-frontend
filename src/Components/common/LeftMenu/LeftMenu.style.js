import styled from 'styled-components';
import { COLORS, FONTS } from 'Styles/Constants';

export const LeftMenuWrapper = styled.div`
    position: sticky;
    left: 10px;
    top: 10px;
    width: 20%;
    height: ${(props) => `calc(${props?.$windowHeight}px - 120px - 20px)`};
    
    .left-menu-position {
        gap: 10px;
        
        .paper {
            &.post-paper {
                /* border-radius: 15px; */
                box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.15);
                overflow: hidden;
                padding-bottom: 5px;
            }

            .title {
                padding: 10px;
                font-family: ${FONTS.PRIMARY_MEDIUM};
                font-size: 24px;
                color: ${COLORS.WHITE};
                background: ${COLORS.PRIMARY_LIGHT};
            }

            .menu-options {
                padding: 10px;
                gap: 10px;

                .option {
                    gap: 10px;

                    .option-icon {
                        color: ${COLORS.PRIMARY_LIGHT};
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
