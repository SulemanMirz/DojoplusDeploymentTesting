import styled from 'styled-components';
import { COLOR_LETTERS_WHITE } from '../../../shared/styles/colors';
import { SAFE_AREA_VIEW_PADDING_TOP } from '../../../shared/styles/SafeAreaView';

export const MainDiv = styled.div`
  background: radial-gradient(circle, #404040 0, #111 100%);
  width: 500px;
  height: 100%;
  padding: 20px;
  padding-top: ${`${SAFE_AREA_VIEW_PADDING_TOP}px`};
  @media screen and (max-width: 600px) {
    width: 100%;
    height: 100%;
  } ;
`;
export const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const ModalCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
`;
export const ModalText = styled.div`
  color: ${COLOR_LETTERS_WHITE};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
export const RankAndIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const CompetitionAndYear = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Category = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  align-items: center;
`;
export const Medal = styled.img`
  layout: intrinsic;
  width: 140px;
  height: 140px;
  margin-block: 1rem;
`;

export const TextContainer = styled.div`
  margin-top: 12px;
  padding-left: 33px;
  display: flex;
  flex-direction: column;
`;

export const ImageAndTextContainer = styled.div`
  margin-block: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
`;

export const MorePosterImg = styled.img`
  width: 160px;
  height: 160px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px 4px 4px 4px;
  margin-inline: 4px;
`;

export const ImagesRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 1rem;
  flex-wrap: nowrap;
  overflow-x: scroll;
  padding: 0px 15px 0.5rem 22px;
  margin-top: 4px;
`;
