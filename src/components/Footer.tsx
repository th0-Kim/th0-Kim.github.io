import styled from "styled-components";

import BottomArrow from "components/BottomArrow";

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <div>PORTFOLIO · WEB UI Developer</div>
      <div>
        Made by React
        <XSmall>&amp;</XSmall>
        TypeScript
        <XSmall>&amp;</XSmall>
        VanillaJS
      </div>
      <SmallDes>Update : 2025.04.02</SmallDes>
      <ButtonTop
        type="button"
        onClick={() => {
          const body = document.body;
          if (body) {
            body.setAttribute("tabIndex", "0");
            body.focus();
          }
          window.scrollTo({ top: 0, behavior: "smooth" });
          setTimeout(() => {
            if (body) {
              body.removeAttribute("tabIndex");
            }
          }, 1000);
        }}
      >
        go to top
      </ButtonTop>
      <BottomArrow />
    </FooterContainer>
  );
};

const XSmall = styled.span`
  padding: 0 0.5rem;
  font-size: 1.3rem;
`;
const SmallDes = styled.div`
  margin-top: 0.5rem;
  font-size: 1.3rem;
`;

const ButtonTop = styled.button`
  opacity: 0.6;
  margin-top: 2rem;
  text-transform: uppercase;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color_white);
  transition: opacity 0.5s;
  &:hover {
    opacity: 1;
  }
`;
const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 43vh;
  max-height: 40rem;
  background-color: rgba(var(--main_footer), 0.8);
  font-size: 1.6rem;
  font-weight: normal;
  line-height: 1.4;
  word-break: keep-all;
  text-align: center;
  color: var(--color_white);
`;

export default Footer;
