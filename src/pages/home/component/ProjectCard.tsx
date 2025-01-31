import React, { useRef, useState } from "react";
import styled from "styled-components";

//images
import LinkIcon from "assets/images/icon_link.webp";
import LinkIconDisabled from "assets/images/icon_link_no.webp";

interface Skill {
  color: string;
  skillName: string[];
}
interface Cont {
  list: string;
}

interface Props {
  className: string;
  company: string;
  name: string;
  skills: Skill[];
  subscript: React.ReactNode;
  contribution: Cont[];
  imgSrc: string;
  url: string;
}

const ProjectCard: React.FC<Props> = ({
  className,
  company,
  name,
  skills,
  subscript,
  contribution,
  imgSrc,
  url,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <CardContainer className={className} ref={cardRef} tabIndex={0}>
      <CardThumb>
        <span className="label-company">{company}</span>
        <img src={imgSrc} alt={`${name} 프로젝트`} />
      </CardThumb>
      <CardContents>
        <CardHead>
          <ProjectName>{name}</ProjectName>
          <ProjectLabelBox>
            {skills.map((skill, skillIndex) =>
              skill.skillName.map((name, nameIndex) => (
                <ProjectLabel
                  className={skill.color}
                  key={`${skillIndex}-${nameIndex}`}
                >
                  {name}
                </ProjectLabel>
              ))
            )}
          </ProjectLabelBox>
        </CardHead>
      </CardContents>
      <ButtonOpenLayer
        type="button"
        $isOpen={isOpen}
        onClick={() => {
          setIsOpen((isOpen) => !isOpen);
        }}
      >
        <span>{isOpen ? "Close" : "Click!!"}</span>
      </ButtonOpenLayer>
      <CardLayerDim $isOpen={isOpen} aria-hidden={isOpen ? false : true}>
        <div tabIndex={isOpen ? 0 : -1}>
          <ProjectIntroduce>프로젝트 소개</ProjectIntroduce>
          {subscript && <ProjectSubscript>{subscript}</ProjectSubscript>}
          <ProjectContribution>
            {contribution &&
              contribution.map((cont, index) => (
                <li key={index.toString()}>{cont.list}</li>
              ))}
          </ProjectContribution>
          {isOpen && (
            <>
              {url && url !== null ? (
                <Link href={url} target="_blank">
                  <span>이동하기</span>
                </Link>
              ) : (
                <NoneLink>이동불가</NoneLink>
              )}
            </>
          )}
        </div>
      </CardLayerDim>
    </CardContainer>
  );
};

const ButtonOpenLayer = styled.button<{ $isOpen: boolean }>`
  position: absolute;
  z-index: 3;
  right: 0;
  bottom: 0;
  width: 7rem;
  height: 7rem;
  border-radius: 8em;
  background: rgba(255, 255, 255, 0.6);
  transition: all 0.5s;
  transform: translate(4rem, 4rem);
  &:hover {
    transform-origin: bottom right;
    animation: swing 2s ease infinite;
  }
  &:focus-visible {
    transform: translate(2rem, 2rem);
    background: rgba(229, 206, 175, 0.6);
    transform-origin: bottom right;
    animation: swing 2s ease infinite;
    & > span {
      opacity: 1;
    }
  }
  & > span {
    opacity: 0;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    color: rgba(0, 149, 255, 0.9);
  }
`;
const Link = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.4;
  &:before {
    content: "";
    display: block;
    position: relative;
    z-index: 1;
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.5rem;
    background-image: url(${LinkIcon});
    background-repeat: no-repeat;
    background-position: left center;
    background-size: 1.6rem auto;
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 0.1rem;
    height: 100%;
    transition: width 0.5s;
  }
  &:hover {
    &:after {
      width: 100%;
      background-color: var(--object_selected);
    }
  }
  & > span {
    position: relative;
    z-index: 1;
  }
`;
const NoneLink = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.4;
  &:before {
    content: "";
    display: block;
    position: relative;
    z-index: 1;
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.5rem;
    background-image: url(${LinkIconDisabled});
    background-repeat: no-repeat;
    background-position: left center;
    background-size: 1.6rem auto;
  }
  &:hover {
    text-decoration: line-through;
    cursor: default;
  }
`;

