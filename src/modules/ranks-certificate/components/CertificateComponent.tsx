import React from 'react';
import { Skeleton } from '@mui/material';
import {
  CertificateImage,
  CertificateImageWrapper,
} from '../../ranks/components/ranks-styled';
import { RankType } from '../../../shared/models/Rank.model';

type CertificateComponentProps = {
  certificateData?: RankType;
  isLoading?: boolean;
  imageRef?: React.Ref<HTMLImageElement>;
};

const CertificateComponent: React.FC<CertificateComponentProps> = ({
  certificateData,
  isLoading,
  imageRef,
}) => {
  return (
    <>
      {isLoading ? (
        <>
          <Skeleton variant="rectangular" height={548} />
        </>
      ) : (
        <>
          {certificateData && (
            <CertificateImageWrapper>
              <CertificateImage
                ref={imageRef}
                src={certificateData?.certificatePhoto?.[0]?.url}
              />
            </CertificateImageWrapper>
          )}
        </>
      )}
    </>
  );
};

export default CertificateComponent;
