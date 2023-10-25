import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import UserAvatar from '../../userAvatar';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few sec',
    m: 'a minute',
    mm: '%d min',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
  },
});

const ImageAndTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
`;

const TextContainer = styled.div`
  padding-left: 33px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TextName = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
  color: #fcfcfc;
`;

const TextUsername = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
  color: #bdbdbd;
`;

const StudentsCard = styled.div`
  display: flex;
  width: 95%;
  height: 112px;
  border-top: 1px solid #404040;
  padding: 24px 16px;
  align-items: center;
  justify-content: space-between;
`;

const TextTime = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 120%;
  right: 24px;
`;

type StudentCardProps = {
  username: string;
  name: string;
  since?: string;
  disableClick?: boolean;
};

const StudentCard: React.FC<StudentCardProps> = ({
  username,
  name,
  since,
  disableClick,
}) => {
  return (
    <StudentsCard>
      <ImageAndTextContainer>
        <UserAvatar
          disableClick={disableClick}
          username={username}
          avatarDimension={64}
        />
        <TextContainer style={{ paddingLeft: 16 }}>
          <TextName>{name}</TextName>
          <TextUsername>{username}</TextUsername>
        </TextContainer>
      </ImageAndTextContainer>
      <TextTime>{since}</TextTime>
    </StudentsCard>
  );
};

export default StudentCard;
