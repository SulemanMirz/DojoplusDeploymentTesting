import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import {
  MasterImage,
  ContainerImgText,
  MasterBelt,
  BeltImgCont,
} from '../../ranks/components/ranks-styled';
import { DefaultAvatar } from '../../../shared/components/DefaultAvatar';
import { IRank } from '../../../shared/models/Rank.model';
import { orderRanks } from '../../../shared/utils/ranks-utils';
import { User } from '../../../shared/models/user.model';
import { TextWhite14CapitalizeRegular } from '../../../shared/components/texts';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  min-height: 48px;
  max-height: fit content;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const NamesMaster = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 6px 0 12px;
  padding-top: 14px;
`;

interface MasterAvatarProps {
  data: {
    master: User;
    rank: IRank[];
  };
}

export const MasterAvatar: React.FC<MasterAvatarProps> = ({ data }) => {
  const masterimage = data.master?.photo ? data.master?.photo[0]?.url : '';

  const masterFeatureRank = data.rank.find((rank) => rank.featuredRank)
    ?.rankImageW64H8FromMartialArtsRanks[0].url;
  const masterRecentBelt = data.rank[0]
    ? orderRanks(data.rank)[0].rankImageW64H8FromMartialArtsRanks[0].url
    : '';
  const masterbelt =
    masterFeatureRank || masterRecentBelt || '/assets/medals/beltDefault.png';
  const masterfullname =
    data.master?.displayName ||
    data.master?.fullName ||
    (data.master?.firstName &&
      data.master?.lastName &&
      `${data.master?.firstName} ${data.master?.lastName}`) ||
    '';
  return (
    <Container>
      <Link href={`/${data.master.username}`}>
        <ContainerImgText>
          <BeltImgCont>
            <MasterImage
              src={masterimage || DefaultAvatar}
              alt={`${masterfullname} Profile`}
            />
            {masterbelt ? (
              <MasterBelt src={masterbelt} alt={masterfullname} style={{ width: '48px' }} />
            ) : (
              <div style={{ width: '48px' }} />
            )}
          </BeltImgCont>
          <NamesMaster>
            <TextWhite14CapitalizeRegular>
              {masterfullname}
            </TextWhite14CapitalizeRegular>
          </NamesMaster>
        </ContainerImgText>
      </Link>
    </Container>
  );
};
