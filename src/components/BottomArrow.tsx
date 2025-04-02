import React, { useRef, useEffect } from "react";

import styled from "styled-components";

const BottomArrow: React.FC = () => {
  const ArrowArea = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let domArrowArea = ArrowArea.current as HTMLElement;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const innerH = window.innerHeight;
      const domH = document.body.scrollHeight;
      const footerTop = document
        .querySelector("footer")
        ?.getBoundingClientRect().top;

      if (footerTop === undefined) return;

      if (innerH + scrollTop >= domH) {
        domArrowArea.classList.remove("normal");
        domArrowArea.classList.remove("bottom");
        domArrowArea.classList.add("top");
      } else if (scrollTop < 30) {
        domArrowArea.classList.remove("bottom");
        domArrowArea.classList.remove("top");
        domArrowArea.classList.add("normal");
      } else if (scrollTop > 30 && footerTop > innerH) {
        domArrowArea.classList.remove("normal");
        domArrowArea.classList.remove("top");
        domArrowArea.classList.add("bottom");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ArrowContainer ref={ArrowArea} className="normal">
      <span className="svg-arrow"></span>
    </ArrowContainer>
  );
};

const ArrowContainer = styled.div`
  position: fixed;
  z-index: 10;
  display: flex;
  bottom: 2rem;
  right: 2rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 5rem;

  &.normal {
    width: 3rem;
    height: 3rem;
    background-color: rgb(200 225 255);
    border-radius: 50%;
    .svg-arrow {
      display: block;
      width: 1.5rem;
      height: 1.5rem;
      background: linear-gradient(
        135deg,
        rgb(255 90 21 / 80%) 0%,
        rgb(58 6 152 / 80%) 40%,
        rgb(58 6 152 / 80%) 55%,
        rgb(88 255 245 / 90%) 100%
      );
      /*
    세로 직선 
    clip-path: polygon(
      30% 0%,
      70% 0%,
      70% 100%,
      70% 100%,
      0% 100%,
      30% 100%,
      30% 0%
    ); */
      clip-path: polygon(
        0% 0%,
        100% 0%,
        100% 100%,
        50% 100%,
        0% 100%,
        0% 50%,
        0% 0%
      );
    }
  }
  &.top {
    animation: moving 0.5s ease;
    .svg-arrow {
      transform: rotate(180deg);
    }
  }

  .svg-arrow {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgb(88 255 245 / 90%) 0%,
      rgb(58 6 152 / 80%) 40%,
      rgb(255 90 21 / 80%) 100%
    );
    clip-path: polygon(
      30% 0%,
      70% 0%,
      70% 60%,
      100% 60%,
      50% 100%,
      0% 60%,
      30% 60%
    );
    transition: clip-path 0.5s;
  }

  @media screen and (max-width: 768px) {
    bottom: 2rem;
    right: 0.5rem;
    width: 1.5rem;
    height: 3rem;
    &.normal {
      width: 2rem;
      height: 2rem;
      .svg-arrow {
        width: 1rem;
        height: 1rem;
      }
    }
  }

  @keyframes moving {
    from {
      transform: translateY(10rem);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export default BottomArrow;
