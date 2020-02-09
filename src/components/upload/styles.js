import styled, { css } from 'styled-components';

const dargActive = css`
  border-color: #78e5d5;
`;

const dargReject = css`
  border-color: #e57878;
`;
export const DropContainer = styled.div`
  border: 5px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;

  ${props => props.isDragActive && dargActive}
  ${props => props.isDragReject && dargReject}
`;

const messageCollors = {
  default: '#444',
  error: '#e57878',
  sucess: '#78e5d5',
};
export const UploadMessage = styled.p`
  display: flex;
  color: ${props => messageCollors[props.type || 'default']};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;
