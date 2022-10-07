import styled from 'styled-components';
import Markdown from 'react-markdown';

export const QuestionMarkdown = styled(Markdown)`
  color: var(--color-dark-50);
  font-family: "Nunito";
  font-size: 14px;
  letter-spacing: 0.6px;
  line-height: 1.71;
  overflow-wrap: break-word;
  word-wrap: break-word;
  
  a {
    color: var(--color-secondary);
  }
  p {
    overflow-wrap: anywhere;
  }
`;
