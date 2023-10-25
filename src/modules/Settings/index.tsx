import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';

import styled from 'styled-components';
import router from 'next/router';
import {
  AccordionDetails,
  Alert,
  CircularProgress,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { PrivateClassDivider } from './components/SettingsDivider';

import { SettingsItem } from './components/SettingsList';
import { PrivateClassList } from '../private-class/components/PrivateClassList';
import { StepContainer } from './components/StepContainer';
import { User } from '../../shared/models/user.model';
import { SettingsLayout } from './components/SettingsLayout';
import OutlineButton from './components/OutlinedButton';
import { useFireBaseAuth } from '../../context/FirebaseContext';
import UserAvatar from '../userAvatar';
import SocialSiteModal from '../social-modal/SocialSiteModal';
import CloudinaryService from '../../../services/CloudinaryService';
import { AirtableImage } from '../../shared/models/AirtableImage';
import { setUserPhoto } from '../../redux/slices/avatarSlice';
import { useAppDispatch } from '../../redux/hooks';
import { AllLinksList } from './components/AllLinksList';
import { RefType, Toastify } from '../../shared/components/Tosatify';

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
  align-items: flex-start;
  justify-content: space-between;
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

type StepProps = {
  initialData: { profile: User };
};

const AuthErrorMessages = {
  default: 'Something went wrong',
};

const Settings: React.FC<StepProps> = ({ initialData }): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message] = useState('Field Updated SuccessFully');
  const [profileData, setProfileData] = useState<User>(initialData?.profile);
  const [errorMessage] = useState('Could not Update field');
  const successAlert = useRef<RefType>(null);
  const errorAlert = useRef<RefType>(null);
  const { t } = useTranslation();
  const SwitchAccount = t('SwitchAccount');
  const UpdatePhoto = t('updatePhoto');
  const UpdateRank = t('updateRank');
  const Activity = t('activity');
  const Membership = t('membership');
  const Memberships = t('memberships');
  const ProfileAndRanks = t('profileAndRanks');
  const PaymentMethods = t('paymentMethods');
  const LoginSecurity = t('loginSecurity');
  const Username = t('username');
  const Email = t('Email');
  const Phone = t('phone');
  const UpdatePassword = t('resetPassword');
  const SocialMedia = t('socialMedia');

  const textFacebook = t('facebook');
  const textYoutube = t('youtube');
  const textTwitter = t('twitter');
  const textInstagram = t('instagram');

  const Legal = t('legal');
  const Privacy = t('privacy');
  const TermsOfService = t('termsOfService');
  const Waive = t('waiver');
  const logout = t('logout');
  const otherProfile = t('OtherProfiles');

  const profile = profileData;
  const dispatch = useAppDispatch();

  const { signOut } = useFireBaseAuth();
  const [authError, setAuthError] = useState(null);
  const [isUploadLoading, setIsUploadLoading] = useState(false);

  const handleSignOut = async (): Promise<void> => {
    signOut()
      .then(() => {
        localStorage.removeItem('UserInfo');
        router.push('/login');
      })
      .catch(() => {
        setAuthError(AuthErrorMessages.default);
      });
  };

  const handleModal: () => void = () => {
    setIsModalVisible(!isModalVisible);
  };
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [belowTextLine, setBelowTextLine] = useState('');
  const uploadProfilePicture = async (url: AirtableImage[]): Promise<void> => {
    setIsUploadLoading(true);
    axios
      .put('/api/User', {
        data: {
          id: initialData.profile.recordId,
          fields: {
            Photo: [{ url: url?.[0]?.url }],
          },
        },
      })
      .then(() => {
        setIsUploadLoading(false);
        dispatch(
          setUserPhoto({
            username: initialData.profile.username,
            url,
          }),
        );
      })
      .catch((e) => {
        setIsUploadLoading(false);
        console.log(e, 'error');
      });
  };
  return (
    <SettingsLayout>
      <Toastify ref={successAlert} type="success" message={message} />
      <Toastify ref={errorAlert} type="error" message={errorMessage} />
      <StepContainer>
        <OutlineButton
          name={SwitchAccount}
          setSelected={() => {}}
          onClick={() => {
            router.push(`/${profile?.username}/settings/switchAccount`);
          }}
          Icon={
            <Svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
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
        <ContentOverDivider style={{ marginTop: 50 }}>
          {ProfileAndRanks}
        </ContentOverDivider>
        <PrivateClassDivider />
        <ContainerAvatar>
          <UserAvatar
            avatarDimension={96}
            beltHeight={14}
            username={profile?.username}
          />
          <AvatarInnerContainer>
            <OutlineButtonWrapper>
              {!isUploadLoading ? (
                <>
                  <OutlinedButtonContent>{UpdatePhoto}</OutlinedButtonContent>
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
            <OutlineButtonWrapper>
              <OutlinedButtonContent
                onClick={() => router.push(`/${profile.username}/add-rank`)}>
                {UpdateRank}
              </OutlinedButtonContent>
            </OutlineButtonWrapper>
          </AvatarInnerContainer>
        </ContainerAvatar>
        <PrivateClassDivider />
        <PrivateClassList>
          <SettingsItem
            onSelect={() => {
              router.push(`/${profile.username}/activity/week`);
            }}
            primaryText={Activity}
          />
        </PrivateClassList>
        <ContentOverDivider style={{ marginTop: 50 }}>
          {Membership}
        </ContentOverDivider>
        <PrivateClassDivider />
        <PrivateClassList>
          <SettingsItem onSelect={() => {}} primaryText={Memberships} />
        </PrivateClassList>
        <PrivateClassList>
          <SettingsItem onSelect={() => {}} primaryText={PaymentMethods} />
        </PrivateClassList>

        <ContentOverDivider style={{ marginTop: 50 }}>
          {LoginSecurity}
        </ContentOverDivider>
        <PrivateClassDivider />
        <SettingsItem
          onSelect={() => {}}
          primaryText={profile.username}
          secondaryText={Username}
        />
        <SettingsItem
          onSelect={() => {
            setLabel('Email');
            setBelowTextLine('Add Your new Email');
            setTitle('Email');
            handleModal();
          }}
          primaryText={profile.email}
          secondaryText={Email}
        />
        <SettingsItem
          onSelect={() => {
            setLabel('Phone Number');
            setBelowTextLine('Add Your Phone Number');
            setTitle('Phone');
            handleModal();
          }}
          primaryText={profile.phone}
          secondaryText={Phone}
        />
        <SettingsItem
          onSelect={() => {
            router.push(`/forgotPassword?email=${initialData.profile.email}`);
          }}
          primaryText={UpdatePassword}
        />

        <ContentOverDivider style={{ marginTop: 50 }}>
          {SocialMedia}
        </ContentOverDivider>
        <PrivateClassDivider />
        <SettingsItem
          onSelect={() => {
            setTitle('Instagram');
            setLabel('Instagram');
            setBelowTextLine('Add your Instagram username');
            handleModal();
          }}
          primaryText={textInstagram}
          iconSrc="/assets/icons/offWhiteInstagram.svg"
          socialText={profile.instagram}
        />
        <SettingsItem
          onSelect={() => {
            setTitle('Facebook');
            setLabel('FaceBook');
            setBelowTextLine('Add your FaceBook Id');
            handleModal();
          }}
          socialText={profile.facebook}
          primaryText={textFacebook}
          iconSrc="/assets/icons/offWhiteFacebook.svg"
        />

        <SettingsItem
          onSelect={() => {
            setTitle('YouTube');
            setLabel('Youtube');
            setBelowTextLine('Add your YouTube channelname');
            handleModal();
          }}
          socialText={profile.youTube}
          primaryText={textYoutube}
          iconSrc="/assets/icons/offWhiteYoutube.svg"
        />
        <SettingsItem
          onSelect={() => {
            setTitle('Twitter');
            setLabel('Twitter');
            setBelowTextLine('Add your Twitter username');
            handleModal();
          }}
          socialText={profile.twitter}
          primaryText={textTwitter}
          iconSrc="/assets/icons/offWhiteTwitter.svg"
        />
        <Accordion
          sx={{
            marginTop: '30px',
            backgroundColor: '#282828',
            boxShadow: 'none !important',
            '&:before': {
              display: 'none',
            },
          }}
          disableGutters>
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  color: '#828282',
                }}
              />
            }
            sx={{
              borderBottom: '1px solid #404040 !important',
              width: '100%',
              paddingRight: 3.5,
            }}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography
              sx={{
                color: '#828282 !important',
                fontSize: '14px !important',
                fontWeight: '600 !important',
                paddingLeft: '20px',
                textTransform: 'uppercase',
              }}>
              {otherProfile}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: '8px 36px 16px 16px !important',
            }}>
            <Typography>
              <AllLinksList
                onSelect={() => {
                  setTitle('BJJ Heroes');
                  setLabel('BJJ Heroes');
                  setBelowTextLine('Add your BJJ Heroes Link');
                  handleModal();
                }}
                socialText={profile.bjjHeroes}
                primaryText="BJJ Heroes"
              />
              <AllLinksList
                onSelect={() => {
                  setTitle('FloGrappling');
                  setLabel('FloGrappling');
                  setBelowTextLine('Add your FloGrappling link');
                  handleModal();
                }}
                socialText={profile.floGrappling}
                primaryText="FloGrappling"
              />
              <AllLinksList
                onSelect={() => {
                  setTitle('UFC');
                  setLabel('UFC');
                  setBelowTextLine('Add your UFC link');
                  handleModal();
                }}
                socialText={profile.ufc}
                primaryText="UFC"
              />
              <AllLinksList
                onSelect={() => {
                  setTitle('MMA Junkie');
                  setLabel('MMA Junkie');
                  setBelowTextLine('Add your MMA Junkie link');
                  handleModal();
                }}
                socialText={profile.mmaJunkie}
                primaryText="MMA Junkie"
              />
              <AllLinksList
                onSelect={() => {
                  setTitle('Sherdog');
                  setLabel('Sherdog');
                  setBelowTextLine('Add your Sherdog link');
                  handleModal();
                }}
                socialText={profile.sherdog}
                primaryText="Sherdog"
              />
              <AllLinksList
                onSelect={() => {
                  setTitle('Tapology');
                  setLabel('Tapology');
                  setBelowTextLine('Add your Tapology link');
                  handleModal();
                }}
                socialText={profile.tapology}
                primaryText="Tapology"
              />
              <AllLinksList
                onSelect={() => {
                  setTitle('BoxRec');
                  setLabel('BoxRec');
                  setBelowTextLine('Add your BoxRec link');
                  handleModal();
                }}
                socialText={profile.boxRec}
                primaryText="BoxRec"
              />
              <AllLinksList
                onSelect={() => {
                  setTitle('ESPN');
                  setLabel('ESPN');
                  setBelowTextLine('Add your ESPN link');
                  handleModal();
                }}
                socialText={profile.espn}
                primaryText="ESPN"
              />
              <AllLinksList
                onSelect={() => {
                  setTitle('Wikipedia');
                  setLabel('Wikipedia');
                  setBelowTextLine('Add your Wikipedia link');
                  handleModal();
                }}
                socialText={profile.wikipedia}
                primaryText="Wikipedia"
              />
              <AllLinksList
                onSelect={() => {
                  setTitle('IBJJF');
                  setLabel('IBJJF');
                  setBelowTextLine('Add your IBJJF link');
                  handleModal();
                }}
                socialText={profile.ibjjf}
                primaryText="IBJJF"
              />
              <AllLinksList
                onSelect={() => {
                  setTitle('BJJ Fanatics');
                  setLabel('BJJ Fanatics');
                  setBelowTextLine('Add your BJJ Fanatics link');
                  handleModal();
                }}
                socialText={profile.bjjFanatics}
                primaryText="BJJ Fanatics"
              />
              <AllLinksList
                onSelect={() => {
                  setTitle('Smoothcomp');
                  setLabel('Smoothcomp');
                  setBelowTextLine('Add your Smoothcomp link');
                  handleModal();
                }}
                socialText={profile.smoothcomp}
                primaryText="Smoothcomp"
              />
              <AllLinksList
                onSelect={() => {
                  setTitle('SouCompetidor');
                  setLabel('SouCompetidor');
                  setBelowTextLine('Add your SouCompetidor link');
                  handleModal();
                }}
                socialText={profile.souCompetidor}
                primaryText="SouCompetidor"
              />
              <AllLinksList
                onSelect={() => {
                  setTitle('BJJ Belt Checker');
                  setLabel('BJJ Belt Checker');
                  setBelowTextLine('Add your BJJ Belt Checker link');
                  handleModal();
                }}
                socialText={profile.bjjBeltChecker}
                primaryText="BJJ Belt Checker"
              />
              <AllLinksList
                onSelect={() => {
                  setTitle('AGF');
                  setLabel('AGF');
                  setBelowTextLine('Add your AGF link');
                  handleModal();
                }}
                socialText={profile.agf}
                primaryText="AGF"
              />
              <AllLinksList
                onSelect={() => {
                  setTitle('AJP Tour');
                  setLabel('AJP Tour');
                  setBelowTextLine('Add your AJP Tour link');
                  handleModal();
                }}
                socialText={profile.ajpTour}
                primaryText="ajpTour"
              />
              <AllLinksList
                onSelect={() => {
                  setTitle('Jiu Jitsu X');
                  setLabel('Jiu Jitsu X');
                  setBelowTextLine('Add your Jiu Jitsu X link');
                  handleModal();
                }}
                socialText={profile.jiuJitsuX}
                primaryText="Jiu Jitsu X"
              />
              <AllLinksList
                onSelect={() => {
                  setTitle('One Championship');
                  setLabel('One Championship');
                  setBelowTextLine('Add your One Championship link');
                  handleModal();
                }}
                socialText={profile.oneChampionship}
                primaryText="One Championship"
              />
              <AllLinksList
                onSelect={() => {
                  setTitle('Website');
                  setLabel('Website');
                  setBelowTextLine('Add your Website link');
                  handleModal();
                }}
                socialText={profile.website}
                primaryText="Website"
              />
            </Typography>
          </AccordionDetails>
        </Accordion>
        <ContentOverDivider style={{ marginTop: 50 }}>
          {Legal}
        </ContentOverDivider>
        <PrivateClassDivider />
        <SettingsItem onSelect={() => {}} primaryText={Privacy} />
        <SettingsItem onSelect={() => {}} primaryText={TermsOfService} />
        <SettingsItem onSelect={() => {}} primaryText={Waive} />
        <SignOutWrapper>
          <OutlineButtonWrapper
            onClick={handleSignOut}
            style={{ width: '100%' }}>
            <img src="/assets/icons/logout.svg" alt="logout" />
            <OutlinedButtonContent>{logout}</OutlinedButtonContent>
          </OutlineButtonWrapper>
        </SignOutWrapper>
        {authError && (
          <Alert variant="filled" severity="error" sx={{ mb: 2, mt: 2 }}>
            {authError}
          </Alert>
        )}
      </StepContainer>
      <SocialSiteModal
        title={title}
        label={label}
        belowTextLine={belowTextLine}
        onCancel={handleModal}
        open={isModalVisible}
        successAlert={successAlert.current}
        errorAlert={errorAlert.current}
        getProfileData={setProfileData}
      />
    </SettingsLayout>
  );
};

export default Settings;
