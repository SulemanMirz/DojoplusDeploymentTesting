import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import { styled as styledMUI } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import CheckIcon from '@mui/icons-material/Check';
import { StepContainer } from '../components/StepContainer';
import { StepTitle } from '../components/StepTitle';

const List = styled.ul`
  padding-left: 32px;
  overflow-x: scroll;
  height: calc(100vh - 385px);
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ListItemText = styled.p`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 120%;
  color: #bdbdbd;
  margin: 0px;
  padding-block: 6px;
`;

const LoadingWrapper = styled.div`
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
  data: any;
  setSelected: (value: any) => void;
  selected: any;
  style?: React.CSSProperties;
  isLoading?: boolean;
};

const Step1: React.FC<StepProps> = ({
  data,
  setSelected,
  selected,
  style,
  isLoading,
}): JSX.Element => {
  const martialArts = data?.sort((a, b) =>
    a.martialArt.localeCompare(b.martialArt),
  );

  const { t } = useTranslation();
  const ChooseYourPath = t('ChooseYourPath');

  return (
    <StepContainer>
      <StepTitle
        style={{
          ...style,
        }}
        title={ChooseYourPath}
      />
      {isLoading ? (
        <LoadingWrapper>
          <CircularProgress size={20} />
        </LoadingWrapper>
      ) : (
        <List>
          {martialArts?.map((val) => {
            const mSelected = selected?.martialArt === val.martialArt;
            return (
              <ListItem
                key={val.id}
                onClick={() => {
                  setSelected(val);
                }}
              >
                <ListItemText
                  style={{
                    color: mSelected ? '#FCFCFC' : undefined,
                  }}
                >
                  {val.martialArt}
                </ListItemText>
                {mSelected ? <Check /> : ''}
              </ListItem>
            );
          })}
        </List>
      )}
    </StepContainer>
  );
};

export default Step1;
