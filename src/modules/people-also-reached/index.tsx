import { Skeleton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useOnScreen } from '../../shared/hooks/UseOnScreen';
import UserAvatar from '../userAvatar';

type PeopleAlsoReachedProps = {
  username?: string;
  beltHeight?: number;
  avatarDimension?: number;
  level: string;
  schoolName: string;
  setIsNotEmpty: (isEmpty: boolean) => void;
};

const PeopleAlsoReached: React.FC<PeopleAlsoReachedProps> = ({
  username,
  avatarDimension = 48,
  beltHeight = 7,
  level,
  schoolName,
  setIsNotEmpty,
}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const ref = useRef();
  const isVisible = useOnScreen(ref);

  useEffect(() => {
    if (isVisible && !data) {
      if (username) {
        axios('/api/Posts/ranks-reached', {
          params: {
            username,
            level,
            schoolName,
          },
        })
          .then((res) => {
            setData([...res.data]);
            setLoading(false);
            setIsNotEmpty(res.data.length > 0);
          })
          .catch((e) => {
            setLoading(false);
            console.log(e);
            setIsNotEmpty(false);
          });
      } else {
        setLoading(false);
      }
    }
  }, [data, isVisible, level, schoolName, setIsNotEmpty, username]);

  if (isLoading) {
    return (
      <div ref={ref} style={{ display: 'flex' }}>
        {[...new Array(6)].map(() => (
          <Skeleton
            variant="rectangular"
            width={avatarDimension}
            height={avatarDimension}
            style={{ marginRight: '8px' }}
          />
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex' }} ref={ref}>
      {data?.slice(0, 6)?.map((user, i) => {
        return (
          <div style={{ marginRight: '8px' }}>
            <UserAvatar
              key={user?.username?.[0]}
              username={user?.username?.[0]}
              avatarDimension={avatarDimension}
              beltHeight={beltHeight}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PeopleAlsoReached;
