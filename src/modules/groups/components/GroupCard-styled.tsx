import Avatar from '@mui/material/Avatar';
import styled from 'styled-components';
import LockIcon from '@mui/icons-material/Lock';

export const Container = styled.div`
  max-width: 450px;
  width: 100%;
  height: 350px;
  border-radius: 5px;
  overflow: hidden;
  margin-block: 1rem;
  -webkit-box-shadow: 0px 4px 30px 1px #000000;
  box-shadow: 0px 4px 30px 1px #000000;
  position: relative;
`;
export const BannerContainer = styled.div`
  height: 50%;
  position: relative;
`;
export const Banner = styled.img`
  width: 100%;
`;
export const Content = styled.div`
  height: 160px;
  width: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding-bottom: 0px;
  bottom: 0;
  position: absolute;
  padding-top: 45px;
`;
export const DescriptionIcon = styled(LockIcon)`
  font-size: 14px !important;
  margin-right: 4px;
  color: #8c8c8c;
`;
export const CardAvatar = styled(Avatar)`
  width: 100px !important;
  height: 100px !important;
  position: absolute !important;
  top: -35%;
`;
