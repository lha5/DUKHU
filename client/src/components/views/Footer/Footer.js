import React from 'react'

import styled from 'styled-components';

const Container = styled.div`
  /* border: 1px solid cyan; */
  margin: 0 auto;
  padding: 5px 0;
  color: ${props => props.theme.colors.gray};

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

function Footer() {
  return (
    <Container>
      © ha(하) ALL RIGHTS RESERVED
    </Container>
  )
}

export default Footer
