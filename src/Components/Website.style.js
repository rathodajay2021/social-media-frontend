import styled from 'styled-components';

export const WebsiteWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 100%;
`;

export const ContentWrapper = styled.div`
    background-color: #fff;
    overflow: auto;
    height: ${(props) =>
        `calc(${props?.$windowHeight}px - ${props.$bottomBarHeight}px)`};
`;
