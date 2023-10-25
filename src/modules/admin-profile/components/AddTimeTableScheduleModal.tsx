import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from '@mui/material';
import { TextField } from '../../../shared/components/Input';
import BasicSelect from '../../../shared/components/BasicSelect/BasicSelect';
import AutoComplete from '../../../shared/components/AutoComplete/AutoComplete';
import UserSearchItem from '../../inbox/components/UserSearchItem';
import {
  selectedCountryTime,
  twentyFourHoursFormateArray,
  weekDays,
} from './ConstArray';
import ActionConfirmationModal from '../../action-confimation-modal/ActionConfirmationModal';
import { Schedule } from '../../../shared/models/school.model';
import { getTimeIntoString } from '../../../shared/utils/ultils';
import { useFireBaseAuth } from '../../../context/FirebaseContext';

const Container = styled.div`
  padding-inline: 16px;
  overflow-x: scroll;
  margin-bottom: 34px;
`;
const ClassTitle = styled.div`
  margin-top: 32px;
  font-size: 24px;
  font-weight: 600;
  line-height: 29px;
`;

const DropDownContainer = styled.div`
  display: flex;
  width: 100%;
`;
const SelectWrapper = styled.div`
  margin: 16px 0px 8px;
  display: flex;
  margin-right: 8px;
  flex-direction: column;
  width: 100%;
`;
const SelectWrapper2 = styled.div`
  margin: 16px 0px 8px;
  display: flex;
  margin-left: 8px;
  flex-direction: column;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  margin-top: 78px;
`;

const CheckBoxContainer = styled.div`
  margin-top: 8px;
  padding: 8px;
  background-color: #282828;
  border-radius: 4px;
  display: flex;
`;

const Error = styled.p`
  font-weight: 500;
  font-size: 12px;
  padding-left: 1rem;
  margin-top: 0;
  margin-bottom: 0;
  color: #d32f2f;
`;

const CheckBoxSelected = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  background: #7062ff;
  border-radius: 2px;
`;

const CheckBoxTic = styled.img`
  height: 16px;
  width: 16px;
