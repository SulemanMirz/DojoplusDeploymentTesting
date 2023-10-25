import React from 'react';

type DefaultMedalProps = {
  width: string;
  height: string;
};

export const DefaultMedal: React.FC<DefaultMedalProps> = ({
  width,
  height,
}) => {
  return (
    <div style={{ height: `${height}` }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M307.06 0H461.172L333.055 163.51H178.943L307.06 0Z"
          fill="#0E6A8E"
        />
        <path
          d="M307.06 0H372.191L244.074 163.51H178.943L307.06 0Z"
          fill="#E52E40"
        />
        <path
          d="M356.873 0H411.359L283.242 163.51H228.756L356.873 0Z"
          fill="#EAEAE4"
        />
        <circle cx="256" cy="352.381" r="159.619" fill="#636363" />
        <path
          d="M178.945 212.568V163.51H333.057V212.568L359.179 230.592V150.448C359.179 143.238 353.338 137.387 346.118 137.387H165.884C158.674 137.387 152.823 143.238 152.823 150.448V230.602L178.945 212.568Z"
          fill="#D58D54"
        />
        <path
          d="M204.94 0H50.828L178.945 163.51H333.057L204.94 0Z"
          fill="#E52E40"
        />
        <path
          d="M204.94 0H139.808L267.926 163.51H333.057L204.94 0Z"
          fill="#0E6A8E"
        />
        <path
          d="M155.127 0H100.641L228.758 163.51H283.244L155.127 0Z"
          fill="#EAEAE4"
        />
      </svg>
    </div>
  );
};
