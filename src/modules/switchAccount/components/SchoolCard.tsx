import React from 'react';
import router from 'next/router';
import { TextWhite14CapitalizeThin } from '../../../shared/components/texts';
import { School } from '../../../shared/models/school.model';
import {
  Icon,
  ProfileContainer,
  ProfileImage,
  SwitchButton,
  TextWhite12Uppercase600,
} from '../../Settings/components/settings.styled';
import { BeltImgCont } from '../../ranks/components/ranks-styled';

type ProfileCardProps = {
  school?: School;
  isNewSchool?: boolean;
  onSwitch?: (school: School) => void;
};

const SchoolCard: React.FC<ProfileCardProps> = ({
  school,
  isNewSchool,
  onSwitch,
}) => {
  const name = school?.schoolName || 'New School';

  const profileImage = school?.schoolLogo ? school?.schoolLogo[0]?.url : '';

  const switchAccount: (school) => void = () => {
    router.push('/admin/school/settings');
  };

  const buttonIcon = isNewSchool
    ? '/assets/icons/plus-icon.svg'
    : '/assets/icons/switch.svg';

  const DefaultAvatar = '/assets/fallback_images/DefaultSchoolGrey.svg';

  return (
    <ProfileContainer
      {...(isNewSchool && {
        style: { backgroundColor: '#111111', border: '1px solid #333333' },
      })}
    >
      <BeltImgCont>
        <ProfileImage
          style={{ borderRadius: '50%' }}
          src={profileImage || DefaultAvatar}
        />
      </BeltImgCont>
      <TextWhite14CapitalizeThin
        style={{
          textAlign: 'center',
          color: isNewSchool ? '#828282' : '#BDBDBD',
        }}
      >
        {name}
      </TextWhite14CapitalizeThin>
      <SwitchButton
        isNew={isNewSchool}
        onClick={() => {
          onSwitch(school);
          switchAccount(school);
        }}
      >
        <Icon src={buttonIcon} />
        <TextWhite12Uppercase600>
          {isNewSchool ? 'Add' : 'Switch'}
        </TextWhite12Uppercase600>
      </SwitchButton>
    </ProfileContainer>
  );
};

export default SchoolCard;
