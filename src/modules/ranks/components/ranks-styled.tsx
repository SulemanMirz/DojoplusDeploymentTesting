import styled from 'styled-components';

export const RankContainer = styled.div`
  background-color: #333435;
  margin: 0.5rem;
  padding-bottom: 1rem;
  width: calc(50% - 1rem);
  -webkit-box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  @media screen and (max-width: 600px) {
    width: calc(100% - 0.5rem);
  }
`;

export const DateAndVerification = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;
export const VerificationBox = styled.div`
  border-radius: 12px;
  background-color: rgb(40, 40, 40);
  text-align: center;
  vertical-align: middle;
  height: 24px;
`;
export const ProfileCardVerification = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  margin: 0px;
`;
export const ContainerCategory = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin: 15px 0px 15px;
  padding: 0px 16px;
`;
export const BeltImage = styled.img`
  width: 100%;
  box-shadow: 0 -3px 0 rgba(34, 34, 34, 0.35);
  cursor: pointer;
`;
export const NoBelt = styled.div`
  margin: 0px;
  width: 100%;
  height: 24px;
  padding: 0px;
  opacity: 0.05;
  background-color: gray;
`;
export const ContainerSchoolMaster = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  min-height: 48px;
  max-height: fit content;
  padding: 0px 16px 5px;
  margin-top: 16px;
`;
export const BeltImgCont = styled.div``;
export const MasterImage = styled.img`
  object-fit: cover;
  height: 48px;
  width: 48px;
  position: absolute;
`;
export const MasterBelt = styled.img`
  background-color: #484848;
  align-content: flex-end;
  max-width: 48px;
  height: 7px;
  position: relative;
  top: 31px;
  left: 0px;
`;
export const NamesSchoolMaster = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 6px 0 6px;
`;
export const ContainerImgText = styled.div`
  display: flex;
`;
export const SchoolLogo = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  box-sizing: border-box;
`;

/* Ranks Modal Styled Components start */

export const FixedContainer = styled.div`
  width: 100%;
  background-color: #111111;
  position: fixed;
  top: 0px;
  z-index: 10;
  height: 50px;
`;

export const CertificateImageContainer = styled.div`
  padding-inline: 16px;
  margin-top: 19px;
`;
export const CredentialWrapper = styled.div`
  margin: 12px 33px 0px 0px;
`;
export const ListItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CertificateImagePlaceholder = styled.div`
  display: flex;
  /* width: 96%; */
  height: 240px;
  left: 16px;
  top: 18px;
  background: #333333;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;
`;

export const VerificationBoxModal = styled.div`
  border-radius: 12px;
  background-color: rgb(40, 40, 40);
  text-align: center;
  vertical-align: middle;
  position: absolute;
  width: 114px;
  right: 16px;
  top: 16px;
  z-index: 2;
`;

export const CertificateWrapper = styled.div`
  position: relative;
  margin-top: 18px;
  margin-bottom: 5.61px;
`;

export const VerifiedContainer = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 0px 4px 0px;
  background: #282828;
  border-radius: 50px;
`;

export const CertificateImageWrapper = styled.div`
  min-height: 548px;
  @media screen and (max-width: 600px) {
    min-height: 242px;
  }
  @media (min-width: 900px) and (max-width: 1024px) {
    min-height: 350px;
  }
`;

export const CertificateImage = styled.img`
  width: 100%;
`;

export const TextContainer = styled.div`
  margin-top: 12px;
  padding-left: 33px;
  display: flex;
  flex-direction: column;
`;

export const ImageAndTextContainer = styled.div`
  margin-block: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
`;

export const PromotedByImage = styled.img`
  object-fit: cover;
  height: 48px;
  width: 48px;
  margin-right: -25px;
  margin-left: 33px;
  margin-top: 7px;
`;

export const SchoolImage = styled.img`
  box-sizing: border-box;
  height: 48px;
  width: 48px;
  border-radius: 24px;
  margin-right: -25px;
  margin-left: 33px;
  margin-top: 7px;
`;

export const MasterBeltModal = styled.img`
  background-color: #484848;
  margin-left: -23px;
  margin-right: -25px;
  max-width: 48px;
  height: 7px;
  position: relative;
`;

export const ImagesRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 1rem;
  flex-wrap: nowrap;
  overflow-x: scroll;
  padding: 0px 15px 0.5rem 22px;
  margin-top: 4px;
`;

export const MorePosterImg = styled.img`
  width: 160px;
  min-height: 100%;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px 4px 4px 4px;
  margin-inline: 4px;
`;

export const MorePosterImgPlaceholder = styled.div`
  width: 160px;
  height: 120px;
  border-radius: 4px 4px 4px 4px;
  margin-inline: 4px;
  margin-top: 7px;
  margin-left: 10px;
`;

export const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 74px;
  padding: 12px;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin-bottom: 36px;
  background-color: '#282828';
`;

export const Button = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 8px;
  margin-inline: 5px;
  border: 1px solid #4f4f4f;
  height: 56px;
  width: 144px;
  cursor: pointer;
`;

export const ButtonAlone = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 8px;
  width: 308px;
  height: 56px;
  border: 1px solid #4f4f4f;
`;

export const Icon = styled.img`
  height: 20px;
  width: 20px;
`;

export const UploadImageInput = styled.input`
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  top: 0px;
`;

export const UploadImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 166px;
  height: 40px;
  border: 1px solid #4f4f4f;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
`;

export const MasterImageContainer = styled.div`
  box-sizing: border-box;
  height: 48px;
  width: 48px;
  border-radius: 24px;
  margin-left: 33px;
  margin-top: 7px;
`;

/* Ranks Modal Styled Components end */
