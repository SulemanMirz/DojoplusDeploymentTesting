import { Skeleton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const SkeletonContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  padding-inline: 10px;
`;
const AvatarContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 10px;
`;
const SkeletonRectangleContainer = styled.div``;

const HomeSkeleton: React.FC = () => {
  return (
    <SkeletonContainer>
      <AvatarContainer>
        <Skeleton variant="rectangular" width={48} height={48} />
        <DescriptionContainer>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        </DescriptionContainer>
      </AvatarContainer>
      <SkeletonRectangleContainer>
        <Skeleton
          sx={{ marginTop: '10px' }}
          variant="rectangular"
          height={290}
        />
      </SkeletonRectangleContainer>
      <Skeleton
        variant="text"
        sx={{ fontSize: '1rem', paddingBlock: '16px' }}
      />
    </SkeletonContainer>
  );
};

export default HomeSkeleton;
