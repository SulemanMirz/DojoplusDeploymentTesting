import LoadingButton from '@mui/lab/LoadingButton';
import { Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAppDispatch } from '../../redux/hooks';
import {
  usePlanCategories,
  usePlanLoading,
} from '../../redux/slices/plansSlice';
import { getPlanCategories } from '../../redux/thunk/plansThunk';
import BasicSelect from '../../shared/components/BasicSelect/BasicSelect';
import { TextField, Textarea } from '../../shared/components/Input';
import RadioButtonGroup from '../../shared/components/Radio';
import { RefType } from '../../shared/components/Tosatify';
import { PlanCategories, Plans } from '../../shared/models/school.model';
import {
  wideButtonStyles2,
  wideButtonStylesBorderLess,
} from '../../shared/styles/Button-style';
import { COLOR_LETTERS_WHITE } from '../../shared/styles/colors';
import AutoComplete from '../../shared/components/AutoComplete/AutoComplete';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 21px 25px;
  overflow-y: scroll;
`;

const SectionTitle = styled.p`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 24px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 600;
  margin-top: 32px;
`;

const ButtonWrapper = styled.div`
  margin: 54px 0px 20px;
`;

const SelectWrapper = styled.div`
  margin: 16px 0px 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RadioWrapper = styled.div`
  margin-top: 20px;
`;

type FormFieldTypes = {
  planName: string;
  planDescription?: string;
  planCategory: any;
  setupFee: string | number;
  planType: string;
  chargeAmount: string | number;
  recurringInterval: string;
};

type PlanDetailsModalProps = {
  plan: Plans;
  handleModal: () => void;
  handleRefetchData: () => void;
  handleDeleteModal: () => void;
  setMessage: (msg: string) => void;
  setErrorMessage: (msg: string) => void;
  successAlert: RefType;
  errorAlert: RefType;
  schoolId: string | string[];
};

const planTypes = ['Recurring', 'Non-recurring'];
const recurringIntervals = [
  'Weekly',
  'Monthly',
  'Quarterly',
  'Semestral',
  'Annually',
];

