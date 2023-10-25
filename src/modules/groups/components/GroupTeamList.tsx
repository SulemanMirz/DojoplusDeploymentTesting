import React from 'react';
import styled from 'styled-components';
import { PartialDeep } from 'type-fest';

import { SchoolProfile } from '../../../shared/types/generated';
import { AvatarBanner } from '../../../shared/components/AvatarBanner';
import { TextGray14CapitalizeThin } from '../../../shared/components/texts';

const TeamContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
`;

const TeamItem = styled.div`
  margin: 0 4px;
`;

type GroupTeamListProps = {
  data?: PartialDeep<SchoolProfile>[];
  count?: number;
};

export const GroupTeamList: React.FC<GroupTeamListProps> = ({
  data,
  count,
}) => {
  const tailText = count && count > 3 ? `+ ${count - 3} teammates` : null;
  const items =
    count > 3
      ? data.slice(0, 3).map((el) => (
        <TeamItem>
          <AvatarBanner
            src={el.idProfile.photo?.downloadUrl}
            srcBelt={el.idProfile.rankSmall?.downloadUrl}
            width="40px"
            height="40px"
          />
        </TeamItem>
      ))
      : data.map((el) => (
        <TeamItem>
          <AvatarBanner
            src={el.idProfile.photo?.downloadUrl}
            srcBelt={el.idProfile.rankSmall?.downloadUrl}
            width="40px"
            height="40px"
          />
        </TeamItem>
      ));

  return (
    <TeamContainer>
      {items}
      <TextGray14CapitalizeThin>{tailText}</TextGray14CapitalizeThin>
    </TeamContainer>
  );
};
