import { Avatar, CircularProgress } from '@mui/material';
import axios from 'axios';
import router from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import CloudinaryService from '../../../../services/CloudinaryService';
import { useFireBaseAuth } from '../../../context/FirebaseContext';
import { AirtableImage } from '../../../shared/models/AirtableImage';
import AuthGuard from '../../auth/AuthGuard';
import HeaderDojo from '../../headers/HeaderDojo';
import OutlineButton from '../../Settings/components/OutlinedButton';
import { PrivateClassDivider } from '../../Settings/components/SettingsDivider';
import { SettingsLayout } from '../../Settings/components/SettingsLayout';
import { SettingsItem } from '../../Settings/components/SettingsList';
import SocialSiteModal from '../../social-modal/SocialSiteModal';
import { StepContainer } from '../../Settings/components/StepContainer';

const Container = styled.div`
  margin-top: 100px;
  margin-bottom: 50px;
`;
const ArrowBackIcon = styled.img``;
export const UserImage = styled.img`
  object-fit: cover;
  height: 96px;
  width: 96px;
  position: absolute;
`;

export const UserBelt = styled.img`
  background-color: #484848;
  align-content: flex-end;
  max-width: 96px;
  height: 14px;
  position: relative;
  top: 78px;
  left: 0px;
`;

export const ContainerAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 96px;
  max-height: fit content;
  padding: 0px 16px 20px;
  margin-top: 16px;
`;

export const AvatarInnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 6px 0 6px;
`;

const Svg = styled.svg`
  height: 18px;
  width: 17px;
`;

const ContentOverDivider = styled.p`
  margin-top: 50px;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #828282;
  mix-blend-mode: normal;
  margin-bottom: 8px;
  margin-left: 36px;
  text-transform: uppercase;
`;
const OutlineButtonWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 22px;
  gap: 8px;
  border: 1px solid #4f4f4f;
  cursor: pointer;
  margin: 0px 8px 10px;
  width: fit-content;
  min-width: 148px;
  position: relative;
`;

const UploadImageInput = styled.input`
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  top: 0px;
  cursor: pointer;
