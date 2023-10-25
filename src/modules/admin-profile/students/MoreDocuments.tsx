import React, { useState } from 'react';
import styled from 'styled-components';
import ModalOverlay from '../../modal-overlay';
import Document from './Components/Document';

const Wrapper = styled.div`
  max-height: calc(100vh - 10px);
  overflow: scroll;
  margin-top: 10px;
  padding-inline: 16px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

const Container = styled.div``;

const MoreDocuments: React.FC = () => {
  const [isDocumentsDetailsVisible, setIsDocumentsDetailsVisible] =
    useState(false);

  const handleDocumentDetailsModal = (): void => {
    setIsDocumentsDetailsVisible(!isDocumentsDetailsVisible);
  };
  return (
    <Container>
      <Wrapper>
        {[...new Array(8)]?.map(() => {
          return (
            <Document handleDocumentDetailsModal={handleDocumentDetailsModal} />
          );
        })}
      </Wrapper>
      <ModalOverlay
        title="Waiver / liability release"
        open={isDocumentsDetailsVisible}
        onCloseClick={handleDocumentDetailsModal}
      >
        Working on It
      </ModalOverlay>
    </Container>
  );
};

export default MoreDocuments;
