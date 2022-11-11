import { useState } from 'react';
import PropTypes from 'prop-types';

import { getDateData } from '~/utils/timeOperations';
import { showCollapseOrExpandMessage, formatCollapsingText } from '~/utils/stringOperations';
import { markdownFormat } from '~/utils/markdownFormatQuestions';
import { COLLAPSED_ANSWER_MIN_LENGTH, TEXT_BUTTON } from '~/utils/constants';

import * as Styled from './AnswerRow.Styled';
import MarkdownLinkRenderer from '~/components/MarkdownLinkRenderer';
import ConditionalLinkTo from '~/components/Atoms/ConditionalLinkTo';
import QuestionResponderInfo from '~/components/QuestionResponderInfo';
import Button from '~/components/Atoms/Button';
import Label from '~/components/Atoms/Label';
import { CircleIcon, DateContainer } from '../QuestionResponderInfo/QuestionResponderInfo.Styled';

function AnswerRow({ searchTerm, isPreview, isQuestionModalOpen, ...props }) {
  const shouldCollapse = () => props.answer_text.length > COLLAPSED_ANSWER_MIN_LENGTH;
  const [collapsed, setCollapsed] = useState(shouldCollapse);

  const renderAnswer = () => (
    <Styled.AnswerRow>
      <ConditionalLinkTo to={`/questions/${props.questionId}`} condition={props.isFromList}>
        <Styled.AnswerMarkdown
          children={formatCollapsingText(
          markdownFormat(props.answer_text, searchTerm),
          shouldCollapse(),
          collapsed,
          COLLAPSED_ANSWER_MIN_LENGTH,
        )}
          components={{ link: MarkdownLinkRenderer }}
        />
      </ConditionalLinkTo>
      {shouldCollapse() && (
        <Button type="button" category={TEXT_BUTTON} onClick={() => setCollapsed(!collapsed)}>
          {' '}
          {showCollapseOrExpandMessage(collapsed)}
        </Button>
      )}
    </Styled.AnswerRow>
  );

  const { user, createdAt, children } = props;
  return (
    <Styled.AnswerContainer isPreview={isPreview} isQuestionModalOpen={isQuestionModalOpen}>
      <Styled.AnsweredMetadata isPreview={isPreview} >
        <Styled.AnsweredMetadataLeft hasJobTitle={user.job_title}>
          <ConditionalLinkTo to={`/questions/${props.questionId}`} condition={props.isFromList}>
            <QuestionResponderInfo createdBy={user} isAnswer>
              <DateContainer>
                <CircleIcon />
                <Styled.AnswerRowDate isQuestionModalOpen={isQuestionModalOpen}>
                  {getDateData(createdAt)}
                </Styled.AnswerRowDate>
              </DateContainer>
            </QuestionResponderInfo>
          </ConditionalLinkTo>
          <Styled.AnsweredRightContainer>
            <Label type={'Answer'} text={'Best Answer'} />
            {children}
          </Styled.AnsweredRightContainer>
        </Styled.AnsweredMetadataLeft>
      </Styled.AnsweredMetadata>
      {renderAnswer({ isQuestionModalOpen })}
    </Styled.AnswerContainer>
  );
}

AnswerRow.propTypes = {
  answer_text: PropTypes.string.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    full_name: PropTypes.string.isRequired,
    profile_picture: PropTypes.string.isRequired,
    job_title: PropTypes.string,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  searchTerm: PropTypes.string,
  isPreview: PropTypes.bool,
  isQuestionModalOpen: PropTypes.bool,
  isFromList: PropTypes.bool,
  questionId: PropTypes.number.isRequired,
};

AnswerRow.defaultProps = {
  searchTerm: '',
  isPreview: false,
  isQuestionModalOpen: false,
  isFromList: true,
};

export default AnswerRow;
