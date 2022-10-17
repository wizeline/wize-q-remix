import styled from 'styled-components';
import Markdown from 'react-markdown';
import Button from '~/components/Atoms/Button';

export const Dropdown = styled.div`
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 3px 6px 0 rgba(225, 229, 233, 0.8);
  min-height: 5px;
  top: 100%;
  margin-top: 5px;
  width: 150%;
  position: absolute;
  padding: 15px;
  z-index: 999;
  font-size: 12px;
  @media (max-width: 768px) {
    width: 110%;
  }
`;

export const Alert = styled.span`
  color: var(--color-dark-25);
`;

export const DropdownQuestion = styled.div`
  display: flex;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const DepartmentLabel = styled.div`
  border: 2px solid var(--color-secondary);
  align-items: center;
  justify-content: center;
  text-align: center;
  display: flex;
  height: fit-content;
  padding: 5px;
  border-radius: 20px;
  min-width: 110px;
  font-weight: 600;
  color: var(--color-secondary);
`;

export const QuestionMarkdown = styled(Markdown)`
  overflow-wrap: anywhere;
  width: 100%;
  margin-left: 10px;
  font-size: 12px;
`;

export const TitleContainer = styled.span`
  color: #bbbbbb;
  display: flex;
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 10px;
`;

export const ButtonShowMore = styled(Button)`
  color: #bbbbbb;
  font-size: 12px;
`;
