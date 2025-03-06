import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

//component
import SectionTitle from "components/SectionTitle";
import ProjectCard from "pages/home/component/ProjectCard";
import { handleMobileCheck } from "modules/mobileCheck";
import { handleScrollActive } from "modules/scrollActive";
import { handleArrayActive } from "modules/arrayActive";

//data
import { projectData } from "assets/data/projectList.js";

const Card = styled(ProjectCard)`
  @media screen and (min-width: 1024px) {
    width: calc(33.333% - 80px);
  }
  @media screen and (max-width: 1023px) {
    width: calc(50% - 40px);
  }
  @media screen and (max-width: 640px) {
    width: 100%;
  }
`;
const projectMap: JSX.Element[] = projectData
  .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
  .map((item, index) =>
    item.highlight ? (
      <Card
        key={index.toString()}
        className={`project-card`.trim()}
        name={item.name}
        company={item.company}
        skills={item.skills}
        subscript={item.subscript}
        contribution={item.contribution}
        imgSrc={require(`assets/images/project/${item.image}`)}
        url={item.url as string}
      />
    ) : null
  )
  .filter((element): element is JSX.Element => element !== undefined);

const ProjectList: React.FC = () => {
  const [listShow, setListShow] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current && innerRef.current) {
      handleScrollActive(listRef.current, () => {
        setListShow(true);
        innerRef.current?.classList.add("active");
      });
    }

    const moCardEvent = () => {
      const cards = document.querySelectorAll(
        ".project-card"
      ) as NodeListOf<HTMLElement>;

      cards.forEach((card, idx) => {
        setTimeout(() => {
          handleScrollActive(card, () => {
            card.classList.add("active");
          });
        }, idx * 100);
      });
    };
    const pcCardEvent = () => {
      if (listRef.current) {
        handleScrollActive(listRef.current, () =>
          handleArrayActive(listRef.current, ".project-card", 200)
        );
      }
    };

    // 카드 노출 동작
    const deviceChecker = handleMobileCheck();
    if (deviceChecker.getType() === "mobile") {
      moCardEvent();
    } else {
      pcCardEvent();
    }
    window.addEventListener("resize", () => {
      if (deviceChecker.getType() === "mobile") {
        moCardEvent();
      } else {
        pcCardEvent();
      }
    });
  }, []);
  return (
    <ProjectListContainer ref={listRef}>
      <SectionTitle className={``.trim()} title="대표 프로젝트" />
      {!listShow && <BeforeScroll ref={beforeRef}></BeforeScroll>}
      <ProjectListInner ref={innerRef}>{projectMap}</ProjectListInner>
    </ProjectListContainer>
  );
};

const ProjectListInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 4rem 2rem;
  transition: all 0.5s;
  &.active {
    background-color: rgba(var(--color_list_dim), 0.5);
    box-shadow: 0 0.8rem 3.2rem 0 rgba(0, 0, 0, 0.2);
  }
  @media screen and (min-width: 1400px) {
    border-radius: 1.2em;
  }
  @media screen and (min-width: 1024px) {
    gap: 4rem;
  }
`;

const ProjectListContainer = styled.div``;

const BeforeScroll = styled.div`
  height: 80rem;
  background: linear-gradient(
    0.25turn,
    rgba(var(--skill_tree_bg), 0.2),
    rgba(var(--skill_tree_bg), 0.15),
    rgba(var(--skill_tree_bg), 0.2),
    rgba(var(--skill_tree_bg), 0.1)
  );
  box-shadow: 0 0.8rem 3.2rem 0 rgba(0, 0, 0, 0.2);

  @media screen and (min-width: 1400px) {
    border-radius: 1.2em;
  }
`;

export default ProjectList;
