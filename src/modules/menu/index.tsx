import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ActionConfirmationModal from '../action-confimation-modal/ActionConfirmationModal';

const Container = styled.div``;

type MenuProps = {
  UserRemoveData?: () => void;
  options?: any;
  name?: string
};

const OptionMenu: React.FC<MenuProps> = ({ UserRemoveData, options, name }) => {
  const [menuItemData, setMenuItemData] = useState(null);
  const [popOver, setPopOver] = useState(null);
  const open = Boolean(menuItemData);
  const openPopOver = Boolean(popOver);

  const handleClick = (event): void => {
    setMenuItemData(event.currentTarget);
  };
  const handleClose = (): void => {
    setMenuItemData(null);
  };

  const handlePopOver = (event): void => {
    setPopOver(event.currentTarget);
  };

  const handleClosePopOver = (): void => {
    setPopOver(null);
  };

  return (
    <Container>
      <IconButton
        onClick={handleClick}
        sx={{
          color: 'white !important',
        }}
        aria-label="more"
        id="long-button"
        aria-haspopup="true"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: 'black',
          },
        }}
        anchorEl={menuItemData}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 75 * 2,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={(event) => {
              if (option === 'Remove') {
                handlePopOver(event);
                handleClose();
              }
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      <ActionConfirmationModal
        msg={`Remove "${name}" From Group?`}
        open={openPopOver}
        onCloseClick={handleClosePopOver}
        onCancel={handleClosePopOver}
        onConfirm={() => {
          UserRemoveData();
          handleClosePopOver();
        }}
      />
    </Container>
  );
};

export default OptionMenu;
