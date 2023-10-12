import React from 'react';
import styled from '@emotion/styled';

const Header = styled.div`
  width: 100vw;
  height: 6rem;
  background-color: brown;
`;
const Main = styled.div`
  width: 100vw;
  /* height: calc(100% - 6rem); */
  height: 300px;
  display: flex;
`;
const Aside = styled.div`
  width: 150px;
  height: 100%;
  background-color: aliceblue;
`;
const Content = styled.div`
  flex: 1;
  height: 100%;
  background-color: black;
`;

function FlexDemo() {
  return (
    <>
      <Header />
      <Main>
        <Aside />
        <Content />
      </Main>
    </>
  );
}

export default FlexDemo;