`;

type ScheduleMartial = {
  data: Schedule[];
};

type AddTimeTableScheduleModalProps = {
  checkBoxFilter: Schedule[] | undefined | null;
  data: Schedule;
  closeModal;
  schoolLink: string;
  isModeEdit: boolean;
  RefreshTimeTableData: () => void;
};

const AddTimeTableScheduleModal: React.FC<AddTimeTableScheduleModalProps> = ({
  checkBoxFilter,
  data,
  closeModal,
  schoolLink,
  isModeEdit,
  RefreshTimeTableData,
}) => {
  const [instructorData, setInstructorData] = useState([]);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [martialArts, setMartialArts] = useState<ScheduleMartial>(
    {} as ScheduleMartial,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [actionModal, setActionModal] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    trigger,
  } = useForm({
    reValidateMode: 'onChange',
  });

  const { schoolInfo } = useFireBaseAuth();
  const martialArtsData = martialArts?.data?.map((md) => md?.name)?.sort();

  const validateMenuItems = (): boolean => {
    const start = getValues('startTime');
    const end = getValues('endTime');

    const startTime = getTimeIntoString(start?.timeString);
    const endTime = getTimeIntoString(end?.timeString);

    const finalSet = startTime < endTime;

    return finalSet;
  };

  const finalFomattedStartTime = {
    timeString: data?.startTime,
    time: data?.timeStart,
  };
  const finalFormattedEndTime = {
    timeString: data?.endTime,
    time: data?.timeEnd,
  };

  const handelActionModal = (): void => {
    setActionModal(!actionModal);
  };

  const selectedCountryData = selectedCountryTime(schoolInfo?.country);
  const handleFormSubmit = (submitData): void => {
    setIsLoading(true);
    const selectedMartialArts = martialArts?.data?.find(
      (mA) => mA?.name === submitData?.martialArts,
    );
    const timeStart = twentyFourHoursFormateArray?.find(
      (el) => el?.time === submitData?.startTime?.time,
    )?.timeString;
    const timeEnd = twentyFourHoursFormateArray?.find(
      (el) => el?.time === submitData?.endTime?.time,
    )?.timeString;

    const newData = submitData?.checkboxes?.map((day) => {
      return {
        Weekday: day,
        'Class Name': submitData?.className,
        'Martial Arts Link': [selectedMartialArts?.id],
        'Instructor Link': [submitData?.instructor?.id],
        'School Link': [schoolLink],
        '_Start Time': timeStart,
        '_End Time': timeEnd,
        'Time Start': submitData?.startTime?.time,
        'Time End': submitData?.endTime?.time,
        Room: submitData?.room,
      };
    });

    if (isModeEdit) {
      axios
        .put('/api/Timetable', {
          id: data?.recordId,
          fields: {
            'Class Name': submitData?.className,
            'Martial Arts Link': [selectedMartialArts?.id],
            'Instructor Link': [
              submitData?.instructor?.id || data?.instructorLink?.[0],
            ],
            'School Link': [schoolLink],
            '_Start Time': timeStart,
            '_End Time': timeEnd,
            'Time Start': submitData?.startTime?.time,
            'Time End': submitData?.endTime?.time,
            Room: submitData?.room,
          },
        })
        .then(() => {
          setIsLoading(false);
          RefreshTimeTableData();
          closeModal();
        })
        .catch((error) => {
          setIsLoading(false);
          console.log('error', error);
        });
    } else {
      axios
        .post('/api/Timetable', newData)
        .then(() => {
          setIsLoading(false);
          RefreshTimeTableData();
          closeModal();
        })
        .catch((error) => {
          console.log('error', error);
          setIsLoading(false);
        });
    }
  };
  const defaultInstructor = {
    displayName: data?.instructorLookup?.[0],
    userName: data?.usernameFromInstructorLink?.[0],
  };
  const getAllInstructors: (searchQuery?: string) => void = (searchQuery) => {
    if (!searchQuery && instructorData?.length) {
      setInstructorData(instructorData);
      return;
    }
    setIsUserLoading(true);
    axios('/api/Timetable/searchInstructor', {
      params: {
        instructors: true,
        searchQuery,
      },
    })
      .then((res) => {
        setIsUserLoading(false);
        setInstructorData(res?.data);
      })
      .catch((err) => {
        console.log(err, 'err');
        setIsUserLoading(false);
      });
  };

  const getMartialArts = (): void => {
    axios('/api/Timetable/martialArts')
      .then((res) => {
        setMartialArts(res?.data);
      })
      .catch((err) => {
        console.log(err, 'err');
      });
  };

  const deleteTimeTable = (): void => {
    setIsLoading(true);
    axios
      .delete('/api/Timetable/', {
        params: {
          id: data?.recordId,
        },
      })
      .then(() => {
        setIsLoading(false);
        handelActionModal();
        RefreshTimeTableData();
        closeModal();
      })
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    getMartialArts();
    getAllInstructors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <ClassTitle>Class Info</ClassTitle>
        <Controller
          name="className"
          control={control}
          rules={{
            required: 'true',
          }}
          defaultValue={data?.className || ''}
          render={({ field }) => (
            <TextField
              name={field?.name}
              value={field?.value}
              onBlur={field?.onBlur}
              onChange={(e) => {
                field?.onChange(e);
              }}
              error={errors?.className && 'Please Enter Class Name'}
              label="Class Name"
              helperText="e.g. Jiu-Jitsu Advanced"
            />
          )}
        />
        <Controller
          name="martialArts"
          control={control}
          rules={{
            required: 'true',
          }}
          defaultValue={data?.martialArtLookup?.[0]}
          render={({ field }) => (
            <SelectWrapper>
              <BasicSelect
                value={field?.value || ''}
                onChange={(e) => {
                  field?.onChange(e);
                }}
                options={martialArtsData}
                width="100%"
                backgroundColor="#1B1B1B"
                label="Martial Arts"
                error={errors?.martialArts && 'Please Enter Martial Art'}
              />
            </SelectWrapper>
          )}
        />
        {!isModeEdit && (
          <>
            <ClassTitle>When it happens?</ClassTitle>

            <Controller
              name="checkboxes"
              control={control}
              rules={{
                required: true,
              }}
              defaultValue={
                [...checkBoxFilter?.map((week) => week?.weekday)] || []
              }
              render={(checks) => (
                <>
                  <div
                    style={{
                      marginTop: '16px',
                    }}
                  >
                    {weekDays?.map((el) => {
                      return (
                        <CheckBoxContainer
                          style={{
                            backgroundColor:
                              checks?.field?.value?.indexOf(el?.day) !== -1
                                ? '#333333'
                                : '#282828',
                            border:
                              errors?.checkboxes?.message &&
                              '2.5px solid #d32f2f',
                          }}
                        >
                          <FormControlLabel
                            label={el.day}
                            value={el.day}
                            labelPlacement="start"
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              width: '100%',
                              margin: '0px !important',
                              '.MuiTypography-root': {
                                color:
                                  checks?.field?.value?.indexOf(el?.day) !== -1
                                    ? '#FCFCFC !important'
                                    : '#bdbdbd !important',
                              },
                            }}
                            control={
                              <Controller
                                name="checkbox"
                                control={control}
                                render={({ field }) => (
                                  <Checkbox
                                    {...field}
                                    checkedIcon={
                                      <CheckBoxSelected>
                                        <CheckBoxTic src="/assets/icons/tic.svg" />
                                      </CheckBoxSelected>
                                    }
                                    checked={
                                      checks?.field?.value?.indexOf(el.day) !==
                                      -1
                                    }
                                    onChange={() => trigger(['checkboxes'])}
                                    onClick={() => {
                                      let checkBoxData = [];
                                      const checked =
                                        checks?.field?.value?.indexOf(
                                          el.day,
                                        ) !== -1;
                                      if (!checked) {
                                        checkBoxData = checks?.field?.value
                                          ? [...checks?.field?.value, el?.day]
                                          : [el?.day];
                                      } else if (checked) {
                                        checkBoxData = [
                                          ...checks?.field?.value?.filter(
                                            (value) => value !== el?.day,
                                          ),
                                        ];
                                      }
                                      setValue('checkboxes', checkBoxData);
                                    }}
                                    sx={{
                                      color: '#4F4F4F !important',
                                      width: '1rem',
                                      height: '1rem',
                                    }}
                                  />
                                )}
                              />
                            }
                          />
                        </CheckBoxContainer>
                      );
                    })}
                    {errors?.checkboxes?.message ? (
                      <Error>Error Message True</Error>
                    ) : null}
                  </div>
                </>
              )}
            />
          </>
        )}

        <ClassTitle>What time ? </ClassTitle>
        <DropDownContainer>
          <Controller
            name="startTime"
            control={control}
            rules={{
              validate: validateMenuItems,
            }}
            defaultValue={isModeEdit ? finalFomattedStartTime || '' : null}
            render={({ field }) => (
              <SelectWrapper>
                <AutoComplete
                  keyName="timeString"
                  options={selectedCountryData}
                  value={field?.value}
                  onChange={(_, value) => {
                    field.onChange(value);
                    setValue('startTime', value);
                  }}
                  width="100%"
                  label="Start at"
                  error={errors.startTime && 'Please Enter Valid Time'}
                />
              </SelectWrapper>
            )}
          />
          <Controller
            name="endTime"
            control={control}
            rules={{
              validate: validateMenuItems,
            }}
            defaultValue={isModeEdit ? finalFormattedEndTime || '' : null}
            render={({ field }) => {
              return (
                <SelectWrapper2>
                  <AutoComplete
                    keyName="timeString"
                    options={selectedCountryData}
                    value={field?.value}
                    onChange={(_, value) => {
                      field.onChange(value);
                      setValue('endTime', value);
                    }}
                    width="100%"
                    label="End at"
                    error={errors.endTime && 'Please Enter Valid Time'}
                  />
                </SelectWrapper2>
              );
            }}
          />
        </DropDownContainer>
        <ClassTitle>Where?</ClassTitle>
        <Controller
          name="room"
          control={control}
          rules={{
            required: 'true',
          }}
          defaultValue={data?.room || ''}
          render={({ field }) => (
            <TextField
              name={field?.name}
              value={field?.value}
              onBlur={field?.onBlur}
              onChange={(e) => {
                field?.onChange(e);
              }}
              label="Room"
              helperText="e.g. Main Mat or Room 1"
              error={errors?.room && 'Please Enter Valid Room Number'}
            />
          )}
        />
        <ClassTitle>Instructor</ClassTitle>

        <Controller
          name="instructor"
          control={control}
          rules={{
            required: 'true',
          }}
          {...(isModeEdit && { defaultValue: { ...defaultInstructor } })}
          render={({ field }) => (
            <AutoComplete
              onChangeText={(text) => getAllInstructors(text)}
              value={field?.value}
              label="Enter Name"
              keyName="displayName"
              onChange={(_, value) => {
                field?.onChange(value);
              }}
              options={instructorData}
              loading={isUserLoading}
              keyName2="username"
              keyName3="email"
              error={errors?.instructor && 'Something Went Wrong'}
              renderOption={<UserSearchItem />}
            />
          )}
        />

        <ButtonContainer>
          <ButtonWrapper>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
              loadingIndicator={
                <CircularProgress
                  sx={{
                    color: '#D21632',
                  }}
                  size={20}
                />
              }
              sx={{
                backgroundColor: '#D21632',
                fontWeight: 600,
                fontSize: '16px',
                width: '100%',
                height: '56px',
                alignItems: 'center',
                letterSpacing: '0.08em',
              }}
            >
              {isModeEdit ? 'EDIT CLASS' : 'ADD CLASS'}
            </LoadingButton>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button
              sx={{
                backgroundColor: 'transparent',
                fontWeight: 600,
                fontSize: '16px',
                width: '100%',
                height: '56px',
                alignItems: 'center',
                letterSpacing: '0.08em',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#ffff',
                },
              }}
              variant="contained"
              onClick={() => {
                if (isModeEdit) {
                  handelActionModal();
                  return;
                }
                closeModal();
              }}
            >
              {isModeEdit ? 'DELETE' : 'CANCEL'}
            </Button>
          </ButtonWrapper>
        </ButtonContainer>
      </form>
      <ActionConfirmationModal
        loading={isLoading}
        open={actionModal}
        msg="Are you sure you want to delete this class ?"
        onCancel={handelActionModal}
        onConfirm={deleteTimeTable}
      />
    </Container>
  );
};

export default AddTimeTableScheduleModal;
