import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template: 6rem minmax(200px, 1fr) / 200px 1fr;
  grid-template-columns: 200px 1fr;
  /* grid-template-rows: 6rem auto; */
  justify-items: stretch;
  grid-template-areas:
    'header header'
    'aside article'
    'aside article';
`;

const Header = styled.div`
  grid-area: header;
  background-color: brown;
`;

const Aside = styled.div`
  grid-area: aside;
  background-color: blue;
`;

const Article = styled.div`
  grid-area: article;
  background-color: black;
`;

function GridDemo() {
  return (
    <Container>
      <Header />
      <Aside />
      <Article> content</Article>
    </Container>
  );
}

export default GridDemo;
