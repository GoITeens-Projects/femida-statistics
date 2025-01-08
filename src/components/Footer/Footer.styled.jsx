import styled from 'styled-components';

export const FooterStyled = styled.footer`
  padding: 20px 30px;
  width: ${({ size }) => `${size - 60}px`};
  background-color: var(--bg-footer-color);
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  height: auto;

  @media screen and (min-width: 1200px) {
    width: ${({ size }) => `${size - 200}px`};
    padding: 30px 100px 30px 100px;
  }
`;
