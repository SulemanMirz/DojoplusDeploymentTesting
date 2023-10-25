import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, CircularProgress } from '@mui/material';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Container } from '../../shared/components/layout/Container';
import ModalOverlay from '../modal-overlay';
import AddPlanModal from './AddPlanModal';
import PlansCard from './components/PlansCard';
import PlanDetailsModal from './PlanDetailsModal';
import ActionConfirmationModal from '../action-confimation-modal/ActionConfirmationModal';
import { RefType, Toastify } from '../../shared/components/Tosatify';
import { LoadingWrapper } from '../add-ranks/step/Step2';
import { wideButtonStylesTransparent } from '../../shared/styles/Button-style';
import BottomNavAdmin from '../bottom-nav/BottomNavAdmin';
import HeaderDojo from '../headers/HeaderDojo';
import { useFireBaseAuth } from '../../context/FirebaseContext';

const ButtonsContainer = styled.div`
  margin-top: 50px;
`;

const Icon = styled.img`
  height: 14px;
  width: 14px;
`;

const PlusIcon = styled.img`
  height: 18px;
  width: 18px;
  cursor: pointer;
`;
const BackIcon = styled.img`
  height: 18px;
  width: 18px;
  cursor: pointer;
`;

const PlansAdmin: React.FC = () => {
  const { t } = useTranslation();
  const PlansText = t('Plans');
  const CreatePlan = t('CreateNewPlan');
  const SureDeletePlan = t('SureDeletePlan');
  const EditPlan = t('EditPlan');
  const AddPlan = t('AddPlan');
  const PlanDeleteSuccess = t('PlanDeleteSuccess');
  const PlanDeleteFail = t('PlanDeleteFail');
  const PlanDisabledSuccess = t('PlanDisabledSuccess');
  const PlanDisabledFail = t('PlanDisabledFail');
  const successAlert = useRef<RefType>(null);
  const errorAlert = useRef<RefType>(null);

  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [addPlanVisible, setAddPlanVisible] = useState(false);
  const [plansData, setPlansData] = useState([]);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [schoolSlugId, setSchoolSlugId] = useState();
  const { schoolInfo } = useFireBaseAuth();
  const router = useRouter();
  const handleDetailsModal = (): void => {
    setDetailsVisible(!detailsVisible);
  };

  const handlePlanModal = (): void => {
    if (addPlanVisible) {
      setSelectedPlan(null);
    }
    setAddPlanVisible(!addPlanVisible);
  };

  const handleConfirmModal = (): void => {
    setConfirmVisible(!confirmVisible);
  };

  const getSchoolWithSlug = (): void => {
    axios('/api/Plans/getSchool', {
      params: {
        slug: schoolInfo?.slug,
      },
    })
      .then((res) => {
        setSchoolSlugId(res.data?.[0]?.id);
      })
      .catch((e) => console.log(e));
  };

  const updateData = (): void => {
    setLoading(true);
    axios('/api/Plans', {
      params: {
        schoolId: schoolInfo?.slug,
      },
    })
      .then((res) => {
        setPlansData(res.data);
        setLoading(false);
      })
      .catch((e) => console.log(e, 'e'));
  };

  const handleRefetchData = (): void => {
    updateData();
  };

  const handleDelete = async (): Promise<void> => {
    setIsDeleteLoading(true);
    if (selectedPlan?.subscribers?.length === 0) {
      axios
        .delete('/api/Plans', {
          params: {
            id: selectedId,
          },
        })
        .then(() => {
          setIsDeleteLoading(false);
          handleRefetchData();
          setMessage(PlanDeleteSuccess);
          successAlert.current.call();
          handleConfirmModal();
        })
        .catch((e) => {
          console.log(e, 'e');
          setErrorMessage(PlanDeleteFail);
          errorAlert.current.call();
          setIsDeleteLoading(false);
        });
    } else {
      axios
        .put('/api/Plans', {
          id: selectedId,
          fields: {
            Disabled: true,
          },
        })
        .then(() => {
          setIsDeleteLoading(false);
          handleRefetchData();
          setMessage(PlanDisabledSuccess);
          successAlert.current.call();
          handleConfirmModal();
        })
        .catch((e) => {
          console.log(e, 'e');
          setErrorMessage(PlanDisabledFail);
          errorAlert.current.call();
          setIsDeleteLoading(false);
        });
    }
  };

  useEffect(() => {
    if (schoolInfo?.slug) {
      getSchoolWithSlug();
      handleRefetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schoolInfo?.slug]);

  return (
    <>
      <Toastify ref={successAlert} type="success" message={message} />
      <Toastify ref={errorAlert} type="error" message={errorMessage} />
      <HeaderDojo
        title={PlansText}
        IconRight={<PlusIcon src="/assets/icons/plus-icon.svg" />}
        IconLeft={<BackIcon src="/assets/icons/back-arrow.svg" />}
        onIconLeftCLick={() => router.back()}
        onIconRightClick={handlePlanModal}
      />
      <Container style={{ padding: '119px 16px 113px' }}>
        {loading && (
          <LoadingWrapper style={{ marginBottom: 20 }}>
            <CircularProgress color="primary" size={20} />
          </LoadingWrapper>
        )}
        {[...plansData]
          ?.sort((a, b) => +new Date(b.createdTime) - +new Date(a.createdTime))
          ?.map((plan) => {
            return (
              <PlansCard
                planName={plan.planName}
                planDescription={plan.planDescription}
                price={plan.price}
                onDetailsClick={() => {
                  setSelectedPlan({ ...plan, setupFee: `$${plan?.setupFee}` });
                  setSelectedId(plan?.id);
                  handleDetailsModal();
                }}
                planType={plan?.type}
                subscribers={plan.subscribers}
              />
            );
          })}
        <ButtonsContainer>
          <Button
            onClick={() => {
              handlePlanModal();
              setSelectedPlan(null);
            }}
            color="secondary"
            variant="contained"
            sx={wideButtonStylesTransparent}
            startIcon={<Icon src="/assets/icons/plus-icon.svg" />}
          >
            {CreatePlan}
          </Button>
        </ButtonsContainer>
        <ModalOverlay
          title={selectedPlan?.planName}
          onCloseClick={() => {
            handleDetailsModal();
          }}
          open={detailsVisible}
          height="calc( 100vh - 50px )"
        >
          <PlanDetailsModal
            plan={selectedPlan}
            handleEditModal={handlePlanModal}
            handleDetailsModal={handleDetailsModal}
          />
        </ModalOverlay>
        <ModalOverlay
          title={selectedPlan ? EditPlan : AddPlan}
          onCloseClick={() => {
            handlePlanModal();
          }}
          open={addPlanVisible}
          height="calc( 100vh - 50px )"
        >
          <AddPlanModal
            handleModal={() => {
              handlePlanModal();
            }}
            plan={selectedPlan}
            schoolId={schoolSlugId}
            handleRefetchData={handleRefetchData}
            handleDeleteModal={handleConfirmModal}
            successAlert={successAlert.current}
            setMessage={setMessage}
            setErrorMessage={setErrorMessage}
            errorAlert={errorAlert.current}
          />
        </ModalOverlay>
        <BottomNavAdmin />
        <ActionConfirmationModal
          open={confirmVisible}
          msg={SureDeletePlan}
          onCloseClick={handleConfirmModal}
          onConfirm={handleDelete}
          onCancel={handleConfirmModal}
          loading={isDeleteLoading}
        />
      </Container>
    </>
  );
};

export default PlansAdmin;
