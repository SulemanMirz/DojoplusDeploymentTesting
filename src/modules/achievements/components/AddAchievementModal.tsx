import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import { Section } from '../../../shared/components/layout/Section';
import BasicSelect from '../../../shared/components/BasicSelect/BasicSelect';
import UploadMedia from '../../../shared/components/UploadMedia';
import AutoComplete from '../../../shared/components/AutoComplete/AutoComplete';
import DatePicker from '../../../shared/components/DatePicker/DatePicker';
import useFirebaseAuth from '../../../hooks/useFirebaseAuth';
import { Plans } from '../../../shared/models/school.model';

export const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px;
  align-items: center;
  width: 100%;
  justify-content: space-around;
  background-color: '#282828';
  position: absolute;
  bottom: 20px;
`;

const SelectWrapper = styled.div`
  margin: 16px 0px 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const UploadMediaContainer = styled.div`
  padding-top: 40px;
`;

const SectionTitle = styled.p`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 120%;
  color: #ffffff;
  padding-inline: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SectionTwoFiled = styled.div`
  display: flex;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 0px 36px;
`;

const weightData = [
  ' Light feather',
  ' Rooster ',
  ' Ultra Heavy',
  ' Super Heavy',
  ' Medium Heavy',
  ' Light Feather',
  ' Open Class',
  ' Rooster',
  ' Super-Heavy',
  ' Open Class Heavy',
  ' Open Class Light',
  ' Ultra-Heavy',
  ' Heavy',
  ' Medium-Heavy',
  ' Middle',
  ' Light',
  ' Feather',
  ' Light-Feather',
  'Open Class',
  '98 KG',
  'Super Heavy',
  'Absolute',
  'Heavy',
  'Middle Weight',
];

const locations = [
  { name: 'Brazil' },
  { name: 'Abu Dhabi' },
  { name: 'USA' },
  { name: 'Australia' },
  { name: 'Japan' },
  { name: 'Orlando' },
];

const ageDivisions = [
  'Adult',
  'Master 1',
  'Juvenile 1 ',
  'Juvenile 2 ',
  'Adult ',
  'Master 1 ',
  'Master 2 ',
  'Master 3 ',
  'Master 4 ',
  'Juvenile ',
  'Master 5 ',
  'Master 6 ',
  'Master 7 ',
  'Master ',
  'Male ',
  'Female ',
];

const ranks = ['No Rank', '1st', '2nd', '3rd'];

interface AddAchievementModalProps {
  handleModal: () => void;
  studentData?: Plans;
  getAchievement?: () => void;
}

const AddAchievementModal: React.FC<AddAchievementModalProps> = ({
  handleModal,
  studentData,
  getAchievement,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const [martialArts, setMartialArts] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEventLoading, setIsEventLoading] = useState(false);
  const { authUser } = useFirebaseAuth();

  const handleAdd = (data): void => {
    const eventExists = events.indexOf(data?.event) !== -1;
    const locationExists = locations.indexOf(data?.location) !== -1;
    setIsLoading(true);
    axios('/api/Achievement/profile', {
      params: {
        id: studentData
          ? studentData?.recordIdFromProfile?.[0]
          : authUser?.userInfo?.id,
      },
    })
      .then((res) => {
        axios
          .post('/api/Achievement', {
            ...(eventExists && { 'Event Name': [data?.event?.id] }),
            ...(!eventExists && {
              'Event Name (User Entry)': data?.event?.eventName,
            }),
            ...(!eventExists && {
              'Date (User Entry)': [data?.datePicker],
            }),
            ...(locationExists && { Location: data?.location?.name }),
            ...(!locationExists && {
              'Location (User Entry)': data?.location?.name,
            }),
            'Age Division': data?.ageDivision,
            Gender: data?.gender,
            'Weight Division': data?.weight,
            ...(data?.medal?.[0]?.url && {
              Photos: [{ url: data?.medal?.[0]?.url }],
            }),
            'Display Name': [res.data?.id],
            ...(!parseInt(data?.rank) && { Rank: parseInt(data?.rank) }),
            ...(studentData && { Verified: true }),
          })
          .then(() => {
            handleModal();
            if (getAchievement) {
              getAchievement();
            }
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            console.log('Unable to upload achievement: ', error);
          });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log('Could not find current user: ', error);
      });
  };

  useEffect(() => {
    axios('/api/MartialArts')
      .then((res) => {
        setMartialArts(res.data?.map((mA) => mA.name));
      })
      .catch((err) => console.log(err, 'err'));
  }, []);

  const getEvents = (martialArt: string, searchQuery?: string): void => {
    setIsEventLoading(true);
    axios('/api/Achievement/tournaments', {
      params: {
        martialArt,
        searchQuery,
      },
    })
      .then((res) => {
        setEvents(res.data?.filter((d) => d.eventName));
        setIsEventLoading(false);
      })
      .catch((err) => {
        setIsEventLoading(false);
        console.log('Failed to load tournaments: ', err);
      });
  };

  return (
    <Section
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: '#282828',
        overflowY: 'scroll',
      }}
    >
      <SectionTitle>Add your last achievement</SectionTitle>
      <form
        style={{ paddingInline: '12px' }}
        onSubmit={handleSubmit(handleAdd)}
        noValidate
      >
        <Controller
          name="martialArts"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <SelectWrapper>
              <BasicSelect
                value={field?.value || ''}
                onChange={(mA) => {
                  getEvents(mA as string);
                  field.onChange(mA);
                }}
                options={martialArts.sort()}
                width="100%"
                backgroundColor="#1B1B1B"
                label="Martial Arts"
                error={errors.martialArts && 'Please Select Option'}
              />
            </SelectWrapper>
          )}
        />
        <Controller
          name="event"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AutoComplete
              keyName="eventName"
              loading={isEventLoading}
              options={events}
              value={field.value}
              onChange={(_, value) => {
                field.onChange(value);
                setValue('datePicker', value?.date);
              }}
              width="100%"
              label="Tournament Name"
              helperText="Add the competiton name"
              error={errors.event && 'Please Select Option'}
              onChangeText={(txt) => getEvents('', txt)}
              addCurrentInput
            />
          )}
        />

        <Controller
          name="location"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <AutoComplete
              keyName="name"
              options={locations}
              value={field.value}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              width="100%"
              label="Location"
              helperText="City, State, Country"
              error={errors.location && 'Please Select Option'}
              addCurrentInput
            />
          )}
        />
        <Controller
          name="datePicker"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <DatePicker
              value={field.value ? field.value : ''}
              label="Date"
              helperText="MM/DD/YYYY"
              onChange={(e) => field.onChange(e?.toDate() || '')}
              error={errors.datePicker && 'Please Select Option'}
            />
          )}
        />
        <SectionTwoFiled>
          <Controller
            name="rank"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <SelectWrapper style={{ paddingRight: '5px', marginTop: '24px' }}>
                <BasicSelect
                  value={field?.value}
                  onChange={field.onChange}
                  options={ranks}
                  width="100%"
                  backgroundColor="#1B1B1B"
                  label="Rank"
                  helperText="Your result"
                  error={errors.rank && 'Please Select Rank Category'}
                />
              </SelectWrapper>
            )}
          />
          <Controller
            name="weight"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <SelectWrapper style={{ paddingLeft: '5px', marginTop: '24px' }}>
                <BasicSelect
                  value={field?.value}
                  onChange={field.onChange}
                  options={weightData}
                  width="100%"
                  backgroundColor="#1B1B1B"
                  label="Weight"
                  helperText="Weight Division"
                  error={errors.weight && 'Please Select Option'}
                />
              </SelectWrapper>
            )}
          />
        </SectionTwoFiled>
        <SectionTwoFiled>
          <Controller
            name="ageDivision"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <SelectWrapper style={{ paddingRight: '5px', marginTop: '24px' }}>
                <BasicSelect
                  value={field?.value}
                  onChange={field.onChange}
                  options={ageDivisions}
                  width="100%"
                  backgroundColor="#1B1B1B"
                  label="Age"
                  helperText="Age Divison"
                  error={errors.ageDivision && 'Please Select Option'}
                />
              </SelectWrapper>
            )}
          />
          <Controller
            name="gender"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <SelectWrapper style={{ paddingLeft: '5px', marginTop: '24px' }}>
                <BasicSelect
                  value={field?.value}
                  onChange={field.onChange}
                  options={[' Male ', ' Female ']}
                  width="100%"
                  backgroundColor="#1B1B1B"
                  label="Gender"
                  helperText="MM/DD/YYYY"
                  error={errors.gender && 'Please Select Option'}
                />
              </SelectWrapper>
            )}
          />
        </SectionTwoFiled>
        <Controller
          name="medal"
          control={control}
          render={({ field }) => (
            <UploadMediaContainer>
              <UploadMedia
                style={{ marginLeft: '0px' }}
                imagesOnly
                multiple
                images={field.value}
                setUrls={field.onChange}
              />
            </UploadMediaContainer>
          )}
        />
        <ButtonWrapper>
          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#D21632',
              fontWeight: 600,
              fontSize: '16px',
              width: '300px',
              height: '56px',
              alignItems: 'center',
              letterSpacing: '0.08em',
            }}
          >
            NEXT
          </LoadingButton>
        </ButtonWrapper>
      </form>
    </Section>
  );
};

export default AddAchievementModal;
