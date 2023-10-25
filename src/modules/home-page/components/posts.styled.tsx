import styled from 'styled-components';
import AvatarMUI from '@mui/material/Avatar';

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #333333;
  width: 100%;
  padding: 12px 12px 13px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-bottom: 9px;
`;

export const TextWhite13Regular400 = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 120%;
  align-items: flex-end;
  color: #fcfcfc;
  margin-left: 12px;
`;

export const PostHeader = styled.div`
  display: flex;
`;

export const PostDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Icon = styled.img`
  height: 16px;
  width: 16px;
  margin-left: 5px;
`;

export const ReactionRow = styled.div`
  display: flex;
  align-items: flex-start;
  padding-left: 4px;
  margin-top: 12px;
`;

export const TournamentResultPost = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  gap: 16px;
  margin-top: 12px;
  width: 100%;
  background: radial-gradient(
    213.66% 80% at 50% 73.75%,
    rgba(40, 40, 40, 0.97) 0%,
    #111111 100%
  );
`;

export const RankAndTournament = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const RankPosition = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 120%;
`;

export const TournamentText = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 120%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
`;

export const LocationMedal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 19px;
`;

export const Location = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 120%;
`;
export const Medal = styled.img`
  height: 96px;
`;

export const LetDo = styled.span`
  font-family: 'Saira';
  margin: 13px 0px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 200px;
`;

export const SchoolInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 14px;
  width: 100%;
  height: 92px;
  background: #212121;
`;

export const SchoolAvatar = styled(AvatarMUI)`
  width: 60px !important;
  height: 60px !important;
`;

export const TeamSchoolLogo = styled.div`
  width: 60px;
  height: 60px;
`;
export const SchoolNameLocation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

export const SchoolName = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 120%;
`;

export const SchoolLocation = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
  color: #fcfcfc;
`;

export const BeltTitle = styled.div`
  display: flex;
  margin-block: 12px;
`;

export const BeltImage = styled.img`
  width: 100%;
  height: 24px;
`;

export const ReachedRankCont = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

export const ReachedRankAvatars = styled.div`
  display: flex;
  margin-top: 4px;
`;

export const UserAvatarCont = styled.div`
  margin-right: 8px;
`;

export const CommentButtonWrapper = styled.span`
  display: flex;
  cursor: pointer;
`;

export const NameWrapper = styled.span``;
export const SchoolNameWrapper = styled.span``;
