import styled from 'styled-components';

export const Container = styled('div')({
  width: '100%',
  height: '100%',
  position: 'relative',
  // paddingTop: 15,
  display: 'flex',
  flexDirection: 'column',
});

export const MessageDiv = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  marginRight: 15,
});

export const ProfileButtons = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 10,
  marginTop: 3,
});

export const ProfileRowButtons = styled('div')({
  backgroundColor: 'yellow',
  display: 'flex',
});
