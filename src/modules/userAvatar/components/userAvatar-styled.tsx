import styled from 'styled-components';

export const UserAvatarWrapper = styled.div<{
  avatarDimension: number;
}>`
  position: relative;
  height: ${({ avatarDimension }) => `${avatarDimension}px`};
  width: ${({ avatarDimension }) => `${avatarDimension}px`};
`;

export const Avatar = styled.img<{
  avatarDimension: number;
}>`
  object-fit: cover;
  height: ${({ avatarDimension }) => `${avatarDimension}px`};
  width: ${({ avatarDimension }) => `${avatarDimension}px`};
  position: relative;
  cursor: pointer;
`;

export const Belt = styled.img<{
  avatarDimension: number;
  beltHeight: number;
}>`
  position: absolute;
  background-color: #484848;
  align-content: flex-end;
  width: ${({ avatarDimension }) => `${avatarDimension}px`};
  height: ${({ beltHeight }) => `${beltHeight}px`};
  top: ${({ avatarDimension, beltHeight }) =>
    `${avatarDimension - beltHeight}px`};
  left: 0px;
`;
