import React from 'react';
import styled from 'styled-components';

const DocumentWrapper = styled.div`
  background: #333333;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-top: 16px;
  height: 96px;
  padding-block: 26px;
  padding-inline: 23px;
  background-color: #333333;
  &:after {
    margin: 4px 0px 0px 30px;
    content: '';
    display: block;
    height: 4px;
    width: 24px;
    background-color: #ff595f;
  }
`;
const DocumentCategory = styled.div`
  display: flex;
  flex-direction: row;
`;
const DocumentTitle = styled.div`
  padding-left: 9px;
`;
const DocumentMartialArt = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
`;
const DocumentDate = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
`;

const Icon = styled.img`
  width: 18px;
`;

type DocumentProps = {
  handleDocumentDetailsModal?: () => void;
};

const Document: React.FC<DocumentProps> = ({ handleDocumentDetailsModal }) => {
  return (
    <DocumentWrapper onClick={handleDocumentDetailsModal}>
      <DocumentCategory>
        <Icon src="/assets/icons/edit-document.svg" />
        <DocumentTitle>
          <DocumentMartialArt>Waiver/ liability release</DocumentMartialArt>
          <DocumentDate>Mar 30, 2023</DocumentDate>
        </DocumentTitle>
      </DocumentCategory>
    </DocumentWrapper>
  );
};

export default Document;
