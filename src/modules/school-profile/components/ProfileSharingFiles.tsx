import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-left: 20px;
  margin-top: 25px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const IconTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img``;

const Title = styled.div``;

const DividerLine = styled.div`
  margin-top: 13px;
  height: 3px;
  margin-inline: 14px;
  left: 14px;
  top: 321px;
  border-radius: 12px;
  background: #d9d9d9;
`;

const ProfileSharingFiles: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <IconTitleContainer>
          <Icon src="/assets/icons/call.svg" />
          <Title>phone</Title>
        </IconTitleContainer>
        <IconTitleContainer>
          <Icon src="/assets/icons/directions.svg" />
          <Title>directions</Title>
        </IconTitleContainer>
        <IconTitleContainer>
          <Icon src="/assets/icons/share.svg" />
          <Title>Share</Title>
        </IconTitleContainer>
        <IconTitleContainer>
          <Icon src="/assets/icons/group-chat.svg" />
          <Title>Group Chat</Title>
        </IconTitleContainer>
      </Wrapper>
      <DividerLine />
    </Container>
  );
};

export default ProfileSharingFiles;
