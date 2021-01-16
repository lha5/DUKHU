import React from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid cyan;
  width: 1400px;
  height: calc(100vh - 74px - 28px - 2px);
  margin: 0 auto;

  @media ${props => props.theme.device.desktop} {
    width: 70%;
  }

  @media ${props => props.theme.device.labtop} {
    width: 70%;
  }

  @media ${props => props.theme.device.tablet} {
    width: 80%;
  }

  @media ${props => props.theme.device.mobile} {
    width: 85%;
  }
`;

function LandingPage() {
  const user = useSelector(state => state.user);

  return (
    <Container>
      랜딩 페이지
    </Container>
  );
};

export default LandingPage;
