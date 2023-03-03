import styled from "styled-components";

export const WebsiteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 100%;
`;

export const ContentWrapper = styled.div`
  background-color: #fff;
  overflow: hidden;
  height: ${(props) =>
    props?.$showBottomBar
      ? `calc(${props?.$windowHeight}px - 60px)`
      : `${props?.$windowHeight}px`};
`;
