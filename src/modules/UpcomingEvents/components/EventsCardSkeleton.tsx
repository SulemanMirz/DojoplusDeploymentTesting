import { Skeleton } from '@mui/lab';
import React from 'react';
import { CardContainer } from './events.styled';

const EventsCardSkeleton: React.FC = () => {
  return (
    <CardContainer>
      <Skeleton variant="rectangular" width="100%" height={196} />
      <Skeleton variant="rectangular" height={70} sx={{ marginTop: '10px' }} />
    </CardContainer>
  );
};

export default EventsCardSkeleton;
