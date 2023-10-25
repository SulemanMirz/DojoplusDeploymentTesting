import { Button } from '@mui/material';
import styled from 'styled-components';

export const Icon = styled.img`
  width: 164px;
  height: 28px;
  margin-left: 100px;
  @media screen and (max-width: 768px) {
    width: 100px;
    height: 14px;
    margin-left: 50px;
  }
`;
export const Icon2 = styled.img`
  margin-right: 100px;
  @media screen and (max-width: 768px) {
    margin-right: 40px;
  }
`;
export const AccountButton = styled(Button)`
  padding: 16px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  text-align: center;
  color: white;
  background: #333333 !important;
  border-radius: 4px !important;
  box-shadow: none !important;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    font-size: 7px !important;
    padding: 10px !important;
  }
  &:hover {
    background: #444444;
  }
`;

export const Icon3 = styled.img`
  margin-left: 100px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  @media screen and (max-width: 768px) {
    margin-left: 0px;
    width: 40px;
    height: 40px;
  }
`;

export const ContentSection = styled.div`
  min-height: 100vh;
  background-color: #282828;
  padding-top: 110px;
`;

export const GridContainer = styled.div`
  margin: 73px 90px 0px 56px;
  @media screen and (max-width: 768px) {
    margin: 18px 16px 0px 16px;
  }
`;

export const CertificateSection = styled.div`
  margin-right: 47px;
  @media screen and (max-width: 768px) {
    margin-right: 0px;
  }
`;
export const CertificateTitle = styled.div`
  font-family: Saira;
  font-size: 32px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0em;
  @media screen and (max-width: 768px) {
    font-size: 18px;
    line-height: 22px;
    width: 282px;
  }
`;

export const SocialIcon = styled.img`
  width: 16px;
  height: 16px;
  @media screen and (max-width: 768px) {
    width: 14px;
    height: 14px;
  }
`;

export const CertificateDetailIconId = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: '9px';
  align-items: center;
`;

export const VerifiedDetailIcon = styled.img`
  margin-right: 8px;
  @media screen and (max-width: 768px) {
    width: 24px;
    height: 24px;
  }
`;

export const VerifiedDetailId = styled.div`
  font-family: Saira;
  font-size: 18px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
  color: #4f4f4f;
  @media screen and (max-width: 768px) {
    font-size: 14px;
    line-height: 16px;
  }
`;

export const ShareTitle = styled.div`
  font-family: Saira;
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  margin-top: 36px;
  @media screen and (max-width: 768px) {
    font-family: Saira;
    font-size: 10px;
    line-height: 15px;
    margin-top: 24px;
  }
`;
export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #282828;
  margin-block: 100px;
`;
export const CertificateLink = styled.div`
  @media screen and (max-width: 728px) {
    width: 100%;
  }
  margin-top: 10px;
  height: 60px;
  background: linear-gradient(0deg, #3c3c3c, #3c3c3c),
    linear-gradient(0deg, #5e5e5e, #5e5e5e);
  border: 1px solid #5e5e5e;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    padding: 7px;
  }
`;
export const LinkCertificate = styled.div`
  color: gray;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 6px;
  font-size: 16px;
  @media screen and (max-width: 768px) {
    width: 250px;
    padding: 10px;
  }
`;
export const CopyIcon = styled.img`
  width: 24px;
  height: 24px;
  @media screen and (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;
export const ShareCertificate = styled.div``;

export const ButtonContainer = styled.div`
  margin-top: 42px;
  width: 64%;
  @media screen and (max-width: 1440px) {
    width: 83%;
  }
`;
export const ButtonContainerWrapper = styled.div`
  margin-top: 10px;
  align-items: center;
`;
export const FooterSection = styled.div`
  height: 116px;
  background-color: #111111;
  margin-top: 90px;
  display: flex;
  align-items: center;
  padding-inline: 40px;
  @media screen and (max-width: 768px) {
    margin-top: 50px;
    height: 65px;
    padding-inline: 0px;
  }
`;

export const CertificateIssueTitle = styled.div`
  margin-left: 24px;
  font-family: Saira;
  font-size: 12px;
  font-weight: 600;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
`;

export const CertificateDetailSection = styled.div`
  margin-left: 80px;
  @media screen and (max-width: 1024px) {
    margin: 0px;
  }
`;

export const ContentWrapper = styled.div`
  margin-top: 30px;
  @media screen and (max-width: 768px) {
    margin-top: 24px;
  }
`;

export const CertificateIdWrapper = styled.div`
  margin-top: 0px;
  @media screen and (max-width: 1024px) {
    margin-top: 24px;
  }
`;
export const ContentHeader = styled.div`
  font-family: Saira;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: #828282;
  @media screen and (max-width: 768px) {
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;
  }
`;
export const ContentDescription = styled.div`
  font-family: Saira;
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  margin-top: 8px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
  }
`;

export const AvatarContentWrapper = styled.div`
  margin-top: 32px;
  @media screen and (max-width: 768px) {
    margin-top: 24px;
  }
`;
export const AvatarContentContainer = styled.div`
  display: flex;
  margin-top: 8px;
  align-items: center;
`;
export const AvatarLogo = styled.img``;
export const MartialArtContainer = styled.div`
  margin-left: 16px;
`;
export const MartialArts = styled.div`
  font-family: Saira;
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
`;
export const MartialArtCredentails = styled.div`
  font-family: Saira;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  cursor: pointer;
`;

export const PhotoSection = styled.div`
  margin-top: 32px;
  @media screen and (max-width: 768px) {
    margin-top: 24px;
    margin-right: 0px;
  }
`;

export const MasterImage = styled.img`
  border-radius: 4px;
  width: 164px;
  height: 122px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  margin-right: 8px;
`;

export const ImageWrapper = styled.div`
  display: flex;
`;

export const CopyWrapper = styled.div`
  background-color: #333333;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
`;

export const CopyText = styled.div`
  font-family: Saira;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.08em;
  text-align: center;
  margin-left: 8px;
  @media screen and (max-width: 768px) {
    font-size: 8px;
    font-weight: 400;
    margin-left: 4px;
  }
`;

export const SocialText = styled.div`
  font-family: Saira;
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
`;

export const StyledButton = styled(Button)`
  && {
    border: 1px solid #333333 !important;
    background-color: #333333;
    border-radius: 4px;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: 600;
    padding: 10px 14px;
    color: #fcfcfc;
    margin-right: 6px;
    width: 128px;
    height: 40px;
    margin-bottom: 8px;
    @media (min-width: 768px) {
      font-size: 12px;
      padding: 12px 15px;
      height: 56px;
    }
    & .MuiButton-startIcon {
      margin-left: 0px !important;
    }
    &:hover {
      background-color: #4d4a4a;
    }
  }
`;

export const DownloadFile = styled.img`
  height: 24px;
  width: 24px;
  @media screen and (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;
