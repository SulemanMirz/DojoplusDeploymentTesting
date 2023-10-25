import React from 'react';
import styled from 'styled-components';
import { CloseIcon } from '../../../shared/components/CloseIcon';
import { ButtonDiv } from '../../achievements/components/modalAchievement-styled';
import { VideoControls } from './VideoControls';

export const ModalCont = styled.div`
  background: radial-gradient(circle, #404040 0, #111 100%);
  padding: 60px;
  @media only screen and (max-width: 600px) {
    padding: 0;
    width: 100%;
    height: 100%;
    padding-top: 60px;
  }
`;

type Props = {
  video: string;
  handleModal: () => void;
};

export const ModalPlayer: React.FC<Props> = ({
  video,
  handleModal,
}: Props): JSX.Element => {
  return (
    <ModalCont>
      <ButtonDiv>
        <CloseIcon height="15" width="15" onClick={handleModal} />
      </ButtonDiv>
      <VideoControls video={video} />
    </ModalCont>
  );
};
