import React from 'react';
import styled from 'styled-components';
import CheckInCard from './Components/CheckInCard';
import { CheckIns } from '../../../shared/models/CheckIns';

const Wrapper = styled.div`
  margin-top: 18px;
  max-height: calc(100vh - 10px);
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  margin-bottom: 90px;
  padding-inline: 16px;
  border-radius: 4px;
`;

const Container = styled.div``;

type MoreCheckInsProps = {
  studentCheckInsData?: CheckIns[];
};

const MoreCheckIns: React.FC<MoreCheckInsProps> = ({ studentCheckInsData }) => {
  return (
    <Container>
      <Wrapper>
        {studentCheckInsData?.map((data) => {
          return <CheckInCard checkInData={data} />;
        })}
      </Wrapper>
    </Container>
  );
};

export default MoreCheckIns;
