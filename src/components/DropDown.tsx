import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

interface Props {
  buttonTitle: string;
  listData: { title: string }[];
  label: string;
  disabled: boolean;
}

const DropDown: React.FC<Props> = ({
  buttonTitle,
  listData,
  label,
  disabled,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isDropDown, setDropDown] = useState(false);

  const toggleDropDown = () => {
    if (!disabled) {
      setDropDown((prev) => !prev);
    }
  };

  const selectOption = (e: React.MouseEvent, currentButtonText: string) => {
    const target = e.target;
    const targetParent = (target as HTMLElement).parentNode;
    const targetParentParent = (targetParent as HTMLElement).parentNode;

    if (buttonRef.current && targetParent && targetParentParent) {
      const targetTitle = buttonRef.current.querySelector(".dropdown-title");
      const targetSiblings = targetParentParent.querySelectorAll("li");
      targetSiblings.forEach((targetSibling) => {
        targetSibling.classList.remove("selected");
      });

      const targetParents = targetParent as HTMLElement;
      targetParents.classList.add("selected");

      const targetChangeTitle = targetTitle as HTMLElement;
      targetChangeTitle.innerText = currentButtonText;
      setDropDown(false);
    }
  };

  const optionLists = listData.map((option, index) => (
    <li key={index.toString()}>
      <button
        type="button"
        onClick={(e) => {
          selectOption(e, option.title);
        }}
      >
        {option.title}
      </button>
    </li>
  ));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDropDown(false);
      }
    };
    if (isDropDown) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropDown]);

  return (
    <DropDownBox
      className={`dropdown-area
      ${label !== "" ? " has-label" : ""}
      ${isDropDown ? " active" : ""}
      ${disabled ? " disabled" : ""}`}
    >
      <div className="dropdown-button">
        <button
          type="button"
          ref={buttonRef}
          onClick={toggleDropDown}
          disabled={disabled}
          aria-expanded={isDropDown ? true : false}
        >
          {label !== "" && <span className="dropdown-label">{label}</span>}
          <span className="dropdown-title">{buttonTitle}</span>
          <span className="dropdown-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="6"
              viewBox="0 0 11 6"
              fill="none"
            >
              <path
                d="M5.23398 5.10667L0.333984 0.586667L0.873984 0L5.23398 4.02L9.58732 0L10.134 0.586667L5.23398 5.10667Z"
                fill="#0F0F0F"
              />
            </svg>
          </span>
        </button>
      </div>
      <div className="dropdown-list">
        <ul>{optionLists}</ul>
      </div>
    </DropDownBox>
  );
};

const DropDownBox = styled.div`
  position: relative;
  z-index: 1;
  &.active {
    z-index: 2;
    .dropdown {
      &-button {
        border: 1px solid #0f0f0f;
        border-radius: 0.8em 0.8em 0 0;
      }
      &-arrow {
        transform: rotate(180deg) translateY(50%);
      }
      &-list {
        display: block;
      }
    }
  }
  &.disabled {
    .dropdown-button {
      background-color: #dddddd;
    }
  }
  &.has-label {
    .dropdown {
      &-button {
        height: 6.8rem;
      }
      &-list {
        top: 6.7rem;
      }
    }
  }
  .dropdown {
    &-label {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 1.5;
      color: #666666;
    }
    &-title {
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 1.4;
      color: #0f0f0f;
    }
    &-button {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 4rem;
      background-color: #ffffff;
      border: 1px solid #dddddd;
      border-radius: 0.8em;
      box-sizing: border-box;
      button {
        display: block;
        width: 100%;
        padding: 1.4rem 1.6rem;
        padding-right: 4rem;
        box-sizing: border-box;
        text-align: left;
      }
    }
    &-arrow {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 50%;
      right: 2rem;
      width: 1.6rem;
      height: 1.6rem;
      transform: translateY(-50%);
      svg {
        width: 0.98rem;
        height: auto;
      }
    }
    &-list {
      overflow-x: hidden;
      overflow-y: auto;
      position: absolute;
      display: none;
      z-index: 2;
      top: 4rem;
      left: 0;
      width: 100%;
      max-height: 19.2rem;
      border: 1px solid #0f0f0f;
      border-top: 1px solid #dddddd;
      background-color: #ffffff;
      box-sizing: border-box;
      border-radius: 0 0 0.8em 0.8em;
      li {
        &.selected {
          button {
            font-weight: 700;
            color: #0f0f0f;
          }
        }
      }
      button {
        display: block;
        width: 100%;
        padding: 1rem 1.6rem;
        box-sizing: border-box;
        text-align: left;
        font-size: 1.4rem;
        line-height: 1.4;
        color: #666666;
      }
    }
  }
  /* PC */
  @media screen and (min-width: 769px) {
    &.has-label {
      .dropdown {
        &-button {
          height: 9.2rem;
        }
        &-list {
          top: 9.1rem;
        }
      }
    }
    .dropdown {
      &-label {
        font-size: 1.6rem;
      }
      &-title {
        font-size: 1.6rem;
      }
      &-button {
        button {
          padding: 2rem;
        }
      }
      &-list {
        button {
          &:hover {
            background-color: #f6f6f6;
          }
        }
      }
    }
  }
`;

export default DropDown;
