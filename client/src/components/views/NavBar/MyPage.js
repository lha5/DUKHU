import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid gold;
  margin: 10px 25px 10px 0;
`;

function MyPage() {
  return (
    <Container>
      내 정보
    </Container>
  );
};

export default MyPage;
