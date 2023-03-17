import styled from 'styled-components';

export const HomePageWrapper = styled.div`
    height: ${(props) => `calc(${props?.$windowHeight}px - 120px)`};
    overflow: auto;
    position: relative;

    .users-post-list {
        gap: 30px;
        padding: 20px;
    }
`;
