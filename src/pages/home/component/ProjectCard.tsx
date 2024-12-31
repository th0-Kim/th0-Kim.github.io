import React, { useRef, useState } from "react";
import styled from "styled-components";

//images
import LinkIcon from "assets/images/icon_link.png";
import LinkIconDisabled from "assets/images/icon_link_no.png";

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
  width: 70px;
  height: 70px;
  border-radius: 80px;
  background: rgba(255, 255, 255, 0.6);
  transition: all 0.5s;
  transform: translate(40px, 40px);
  &:hover {
    transform-origin: bottom right;
    animation: swing 2s ease infinite;
  }
  &:focus-visible {
    transform: translate(20px, 20px);
    background: rgba(229, 206, 175, 0.6);
    transform-origin: bottom right;
    animation: swing 2s ease infinite;
    & > span {
      opacity: 1;
    }
  }
  & > span {
    opacity: 0;
    font-size: 15px;
    font-weight: 700;
    line-height: 1;
    color: rgba(0, 149, 255, 0.9);
  }
`;
const Link = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.4;
  &:before {
    content: "";
    display: block;
    position: relative;
    z-index: 1;
    width: 16px;
    height: 16px;
    margin-right: 5px;
    background-image: url(${LinkIcon});
    background-repeat: no-repeat;
    background-position: left center;
    background-size: 16px auto;
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 1px;
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
  font-size: 15px;
  font-weight: 400;
  line-height: 1.4;
  &:before {
    content: "";
    display: block;
    position: relative;
    z-index: 1;
    width: 16px;
    height: 16px;
    margin-right: 5px;
    background-image: url(${LinkIconDisabled});
    background-repeat: no-repeat;
    background-position: left center;
    background-size: 16px auto;
  }
  &:hover {
    text-decoration: line-through;
    cursor: default;
  }
`;

const ProjectContribution = styled.ol`
  margin-bottom: 20px;
  & > li {
    display: inline-flex;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.4;
    color: var(--color_black);
    &:before {
      content: "";
      display: block;
      flex-shrink: 0;
      width: 4px;
      height: 4px;
      margin-top: 10px;
      margin-right: 10px;
      border-radius: 4px;
      background-color: var(--color_black);
    }
  }
`;

const ProjectIntroduce = styled.strong`
  display: block;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.4;
  color: var(--color_black);
`;
const ProjectSubscript = styled.div`
  min-height: 40px;
  margin-bottom: 14px;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  color: var(--color_black);
`;

const ProjectLabelBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: -5px;
`;
const ProjectLabel = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  padding: 0 6px;
  margin: 5px;
  border-radius: 3px;
  font-size: 14px;
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
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 18px;
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
  border-radius: 8px;
  box-sizing: border-box;
  border: ${({ $isOpen }) =>
    $isOpen ? "1px solid rgba(0, 149, 255, 0.49)" : "none"};
  transition: top 0.5s;

  & > div {
    overflow-y: auto;
    height: 100%;
    padding: 20px;
  }
`;

const CardHead = styled.div`
  margin-bottom: 10px;
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
  border-radius: 8px;
  background-color: var(--color_white);
  border: 1px solid rgba(0, 149, 255, 0.49);
  text-align: center;
  box-sizing: border-box;
  .label-company {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
    display: flex;
    align-items: center;
    height: 20px;
    padding: 0 8px;
    border-radius: 20px;
    backdrop-filter: blur(6px);
    background-color: rgba(112, 110, 110, 0.3);
    font-size: 12px;
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
  right: -20px;
  display: flex;
  flex-direction: column;
  word-break: keep-all;
  padding: 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4.5px);
  box-shadow: 0 8px 32px 0 rgba(var(--color_shadow), 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: background 0.5s ease, right 0.5s ease, bottom 0.5s ease;
  &.active {
    opacity: 1;
    right: 0;
  }
  &:hover {
    ${ButtonOpenLayer} {
      transform: translate(10px, 10px);
      background: rgba(229, 206, 175, 0.6);
      & > span {
        opacity: 1;
      }
    }
    ::-webkit-scrollbar {
      width: 7px;
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
