import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import Document from './Components/Document';
import ModalOverlay from '../../modal-overlay';
import MoreDocuments from './MoreDocuments';

const DocumentContainer = styled.div``;

const SectionHeader = styled.div`
  margin-top: 30px;
  margin-bottom: 27px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SectionTitle = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: '#FFFF';
`;

const DocumentsSection: React.FC = () => {
  const [isDocumentModalVisible, setIsDocumentModalVisible] = useState(false);

  const handleDocumentModal = (): void => {
    return setIsDocumentModalVisible(!isDocumentModalVisible);
  };
  return (
    <>
      <DocumentContainer>
        <SectionHeader>
          <SectionTitle>Documents</SectionTitle>
          <Button
            color="secondary"
            onClick={handleDocumentModal}
            sx={{
              width: '62px',
              height: '40px',
              backgroundColor: 'transparent',
              border: '1px solid #4F4F4F',
              fontSize: '12px',
              fontWeight: '600',
              color: '#FCFCFC',
            }}
          >
            MORE
          </Button>
        </SectionHeader>
        {[...new Array(2)].map(() => {
          return <Document />;
        })}
      </DocumentContainer>
      <ModalOverlay
        open={isDocumentModalVisible}
        onCloseClick={handleDocumentModal}
        title="More Documents"
        height="100%"
      >
        <MoreDocuments />
      </ModalOverlay>
    </>
  );
};

export default DocumentsSection;
