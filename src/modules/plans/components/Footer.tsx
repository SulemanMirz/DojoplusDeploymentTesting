import * as React from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding-bottom: calc(30% - 5px);
`;

const Content = styled(Box)`
  width: 100%;
  position: relative;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: auto;
  margin-right: auto;
  padding-top: 0;
  padding-bottom: 0;
  display: flex;
  align-items: center;
`;

type FooterProps = {
  step: number;
  selected: number;
  setStep: (number: number) => void;
};

const Footer: React.FC<FooterProps> = ({
  step,
  setStep,
  selected,
}): JSX.Element => {
  return (
    <Container>
      <Content>
        {step > 1 && (
          <Button
            sx={{ height: '4em' }}
            color="secondary"
            variant="contained"
            fullWidth
            onClick={() => setStep(step > 1 ? step - 1 : 1)}
          >
            Back
          </Button>
        )}
        <Button
          fullWidth
          sx={{ height: '4em' }}
          color="primary"
          variant="contained"
          onClick={() => setStep(step + 1)}
          disabled={!selected}
        >
          Next
        </Button>
      </Content>
    </Container>
  );
};

export default Footer;
