/* eslint-disable react/no-children-prop */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getDateData } from 'app/utils/dates/timeOperations';
import { showCollapseOrExpandMessage, formatCollapsingText } from 'app/utils/strings/stringOperations';
import { markdownFormat } from 'app/utils/questions/markdownFormatQuestions';
import { COLLAPSED_ANSWER_MIN_LENGTH, TEXT_BUTTON } from 'app/utils/constants';
import * as Styled from 'app/components/AnswerRow/AnswerRow.Styled';
import MarkdownLinkRenderer from 'app/components/MarkdownLinkRenderer';
import ConditionalLinkTo from 'app/components/Atoms/ConditionalLinkTo';
import QuestionResponderInfo from 'app/components/QuestionResponderInfo';
import Button from 'app/components/Atoms/Button';
import Label from 'app/components/Atoms/Label';
import { CircleIcon, DateContainer } from 'app/components/QuestionResponderInfo/QuestionResponderInfo.Styled';

function AnswerRow({
  searchTerm, isPreview, isQuestionModalOpen, ...props
}) {
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

  const renderAnswerLabel = () => {
    if (props.isCommentApproved) {
      return <Label type="Answer" text="Approved" approvedBy={props.approver.full_name} />;
    }
    if (props.isCommunityAnswer) {
      return <Label type="Answer" text="Community answer" />;
    }

    return (
      <Label type="Answer" text="Best Answer" />
    );
  };

  const getAnswerDate = () => {
    if (props.isCommunityAnswer || props.isCommentApproved) {
      return props.answered_at;
    }

    return props.answer_date;
  };

  const { user, children } = props;

  const anwserDate = getAnswerDate();

  return (
    <Styled.AnswerContainer isPreview={isPreview} isQuestionModalOpen={isQuestionModalOpen}>
      <Styled.AnsweredMetadata isPreview={isPreview}>
        <Styled.AnsweredMetadataLeft hasJobTitle={user !== null ? user.job_title : ''}>
          <ConditionalLinkTo to={`/questions/${props.questionId}`} condition={props.isFromList}>
            <QuestionResponderInfo createdBy={user} isAnswer>
              <DateContainer hasJobTitle={user !== null ? user.job_title : ''}>
                <CircleIcon />
                <Styled.AnswerRowDate isQuestionModalOpen={isQuestionModalOpen}>
                  {getDateData(anwserDate)}
                </Styled.AnswerRowDate>
              </DateContainer>
            </QuestionResponderInfo>
          </ConditionalLinkTo>
          <Styled.AnsweredRightContainer>
            {renderAnswerLabel()}
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
  createdat: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  searchTerm: PropTypes.string,
  isPreview: PropTypes.bool,
  isQuestionModalOpen: PropTypes.bool,
  isFromList: PropTypes.bool,
  questionId: PropTypes.number.isRequired,
  isAnswer: PropTypes.bool.isRequired,
  isCommunityAnswer: PropTypes.bool.isRequired,
  isCommentApproved: PropTypes.bool.isRequired,
  approver: PropTypes.shape({
    email: PropTypes.string.isRequired,
    full_name: PropTypes.string.isRequired,
    profile_picture: PropTypes.string.isRequired,
    job_title: PropTypes.string,
  }),
  answer_date: PropTypes.string,
  answered_at: PropTypes.string,
};

AnswerRow.defaultProps = {
  searchTerm: '',
  isPreview: false,
  isQuestionModalOpen: false,
  isFromList: true,
  approver: {},
  answer_date: '',
  answered_at: '',
};

export default AnswerRow;
