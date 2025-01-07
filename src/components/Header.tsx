import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { handleArrayActive } from "modules/arrayActive";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // 사용 기술 폰트 이벤트
    const skillList = document.querySelector(
      ".skill-list"
    ) as HTMLElement | null;
    handleArrayActive(skillList, "span", 150);

    // 업무 환경 폰트 이벤트
    const envList = document.querySelector(".env-list") as HTMLElement | null;
    handleArrayActive(envList, "span", 175);
  }, []);
  return (
    <HeaderContainer>
      <MyName>
        <span>{mainTitle.label}</span>
        <MyNameTitle>{mainTitle.title}</MyNameTitle>
        <MyNamesubTitle>{mainTitle.subTitle}</MyNamesubTitle>
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
          <dt>업무 환경</dt>
          <dd className="env-list">
            {arrEnvs.map((env, index) => (
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

const MyNamesubTitle = styled.strong`
  font-size: 18px;
  font-weight: bold;
  color: rgba(var(--main_header), 0.6);
  line-height: 1.3;
`;

const MyNameTitle = styled.strong`
  opacity: 0.6;
  font-size: 36px;
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
  padding-top: 50px;
  & > span {
    font-size: 22px;
    font-weight: 600;
    color: rgba(var(--main_header), 0.8);
    line-height: 1.2;
  }
`;
// const MenuButton = styled.button``;
// const MenuList = styled.ul``;
// const Menu = styled.nav``;
const SkillDl = styled.dl`
  font-size: 16px;
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
  gap: 20px;
  max-width: 1380px;
  padding: 0 16px;
  margin: 50px auto 0;
  padding: 20px;
  border-radius: 8px;
  background-color: rgba(var(--skill_tree_bg), 0.1);
  font-size: 30px;
  font-weight: 500;
  line-height: 1.4;
`;
const HeaderContainer = styled.header`
  max-width: 1380px;
  margin: 0 auto;
  @media screen and (max-width: 1400px) {
    padding: 0 20px;
  }
`;

// data
const mainTitle = {
  label: "PORTFOLIO",
  title: "WEB UI Developer, \nKim So Young",
  subTitle: "경력 7년 11개월",
};
const arrSkills = [
  "HTML5",
  "CSS3",
  "SASS",
  "React",
  "JavaScript",
  "jQuery",
  "Gulp",
  "Vue",
  "웹접근성",
  "웹표준",
  "SEO",
  "GSAP",
  "Lottie",
];
const arrEnvs = [
  "GitLab",
  "Jira",
  "Confluence",
  "SVN",
  "CVS",
  "FTP",
  "Figma",
  "Zeplin",
  "Photoshop",
  "Visual Studio Code",
  "Eclipse",
  "센스리더",
  "Notion",
];

export default Header;