const ProjectContribution = styled.ol`
  margin-bottom: 2rem;
  & > li {
    display: inline-flex;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.4;
    color: var(--color_black);
    &:before {
      content: "";
      display: block;
      flex-shrink: 0;
      width: 0.4rem;
      height: 0.4rem;
      margin-top: 1rem;
      margin-right: 1rem;
      border-radius: 0.4em;
      background-color: var(--color_black);
    }
  }
`;

const ProjectIntroduce = styled.strong`
  display: block;
  margin-bottom: 2rem;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.4;
  color: var(--color_black);
`;
const ProjectSubscript = styled.div`
  min-height: 4rem;
  margin-bottom: 1.4rem;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.4;
  color: var(--color_black);
`;

const ProjectLabelBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: -0.5rem;
`;
const ProjectLabel = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  padding: 0 0.6rem;
  margin: 0.5rem;
  border-radius: 0.3em;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.4;
  color: var(--color_white);
  &.type_style {
    background-color: rgba(var(--color_fbeb34), 0.4);
    color: rgba(0, 0, 0, 1);
  }
  &.type_lang {
    background-color: rgba(var(--color_2c42bd), 0.4);
  }
  &.type_tool {
    background-color: rgba(var(--color_e84b80), 0.4);
  }
  &.type_vcs {
    background-color: rgba(var(--color_f98500), 0.4);
  }
  &.label_gui {
    background-color: rgba(var(--color_37cd90), 0.4);
  }
  &.type_a11y {
    background-color: rgba(var(--color_c47ee4), 0.4);
  }
`;
const ProjectName = styled.h2`
  display: block;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.4;
`;

const CardLayerDim = styled.div<{ $isOpen: boolean }>`
  overflow: hidden;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  top: ${({ $isOpen }) => ($isOpen ? "0" : "-110%")};
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(3px);
  border-radius: 0.8em;
  box-sizing: border-box;
  border: ${({ $isOpen }) =>
    $isOpen ? "1px solid rgba(0, 149, 255, 0.49)" : "none"};
  transition: top 0.5s;

  & > div {
    overflow-y: auto;
    height: 100%;
    padding: 2rem;
  }
`;

const CardHead = styled.div`
  margin-bottom: 1rem;
`;

const CardContents = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const CardThumb = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  width: 100%;
  height: auto;
  border-radius: 0.8em;
  background-color: var(--color_white);
  border: 1px solid rgba(0, 149, 255, 0.49);
  text-align: center;
  box-sizing: border-box;
  .label-company {
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 1;
    display: flex;
    align-items: center;
    height: 2rem;
    padding: 0 0.8rem;
    border-radius: 2em;
    backdrop-filter: blur(6px);
    background-color: rgba(112, 110, 110, 0.3);
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1;
    color: var(--color_white);
  }
  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const CardContainer = styled.div`
  opacity: 0;
  overflow: hidden;
  position: relative;
  right: -2rem;
  display: flex;
  flex-direction: column;
  word-break: keep-all;
  padding: 1rem;
  border-radius: 0.8em;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4.5px);
  box-shadow: 0 0.8rem 3.2rem 0 rgba(var(--color_shadow), 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: background 0.5s ease, right 0.5s ease, bottom 0.5s ease;
  &.active {
    opacity: 1;
    right: 0;
  }
  &:hover {
    ${ButtonOpenLayer} {
      transform: translate(1rem, 1rem);
      background: rgba(229, 206, 175, 0.6);
      & > span {
        opacity: 1;
      }
    }
    ::-webkit-scrollbar {
      width: 0.7rem;
      transition: width 0.5s;
    }
  }
  @media screen and (min-width: 1280px) {
    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }

  @keyframes swing {
    20% {
      transform: rotate(15deg);
    }
    40% {
      transform: rotate(-10deg);
    }
    60% {
      transform: rotate(5deg);
    }
    80% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;

export default ProjectCard;
