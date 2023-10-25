import styled from 'styled-components';

export const SeminarCardContainer = styled.div<{ hasEnd }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #333435;
  margin: 0.5rem;
  padding-bottom: 1rem;
  width: calc(50% - 1rem);
  -webkit-box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 600px) {
    width: calc(100% - 0.5rem);
  }
  opacity: ${({ hasEnd }) => (hasEnd ? 0.5 : 1)};
  pointer-events: ${({ hasEnd }) => (hasEnd ? 'none' : '')};
`;

export const PosterContainer = styled.div`
  position: relative;
  height: 100% !important;
  cursor: pointer;
`;

export const PosterImg = styled.img`
  width: 100%;
  min-width: 100%;
  height: 100% !important;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px 4px 0px 0px;
`;

export const PosterText = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 8px;
  justify-content: flex-end;
  background-image: linear-gradient(180deg, transparent, black);
`;

export const DescriptionContainer = styled.div`
  display: flex;
`;

export const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 18px 0px 18px;
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 8px;
`;
