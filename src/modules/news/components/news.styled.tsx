import styled from 'styled-components';

export const NewsCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 24px;
  width: 100%;
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
  border-radius: 4px;
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
