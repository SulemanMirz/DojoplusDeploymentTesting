import React from 'react';
import { ordinalSuffix } from '../../../shared/utils/ultils';
import {
  Location,
  LocationMedal,
  Medal,
  RankAndTournament,
  RankPosition,
  TournamentResultPost,
  TournamentText,
} from './posts.styled';

type AchievementPostCardProps = {
  position: string;
  matchName: string;
  location: string;
  medalUrl: string;
};

const AchievementPostCard: React.FC<AchievementPostCardProps> = ({
  position,
  matchName,
  location,
  medalUrl,
}) => {
  return (
    <>
      <TournamentResultPost>
        <RankAndTournament>
          <RankPosition>{ordinalSuffix(parseInt(position))}</RankPosition>
          <TournamentText>{matchName}</TournamentText>
        </RankAndTournament>
        <LocationMedal>
          <Location>{location}</Location>
          {medalUrl && <Medal src={medalUrl} />}
        </LocationMedal>
      </TournamentResultPost>
    </>
  );
};

export default AchievementPostCard;