`;

export const OutlinedButtonContent = styled.p`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fcfcfc;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px;
`;

const SignOutWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const AdminSideSchoolSetting: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [belowTextLine, setBelowTextLine] = useState('');
  const { schoolInfo, setSchoolInfo, authUser } = useFireBaseAuth();
  const [isUploadLoading, setIsUploadLoading] = useState(false);

  const DefaultAvatar = '/assets/logo/dojo.png';

  const handleSocialSiteModal: () => void = () => {
    setIsModalVisible(!isModalVisible);
  };

  const uploadProfilePicture = async (url: AirtableImage[]): Promise<void> => {
    setIsUploadLoading(true);
    axios
      .put('/api/Schools', {
        data: {
          id: schoolInfo?.recordId,
          fields: {
            'School Logo': [{ url: url?.[0]?.url }],
          },
        },
      })
      .then((data) => {
        setIsUploadLoading(false);
        const updateLogoInfo = data?.data[0];
        const currentTime = new Date();
        localStorage.setItem(
          'schoolInfo',
          JSON.stringify({ ...updateLogoInfo, currentTime }),
        );
        setSchoolInfo({ ...updateLogoInfo, currentTime });
      })
      .catch((e) => {
        setIsUploadLoading(false);
        console.log(e, 'error');
      });
  };

  return (
    <AuthGuard>
      <Container>
        <HeaderDojo
          title={schoolInfo?.schoolName}
          IconLeft={<ArrowBackIcon src="/assets/icons/back-arrow.svg" />}
          onIconLeftCLick={() => router.back()}
        />
        <SettingsLayout>
          <StepContainer>
            <OutlineButton
              name="Switch Account"
              setSelected={() => {}}
              onClick={() =>
                router.push(`/${authUser?.userInfo?.username}/ranks`)
              }
              Icon={
                <Svg
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.738 11.9142H11.6994L3.75655 2.64758H0.5V5.29519H2.53865L10.4815 14.5618H13.738V17.2094L19.0332 13.238L13.738 9.26659V11.9142Z"
                    fill="#FCFCFC"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.6993 5.29521H13.7379V7.94281L19.0331 3.9714L13.7379 0V2.6476H10.4814L8.427 5.04527L10.1703 7.07979L11.6993 5.29521Z"
                    fill="#FCFCFC"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.53865 11.9142H0.5V14.5618H3.75655L5.81092 12.1642L4.06763 10.1296L2.53865 11.9142Z"
                    fill="#FCFCFC"
                  />
                </Svg>
              }
            />
            <ContentOverDivider>SCHOOL LOGO</ContentOverDivider>
            <PrivateClassDivider />
            <ContainerAvatar>
              <Avatar
                sx={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '48px !important',
                }}
                src={
                  schoolInfo ? schoolInfo?.schoolLogo?.[0]?.url : DefaultAvatar
                }
              />
              <AvatarInnerContainer>
                <OutlineButtonWrapper>
                  {!isUploadLoading ? (
                    <>
                      <OutlinedButtonContent>Update Logo</OutlinedButtonContent>
                      <UploadImageInput
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          if (!e) {
                            return;
                          }
                          const urlArray = await CloudinaryService.upload(e);
                          uploadProfilePicture(urlArray);
                        }}
                      />
                    </>
                  ) : (
                    <CircularProgress color="primary" size={20} />
                  )}
                </OutlineButtonWrapper>
              </AvatarInnerContainer>
            </ContainerAvatar>
            <PrivateClassDivider />

            <ContentOverDivider>SCHOOL SETTINGS</ContentOverDivider>
            <PrivateClassDivider />
            <SettingsItem
              onSelect={() => {
                router.push('/admin/school/timetable');
              }}
              primaryText="Timetable"
            />
            <SettingsItem
              onSelect={() => {
                router.push('/admin/school/plans');
              }}
              primaryText="Plans"
            />
            <SettingsItem onSelect={() => {}} primaryText="Videos" />
            <SettingsItem onSelect={() => {}} primaryText="Achievements" />
            <SettingsItem
              onSelect={() => {
                router.push('/admin/school/leaderboard');
              }}
              primaryText="Leaderboard"
            />
            <SettingsItem
              onSelect={() => {
                router.push('/admin/school/settings/staff');
              }}
              primaryText="Staff"
            />
            <SettingsItem onSelect={() => {}} primaryText="Info" />

            <SettingsItem onSelect={() => {}} primaryText="Reports" />

            <ContentOverDivider>SOCIAL MEDIA</ContentOverDivider>
            <PrivateClassDivider />
            <SettingsItem
              onSelect={() => {
                setTitle('Instagram');
                setLabel('Instagram');
                setBelowTextLine('Add your Instagram username');
                handleSocialSiteModal();
              }}
              primaryText="Instagram"
              iconSrc="/assets/icons/offWhiteInstagram.svg"
            />
            <SettingsItem
              onSelect={() => {
                setTitle('Facebook');
                setLabel('Facebook');
                setBelowTextLine('Add your Facebook username');
                handleSocialSiteModal();
              }}
              primaryText="Facebook"
              iconSrc="/assets/icons/offWhiteFacebook.svg"
            />

            <SettingsItem
              onSelect={() => {
                setTitle('Youtube');
                setLabel('Youtube');
                setBelowTextLine('Add your Youtube username');
                handleSocialSiteModal();
              }}
              primaryText="YouTube"
              iconSrc="/assets/icons/offWhiteYoutube.svg"
            />
            <SettingsItem
              onSelect={() => {
                setTitle('Twitter');
                setLabel('Twitter');
                setBelowTextLine('Add your Twitter username');
                handleSocialSiteModal();
              }}
              primaryText="Twitter"
              iconSrc="/assets/icons/offWhiteTwitter.svg"
            />

            <ContentOverDivider>PREFERENCES</ContentOverDivider>
            <PrivateClassDivider />
            <SettingsItem
              onSelect={() => {}}
              primaryText="Notifications"
              switchButton
            />
            <SettingsItem
              onSelect={() => {}}
              primaryText="English"
              secondaryText="Language"
            />
            <ContentOverDivider>Legal</ContentOverDivider>
            <PrivateClassDivider />
            <SettingsItem onSelect={() => {}} primaryText="Privacy" />
            <SettingsItem onSelect={() => {}} primaryText="Terms of Service" />
            <SettingsItem onSelect={() => {}} primaryText="Waiver" />
            <SignOutWrapper>
              <OutlineButtonWrapper
                onClick={() =>
                  router.push(`/${authUser?.userInfo?.username}/ranks`)
                }
                style={{ width: '100%' }}
              >
                <img src="/assets/icons/logout.svg" alt="logout" />
                <OutlinedButtonContent>Logout</OutlinedButtonContent>
              </OutlineButtonWrapper>
            </SignOutWrapper>
          </StepContainer>
        </SettingsLayout>
      </Container>
      <SocialSiteModal
        title={title}
        label={label}
        belowTextLine={belowTextLine}
        onCancel={handleSocialSiteModal}
        open={isModalVisible}
      />
    </AuthGuard>
  );
};

export default AdminSideSchoolSetting;
