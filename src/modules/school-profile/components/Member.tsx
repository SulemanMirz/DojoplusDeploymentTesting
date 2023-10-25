import axios from 'axios';
import router from 'next/router';
import { CircularProgress, ListItemButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import styled from 'styled-components';
import UserAvatar from '../../userAvatar';
import { PlanSubscriber } from '../../../shared/models/school.model';
import { useFireBaseAuth } from '../../../context/FirebaseContext';
import ModalOverlay from '../../modal-overlay';
import FilterModal from './FilterModal';
import { ProfileTabEmptyMessage } from '../../../shared/components/ProfileTabEmptyMessage';

export const ImageAndTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
`;

export const UserAvatarWrapper = styled.div`
  margin-left: 16px;
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

const IconButton = styled.img`
  width: 16px;
  height: 16px;
  color: #fff;
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
  min-height: calc(100vh - 280px);
  margin-bottom: 84px;
`;
const Icons = styled.img``;
const FilterContainer = styled.div`
  margin-top: 10px;
  height: 20px;
  display: flex;
  padding-inline: 20px;
  flex-flow: row-reverse;
`;

type MemberProps = {
  plansMembers: PlanSubscriber[];
};

const memeberData = [
  {
    id: '1',
    period: 'All members',
  },
  {
    id: '2',
    period: 'Coaches',
  },
  {
    id: '3',
    period: 'Members',
  },
];

const Member: React.FC<MemberProps> = ({ plansMembers }) => {
  const [followingData, setFollowingData] = useState([]);
  const [loadingIndex, setLoadingIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState(plansMembers);

  const { authUser } = useFireBaseAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState('1');

  const handleFilterModal = (): void => {
    setIsModalVisible(!isModalVisible);
  };

  const authUsername = authUser?.userInfo?.username;
  const email = authUser?.userInfo?.email;

  const getFollowersData = async (): Promise<void> => {
    try {
      const response = await axios('/api/Follows', {
        params: {
          username: authUsername,
          following: true,
        },
      });
      setFollowingData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFollow = (followed, username): void => {
    if (!authUser) {
      router.push(
        `${window.location.origin}/login?returnTo=${window.location.href}`,
      );
      return;
    }
    if (!loading) {
      if (!followed) {
        setLoading(true);
        axios
          .put(
            '/api/Follows',
            {},
            {
              params: {
                destinationUser: username,
                sourceUser: email,
                follow: true,
              },
            },
          )
          .then(() => {
            setFollowingData([...followingData, username]);
            setLoading(false);
            setLoadingIndex(-1);
          })
          .catch((e) => {
            setLoading(false);
            setLoadingIndex(-1);
            console.log(e);
          });
      } else {
        setLoading(true);
        axios
          .put(
            '/api/Follows',
            {},
            {
              params: {
                destinationUser: username,
                sourceUser: email,
                unfollow: true,
              },
            },
          )
          .then(() => {
            setFollowingData(
              followingData.filter((e) => {
                return e !== username;
              }),
            );
            setLoading(false);
            setLoadingIndex(-1);
          })
          .catch((e) => {
            setLoading(false);
            setLoadingIndex(-1);
            console.log(e);
          });
      }
    }
  };

  useEffect(() => {
    getFollowersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUsername]);

  const onSubmitData = (id): void => {
    if (id === '') {
      setMembers(plansMembers);
    }
    if (id === '1') {
      setMembers(plansMembers);
    }
    if (id === '2') {
      setMembers(plansMembers.filter((el) => el.isCoach === true));
    }
    if (id === '3') {
      setMembers(plansMembers.filter((el) => !el.isCoach === true));
    }
    setSelectedId(id);
  };

  return (
    <>
      {plansMembers?.length ? (
        <Container>
          <FilterContainer>
            <Icons
              onClick={handleFilterModal}
              src="/assets/icons/filter-icon.svg"
            />
          </FilterContainer>
          {members?.length ? (
            <>
              {members?.map((data, index) => {
                const followed = followingData?.find(
                  (element) => data?.usernameFromProfile?.[0] === element,
                );
                return (
                  <ListItemContainer>
                    <ListItem
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
                              key={data?.id}
                              username={data?.usernameFromProfile?.[0]}
                            />
                          </UserAvatarWrapper>
                          <TextContainer>
                            <TextName>
                              {data?.displayNameFromProfile?.[0]}
                            </TextName>
                            <TextUsername>
                              {data?.usernameFromProfile?.[0]}{' '}
                            </TextUsername>
                          </TextContainer>
                        </ImageAndTextContainer>
                      </ListItemButton>
                      {data?.usernameFromProfile?.[0] !== authUsername && (
                        <LoadingButton
                          variant="contained"
                          loading={index === loadingIndex}
                          loadingIndicator={
                            <CircularProgress
                              sx={{ color: 'white !important' }}
                              size={20}
                              color="secondary"
                            />
                          }
                          style={{
                            maxWidth: 102,
                            minWidth: 102,
                            width: 102,
                            backgroundColor: !followed ? '#D21632' : '#4F4F4F',
                            border: !followed ? '1px solid #4F4F4F' : '',
                            boxShadow: 'none',
                          }}
                          onClick={() => {
                            setLoadingIndex(index);
                            handleFollow(
                              followed,
                              data?.usernameFromProfile?.[0],
                            );
                          }}
                          startIcon={
                            !followed && (
                              <IconButton src="/assets/icons/person-add.svg" />
                            )
                          }
                        >
                          {!followed ? 'follow' : 'unfollow'}
                        </LoadingButton>
                      )}
                    </ListItem>
                  </ListItemContainer>
                );
              })}
            </>
          ) : (
            <ProfileTabEmptyMessage value="There is no Members to show" />
          )}

          <ModalOverlay
            height="430px"
            title="More filters"
            open={isModalVisible}
            onCloseClick={handleFilterModal}
          >
            <FilterModal
              onCloseClick={handleFilterModal}
              dataDay={memeberData}
              title=""
              onSubmitData={onSubmitData}
              selectedId={selectedId}
            />
          </ModalOverlay>
        </Container>
      ) : (
        <ProfileTabEmptyMessage value="There is no Members to show" />
      )}
    </>
  );
};

export default Member;
