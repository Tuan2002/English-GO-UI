import React, { memo } from "react";
import styled from "styled-components";

// Định nghĩa styled-component cho Container
export const ContainerStyle = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 576px) {
    max-width: 768px;
  }

  @media (min-width: 768px) {
    max-width: 800px;
  }

  @media (min-width: 992px) {
    max-width: 1100px;
  }

  @media (min-width: 1200px) {
    max-width: 1350px;
  }
`;

// Component chính
const Container = memo(function Container(props) {
  return <ContainerStyle {...props} />;
});

export default Container;
