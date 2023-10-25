import styled from 'styled-components';
import { COLOR_BACKGROUND_DARK_LIGHT } from '../../../shared/styles/colors';

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 240px;
  width: 160px;
  min-width: 160px;
  background: ${COLOR_BACKGROUND_DARK_LIGHT};
  padding: 16px;
  margin-left: 12px;
  border-radius: 4px;
`;

export const ProfileImage = styled.img`
  object-fit: cover;
  height: 96px;
  width: 96px;
`;

export const BeltImgCont = styled.div`
  display: flex;
  position: relative;
`;

export const UserBelt = styled.img`
  background-color: #484848;
  max-width: 96px;
  height: 14px;
  position: absolute;
  bottom: 0px;
`;

export const ProBadge = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px;
  width: 25px;
  height: 18px;
  background: #4f4f4f;
  border-radius: 4px;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 8px;
`;

export const SwitchButton = styled.div<{ isNew }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 8px;
  margin-inline: 5px;
  border: 1px solid #4f4f4f;
  height: 40px;
  width: ${({ isNew }) => (!isNew ? '94px' : '128px')};
  cursor: pointer;
`;

export const SwitchButtonPlaceHolder = styled.div`
  height: 40px;
  width: 128px;
`;

export const Icon = styled.img`
  height: 16px;
  width: 16px;
`;

export const TextWhite12Uppercase600 = styled.span`
  width: 51px;
  height: 16px;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fcfcfc;
`;

export const ButtonWrapper = styled.div`
  display: flex;
`;

export const CancelButton = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 8px;
  margin-inline: 5px;
  border: 1px solid #4f4f4f;
  height: 40px;
  width: 34px;
  cursor: pointer;
`;

export const BackArrowIcon = styled.img``;