const AddPlanModal: React.FC<PlanDetailsModalProps> = ({
  plan,
  handleModal,
  handleRefetchData,
  handleDeleteModal,
  setMessage,
  setErrorMessage,
  successAlert,
  errorAlert,
  schoolId,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormFieldTypes>({
    defaultValues: {
      planName: plan?.planName || '',
      planDescription: plan?.planDescription || '',
      planType: plan?.type || planTypes[0],
      planCategory: plan ? { name: plan?.nameFromCategory?.[0] } || '' : null,
      setupFee: plan?.setupFee || '',
      recurringInterval: plan?.frequency || '',
      chargeAmount: plan?.price || 0,
    },
  });

  const { t } = useTranslation();
  const PlanUpdateSuccess = t('PlanUpdateSuccess');
  const PlanUpdateFail = t('PlanUpdateFail');
  const PlanAddSuccess = t('PlanAddSuccess');
  const PlanAddFail = t('PlanAddFail');
  const PlanInfo = t('PlanInfo');
  const PlanName = t('PlanName');
  const PlanNameHelper = t('PlanNameHelper');
  const PlanNameRequire = t('PlanNameRequire');
  const PlanDescription = t('PlanDescription');
  const SetupFee = t('SetupFee');
  const AddSetupFee = t('AddSetupFee');
  const RecurringAmount = t('RecurringAmount');
  const RecurringAmountHelper = t('RecurringAmountHelper');
  const RecurringAmountError = t('RecurringAmountError');
  const RecurringInterval = t('RecurringInterval');
  const RecurringIntervalHelper = t('RecurringIntervalHelper');
  const RecurringIntervalError = t('RecurringIntervalError');
  const ChargeAmount = t('ChargeAmount');
  const ChargeAmountHelper = t('ChargeAmountHelper');
  const ChargeAmountError = t('ChargeAmountError');
  const SavePlan = t('SavePlan');
  const CreatePlan = t('CreatePlan');
  const DeletePlan = t('DeletePlan');
  const Cancel = t('Cancel');
  const Pricing = t('Pricing');

  const planOptions: PlanCategories[] = usePlanCategories();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const categoriesLoading = usePlanLoading();
  useEffect(() => {
    if (!planOptions?.length) dispatch(getPlanCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = async (data: FormFieldTypes): Promise<void> => {
    let categoryId = planOptions?.find(
      (el) => el?.name === data?.planCategory?.name,
    )?.id;

    setIsLoading(true);
    if (!planOptions?.find((el) => el?.name === data?.planCategory?.name)?.id) {
      const newCategory = await axios.put('/api/Plans/categories', {
        Name: data?.planCategory?.name,
      });
      categoryId = newCategory?.data?.[0]?.recordId;
    }
    const numericData = (data?.setupFee as string)?.replace(/[^\d.-]/g, '');
    if (plan) {
      axios
        .put('/api/Plans', {
          id: plan?.id,
          fields: {
            'Plan Name': data?.planName,
            ...(data.planDescription && {
              'Plan Description': data.planDescription,
            }),
            Category: [
              planOptions?.find((el) => el?.name === data?.planCategory?.name)
                ?.id || categoryId,
            ],
            Type: data.planType,
            ...(data.recurringInterval && {
              Frequency:
                data?.planType === 'Recurring' ? data.recurringInterval : null,
            }),
            Price: parseInt(data.chargeAmount as string),
            'Setup Fee': parseInt(numericData),
            School: [schoolId],
          },
        })
        .then(() => {
          setIsLoading(false);
          handleRefetchData();
          setMessage(PlanUpdateSuccess);
          successAlert.call();
          handleModal();
        })
        .catch((e) => {
          console.log(e, 'e');
          setErrorMessage(PlanUpdateFail);
          errorAlert.call();
          setIsLoading(false);
        });
    } else {
      axios
        .post('/api/Plans', {
          'Plan Name': data?.planName,
          ...(data.planDescription && {
            'Plan Description': data.planDescription,
          }),
          Category: [
            planOptions.find((el) => el?.name === data?.planCategory?.name)
              ?.id || categoryId,
          ],
          Type: data.planType,
          ...(data.recurringInterval && {
            Frequency: data.recurringInterval,
          }),
          Price: parseInt(data.chargeAmount as string),
          'Setup Fee': parseInt(numericData),
          School: [schoolId],
        })
        .then(() => {
          setIsLoading(false);
          handleRefetchData();
          setMessage(PlanAddSuccess);
          successAlert.call();
          handleModal();
        })
        .catch((e) => {
          console.log(e, 'e');
          setErrorMessage(PlanAddFail);
          errorAlert.call();
          setIsLoading(false);
        });
    }
  };

  const symbol = '$';
  return (
    <Container>
      <SectionTitle>{PlanInfo}</SectionTitle>
      <form onSubmit={handleSubmit(handleAdd)} noValidate>
        <Controller
          name="planName"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              label={PlanName}
              helperText={PlanNameHelper}
              error={errors.planName && PlanNameRequire}
            />
          )}
        />
        <Controller
          name="planDescription"
          control={control}
          render={({ field }) => (
            <Textarea
              label={PlanDescription}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              helperText={`${field.value?.length || 0}/2000`}
              error={
                field.value?.length > 2000 && `${field.value?.length}/2000`
              }
            />
          )}
        />
        <Controller
          name="planCategory"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AutoComplete
              keyName="name"
              options={planOptions}
              value={field.value ? field?.value || '' : null}
              onChange={(_, value) => {
                field.onChange(value);
                setValue('planCategory', value);
              }}
              width="100%"
              label="Category"
              helperText="it will be added in category above"
              error={errors.planCategory && 'Please Select Option'}
              addCurrentInput
            />
          )}
        />
        <SectionTitle>{Pricing}</SectionTitle>
        <Controller
          name="setupFee"
          control={control}
          render={({ field }) => (
            <TextField
              value={`${field.value}`}
              onBlur={field.onBlur}
              onChange={(value: string) => {
                if (value) {
                  let test = value.replaceAll(`${symbol} `, '');
                  test = test.replaceAll(`${symbol}`, '');
                  test = test.replace(/[^0-9]/g, '');
                  setValue('setupFee', `${symbol} ${test}`);
                } else {
                  setValue('setupFee', `${symbol} `);
                }
              }}
              label={SetupFee}
              helperText={AddSetupFee}
            />
          )}
        />
        <Controller
          name="planType"
          control={control}
          render={({ field }) => (
            <RadioWrapper>
              <RadioButtonGroup
                onChange={field.onChange}
                values={planTypes}
                selectedValue={field.value}
              />
            </RadioWrapper>
          )}
        />
        {watch('planType') === 'Recurring' && (
          <>
            <Controller
              name="chargeAmount"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  value={`${field.value}`}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  label={RecurringAmount}
                  helperText={RecurringAmountHelper}
                  error={errors.chargeAmount && RecurringAmountError}
                />
              )}
            />
            <Controller
              name="recurringInterval"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <SelectWrapper>
                  <BasicSelect
                    value={field?.value}
                    onChange={field.onChange}
                    options={recurringIntervals}
                    label={RecurringInterval}
                    width="100%"
                    backgroundColor="#1B1B1B"
                    helperText={RecurringIntervalHelper}
                    error={errors.recurringInterval && RecurringIntervalError}
                  />
                </SelectWrapper>
              )}
            />
          </>
        )}
        {watch('planType') === 'Non-recurring' && (
          <Controller
            name="chargeAmount"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                value={`${field.value}`}
                onBlur={field.onBlur}
                onChange={field.onChange}
                label={ChargeAmount}
                helperText={ChargeAmountHelper}
                error={errors.chargeAmount && ChargeAmountError}
              />
            )}
          />
        )}
        <ButtonWrapper>
          <LoadingButton
            loadingIndicator={<CircularProgress color="primary" size={20} />}
            loading={isLoading || categoriesLoading}
            variant="contained"
            type="submit"
            sx={wideButtonStyles2}
          >
            {plan ? SavePlan : CreatePlan}
          </LoadingButton>
        </ButtonWrapper>
        <ButtonWrapper style={{ margin: 0 }}>
          <Button
            onClick={() => {
              if (plan) {
                handleDeleteModal();
                handleModal();
              } else {
                handleModal();
              }
            }}
            color="secondary"
            variant="contained"
            sx={wideButtonStylesBorderLess}
          >
            {plan ? DeletePlan : Cancel}
          </Button>
        </ButtonWrapper>
      </form>
    </Container>
  );
};

export default AddPlanModal;
