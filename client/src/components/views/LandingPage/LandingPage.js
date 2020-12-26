import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid cyan;
  width: 1400px;
  height: calc(100vh - 45px - 28px - 2px);
  margin: 0 auto;

  @media ${props => props.theme.device.desktop} {
    width: 70%;
  }

  @media ${props => props.theme.device.labtop} {
    width: 65%;
  }

  @media ${props => props.theme.device.tablet} {
    width: 100%;
  }

  @media ${props => props.theme.device.mobile} {
    width: 100%;
  }
`;

function LandingPage() {
  return (
    <Container>
      랜딩 페이지
    </Container>
  );
};

export default LandingPage;
