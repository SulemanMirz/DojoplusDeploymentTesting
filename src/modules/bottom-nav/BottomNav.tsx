import { Badge } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { collection, query as fbQuery, where } from 'firebase/firestore';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import { SAFE_AREA_VIEW_PADDING_BOTTOM } from '../../shared/styles/SafeAreaView';
import { db } from '../../../firebaseConfig';

const BottomNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 0px 16px;
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: -1px;
  background-color: #111111;
  padding: 10px 0px ${`${SAFE_AREA_VIEW_PADDING_BOTTOM}px`} 0px;
  box-shadow: 0px -3px 0px rgba(24, 24, 24, 0.35);
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex: none;
  order: 0;
  flex-grow: 0;
  padding-inline: 12px;
  width: 20%;
`;

const TabIconSvg = styled.svg`
  height: 24px;
  width: 24px;
`;

const TabText = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 12px;
  text-align: center;
  text-transform: uppercase;
  color: #b3b3b3;
  flex: none;
  order: 3;
  flex-grow: 0;
  margin-top: 4px;
`;

const BottomNavBar: React.FC = () => {
  const { asPath, push, query, route } = useRouter();
  const tab = asPath || '';

  const { authUser } = useFirebaseAuth();
  const username = authUser?.userInfo?.username || '';

  const [chatValues] = useCollection(
    fbQuery(
      collection(db, 'chats'),
      where('users', 'array-contains', authUser?.email || ''),
    ),
  );
  const users = chatValues?.docs
    .map((chat) => {
      return {
        lastMessageObj: chat.data().lastMessageObj,
        lastReadBy: chat.data().lastReadBy,
      };
    })
    ?.filter(
      (chat) =>
        (typeof chat?.lastMessageObj?.isRead !== 'undefined' &&
          chat?.lastMessageObj?.isRead === false &&
          chat?.lastMessageObj?.uid !== authUser?.uid) ||
        chat?.lastReadBy?.indexOf(username) === -1,
    );

  return (
    <BottomNav>
      <TabContainer onClick={() => push('/home')}>
        <TabIconSvg>
          <path
            d="M21.5 19.9998C21.5 20.265 21.3946 20.5194 21.2071 20.7069C21.0196 20.8944 20.7652 20.9998 20.5 20.9998H4.5C4.23478 20.9998 3.98043 20.8944 3.79289 20.7069C3.60536 20.5194 3.5 20.265 3.5 19.9998V9.48978C3.49989 9.3374 3.53462 9.187 3.60152 9.05008C3.66841 8.91317 3.76572 8.79335 3.886 8.69978L11.886 2.47778C12.0615 2.34123 12.2776 2.26709 12.5 2.26709C12.7224 2.26709 12.9385 2.34123 13.114 2.47778L21.114 8.69978C21.2343 8.79335 21.3316 8.91317 21.3985 9.05008C21.4654 9.187 21.5001 9.3374 21.5 9.48978V19.9998ZM19.5 18.9998V9.97778L12.5 4.53378L5.5 9.97778V18.9998H19.5Z"
            fill={route.includes('home') ? '#FF595F' : '#B3B3B3'}
          />
        </TabIconSvg>
        <TabText
          style={{
            color: route.includes('home') ? '#FF595F' : '#B3B3B3',
          }}>
          Home
        </TabText>
      </TabContainer>
      <TabContainer onClick={() => push('/events')}>
        <TabIconSvg>
          <path
            d="M17.5 3H21.5C21.7652 3 22.0196 3.10536 22.2071 3.29289C22.3946 3.48043 22.5 3.73478 22.5 4V20C22.5 20.2652 22.3946 20.5196 22.2071 20.7071C22.0196 20.8946 21.7652 21 21.5 21H3.5C3.23478 21 2.98043 20.8946 2.79289 20.7071C2.60536 20.5196 2.5 20.2652 2.5 20V4C2.5 3.73478 2.60536 3.48043 2.79289 3.29289C2.98043 3.10536 3.23478 3 3.5 3H7.5V1H9.5V3H15.5V1H17.5V3ZM20.5 11H4.5V19H20.5V11ZM15.5 5H9.5V7H7.5V5H4.5V9H20.5V5H17.5V7H15.5V5ZM6.5 13H8.5V15H6.5V13ZM11.5 13H13.5V15H11.5V13ZM16.5 13H18.5V15H16.5V13Z"
            fill={route.includes('events') ? '#FF595F' : '#B3B3B3'}
          />
        </TabIconSvg>
        <TabText
          style={{
            color: route.includes('events') ? '#FF595F' : '#B3B3B3',
          }}>
          Events
        </TabText>
      </TabContainer>
      <TabContainer
        style={{ paddingInline: 0 }}
        onClick={() => push('/check-in/pick-class')}>
        <TabIconSvg>
          <path
            d="M23.2885 11.4895L13.0105 1.21147C12.7286 0.92951 12.2714 0.92951 11.9895 1.21147L1.71147 11.4895C1.42951 11.7714 1.42951 12.2285 1.71147 12.5105L11.9895 22.7885C12.2714 23.0705 12.7286 23.0705 13.0105 22.7885L23.2885 12.5105C23.5705 12.2286 23.5705 11.7714 23.2885 11.4895ZM12.5 2.74305L18.7839 9.02694L16.8319 10.9789L10.548 4.69504L12.5 2.74305ZM15.8109 12L12.5 15.3109L9.18904 12L12.5 8.68908L15.8109 12ZM3.24305 12L9.52694 5.71607L11.4789 7.66805L5.195 13.952L3.24305 12ZM12.5 21.2569L6.21607 14.9731L8.16805 13.0211L14.452 19.305L12.5 21.2569ZM15.473 18.2839L13.521 16.3319L19.8049 10.0481L21.7569 12L15.473 18.2839Z"
            fill={route.includes('check-in') ? '#FF595F' : '#B3B3B3'}
          />
        </TabIconSvg>
        <TabText
          style={{
            color: route.includes('check-in') ? '#FF595F' : '#B3B3B3',
          }}>
          Check-In
        </TabText>
      </TabContainer>
      <TabContainer onClick={() => push('/inbox')}>
        <Badge badgeContent={users?.length} color="primary">
          <TabIconSvg>
            <path
              d="M6.955 19L2.5 22.5V4C2.5 3.73478 2.60536 3.48043 2.79289 3.29289C2.98043 3.10536 3.23478 3 3.5 3H21.5C21.7652 3 22.0196 3.10536 22.2071 3.29289C22.3946 3.48043 22.5 3.73478 22.5 4V18C22.5 18.2652 22.3946 18.5196 22.2071 18.7071C22.0196 18.8946 21.7652 19 21.5 19H6.955ZM6.263 17H20.5V5H4.5V18.385L6.263 17ZM11.5 10H13.5V12H11.5V10ZM7.5 10H9.5V12H7.5V10ZM15.5 10H17.5V12H15.5V10Z"
              fill={route.includes('inbox') ? '#FF595F' : '#B3B3B3'}
            />
          </TabIconSvg>
        </Badge>
        <TabText
          style={{
            color: route.includes('inbox') ? '#FF595F' : '#B3B3B3',
          }}>
          Inbox
        </TabText>
      </TabContainer>
      <TabContainer
        onClick={() =>
          username && tab !== `/${username}/ranks`
            ? push(`/${username}`)
            : undefined
        }>
        <TabIconSvg>
          <path
            d="M4.5 22C4.5 19.8783 5.34285 17.8434 6.84315 16.3431C8.34344 14.8429 10.3783 14 12.5 14C14.6217 14 16.6566 14.8429 18.1569 16.3431C19.6571 17.8434 20.5 19.8783 20.5 22H18.5C18.5 20.4087 17.8679 18.8826 16.7426 17.7574C15.6174 16.6321 14.0913 16 12.5 16C10.9087 16 9.38258 16.6321 8.25736 17.7574C7.13214 18.8826 6.5 20.4087 6.5 22H4.5ZM12.5 13C9.185 13 6.5 10.315 6.5 7C6.5 3.685 9.185 1 12.5 1C15.815 1 18.5 3.685 18.5 7C18.5 10.315 15.815 13 12.5 13ZM12.5 11C14.71 11 16.5 9.21 16.5 7C16.5 4.79 14.71 3 12.5 3C10.29 3 8.5 4.79 8.5 7C8.5 9.21 10.29 11 12.5 11Z"
            fill={query?.slug?.includes(username) ? '#FF595F' : '#B3B3B3'}
          />
        </TabIconSvg>
        <TabText
          style={{
            color: query?.slug?.includes(username) ? '#FF595F' : '#B3B3B3',
          }}>
          Profile
        </TabText>
      </TabContainer>
    </BottomNav>
  );
};

export default BottomNavBar;
