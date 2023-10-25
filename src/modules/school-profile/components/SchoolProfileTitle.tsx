import { Avatar } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { School } from '../../../shared/models/school.model';

const Container = styled.div`
  background: #111111;
  width: 100%;
  left: 0px;
  top: 113px;
  border-radius: 0px;
  position: sticky;
  top: 19px;
  z-index: 2;
`;

const AvatarContainer = styled.div`
  height: 96px;
  width: 96px;
  margin-left: 28px;
  top: 137px;
  border-radius: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 28px;
  margin-top: 16px;
  margin-right: 12px;
`;

const UserName = styled.div`
  font-family: Saira;
  font-style: normal;
  font-size: 18px;
  font-weight: 600;
  line-height: 21px;
`;

const Location = styled.div`
  font-family: 'Saira';
  font-size: 14px;
  font-weight: 400;
`;
const Member = styled.div`
  padding-top: 5px;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
`;

const Icon = styled.img`
  margin-inline: 7px;
  width: 16px;
`;

const FirstSection = styled.div`
  display: flex;
  height: 148px;
  margin: auto;
  align-items: center;
`;

const Rating = styled.span`
  font-family: 'Saira';
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
`;

type SchoolProfileTitleProps = {
  data: School;
  rating: number;
  members: number;
  getSchoolData: () => Promise<void>;
};

const SchoolProfileTitle: React.FC<SchoolProfileTitleProps> = ({
  data,
  rating,
  members,
  getSchoolData,
}) => {
  return (
    <Container>
      <FirstSection>
        <AvatarContainer>
          <Avatar sx={{ width: '96px', height: '96px' }}>
            <Image
              src={data?.schoolLogo?.[0].url || '/assets/logo/dojo.png'}
              onError={() => {
                getSchoolData();
              }}
              alt="school/logo"
              width={96}
              height={96}
              placeholder="empty"
            />
          </Avatar>
        </AvatarContainer>
        <ContentSection>
          <UserName>
            {data?.schoolName}{' '}
            {rating > 0 && (
              <>
                {rating ? (
                  <>
                    <Icon src="/assets/icons/star.svg" />
                    <Rating>{rating}</Rating>
                  </>
                ) : (
                  ''
                )}
              </>
            )}
          </UserName>
          <Location>
            {data?.city || ''} {data?.state || ''} {data?.country || ''}
          </Location>
          {members > 0 && <Member>{`${members || 0} MEMBERS`}</Member>}
        </ContentSection>
      </FirstSection>
      {/* For Possible Later Use */}
      {/* <ProfileSharingFiles /> */}
    </Container>
  );
};

export default SchoolProfileTitle;
