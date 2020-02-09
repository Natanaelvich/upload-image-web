import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';

import { Container, FileInfo, Preview } from './styles';

export default function FileList({ files, onDelete }) {
  return (
    <Container>
      {files.map(file => (
        <li key={file.id}>
          <FileInfo>
            <Preview src={file.preview} />
            <div>
              <strong>{file.name}</strong>
              <span>
                {file.readableSize}
                {!!file.url && (
                  <button type="button" onClick={() => onDelete(file.id)}>
                    Excluir
                  </button>
                )}
              </span>
            </div>
          </FileInfo>

          <div>
            {!file.uploaded && !file.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: '#7159c1' },
                }}
                text={`${file.progress}%`}
                value={file.progress}
                strokeWidth={10}
              />
            )}
            {file.url && (
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdLink
                  style={{ marginRight: 8 }}
                  size={24}
                  color="#222"
                />
              </a>
            )}
            {file.uploaded   && (
              <MdCheckCircle size={24} color="#78e5d5" />
            )}
            {file.error && <MdError size={24} color="#e57878" />}
          </div>
        </li>
      ))}
    </Container>
  );
}
