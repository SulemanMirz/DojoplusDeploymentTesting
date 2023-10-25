import React, { useState, useEffect } from 'react';
import { ListItemButton, CircularProgress } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';
import ListItem from '@mui/material/ListItem';
import HeaderDojo from '../../headers/HeaderDojo';
import UserAvatar from '../../userAvatar';
import AlphabetList from './Components/AlphabetList';
import ModalOverlay from '../../modal-overlay';
import StudentsDetailModal from './Components/StudentsDetailModal';
import { useFireBaseAuth } from '../../../context/FirebaseContext';
import { Plans } from '../../../shared/models/school.model';
import AuthGuard from '../../auth/AuthGuard';

export const ImageAndTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
`;

export const UserAvatarWrapper = styled.div`
  margin-left: 16px;
`;

const ListItemWrapper = styled.div`
  width: 100%;
  margin-top: 15px;
`;

const TextContainer = styled.div`
  padding-left: 16px;
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
  @media screen and (max-width: 360px) {
    white-space: nowrap;
    width: 92px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
  color: #bdbdbd;
`;

const ListItemContainer = styled.div`
  padding-inline: 16px;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  padding-right: 12px;
  position: fixed;
  top: 100px;
  height: calc(100vh - 100px);
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  justify-content: center;
`;

const StudentInfo: React.FC = () => {
  const [activeLetter, setActiveLetter] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [studentSelectedData, setStudentSelectedData] = useState<Plans>();

  const [isLoading, setIsLoading] = useState(false);

  const { schoolInfo } = useFireBaseAuth();
  const [studentsData, setStudentsData] = useState([]);

  const getStudentData = (): void => {
    setIsLoading(true);
    axios('/api/Plans/members', {
      params: {
        slug: schoolInfo?.slug,
      },
    })
      .then((res) => {
        setStudentsData(res.data);
      })
      .catch((e) => console.log(e, 'e'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (schoolInfo?.slug) {
      getStudentData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schoolInfo?.slug]);

  const handleLetterClick = (letter): void => {
    const element = document.getElementById(letter?.toLowerCase());
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    setActiveLetter(letter);
  };

  const finalSortedData = studentsData?.sort((a, b) => {
    const name1 = a?.displayNameFromProfile?.[0]?.toLowerCase();
    const name2 = b?.displayNameFromProfile?.[0]?.toLowerCase();
    if (name1 < name2) {
      return -1;
    }
    if (name1 > name2) {
      return 1;
    }
    return 0;
  });

  const handleStudentDetailsModal = (): void => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <AuthGuard>
      <HeaderDojo style={{ paddingTop: '50px' }} />
      <Container>
        <ListItemWrapper>
          {isLoading && (
            <LoadingWrapper style={{ marginBottom: 20 }}>
              <CircularProgress color="primary" size={20} />
            </LoadingWrapper>
          )}
          {finalSortedData?.map((data, index, arr) => {
            const prev = arr?.[index - 1];
            const currentId =
              prev?.displayNameFromProfile?.[0] ===
              data?.displayNameFromProfile?.[0]
                ? undefined
                : data?.displayNameFromProfile?.[0].toLowerCase();

            return (
              <>
                <ListItemContainer id={currentId}>
                  <ListItem
                    onClick={() => {
                      handleStudentDetailsModal();
                      setStudentSelectedData(data);
                    }}
                    sx={{
                      borderBottom: '1px solid #404040',
                      paddingLeft: '0px !important',
                    }}
                  >
                    <ListItemButton style={{ paddingInline: '0px' }}>
                      <ImageAndTextContainer>
                        <UserAvatarWrapper>
                          <UserAvatar
                            avatarDimension={64}
                            username={data?.usernameFromProfile?.[0]}
                          />
                        </UserAvatarWrapper>
                        <TextContainer>
                          <TextName>
                            {data?.displayNameFromProfile?.[0]}
                          </TextName>
                          <TextUsername>
                            {data?.usernameFromProfile?.[0]}
                          </TextUsername>
                        </TextContainer>
                      </ImageAndTextContainer>
                    </ListItemButton>
                  </ListItem>
                </ListItemContainer>
              </>
            );
          })}
        </ListItemWrapper>
      </Container>
      {studentsData?.length && (
        <AlphabetList
          handleLetterClick={handleLetterClick}
          activeLetter={activeLetter}
        />
      )}

      <ModalOverlay
        headerStyle={{ backgroundColor: ' #111111' }}
        open={isModalVisible}
        title={studentSelectedData?.displayNameFromProfile?.[0]}
        height="calc(100vh - 50px) !important"
        onCloseClick={handleStudentDetailsModal}
      >
        <StudentsDetailModal studentData={studentSelectedData} />
      </ModalOverlay>
    </AuthGuard>
  );
};

export default StudentInfo;
