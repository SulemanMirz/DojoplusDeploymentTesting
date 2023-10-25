import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { styled as styledMUI } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { StepContainer } from '../components/StepContainer';
import { StepTitle } from '../components/StepTitle';

const List = styled.ul`
  padding-left: 0px;
  overflow-x: scroll;
  height: calc(100vh - 385px);
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const BeltImage = styled.img`
  width: 100%;
  margin: 10px 0px 10px -77px;
  height: 24px;
  box-shadow: 0 -3px 0 rgba(34, 34, 34, 0.35);
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Check = styledMUI(CheckIcon)({
  color: '#FCFCFC',
  fontSize: 14,
  marginLeft: '10px',
});

type StepProps = {
  setSelectedBelt: (value: any) => void;
  selected: any;
  selectedBelt: any;
  allBelts: any;
  setAllBelts: (belts: any) => void;
  style?: React.CSSProperties;
};

const Step2: React.FC<StepProps> = ({
  setSelectedBelt,
  selected,
  selectedBelt,
  allBelts,
  setAllBelts,
  style,
}): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const PickRank = t('PickRank');
  const AllRanksWillBeVerified = t('AllRanksWillBeVerified');

  useEffect(() => {
    setLoading(true);
    axios('/api/Rank', {
      params: {
        martialArts: selected.martialArt,
      },
    })
      .then((res) => {
        setLoading(false);
        const belts = res.data.filter(
          (e) => e?.rankImageBig && e?.rankImageBig[0],
        );
        setAllBelts(belts.sort((a, b) => a.order - b.order));
      })
      .catch((err) => {
        console.log(err, 'err');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StepContainer style={{ paddingLeft: '0px' }}>
      <StepTitle
        style={{
          ...style,
        }}
        title={PickRank}
        subTitle={AllRanksWillBeVerified}
      />
      {loading ? (
        <LoadingWrapper>
          <CircularProgress size={20} />
        </LoadingWrapper>
      ) : (
        <>
          {allBelts?.length && (
            <List>
              {allBelts.map((val) => (
                <ListItem
                  key={val.id}
                  onClick={() => {
                    setSelectedBelt(val);
                  }}
                >
                  <BeltImage key={val?.id} src={val?.rankImageBig?.[0].url} />
                  {val === selectedBelt ? <Check /> : ''}
                </ListItem>
              ))}
            </List>
          )}
        </>
      )}
    </StepContainer>
  );
};

export default Step2;
