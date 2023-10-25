import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { TextWhite14CapitalizeThin } from '../../../../shared/components/texts';
import {
  ProBadge,
  ProfileContainer,
  SwitchButton,
  TextWhite12Uppercase600,
  ButtonWrapper,
  Icon,
} from '../../../Settings/components/settings.styled';
import UserAvatar from '../../../userAvatar';

type MasterCardProps = {
  isNewUser?: boolean;
  avatarName?: string;
  firstName?: string;
  secondName?: string;
  handelRemoveModal?: () => void;
  deleteAtIndex?: () => void;
  displayName?;
  handleAddStaffModal?: () => void;
  addInstructor?: () => void;
  addManager?: () => void;
  title?: string;
};

const StaffCard: React.FC<MasterCardProps> = ({
  isNewUser,
  avatarName,
  handelRemoveModal,
  deleteAtIndex,
  displayName,
  handleAddStaffModal,
  addInstructor,
  addManager,
  title,
}) => {
  const isPro = false;

  return (
    <ProfileContainer
      {...(isNewUser && {
        style: { backgroundColor: '#111111', border: '1px solid #333333' },
      })}
    >
      <UserAvatar avatarDimension={96} beltHeight={14} username={avatarName} />

      <TextWhite14CapitalizeThin
        style={{
          textAlign: 'center',
          color: isNewUser ? '#828282' : '#BDBDBD',
        }}
      >
        {displayName}
      </TextWhite14CapitalizeThin>
      {isPro && <ProBadge>Pro</ProBadge>}

      {isNewUser && (
        <TextWhite14CapitalizeThin
          style={{
            textAlign: 'center',
            color: isNewUser ? '#828282' : '#BDBDBD',
          }}
        >
          {title || 'New Master'}
        </TextWhite14CapitalizeThin>
      )}

      <ButtonWrapper>
        <SwitchButton
          isNew={!isNewUser}
          onClick={() => {
            if (handelRemoveModal) {
              handelRemoveModal();
              deleteAtIndex();
            }
            if (handleAddStaffModal) {
              handleAddStaffModal();
              if (addInstructor) addInstructor();
            }
            if (handleAddStaffModal) {
              handleAddStaffModal();
              if (addManager) addManager();
            }
          }}
        >
          {!isNewUser ? (
            <ClearIcon />
          ) : (
            <Icon src="/assets/icons/plus-icon.svg" />
          )}
          <TextWhite12Uppercase600>
            {isNewUser ? 'Add' : 'REMOVE'}
          </TextWhite12Uppercase600>
        </SwitchButton>
      </ButtonWrapper>
    </ProfileContainer>
  );
};

export default StaffCard;
