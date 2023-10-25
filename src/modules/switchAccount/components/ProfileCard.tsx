import React from 'react';
import router from 'next/router';
import { TextWhite14CapitalizeThin } from '../../../shared/components/texts';
import { User } from '../../../shared/models/user.model';
import {
  Icon,
  ProBadge,
  ProfileContainer,
  SwitchButton,
  SwitchButtonPlaceHolder,
  TextWhite12Uppercase600,
  ButtonWrapper,
  CancelButton,
} from '../../Settings/components/settings.styled';
import useFirebaseAuth from '../../../hooks/useFirebaseAuth';
import UserAvatar from '../../userAvatar';

type ProfileCardProps = {
  profile?: User;
  isNewUser?: boolean;
  handleRefresh?: () => void;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  isNewUser,
  handleRefresh,
}) => {
  const nickName = profile?.nickname ? `"${profile?.nickname}"` : '';
  const name = `${profile?.firstName || ''} ${nickName} ${
    profile?.lastName || 'New Profile'
  }`;

  const isPro = false;

  const { authUser, signOut } = useFirebaseAuth();

  const isAuthUser = authUser?.email === profile?.email;

  const buttonIcon = isNewUser
    ? '/assets/icons/plus-icon.svg'
    : '/assets/icons/switch.svg';

  const switchAccount: () => void = () => {
    signOut();
    if (!isNewUser) {
      router.push(`${window.location.origin}/login?email=${profile.email}`);
    } else {
      router.push('/login');
    }
  };

  const deleteEmail = (email: string): void => {
    const existingEntries = JSON.parse(localStorage.getItem('emails'));
    existingEntries.splice(existingEntries.indexOf(email), 1);
    localStorage.setItem('emails', JSON.stringify(existingEntries));
    handleRefresh();
  };

  return (
    <ProfileContainer
      {...(isNewUser && {
        style: { backgroundColor: '#111111', border: '1px solid #333333' },
      })}>
      <UserAvatar
        avatarDimension={96}
        beltHeight={14}
        username={profile?.username}
      />

      <TextWhite14CapitalizeThin
        style={{
          textAlign: 'center',
          color: isNewUser ? '#828282' : '#BDBDBD',
        }}>
        {name}
      </TextWhite14CapitalizeThin>
      {isPro ? <ProBadge>Pro</ProBadge> : undefined}
      {isAuthUser ? (
        <SwitchButtonPlaceHolder />
      ) : (
        <ButtonWrapper>
          {!isNewUser && (
            <CancelButton onClick={() => deleteEmail(profile?.email)}>
              <Icon src="/assets/icons/close.svg" />
            </CancelButton>
          )}

          <SwitchButton isNew={isNewUser} onClick={switchAccount}>
            <Icon src={buttonIcon} />
            <TextWhite12Uppercase600>
              {isNewUser ? 'Add' : 'Switch'}
            </TextWhite12Uppercase600>
          </SwitchButton>
        </ButtonWrapper>
      )}
    </ProfileContainer>
  );
};

export default ProfileCard;
