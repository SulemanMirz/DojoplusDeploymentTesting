import React, { useState } from 'react';
import styled from 'styled-components';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, CircularProgress, Radio, RadioGroup } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #282828;
  height: 90px;
  width: 100%;
  justify-content: space-around;
  background-color: '#282828';
  position: absolute;
  bottom: 10px;
  left: 0;
`;

const Container = styled.div`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  padding-inline: 24px;
`;
const DayContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

type PaymentHistoryFilterModalProps = {
  onCloseClick: () => void;
  dataDay?:
    | {
        id: string;
        option: string;
      }[]
    | null
    | undefined;
  onSubmitData?: (id: string) => void;
  selectedId?: string;
};

const PaymentHistoryFilterModal: React.FC<PaymentHistoryFilterModalProps> = ({
  onCloseClick,
  dataDay,
  onSubmitData,
  selectedId,
}) => {
  const [isLoading] = useState(false);
  const [activeId, setActiveId] = useState(selectedId);

  const handleClick = (id): void => {
    setActiveId(id);
  };

  return (
    <Container>
      <FormControl
        sx={{
          width: '100%',
        }}
      >
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={activeId}
          defaultChecked
          name="radio-buttons-group"
        >
          {dataDay.map((data) => {
            return (
              <DayContainer onClick={() => handleClick(data.id)}>
                <FormControlLabel
                  sx={{
                    width: '100%',
                    justifyContent: 'space-between',
                    marginLeft: '0px !important',
                    marginRight: '0px !important',
                    height: '40px',
                    '& .MuiTypography-root': {
                      color:
                        data.id === activeId ? '#BDBDBD !important' : '#ffff',
                    },
                  }}
                  labelPlacement="start"
                  label={data.option}
                  value={activeId}
                  control={
                    <Radio
                      checked={activeId === data?.id}
                      sx={{
                        '& .MuiSvgIcon-root': {
                          fontSize: 16,
                          color:
                            data.id === activeId
                              ? '#BDBDBD !important'
                              : '#ffff',
                        },
                      }}
                    />
                  }
                />
              </DayContainer>
            );
          })}
        </RadioGroup>
      </FormControl>

      <BtnContainer>
        <Button
          onClick={() => {
            // onSubmitData('');
            onCloseClick();
          }}
          variant="contained"
          sx={{
            font: 'saira',
            backgroundColor: '#333333',
            width: '144px',
            height: '56px',
            fontSize: '16px',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#333333',
              color: '#fff',
            },
          }}
        >
          CLEAR ALL
        </Button>
        <LoadingButton
          loadingIndicator={<CircularProgress color="primary" size={20} />}
          type="submit"
          variant="contained"
          loading={isLoading}
          sx={{
            font: 'saira',
            width: '144px',
            height: '56px',
            fontSize: '16px',
            fontWeight: 600,
          }}
          onClick={() => {
            // onSubmitData(activeId);
            onCloseClick();
          }}
        >
          SHOW RESULTS
        </LoadingButton>
      </BtnContainer>
    </Container>
  );
};

export default PaymentHistoryFilterModal;
