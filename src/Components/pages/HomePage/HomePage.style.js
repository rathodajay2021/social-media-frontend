import styled from 'styled-components';
import { responsive } from 'Styles/Constants';

export const HomePageWrapper = styled.div`
    height: ${(props) => `calc(${props?.$windowHeight}px - 120px)`};
    overflow: auto;
    position: relative;

    .post-area {
        width: 80%;

        ${responsive.TABLET`
            width: 100%;
        `}

        .users-post-list {
            gap: 30px;
            padding: 20px;
        }
    }
`;
