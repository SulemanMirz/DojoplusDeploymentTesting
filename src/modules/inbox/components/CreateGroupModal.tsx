import {
  Checkbox,
  Divider,
  FormGroup,
  FormControlLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import Fab from '@mui/material/Fab';
import DoneIcon from '@mui/icons-material/Done';
import SearchBar from '../../add-ranks/components/SearchBar';
import UserAvatar from '../../userAvatar';
import ActionConfirmationModal from '../../action-confimation-modal/ActionConfirmationModal';
import { ProfileTabEmptyMessage } from '../../../shared/components/ProfileTabEmptyMessage';

const Container = styled.div`
  overflow-x: scroll;
  @media screen and (min-width: 700px) {
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
const Title = styled.div`
  margin-top: 20px;
  padding-inline: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
`;
const CheckBoxContainer = styled.div``;
const AvatarWraper = styled.div`
  padding-inline: 8px;
  margin-right: 8px;
`;
const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Name = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
const PlaceHolder = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #bdbdbd;
`;

const OnSelectAvatar = styled.div`
  display: flex;
  position: sticky;
  top: -1;
  z-index: 2;
  background-color: #282828;
`;
const AvatarWrapper = styled.div`
  padding-left: 10px;
  margin: 20px 0px;
`;
const SearchContainer = styled.div`
  margin-top: 46px;
  margin-bottom: 20px;
`;

const FabContainer = styled.div`
  position: absolute;
  bottom: 25px;
  right: 32px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-block: 15px;
  position: relative;
  transition: all ease-in-out 1s;
`;

interface AddParticipantProps {
  onAddMember: (users) => void;
  handleModal: () => void;
  members: { username: string; email: string; uid: string; fullName: string }[];
}

const CreateGroupModal: React.FC<AddParticipantProps> = ({
  onAddMember,
  handleModal,
  members,
}) => {
  const [avatarCount, setAvatarCount] = useState([]);
  const [users, setUsers] = useState([]);
  const [popOver, setPopOver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handlePopOver = (event): void => {
    setPopOver(event.currentTarget);
  };

  const handleClosePopOver = (): void => {
    setPopOver(null);
  };

  const searchForUsers = (searchText: string): void => {
    setLoading(true);
    axios('/api/User/search', {
      params: {
        searchText,
      },
    })
      .then((res) => {
        setUsers(
          [...res.data]?.filter(
            (user) => !members.find((i) => i.username === user.username),
          ),
        );
      })
      .catch((err) => {
        console.log('Could not fetch Users', err);
      })
      .finally(() => setLoading(false));
  };

  const handleAdd = (): void => {
    onAddMember(selectedUsers);
    handleClosePopOver();
    handleModal();
  };

  return (
    <>
      <SearchContainer>
        <SearchBar
          fetch={(txt) => searchForUsers(txt)}
          style={{
            marginTop: '46px',
          }}
        />
      </SearchContainer>
      <Container>
        <OnSelectAvatar>
          {avatarCount.map((a) => {
            return (
              <>
                <AvatarWrapper>
                  <UserAvatar disableClick avatarDimension={30} username={a} />
                </AvatarWrapper>
              </>
            );
          })}
        </OnSelectAvatar>

        <Title>CONTACTS</Title>
        {loading && (
          <LoadingWrapper>
            <CircularProgress color="primary" size={20} />
          </LoadingWrapper>
        )}
        <FormControl
          sx={{ width: '100%' }}
          component="fieldset"
          variant="standard">
          <FormGroup>
            {users?.length
              ? users.map((ele) => (
                <Wrapper>
                  <CheckBoxContainer>
                    <FormControlLabel
                      label=""
                      value={ele.username}
                      onChange={(e, val) => {
                        const newUser = (e.target as HTMLInputElement).value;
                        if (val === true) {
                          setAvatarCount([...avatarCount, newUser]);
                          setSelectedUsers([
                            ...selectedUsers,
                            users.find((user) => user.username === newUser),
                          ]);
                        } else if (val === false) {
                          setAvatarCount([
                            ...avatarCount.filter(
                              (value) => value !== newUser,
                            ),
                          ]);
                          setSelectedUsers([
                            ...selectedUsers.filter(
                              (user) => user.username !== newUser,
                            ),
                          ]);
                        }
                      }}
                      control={
                        <Checkbox
                          checked={avatarCount?.indexOf(ele.username) !== -1}
                          sx={{
                            color: '#4F4F4F !important',
                            '&.Mui-checked': {
                              color: '#7062ff !important',
                            },
                          }}
                        />
                      }
                    />
                  </CheckBoxContainer>
                  <AvatarWraper>
                    <UserAvatar
                      disableClick
                      avatarDimension={52}
                      username={ele.username}
                    />
                  </AvatarWraper>
                  <NameContainer>
                    <Divider
                      sx={{
                        backgroundColor: '#404040',
                        marginBottom: '10px',
                      }}
                    />

                    <Name>{ele.displayName}</Name>
                    <PlaceHolder>{ele.username}</PlaceHolder>
                  </NameContainer>
                </Wrapper>
              ))
              : !loading && <ProfileTabEmptyMessage value="No user found" />}
          </FormGroup>
        </FormControl>
        {avatarCount.length !== 0 && (
          <FabContainer>
            <Fab
              onClick={handlePopOver}
              size="small"
              // color="secondary"
              sx={{ backgroundColor: '#7062ff' }}
              aria-label="add">
              <DoneIcon />
            </Fab>
          </FabContainer>
        )}
      </Container>
      <ActionConfirmationModal
        title="Add Members"
        msg="Add Users in Group?"
        open={Boolean(popOver)}
        onCloseClick={handleClosePopOver}
        onConfirm={() => {
          handleAdd();
        }}
        onCancel={handleClosePopOver}
      />
    </>
  );
};

export default CreateGroupModal;
