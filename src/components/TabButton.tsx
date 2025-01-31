import styled from "styled-components";

interface Props {
  className: string;
  tabTitle: string;
  clickEvent: () => void;
}

const TabButton: React.FC<Props> = ({
  className,
  tabTitle,
  clickEvent,
  ...rest
}) => {
  return (
    <Button
      type="button"
      className={className}
      onClick={() => {
        clickEvent();
      }}
      {...rest}
    >
      {tabTitle}
    </Button>
  );
};

const Button = styled.button`
  padding: 0.4rem 1rem;
  background-color: var(--color_white);
  border: 1px solid var(--color_dddddd);
  border-radius: 2em;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.4;
  color: var(--color_black);
  transition: background-color 0.5s;
  &.on {
    background-color: rgba(var(--color_list_dim), 0.4);
  }
`;

export default TabButton;
