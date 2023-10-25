import { CircularProgress } from '@mui/material';
import axios from 'axios';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useFireBaseAuth } from '../../context/FirebaseContext';
import { ProfileTabEmptyMessage } from '../../shared/components/ProfileTabEmptyMessage';
import AuthGuard from '../auth/AuthGuard';
import HeaderDojo from '../headers/HeaderDojo';
import ModalOverlay from '../modal-overlay';
import UserAvatar from '../userAvatar';
import FilterModal from './students/Components/FilterModal';

const ImageAndTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
`;

const TextContainer = styled.div`
  padding-left: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TextName = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
  color: #fcfcfc;

  @media screen and (max-width: 430px) {
    width: 130px;
  }
`;

const StudentsCard = styled.div`
  display: flex;
  border-bottom: 1px solid #404040;
  padding: 24px 12px;
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

const Number = styled.div`
  margin-right: 24px;
`;

const Icon = styled.img`
  padding-left: 4px;
`;

const MainDiv = styled.div`
  margin-top: 110px;
`;

const Container = styled.div`
  min-height: calc(100vh - 280px);
  margin-bottom: 84px;
`;

const Section = styled.div`
  padding-inline: 16px;
`;

const IconImage = styled.img``;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  justify-content: center;
`;

const cup = '/assets/medals/champion-ship.svg';
const rank2 = '/assets/medals/second-rank.svg';
const rank3 = '/assets/medals/third-rank.svg';

const RankIcons: (index: number) => string = (index) => {
  if (index === 0) {
    return cup;
  }
  if (index === 1) {
    return rank2;
  }
  if (index === 2) {
    return rank3;
  }
  return '';
};

const dataDay = [
  {
    id: '7',
    period: 'Last 7 days',
  },
  {
    id: '28',
    period: 'Last 28 days',
  },
  {
    id: '90',
    period: 'Last 3 months',
  },
  {
    id: '160',
    period: 'Last 6 months',
  },
  {
    id: '365',
    period: 'Last 12 months',
  },
];

const LeaderBoards: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [filterLeaderBoard, setFilterLeaderBoard] = useState(leaderBoard);
  const { schoolInfo } = useFireBaseAuth();
  const [selectedId, setSelectedId] = useState('365');
  const [isLoading, setIsLoading] = useState(false);

  const getLeaderBoard = (): void => {
    setIsLoading(true);
    axios('/api/CheckIn/count', {
      params: {
        slug: schoolInfo?.slug,
      },
    })
      .then((res) => {
        setLeaderBoard(res.data);
        setFilterLeaderBoard(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(true);
        console.log(e, 'e');
      });
  };

  useEffect(() => {
    if (schoolInfo?.slug) {
      getLeaderBoard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schoolInfo?.slug]);

  const handleFilterModal = (): void => {
    setIsModalVisible(!isModalVisible);
  };

  const curr = new Date();

  const onSubmitData = (id): void => {
    if (id === '') {
      setFilterLeaderBoard(leaderBoard);
      return;
    }
    const lastDayEnd = new Date(curr.setDate(curr.getDate() - parseInt(id)));
    setFilterLeaderBoard(
      leaderBoard?.filter((el) => new Date(el.lastCheckIn) >= lastDayEnd),
    );
    setSelectedId(id);
  };

  return (
    <AuthGuard>
      <HeaderDojo
        title="Leaderboard"
        IconLeft={<IconImage src="/assets/icons/back-arrow.svg" />}
        IconRight={<IconImage src="/assets/icons/filter-icon.svg" />}
        onIconLeftCLick={() => router.back()}
        onIconRightClick={handleFilterModal}
      />
      <MainDiv>
        {isLoading && (
          <LoadingWrapper style={{ marginBottom: 20 }}>
            <CircularProgress color="primary" size={20} />
          </LoadingWrapper>
        )}
        {leaderBoard?.length ? (
          <Container>
            {filterLeaderBoard?.length ? (
              <>
                {filterLeaderBoard?.map((data, index) => {
                  return (
                    <>
                      <Section>
                        <StudentsCard>
                          <ImageAndTextContainer>
                            <Number>{index + 1}</Number>
                            <UserAvatar
                              username={data?.username}
                              avatarDimension={40}
                              beltHeight={4}
                            />
                            <TextContainer>
                              <TextName>{data?.displayName}</TextName>

                              <Icon src={RankIcons(index)} />
                            </TextContainer>
                          </ImageAndTextContainer>
                          <TextTime>{data?.checkInsCount} Check-ins</TextTime>
                        </StudentsCard>
                      </Section>
                    </>
                  );
                })}
              </>
            ) : (
              <ProfileTabEmptyMessage value="There is No  Leader Board  to show " />
            )}
          </Container>
        ) : (
          !isLoading && (
            <ProfileTabEmptyMessage value="There is No LeaderBoard to show" />
          )
        )}
      </MainDiv>
      <ModalOverlay
        height="430px"
        title="More filters"
        open={isModalVisible}
        onCloseClick={handleFilterModal}
      >
        <FilterModal
          onCloseClick={handleFilterModal}
          dataDay={dataDay}
          title="Period"
          onSubmitData={onSubmitData}
          selectedId={selectedId}
        />
      </ModalOverlay>
    </AuthGuard>
  );
};

export default LeaderBoards;
