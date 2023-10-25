import React from 'react';
import LinearProgressMUI from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const Container = styled('div')({
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
});

const Content = styled('div')({
  width: '100%',
  position: 'relative',
  margin: 'auto',
});

const ProgreesBar = styled('div')({
  margin: '0 auto',
});

const LinearProgress = styled(LinearProgressMUI)({
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#00D169',
  },
});

type ProgressBarProps = {
  step: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  step,
}): JSX.Element => {
  return (
    <Container>
      <Content>
        <ProgreesBar>
          <LinearProgress
            variant="determinate"
            value={step}
            sx={{ background: '#d9d9d9' }}
          />
        </ProgreesBar>
      </Content>
    </Container>
  );
};
