import React, { useState } from "react";
import styled from "styled-components";

function App() {
  const Container = styled.div`
    background-color: ${porps => porps.theme.bgColor};
  `;
  const H1 = styled.h1`
    color: ${porps => porps.theme.textColor};
  `;

  return (
    <Container>
      <H1>Wow</H1>
    </Container>
  );
}

export default App;
