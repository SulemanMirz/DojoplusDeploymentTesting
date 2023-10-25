import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import { Button, CircularProgress, Grid } from '@mui/material';
import { useFireBaseAuth } from '../../../../context/FirebaseContext';
import { TextWhite24CapitalizeRegular } from '../../../../shared/components/texts';
import StaffCard from './StaffCard';
import ActionConfirmationModal from '../../../action-confimation-modal/ActionConfirmationModal';
import ModalOverlay from '../../../modal-overlay';
import AutoComplete from '../../../../shared/components/AutoComplete/AutoComplete';
import StaffSearchItem from './StaffSearchItem';
import { User } from '../../../../shared/models/user.model';
import { School } from '../../../../shared/types/generated';

const Container = styled.div`
  margin-bottom: 6rem;
`;
const ProfilesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden;
  padding-inline: 8px;
`;

const InputButtonContainer = styled.div`
  margin-top: 20px;
  padding-inline: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-block: 20px;
  gap: 8px;
`;

const StaffAdmin: React.FC = () => {
  const { schoolInfo, setSchoolInfo } = useFireBaseAuth();
  const [actionModal, setActionModal] = useState(false);
  const [selectedData, setSelectedData] = useState<School>();
  const [selectedFieldName, setSelectedFieldName] = useState('');
  const [isStaffMemberVisible, setIsStaffMemberVisible] = useState(false);
  const [selectedStaffMembers, setSelectedStaffMembers] = useState<User>();
  const [isInstructorLoading, setIsInstructorLoading] = useState(false);
  const [selectedRemoveData, setSelectedRemoveData] = useState();
  const [instructorData, setInstructorData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [staffFieldName, setStaffFieldName] = useState<any>([]);
  const [error, setError] = useState(false);
  const Instructor = schoolInfo?.displayName2FromInstructor;
  const Manager = schoolInfo?.displayName2FromManager;
  const InstructorAvatarName = schoolInfo?.displayNameFromInstructor;
  const ManagerAvatarName = schoolInfo?.displayNameFromManager;
  const handleAddStaffModal = (): void => {
    setIsStaffMemberVisible(!isStaffMemberVisible);
    setSelectedStaffMembers(null);
  };

  const handelRemoveModal = (): void => {
    setActionModal(!actionModal);
  };

  const deleteManagerAtIndex = (indexToDelete): void => {
    const updateData = schoolInfo?.manager?.filter(
      (_, index) => index !== indexToDelete,
    );
    setSelectedData(updateData);
    setSelectedFieldName('Manager');
  };

  const deleteInstructorAtIndex = (indexToDelete): void => {
    const updateData = schoolInfo?.instructor?.filter(
      (_, index) => index !== indexToDelete,
    );
    setSelectedData(updateData);
    setSelectedFieldName('Instructor');
  };

  const addInstructor = (): void => {
    setSelectedFieldName('Instructor');
    setStaffFieldName(schoolInfo?.instructor);
  };
  const addManager = (): void => {
    setSelectedFieldName('Manager');
    setStaffFieldName(schoolInfo?.manager);
  };

  const updateSelectedField = (customData: any = undefined): void => {
    setIsLoading(true);
    axios
      .put('/api/Schools', {
        data: {
          id: schoolInfo?.recordId,
          fields: {
            [selectedFieldName]: customData || selectedData,
          },
        },
      })
      .then((data) => {
        const updatedData = data?.data[0];
        const currentTime = new Date();
        localStorage.setItem(
          'schoolInfo',
          JSON.stringify({ ...updatedData, currentTime }),
        );
        setSchoolInfo({ ...updatedData, currentTime });
      })
      .catch((e) => {
        console.log(e, 'error');
      })
      .finally(() => {
        setIsLoading(false);
        setIsStaffMemberVisible(false);
        setActionModal(false);
      });
  };

  const searchForStaffMember = (searchQuery?: string): void => {
    setIsInstructorLoading(true);
    axios('/api/Schools/instructor', {
      params: {
        searchQuery,
      },
    })
      .then((res) => {
        setInstructorData(
          [...res?.data]?.filter(
            (user) =>
              schoolInfo?.[selectedFieldName?.toLocaleLowerCase()]?.indexOf(
                user?.id,
              ) === -1,
          ),
        );
      })
      .catch((err) => {
        console.log('Could not fetch Users', err);
        setError(true);
      })
      .finally(() => {
        setIsInstructorLoading(false);
      });
  };

  return (
    <>
      <Container>
        <TextWhite24CapitalizeRegular style={{ margin: '23px 0px 8px 15px' }}>
          Masters
        </TextWhite24CapitalizeRegular>
        <ProfilesRow>
          <Grid container>
            {Instructor?.map((val, i) => {
              return (
                <Grid xs={6} sm={3} md={2.4} lg={1.6} paddingBottom="10px">
                  <StaffCard
                    avatarName={InstructorAvatarName?.[i]}
                    displayName={val}
                    handelRemoveModal={() => {
                      handelRemoveModal();
                      setSelectedRemoveData(val);
                    }}
                    deleteAtIndex={() => {
                      deleteInstructorAtIndex(i);
                    }}
                  />
                </Grid>
              );
            })}
            <Grid xs={6} sm={3} md={2.4} lg={2.4} paddingBottom="10px">
              <StaffCard
                isNewUser
                handleAddStaffModal={() => {
                  handleAddStaffModal();
                  searchForStaffMember();
                }}
                addInstructor={addInstructor}
              />
            </Grid>
          </Grid>
        </ProfilesRow>
        <TextWhite24CapitalizeRegular style={{ margin: '23px 0px 8px 15px' }}>
          Manager
        </TextWhite24CapitalizeRegular>
        <ProfilesRow>
          <Grid container>
            {Manager?.map((val, i) => {
              return (
                <Grid xs={6} sm={3} md={2.4} lg={1.6} paddingBottom="10px">
                  <StaffCard
                    avatarName={ManagerAvatarName?.[i]}
                    displayName={val}
                    handelRemoveModal={() => {
                      handelRemoveModal();
                      setSelectedRemoveData(val);
                    }}
                    deleteAtIndex={() => {
                      deleteManagerAtIndex(i);
                    }}
                  />
                </Grid>
              );
            })}
            <Grid xs={6} sm={3} md={2.4} lg={2.4} paddingBottom="10px">
              <StaffCard
                isNewUser
                title="New Manager"
                handleAddStaffModal={() => {
                  handleAddStaffModal();
                  searchForStaffMember();
                }}
                addManager={addManager}
              />
            </Grid>
          </Grid>
        </ProfilesRow>
        <ActionConfirmationModal
          msg={`Are you sure  you want to remove ${selectedRemoveData}`}
          open={actionModal}
          onCancel={handelRemoveModal}
          loading={isLoading}
          onConfirm={() => {
            updateSelectedField();
          }}
        />
      </Container>
      <ModalOverlay
        open={isStaffMemberVisible}
        onCloseClick={() => {
          if (handleAddStaffModal) handleAddStaffModal();
        }}
        width="80%"
        alignItems="center"
        height="fit-content"
        borderRadius="8px"
        title={`Add a new ${selectedFieldName}`}
      >
        <InputButtonContainer>
          <AutoComplete
            value={selectedStaffMembers}
            onChange={(_, value) => setSelectedStaffMembers(value)}
            onChangeText={searchForStaffMember}
            options={instructorData}
            label="Enter Name"
            keyName="displayName2"
            loading={isInstructorLoading}
            keyName2="displayName"
            keyName3="email"
            error={error && 'Something Went Wrong'}
            renderOption={<StaffSearchItem />}
          />
          <ButtonContainer>
            <Button
              onClick={() => {
                handleAddStaffModal();
              }}
              variant="contained"
              sx={{
                backgroundColor: '#333333',
                borderRadius: '6px',
                height: '35px',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              Close
            </Button>
            <LoadingButton
              onClick={() =>
                updateSelectedField([
                  ...(staffFieldName || []),
                  selectedStaffMembers && (selectedStaffMembers?.id as string),
                ])
              }
              variant="contained"
              loading={isLoading}
              loadingIndicator={<CircularProgress color="primary" size={20} />}
              disabled={!selectedStaffMembers}
              sx={{
                borderRadius: '6px',
                height: '35px',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              Add {selectedFieldName}
            </LoadingButton>
          </ButtonContainer>
        </InputButtonContainer>
      </ModalOverlay>
    </>
  );
};

export default StaffAdmin;
