import { Button } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import { orderRanks } from '../../../shared/utils/ranks-utils';
import { RankCard } from '../../ranks/components/RankCard';
import { Rank } from '../../../shared/types/generated';
import { IRank } from '../../../shared/models/Rank.model';
import { addRankButtonStyles } from '../../../shared/styles/Button-style';
import { AddRank } from './Components/AddRank';
import ModalOverlay from '../../modal-overlay';
import { Plans } from '../../../shared/models/school.model';

const Wrapper = styled.div`
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  margin-top: 18px;
  padding-inline: 16px;
  border-radius: 4px;
  max-height: calc(100vh - 20px);
`;

const Container = styled.div``;

const AddIcon = styled.img`
  height: 24;
  width: 24;
`;

const AddRankContiner = styled.div`
  display: flex;
  justify-content: center;
  padding: 0px 8px 0px 8px;
  width: 100%;
  margin-bottom: 130px;
`;

type MoreRanksProps = {
  ranks?: Rank[] | IRank[];
  studentData?: Plans;
  getRanks: () => void;
};

const MoreRanks: React.FC<MoreRanksProps> = ({
  ranks,
  studentData,
  getRanks,
}) => {
  const [isOpenAddRank, setIsOpenAddRank] = useState(false);

  const handleAddRank = (): void => {
    setIsOpenAddRank(!isOpenAddRank);
  };

  return (
    <Container>
      <Wrapper>
        {orderRanks(ranks as IRank[])?.map((rankdata) => {
          return (
            <RankCard
              rankCardStyle={{ width: '100%', margin: '8px 0px 8px' }}
              data={rankdata}
            />
          );
        })}
        <AddRankContiner>
          <Button
            sx={addRankButtonStyles}
            variant="contained"
            onClick={handleAddRank}
            startIcon={<AddIcon src="/assets/icons/plus-icon.svg" />}
          >
            Add New Rank
          </Button>
        </AddRankContiner>
      </Wrapper>
      <ModalOverlay
        open={isOpenAddRank}
        onCloseClick={handleAddRank}
        height="100%"
        title="Add rank Modal"
      >
        <AddRank
          studentData={studentData}
          handleAddRank={handleAddRank}
          getRanks={getRanks}
        />
      </ModalOverlay>
    </Container>
  );
};

export default MoreRanks;
