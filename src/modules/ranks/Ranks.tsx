import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import _ from 'lodash';

import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { ProfileTabLoading } from '../../shared/components/TabLoading';
import { ProfileTabEmptyMessage } from '../../shared/components/ProfileTabEmptyMessage';

import { RankCard } from './components/RankCard';
import { Rank } from '../../shared/models/Rank.model';
import { orderRanks } from '../../shared/utils/ranks-utils';
import { RankDetailsModal } from './components/RankDetailsModal';
import { addRankButtonStyles } from '../../shared/styles/Button-style';
import { useFireBaseAuth } from '../../context/FirebaseContext';
import { User } from '../../shared/models/user.model';
import ModalOverlay from '../modal-overlay';
import ActionConfirmationModal from '../action-confimation-modal/ActionConfirmationModal';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
  @media screen and (max-width: 600px) {
    justify-content: center;
  }
`;

const AddIcon = styled.img`
  height: 24;
  width: 24;
`;

const AddRankContiner = styled.div`
  display: flex;
  justify-content: center;
  padding: 0px 8px 0px 8px;
  width: 100%;
`;

type RanksProps = {
  username?: string;
  profile?: User;
};

export const Ranks: React.FC<RanksProps> = ({ username, profile }) => {
  const [isLoading, setLoading] = useState(true);
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clickedRank, setClickedRank] = useState<Rank | null>(null);
  const [isModalConfVisible, setIsModalConfVisible] = useState(false);
  const [isDeleteLoading, setisDeleteLoading] = useState(false);

  const { authUser } = useFireBaseAuth();
  const isAuthUser = authUser?.userInfo?.username === username;

  const { push } = useRouter();

  const { t } = useTranslation();
  const RemoveRankFromProfile = t('RemoveRankFromProfile');
  const RemoveRank = t('RemoveRank');

  useEffect(() => {
    if (username) {
      const requests = [];
      requests.push(
        axios('/api/Rank', {
          params: {
            username,
          },
        }).then((res) => {
          const formatedRes = res.data.map((rank) =>
            _.mapKeys(rank.fields, (v, k) => _.camelCase(k)),
          );
          setRanks(formatedRes);
          const requests2 = [];

          formatedRes
            .map((rank) => rank.master?.username)
            .filter(Boolean)
            .filter((item, i, ar) => ar.indexOf(item) === i)
            .map((masterUsername) =>
              requests2.push(
                axios('/api/Rank', {
                  params: {
                    username: masterUsername,
                  },
                }),
              ),
            );

          Promise.all(requests2)
            .then((masterRankRes) => {
              const formatMasterRanks = masterRankRes
                .map((rankRes) =>
                  rankRes.data.map((rank) =>
                    _.mapKeys(rank.fields, (v, k) => _.camelCase(k)),
                  ),
                )
                .filter((masterRanks) => masterRanks.length > 0);
              setRanks(
                formatedRes.map((rank) => {
                  const masterRanks = formatMasterRanks.find(
                    (masterRank) =>
                      masterRank[0].usernameFromAllProfiles[0] ===
                      rank.master?.username,
                  );

                  return masterRanks
                    ? { ...rank, masterRanks }
                    : { ...rank, masterRanks: [] };
                }),
              );
              setLoading(false);
            })
            .catch((e) => {
              console.log(e);
            });
        }),
      );

      Promise.all(requests);
    }
  }, [username]);

  const handleConfirmModal: () => void = () => {
    setIsModalConfVisible(!isModalConfVisible);
  };

  const onRemoveRank: (recId: string) => void = (recId) => {
    setisDeleteLoading(true);
    axios
      .delete('/api/Rank', {
        params: {
          id: recId,
        },
      })
      .then(() => {
        setisDeleteLoading(false);
        push(`/${username}`);
      })
      .catch((e) => {
        setisDeleteLoading(false);
        console.log(e);
      });
  };

  if (isLoading) {
    return <ProfileTabLoading />;
  }

  if (ranks?.length === 0) {
    return (
      <>
        <ProfileTabEmptyMessage value="There is no ranks to show" />
        {isAuthUser && !isLoading && (
          <AddRankContiner>
            <Button
              sx={addRankButtonStyles}
              variant="contained"
              onClick={() => {
                push(`/${profile?.username}/add-rank`);
              }}
              startIcon={<AddIcon src="/assets/icons/plus-icon.svg" />}
            >
              Add New Rank
            </Button>
          </AddRankContiner>
        )}
      </>
    );
  }

  const handleModal: () => void = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <Container>
        {orderRanks(ranks)?.map((el) => (
          <RankCard
            key={el.id}
            data={el}
            onClick={() => {
              handleModal();
              setClickedRank(el);
            }}
          />
        ))}
        <ModalOverlay
          open={isModalVisible && !isModalConfVisible}
          title={clickedRank?.levelFromMartialArtsRanks?.[0]}
          color="#282828"
          onCloseClick={handleModal}
          height="cal( 100% - 50px )"
        >
          <RankDetailsModal
            handleModal={handleModal}
            rankData={clickedRank}
            handleConfirmModal={handleConfirmModal}
          />
        </ModalOverlay>
        <ActionConfirmationModal
          msg={RemoveRankFromProfile}
          title={RemoveRank}
          onCloseClick={handleConfirmModal}
          open={isModalConfVisible}
          onConfirm={() => onRemoveRank(clickedRank?.recordId)}
          onCancel={handleConfirmModal}
          loading={isDeleteLoading}
        />
        {isAuthUser && !isLoading && (
          <AddRankContiner>
            <Button
              sx={addRankButtonStyles}
              variant="contained"
              onClick={() => {
                push(`/${profile?.username}/add-rank`);
              }}
              startIcon={<AddIcon src="/assets/icons/plus-icon.svg" />}
            >
              Add New Rank
            </Button>
          </AddRankContiner>
        )}
      </Container>
    </>
  );
};
