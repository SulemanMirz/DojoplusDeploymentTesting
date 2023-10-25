import React, { useState } from 'react';
import {
  TextGray14Thin,
  TextWhite16Regular,
} from '../../../shared/components/texts';
import PeopleAlsoReached from '../../people-also-reached';
import {
  BeltImage,
  BeltTitle,
  Icon,
  ReachedRankAvatars,
  ReachedRankCont,
} from './posts.styled';

type RankPostCardProps = {
  beltSource: string;
  rankName: string;
  verified: boolean;
  schoolName: string;
  username: string;
};

const RankPostCard: React.FC<RankPostCardProps> = ({
  beltSource,
  rankName,
  verified,
  schoolName,
  username,
}) => {
  const [isNotEmpty, setIsNotEmpty] = useState(true);
  return (
    <>
      <BeltTitle>
        <TextWhite16Regular>{rankName}</TextWhite16Regular>
        {verified && <Icon src="/assets/icons/verified-leaf.svg" />}
      </BeltTitle>
      <BeltImage src={beltSource} />
      <ReachedRankCont>
        {isNotEmpty && (
          <>
            <TextGray14Thin>People who have reached this rank</TextGray14Thin>
            <ReachedRankAvatars>
              <PeopleAlsoReached
                level={rankName?.[0]}
                schoolName={schoolName}
                username={username}
                avatarDimension={40}
                beltHeight={5}
                setIsNotEmpty={setIsNotEmpty}
              />
            </ReachedRankAvatars>
          </>
        )}
      </ReachedRankCont>
    </>
  );
};

export default RankPostCard;
