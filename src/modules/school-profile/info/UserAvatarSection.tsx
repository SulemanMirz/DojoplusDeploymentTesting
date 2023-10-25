import router, { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { PlanSubscriber, School } from '../../../shared/models/school.model';
import UserAvatar from '../../userAvatar';

const Container = styled.div``;

const CoachTitle = styled.span`
  font-family: Saira;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
`;

const MemberContainer = styled.div`
  padding-top: 12px;
`;
const MemberSeeAll = styled.div`
  display: flex;
  justify-content: space-between;
`;
const MemberTitle = styled.div`
  font-family: Saira;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
`;
const MemberAll = styled.div`
  font-family: Saira;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  cursor: pointer;
`;

const MemberDescription = styled.div`
  font-family: Saira;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
`;

const AvatarContainer = styled.div`
  display: flex;
  width: 100%;
  padding-top: 10px;
`;

const UserAvatarContainer = styled.div`
  margin-right: 8px;
`;

type UserAvatarSectionProps = {
  data: School;
  plansMembers: PlanSubscriber[];
};

const UserAvatarSection: React.FC<UserAvatarSectionProps> = ({
  data,
  plansMembers,
}) => {
  const { query } = useRouter();
  const coaches = data?.displayNameFromInstructor;
  return (
    <Container>
      {coaches && (
        <>
          <CoachTitle>COACHES</CoachTitle>
          <AvatarContainer>
            {coaches?.map((user) => {
              return (
                <div style={{ marginRight: '4px' }}>
                  <UserAvatar
                    key={user}
                    username={user}
                    avatarDimension={32}
                    beltHeight={4}
                  />
                </div>
              );
            })}
          </AvatarContainer>
        </>
      )}

      <MemberContainer>
        <MemberSeeAll>
          <MemberTitle>{plansMembers?.length} MEMBERS</MemberTitle>
          {plansMembers?.length !== 0 && (
            <MemberAll
              onClick={() => router.push(`/school/${query?.schoolId}/members`)}
            >
              See All
            </MemberAll>
          )}
        </MemberSeeAll>
        <AvatarContainer style={{ padding: '10px 0px 25px 0px' }}>
          {plansMembers?.slice(0, 8)?.map((user) => {
            return (
              <UserAvatarContainer>
                <UserAvatar
                  key={user?.id}
                  username={user?.usernameFromProfile?.[0]}
                  avatarDimension={32}
                  beltHeight={4}
                />
              </UserAvatarContainer>
            );
          })}
        </AvatarContainer>
        {data?.description && (
          <MemberDescription>{data?.description}</MemberDescription>
        )}
      </MemberContainer>
    </Container>
  );
};

export default UserAvatarSection;
