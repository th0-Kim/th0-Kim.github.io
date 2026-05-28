import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { handleArrayActive } from "modules/arrayActive";

const Header: React.FC = () => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const skillDlItems = [
      { selector: ".skill-list", delay: 150 },
      { selector: ".env-list", delay: 175 },
      { selector: ".design-list", delay: 200 },
      { selector: ".tool-list", delay: 225 },
    ];

    skillDlItems.forEach(({ selector, delay }) => {
      const item = document.querySelector(selector) as HTMLElement | null;
      handleArrayActive(item, "span", delay);
    });
  }, []);

  return (
    <HeaderContainer>
      <MyName>
        <span>{mainTitle.label}</span>
        <MyNameTitle>{mainTitle.title}</MyNameTitle>
        <MyNameSubTitle>{mainTitle.subTitle}</MyNameSubTitle>
      </MyName>
      <MySkillTree>
        <SkillDl>
          <dt>사용 기술</dt>
          <dd className="skill-list">
            {arrSkills.map((skil, index) => (
              <span key={index.toString()}>{skil}</span>
            ))}
          </dd>
        </SkillDl>
        <SkillDl>
          <dt>개발 환경</dt>
          <dd className="env-list">
            {arrEnvs.map((env, index) => (
              <span key={index.toString()}>{env}</span>
            ))}
          </dd>
        </SkillDl>
        <SkillDl>
          <dt>UI/UX 최적화 기술</dt>
          <dd className="tool-list">
            {arrTool.map((env, index) => (
              <span key={index.toString()}>{env}</span>
            ))}
          </dd>
        </SkillDl>
        <SkillDl>
          <dt>디자인 도구</dt>
          <dd className="design-list">
            {arrDesign.map((env, index) => (
              <span key={index.toString()}>{env}</span>
            ))}
          </dd>
        </SkillDl>
      </MySkillTree>

      {/* <Menu>
        <MenuButton
          type="button"
          title={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => {
            setIsMenuOpen((prev) => !prev);
          }}
        />
        <MenuList isMenuOpen={isMenuOpen}>
          <li>About</li>
          <li>Project</li>
          <li>History</li>
        </MenuList>
      </Menu> */}
    </HeaderContainer>
  );
};

const MyNameSubTitle = styled.strong`
  font-size: 1.8rem;
  font-weight: bold;
  color: rgba(var(--main_header), 0.6);
  line-height: 1.3;
`;

const MyNameTitle = styled.strong`
  opacity: 0.6;
  font-size: 3.6rem;
  font-weight: bold;
  color: rgba(var(--main_header), 0.6);
  line-height: 1.3;

  @media screen and (max-width: 640px) {
    white-space: pre-line;
  }
`;
const MyName = styled.h1`
  display: flex;
  flex-direction: column;
  padding-top: 5rem;
  & > span {
    font-size: 2.2rem;
    font-weight: 600;
    color: rgba(var(--main_header), 0.8);
    line-height: 1.2;
  }
`;
// const MenuButton = styled.button``;
// const MenuList = styled.ul``;
// const Menu = styled.nav``;
const SkillDl = styled.dl`
  font-size: 1.6rem;
  dt {
    font-weight: bold;
    color: var(--color_555555);
  }
  dd {
    color: var(--color_333333);
    & > span {
      opacity: 0.3;
      &:after {
        content: ", ";
      }
      &:last-child {
        &:after {
          display: none;
        }
      }
      transition: opacity 0.5s;
      &.active {
        opacity: 1;
      }
    }
  }
`;
const MySkillTree = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 138rem;
  padding: 0 1.6rem;
  margin: 5rem auto 0;
  padding: 2rem;
  border-radius: 0.8rem;
  background-color: rgba(var(--skill_tree_bg), 0.1);
  font-size: 3rem;
  font-weight: 500;
  line-height: 1.4;
`;
const HeaderContainer = styled.header`
  max-width: 138rem;
  margin: 0 auto;
  @media screen and (max-width: 1400px) {
    padding: 0 2rem;
  }
`;

// data
const mainTitle = {
  label: "PORTFOLIO",
  title: "WEB UI Developer, \nKim So Young",
  subTitle: "경력 9년차",
};
const arrSkills = [
  "HTML5",
  "CSS3",
  "SCSS",
  "VanillaJS(DOM API)",
  "jQuery",
  "Gulp",
  "React(CSS-in-JS)",
  "Vue",
  "Lottie",
  "GSAP",
];
const arrEnvs = [
  "Visual Studio Code",
  "Eclipse",
  "GitLab",
  "ChangeFlow",
  "Jira",
  "Slack",
  "Confluence",
  "SVN",
  "CVS",
  "FTP",
  "Notion",
];
const arrDesign = ["Figma", "Zeplin", "Photoshop"];
const arrTool = [
  "웹접근성",
  "앱접근성",
  "웹 표준",
  "SEO 최적화",
  "반응형 웹",
  "웹 앱",
  "센스리더",
  "VoiceOver",
  "NVDA",
  "W3C 웹 표준 검사",
  "Lighthouse",
];

export default Header;
