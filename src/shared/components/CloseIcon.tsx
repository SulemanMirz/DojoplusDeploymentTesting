import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: transparent;
  border-width: 0;
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 16px;
  display: flex;
`;

type DefaultIconProps = {
  width: string;
  height: string;
  onClick: () => void;
  extraStyle?: any;
};

export const CloseIcon: React.FC<DefaultIconProps> = ({
  width,
  height,
  onClick,
  extraStyle,
}) => {
  return (
    <Button
      type="button"
      style={{ height: `${height}`, ...extraStyle }}
      onClick={onClick}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M437 84.3713L415.63 63L250 228.629L84.3713 63L63 84.3713L228.629 250L63 415.63L84.3713 437L250 271.371L415.63 437L437 415.63L271.371 250L437 84.3713Z"
          fill="#ffffff"
        />
        <mask
          id="mask0_0_311"
          maskUnits="userSpaceOnUse"
          x="63"
          y="63"
          width="374"
          height="374"
        >
          <path
            d="M437 84.3713L415.63 63L250 228.629L84.3713 63L63 84.3713L228.629 250L63 415.63L84.3713 437L250 271.371L415.63 437L437 415.63L271.371 250L437 84.3713Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_0_311)">
          <rect width="501" height="500" fill="white" />
          <rect width="501" height="500" fill="#9D9D9D" />
        </g>
      </svg>
    </Button>
  );
};
