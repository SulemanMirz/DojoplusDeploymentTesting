import styled from 'styled-components';

export const ButtonCard = styled.span`
  width: 100%;
  height: 48px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  text-decoration: none;
  background-color: #333333;
  border-radius: 0px 0px 4px 4px;
`;

export const IconButton = styled('span')`
  margin-right: 8px;
`;

export const VideoCard = styled.div`
  display: flex;
  overflow-x: scroll;
  width: 100vw;
  padding: 16px 0;
  @media screen and (max-width: 600px) {
    flex-wrap: nowrap;
    overflow-x: scroll;
  }
`;

export const CategoryTitle = styled.div`
  width: 100%;
  text-align: flex-start;
`;
export const VideosRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 2rem;
  flex-wrap: nowrap;
  overflow-x: scroll;
`;
export const TextUnderVideo = styled.div`
  display: flex;
  flex-direction: column;
  margin-block: 5px;
`;
export const EachVideo = styled.div`
  display: flex;
  flex-direction: column;
`;
export const MoreVideosCard = styled.a`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  margin-top: 1rem;
  text-decoration: none;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;
export const MoreVideosPoster = styled.div`
  width: 233px;
  position: relative;
  height: 100% !important;
`;
export const MoreVideosPosterImg = styled.img`
  width: 100%;
  min-width: 100%;
  height: 100%;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px 4px 0px 0px;
`;
export const MoreVideosText = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 8px;
  justify-content: flex-end;
  background: linear-gradient(
    180deg,
    rgba(17, 17, 17, 0) 65.1%,
    rgba(17, 17, 17, 0.8) 83.33%
  );
`;
