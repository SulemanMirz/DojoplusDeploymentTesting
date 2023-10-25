import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, CircularProgress } from '@mui/material';
import { RankCard } from '../../ranks/components/RankCard';
import { ProfileTabEmptyMessage } from '../../../shared/components/ProfileTabEmptyMessage';
import { orderRanks } from '../../../shared/utils/ranks-utils';
import ModalOverlay from '../../modal-overlay';
import MoreRanks from './MoreRanks';
import { Rank } from '../../../shared/types/generated';
import { IRank } from '../../../shared/models/Rank.model';
import { Plans } from '../../../shared/models/school.model';

const RankContainer = styled.div``;

const SectionHeader = styled.div`
  margin-top: 30px;
  margin-bottom: 27px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SectionTitle = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: '#FFFF';
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  justify-content: center;
`;

type RanksSectionProps = {
  ranks?: Rank[] | IRank[];
  isRanksLoading?: boolean;
  studentData?: Plans;
  getRanks: () => void;
};

const RanksSection: React.FC<RanksSectionProps> = ({
  ranks = [],
  isRanksLoading,
  studentData,
  getRanks,
}) => {
  const [isRankModalVisible, setIsRankModalVisible] = useState(false);

  const handleRankModal = (): void => {
    return setIsRankModalVisible(!isRankModalVisible);
  };

  return (
    <>
      <RankContainer>
        <SectionHeader>
          <SectionTitle>Ranks</SectionTitle>
          {ranks?.length > 1 ? (
            <Button
              color="secondary"
              onClick={() => handleRankModal()}
              sx={{
                width: '62px',
                height: '40px',
                backgroundColor: 'transparent',
                border: '1px solid #4F4F4F',
                fontSize: '12px',
                fontWeight: '600',
                color: '#FCFCFC',
              }}>
              MORE
            </Button>
          ) : null}
        </SectionHeader>
        {isRanksLoading ? (
          <LoadingWrapper style={{ marginBottom: 20 }}>
            <CircularProgress color="primary" size={20} />
          </LoadingWrapper>
        ) : (
          <>
            {ranks?.length !== 0 ? (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                }}>
                {orderRanks(ranks as IRank[])
                  .slice(0, 1)
                  .map((rankData) => {
                    return (
                      <RankCard
                        rankCardStyle={{ width: '100%' }}
                        data={rankData}
                      />
                    );
                  })}
              </div>
            ) : (
              !isRanksLoading && (
                <ProfileTabEmptyMessage value="There is No CheckIns Available" />
              )
            )}
          </>
        )}
      </RankContainer>
      <ModalOverlay
        open={isRankModalVisible}
        title="More Ranks"
        height="100%"
        onCloseClick={handleRankModal}>
        <MoreRanks
          ranks={ranks}
          studentData={studentData}
          getRanks={getRanks}
        />
      </ModalOverlay>
    </>
  );
};

export default RanksSection;
