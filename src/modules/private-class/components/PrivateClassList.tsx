import React, { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemMUI from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { PrivateClassDivider } from './PrivateClassDivider';

const ListItem = styled(ListItemMUI)(({ theme }) => ({
  backgroundColor: theme.palette.backgroundLightGray.main,
  cursor: 'pointer',
}));

const ArrowFowardIcon = styled(ArrowForwardIosIcon)({
  color: '#FCFCFC',
  fontSize: 14,
});

const Check = styled(CheckIcon)({
  color: '#FCFCFC',
  fontSize: 14,
});

type PrivateClassItemProps = {
  onSelect: (value: number) => void;
  index: number;
  current?: number;
  src?: string;
  name: string;
  location?: string;
  id: string;
  avatarReq?: boolean;
};

export const PrivateClassItem: React.FC<PrivateClassItemProps> = ({
  index,
  onSelect,
  current,
  name,
  location,
  id,
  src,
  avatarReq = true,
}) => {
  const onSelectItem = useCallback(() => {
    onSelect(index);
  }, [onSelect, index]);

  return (
    <>
      <ListItem
        dense
        key={id}
        onClick={onSelectItem}
        secondaryAction={current === index ? <Check /> : <ArrowFowardIcon />}>
        {avatarReq ? (
          <ListItemAvatar sx={{ paddingY: 2 }}>
            <Avatar
              sx={{ width: 70, height: 70, marginRight: 2 }}
              alt={name}
              src={src || '/assets/logo/dojo.png'}
            />
          </ListItemAvatar>
        ) : null}
        <ListItemText
          primaryTypographyProps={{ variant: 'h6' }}
          primary={name}
          secondary={location}
        />
      </ListItem>
      <PrivateClassDivider variant="inset" />
    </>
  );
};

type PrivateClassListProps = {
  children: React.ReactNode;
};

export const PrivateClassList: React.FC<PrivateClassListProps> = ({
  children,
}): JSX.Element => (
  <List dense sx={{ bgcolor: 'background.primary' }}>
    {children}
  </List>
);
