import styled from 'styled-components';

export const FooterStyled = styled.footer`
  width: ${({ size }) => `${size - 200}px`};
  background-color: var(--bg-footer-color);
  position: absolute;
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 30px 100px 30px 100px;
`;
