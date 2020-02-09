import React from 'react';

import Dropzone from 'react-dropzone';
import { DropContainer, UploadMessage } from './styles';

export default function Upload({ onUpload }) {
  function renderDragMessage(isDragActive, isDragReject) {
    if (!isDragActive) {
      return (
        <UploadMessage>Arraste os arquivos aqui ...</UploadMessage>
      );
    }

    if (isDragReject) {
      return (
        <UploadMessage type="error">
          Arquiv não suportado
        </UploadMessage>
      );
    }

    return (
      <UploadMessage type="success">
        Solte os arquivos para upload ...
      </UploadMessage>
    );
  }
  return (
    <Dropzone accept="image/*" onDropAccepted={onUpload}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
      }) => (
        <DropContainer
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
        >
          <input {...getInputProps()} />
          {renderDragMessage(isDragActive, isDragReject)}
        </DropContainer>
      )}
    </Dropzone>
  );
}
