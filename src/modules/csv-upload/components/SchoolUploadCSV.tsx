/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
// import { IFileInfo } from 'react-csv-reader';

// import { useUploadSchoolScvMutation } from '../../../shared/types/generated';
// import { UploadCSVInput } from './UploadCSVInput';
// import { ModalLoading } from './ModalLoading';
// import { FilePreview } from './FilePreview';

export const SChoolUploadCSV: React.FC = () => {
  // const [fileInfo, setFileInfo] = useState<IFileInfo>();
  // const [upload, { loading }] = useUploadSchoolScvMutation({
  //   onCompleted: (response) => {
  //     console.log('response', response);
  //   },
  //   onError: (error) => {
  //     console.error('error uploading', JSON.stringify(error));
  //   },
  // });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const onUpload = useCallback(
  //   (data: any[], info: IFileInfo) => {
  //     setFileInfo(info);
  //     upload({
  //       variables: {
  //         data,
  //         entity: 'school',
  //       },
  //     });
  //   },
  //   [upload],
  // );

  return (
    <>
      {/* <ModalLoading isLoading={loading} />
      <UploadCSVInput
        disabled={loading}
        customLabel="CUSTOM LABEL"
        onFileLoaded={onUpload}
      />
      {fileInfo && <FilePreview fileInfo={fileInfo} />} */}
    </>
  );
};
