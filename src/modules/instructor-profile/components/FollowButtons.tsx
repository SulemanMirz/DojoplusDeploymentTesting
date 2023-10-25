import React from 'react';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';

import {
  IconButton,
  IconContainer,
  LinkWrapper,
} from './instructorProfile-styled';
import { buttonStyles } from '../../../shared/styles/Button-style';

type FollowData = {
  followed: boolean;
  isLoading: boolean;
  handleFollow: () => void;
};

const FollowButtons: React.FC<FollowData> = ({
  followed,
  isLoading,
  handleFollow,
}) => {
  return (
    <>
      {followed ? (
        <LinkWrapper>
          <IconContainer onClick={handleFollow}>
            {isLoading ? (
              <CircularProgress color="primary" size={20} />
            ) : (
              <IconButton src="/assets/icons/remove-person.svg" />
            )}
          </IconContainer>
        </LinkWrapper>
      ) : (
        <Button
          sx={buttonStyles}
          onClick={handleFollow}
          disabled={isLoading}
          variant="contained"
          startIcon={<IconButton src="/assets/icons/person-add.svg" />}
        >
          {isLoading ? (
            <CircularProgress color="primary" size={20} />
          ) : (
            'Follow'
          )}
        </Button>
      )}
    </>
  );
};

export default FollowButtons;
