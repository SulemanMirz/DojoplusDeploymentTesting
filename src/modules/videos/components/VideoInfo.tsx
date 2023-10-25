import React from 'react';
import styled from 'styled-components';
import { Play } from './Icons';

const ControlCont = styled.div`
  background-color: #5f5f5f37;
  border-width: 0;
  display: flex;
  position: absolute;
  z-index: 7;
  width: 100%;
  height: 100%;
  display: flex;
  bottom: 0;
`;

const PlayCont = styled.button`
  background-color: transparent;
  border-width: 0;
  display: flex;
  flex: auto;
  align-items: center;
  justify-content: center;
`;

type Props = {
  onClick: () => void;
};

export const VideoInfo: React.FC<Props> = ({ onClick }): JSX.Element => {
  return (
    <ControlCont>
      <PlayCont onClick={onClick}>
        <Play size={45} />
      </PlayCont>
    </ControlCont>
  );
};
