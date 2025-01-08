import styled from 'styled-components';

export const FooterStyled = styled.footer`
  width: ${({ size }) => `${size - 217}px`};
  background-color: var(--bg-footer-color);
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 30px 100px 30px 100px;
  height: auto;

  @media screen and (max-width: 599px) {
    padding: 20px 30px;
    width: ${({ size }) => `${size - 60}px`};
  }
`;
