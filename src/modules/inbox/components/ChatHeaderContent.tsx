import { Avatar } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { doc } from 'firebase/firestore';
import React from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { db } from '../../../../firebaseConfig';
import { TextGray12UppercaseBold } from '../../../shared/components/texts';
import useLiveTime from '../../../shared/hooks/useLiveTime';
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

const TitleText = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 120%;
  color: #fcfcfc;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

const OnlineIcon = styled.span`
  height: 8px;
  width: 8px;
  border-radius: 6px;
  margin-right: 5px;
  background-color: #00ff00;
`;

const SubContainer = styled.div`
  align-items: center;
  display: flex;
`;

type ChatHeaderContentProps = {
  title: string;
  username: string;
  uid: string;
  isSchool?: boolean;
  schoolLogo?: string;
};

const ChatHeaderContent: React.FC<ChatHeaderContentProps> = ({
  title,
  username,
  uid,
  isSchool,
  schoolLogo,
}) => {
  const receiver = useDocumentData(doc(db, 'users', uid ||'dummy'));
  const liveTime = useLiveTime();
  const lastActive = dayjs(liveTime).to(
    dayjs(receiver?.[0]?.lastActive?.toDate()),
  );
  const online =
    lastActive === 'a few sec ago' || lastActive === 'in a few sec';
  const DefaultSchoolAvatar = '/assets/fallback_images/DefaultSchoolGrey.svg';
  return (
    <Container>
      {isSchool ? (
        <>
          {' '}
          <Avatar
            variant="circular"
            src={schoolLogo || DefaultSchoolAvatar}
          />{' '}
        </>
      ) : (
        <>
          <UserAvatar avatarDimension={40} beltHeight={4} username={username} />
        </>
      )}

      <TextContainer>
        <TitleText>{title || ''} </TitleText>

        {!isSchool && (
          <>
            <SubContainer>
              {online && <OnlineIcon />}
              <TextGray12UppercaseBold
                style={{ lineHeight: '130%', textTransform: 'none' }}>
                {online ? 'Online' : `Last Active: ${lastActive}`}
              </TextGray12UppercaseBold>
            </SubContainer>
          </>
        )}
      </TextContainer>
    </Container>
  );
};

export default ChatHeaderContent;
