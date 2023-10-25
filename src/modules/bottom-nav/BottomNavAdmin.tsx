import React from 'react';
import { Badge } from '@mui/material';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query as fbQuery, where } from 'firebase/firestore';
import styled from 'styled-components';
import { SAFE_AREA_VIEW_PADDING_BOTTOM } from '../../shared/styles/SafeAreaView';
import { useFireBaseAuth } from '../../context/FirebaseContext';
import { db } from '../../../firebaseConfig';

const BottomNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
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
  width: 16%;
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

const SchoolIcon = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;

const BottomNavAdmin: NextPage = () => {
  const { schoolInfo, authUser } = useFireBaseAuth();
  const { asPath, push } = useRouter();

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
    <>
      <BottomNav>
        <TabContainer onClick={() => push('/admin/school/dashboard')}>
          <TabIconSvg>
            <path
              d="M10.5 18V8H18.5V18H10.5ZM0.5 10V0H8.5V10H0.5ZM6.5 8V2H2.5V8H6.5ZM0.5 18V12H8.5V18H0.5ZM2.5 16H6.5V14H2.5V16ZM12.5 16H16.5V10H12.5V16ZM10.5 0H18.5V6H10.5V0ZM12.5 2V4H16.5V2H12.5Z"
              fill={asPath.includes('dashboard') ? '#FF595F' : '#B3B3B3'}
            />
          </TabIconSvg>
          <TabText
            style={{
              color: asPath.includes('dashboard') ? '#FF595F' : '#B3B3B3',
            }}
          >
            DASHBOARD
          </TabText>
        </TabContainer>
        <TabContainer onClick={() => push('/admin/school/store')}>
          <TabIconSvg>
            <path
              d="M19.5 9.646V19C19.5 19.2652 19.3946 19.5196 19.2071 19.7071C19.0196 19.8946 18.7652 20 18.5 20H2.5C2.23479 20 1.98043 19.8946 1.7929 19.7071C1.60536 19.5196 1.5 19.2652 1.5 19V9.646C0.85432 8.91596 0.498557 7.97461 0.500004 7V1C0.500004 0.734784 0.605361 0.48043 0.792898 0.292893C0.980434 0.105357 1.23479 0 1.5 0H19.5C19.7652 0 20.0196 0.105357 20.2071 0.292893C20.3946 0.48043 20.5 0.734784 20.5 1V7C20.5 8.014 20.122 8.94 19.5 9.646ZM17.5 10.874C16.7849 11.0577 16.0328 11.0403 15.327 10.8236C14.6211 10.6069 13.9889 10.1994 13.5 9.646C13.125 10.0721 12.6635 10.4133 12.1461 10.6468C11.6288 10.8802 11.0676 11.0007 10.5 11C9.93242 11.0007 9.37122 10.8802 8.85388 10.6468C8.33655 10.4133 7.87498 10.0721 7.5 9.646C7.01232 10.2009 6.38013 10.6096 5.67389 10.8264C4.96764 11.0432 4.21507 11.0597 3.5 10.874V18H17.5V10.874V10.874ZM12.5 7C12.5 6.73478 12.6054 6.48043 12.7929 6.29289C12.9804 6.10536 13.2348 6 13.5 6C13.7652 6 14.0196 6.10536 14.2071 6.29289C14.3946 6.48043 14.5 6.73478 14.5 7C14.5 7.53043 14.7107 8.03914 15.0858 8.41421C15.4609 8.78929 15.9696 9 16.5 9C17.0304 9 17.5391 8.78929 17.9142 8.41421C18.2893 8.03914 18.5 7.53043 18.5 7V2H2.5V7C2.5 7.53043 2.71072 8.03914 3.08579 8.41421C3.46086 8.78929 3.96957 9 4.5 9C5.03044 9 5.53915 8.78929 5.91422 8.41421C6.28929 8.03914 6.5 7.53043 6.5 7C6.5 6.73478 6.60536 6.48043 6.7929 6.29289C6.98043 6.10536 7.23479 6 7.5 6C7.76522 6 8.01957 6.10536 8.20711 6.29289C8.39465 6.48043 8.5 6.73478 8.5 7C8.5 7.53043 8.71072 8.03914 9.08579 8.41421C9.46086 8.78929 9.96957 9 10.5 9C11.0304 9 11.5391 8.78929 11.9142 8.41421C12.2893 8.03914 12.5 7.53043 12.5 7Z"
              fill={asPath.includes('store') ? '#FF595F' : '#B3B3B3'}
            />
          </TabIconSvg>
          <TabText
            style={{
              color: asPath.includes('store') ? '#FF595F' : '#B3B3B3',
            }}
          >
            STORE
          </TabText>
        </TabContainer>
        <TabContainer onClick={() => push('/admin/school/students')}>
          <TabIconSvg>
            <path
              d="M0.5 21C0.5 18.8783 1.34285 16.8434 2.84315 15.3431C4.34344 13.8429 6.37827 13 8.5 13C10.6217 13 12.6566 13.8429 14.1569 15.3431C15.6571 16.8434 16.5 18.8783 16.5 21H14.5C14.5 19.4087 13.8679 17.8826 12.7426 16.7574C11.6174 15.6321 10.0913 15 8.5 15C6.9087 15 5.38258 15.6321 4.25736 16.7574C3.13214 17.8826 2.5 19.4087 2.5 21H0.5ZM8.5 12C5.185 12 2.5 9.315 2.5 6C2.5 2.685 5.185 0 8.5 0C11.815 0 14.5 2.685 14.5 6C14.5 9.315 11.815 12 8.5 12ZM8.5 10C10.71 10 12.5 8.21 12.5 6C12.5 3.79 10.71 2 8.5 2C6.29 2 4.5 3.79 4.5 6C4.5 8.21 6.29 10 8.5 10ZM16.784 13.703C18.1893 14.3359 19.382 15.3612 20.2186 16.6557C21.0552 17.9502 21.5002 19.4587 21.5 21H19.5C19.5002 19.844 19.1666 18.7125 18.5391 17.7416C17.9116 16.7707 17.0171 16.0017 15.963 15.527L16.783 13.703H16.784ZM16.096 2.413C17.1035 2.8283 17.965 3.53354 18.571 4.43923C19.1771 5.34492 19.5004 6.41024 19.5 7.5C19.5004 8.87233 18.9877 10.1952 18.0625 11.2088C17.1374 12.2224 15.8667 12.8535 14.5 12.978V10.965C15.2409 10.8589 15.9283 10.518 16.4613 9.99246C16.9943 9.4669 17.3447 8.78432 17.4612 8.04493C17.5776 7.30555 17.454 6.5483 17.1084 5.88435C16.7628 5.22041 16.2134 4.68475 15.541 4.356L16.096 2.413Z"
              fill={asPath.includes('students') ? '#FF595F' : '#B3B3B3'}
            />
          </TabIconSvg>
          <TabText
            style={{
              color: asPath.includes('students') ? '#FF595F' : '#B3B3B3',
            }}
          >
            STUDENTS
          </TabText>
        </TabContainer>
        {/* <TabContainer onClick={() => push('/admin/school/reports')}>
          <TabIconSvg>
            <path
              d="M1.5 0H19.5C19.7652 0 20.0196 0.105357 20.2071 0.292893C20.3946 0.48043 20.5 0.734784 20.5 1V17C20.5 17.2652 20.3946 17.5196 20.2071 17.7071C20.0196 17.8946 19.7652 18 19.5 18H1.5C1.23478 18 0.98043 17.8946 0.792893 17.7071C0.605357 17.5196 0.5 17.2652 0.5 17V1C0.5 0.734784 0.605357 0.48043 0.792893 0.292893C0.98043 0.105357 1.23478 0 1.5 0ZM2.5 2V16H18.5V2H2.5ZM5.5 10H7.5V14H5.5V10ZM9.5 4H11.5V14H9.5V4ZM13.5 7H15.5V14H13.5V7Z"
              fill={asPath.includes('reports') ? '#FF595F' : '#B3B3B3'}
            />
          </TabIconSvg>
          <TabText
            style={{
              color: asPath.includes('reports') ? '#FF595F' : '#B3B3B3',
            }}
          >
            REPORTS
          </TabText>
        </TabContainer> */}
        <TabContainer onClick={() => push('/admin/school/adminInbox')}>
          <Badge badgeContent={users?.length} color="primary">
            <TabIconSvg>
              <path
                d="M6.955 19L2.5 22.5V4C2.5 3.73478 2.60536 3.48043 2.79289 3.29289C2.98043 3.10536 3.23478 3 3.5 3H21.5C21.7652 3 22.0196 3.10536 22.2071 3.29289C22.3946 3.48043 22.5 3.73478 22.5 4V18C22.5 18.2652 22.3946 18.5196 22.2071 18.7071C22.0196 18.8946 21.7652 19 21.5 19H6.955ZM6.263 17H20.5V5H4.5V18.385L6.263 17ZM11.5 10H13.5V12H11.5V10ZM7.5 10H9.5V12H7.5V10ZM15.5 10H17.5V12H15.5V10Z"
                fill={asPath.includes('adminInbox') ? '#FF595F' : '#B3B3B3'}
              />
            </TabIconSvg>
          </Badge>
          <TabText
            style={{
              color: asPath.includes('adminInbox') ? '#FF595F' : '#B3B3B3',
            }}
          >
            Inbox
          </TabText>
        </TabContainer>
        <TabContainer onClick={() => push('/admin/school/settings')}>
          <SchoolIcon src={schoolInfo?.schoolLogo?.[0]?.url} />
          <TabText
            style={{
              color: asPath.includes('settings') ? '#FF595F' : '#B3B3B3',
            }}
          >
            SCHOOL
          </TabText>
        </TabContainer>
      </BottomNav>
    </>
  );
};

export default BottomNavAdmin;
