import React from 'react';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { styled } from '@mui/material/styles';
import { IFileInfo } from 'react-csv-reader';
import Typography from '@mui/material/Typography';

const Container = styled('div')({
  marginBottom: 8,
  border: '1px solid #e0e0e0',
  display: 'flex',
  alignItems: 'flex-start',
  marginTop: 16,
});

const IconContainer = styled('div')({
  padding: 8,
});

const Icon = styled(FileCopyIcon)({
  fontSize: 60,
  color: '#e0e0e0',
});

const Content = styled('div')({
  padding: '0 16px',
});

const Text = styled(Typography)({
  color: '#757575 !important',
});

type FilePreviewProps = {
  fileInfo: IFileInfo;
};

export const FilePreview: React.FC<FilePreviewProps> = ({ fileInfo }) => {
  return (
    <Container>
      <IconContainer>
        <Icon />
      </IconContainer>
      <Content>
        <Text variant="button" display="block">
          {fileInfo.name}
        </Text>
        <Text variant="caption" display="block">
          {`${fileInfo.size} bytes`}
        </Text>
        <Text variant="caption" display="block">
          {fileInfo.type}
        </Text>
      </Content>
    </Container>
  );
};
