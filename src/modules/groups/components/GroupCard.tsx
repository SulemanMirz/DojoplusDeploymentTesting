import React from 'react';
import { PartialDeep } from 'type-fest';

import { School as SchoolType } from '../../../shared/types/generated';
import { GroupTeamList } from './GroupTeamList';
import {
  Container,
  BannerContainer,
  Banner,
  Content,
  CardAvatar,
  DescriptionIcon,
} from './GroupCard-styled';
import {
  TextGray14CapitalizeThin,
  TextWhite24CapitalizeBold,
} from '../../../shared/components/texts';

type GroupCardProps = {
  group: PartialDeep<SchoolType>;
};

export const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const schoolLogoDefault = 'assets/group/group.png';
  return (
    <Container>
      <BannerContainer>
        <Banner src="https://dogym.es/wp-content/uploads/2017/09/ventajas-entrenar-judo.jpg" />
      </BannerContainer>
      <Content>
        <CardAvatar
          src={group.schoolLogo?.downloadUrl || schoolLogoDefault}
          alt="school logo"
        />
        <TextWhite24CapitalizeBold
          style={{ color: 'black', textAlign: 'center' }}
        >
          {group?.schoolName}
        </TextWhite24CapitalizeBold>
        <TextGray14CapitalizeThin>
          <DescriptionIcon />
          School
        </TextGray14CapitalizeThin>
        <GroupTeamList
          count={group.schoolProfile?.count || 0}
          data={group?.schoolProfile?.items}
        />
      </Content>
    </Container>
  );
};
