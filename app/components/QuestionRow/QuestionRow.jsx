import PropTypes from 'prop-types';
import { useLoaderData, useSubmit, useSearchParams } from '@remix-run/react';
import { useRef } from 'react';
import { MdLockOpen } from 'react-icons/md';
import { formatCollapsingText } from 'app/utils/strings/stringOperations';
import { renderDepartment, hasJobTitle } from 'app/utils/questions/questionUtils';
import { COLLAPSED_QUESTION_MIN_LENGTH, NOT_ASSIGNED_DEPARTMENT_ID } from 'app/utils/constants';
import * as Styled from 'app/components/QuestionRow/QuestionRow.Styled';
import ConditionalLinkTo from 'app/components/Atoms/ConditionalLinkTo';
import Label from 'app/components/Atoms/Label';
import QuestionResponderInfo from 'app/components/QuestionResponderInfo';
import QuestionMarkdown from 'app/components/QuestionMarkdown';
import useUser from 'app/utils/hooks/useUser';
import { getDateData } from 'app/utils/dates/timeOperations';
import ACTIONS from 'app/utils/actions';
import { CircleIcon, DateContainer } from 'app/components/QuestionResponderInfo/QuestionResponderInfo.Styled';
import Switch from 'app/components/Switch';
import Button from 'app/components/Atoms/Button';

const renderLocation = (location, locations) => {
  if (locations.length === 0) {
    return '...';
  }

  return locations.find((loc) => loc.code === location).name;
};

function QuestionRow(props) {
  const {
    question,
    isQuestionModalOpen,
    hasAnswer,
    shouldCollapse,
    collapsed,
    children,
    isFromList,
  } = props;

  const profile = useUser();

  const { locations } = useLoaderData();
  const isUpdated = false;
  const pinForm = useRef();
  const enabledForm = useRef();
  const publishForm = useRef();

  const submit = useSubmit();

  const [searchParams] = useSearchParams();

  const handleStatusClick = () => {
    let url = '/?index';
    if (!isFromList) {
      url = `/questions/${question.question_id}`;
      const urlSearchParam = searchParams.get('order');
      url = urlSearchParam !== null ? `${url}?order=${urlSearchParam}` : url;
    } else {
      searchParams.forEach((value, key) => {
        url += value ? `&${key}=${value}` : '';
      });
    }
    const data = new FormData(enabledForm.current);
    data.set('action', ACTIONS.ENABLED_ACTION);
    data.set('questionId', question.question_id);
    data.set('enabledValue', !question.is_enabled);

    submit(data, { method: 'post', action: url, replace: true });
  };

  const publishQuestion = () => {
    let url = '/?index';
    const { question_id: id } = question;

    if (!isFromList) {
      url = `/questions/${id}`;
      const urlSearchParam = searchParams.get('order');
      url = urlSearchParam !== null ? `${url}?order=${urlSearchParam}` : url;
    } else {
      searchParams.forEach((value, key) => {
        url += value ? `&${key}=${value}` : '';
      });
    }
    const data = new FormData(publishForm.current);
    data.set('action', ACTIONS.PUBLISH_QUESTION);
    data.set('questionId', id);

    submit(data, { method: 'post', action: url, replace: true });
  };

  const onPinChange = () => {
    let url = '/?index';
    if (!isFromList) {
      url = `/questions/${question.question_id}`;
      const urlSearchParam = searchParams.get('order');
      url = urlSearchParam !== null ? `${url}?order=${urlSearchParam}` : url;
    } else {
      searchParams.forEach((value, key) => {
        url += value ? `&${key}=${value}` : '';
      });
    }
    const newPinStatusValue = question.is_pinned ? 'false' : 'true';
    const data = new FormData(pinForm.current);
    data.set('action', ACTIONS.PINNIN);
    data.set('questionId', question.question_id);
    data.set('value', newPinStatusValue);

    submit(
      data,
      { method: 'post', action: url, replace: true },
    );
  };

  const adminPinButton = (profile.is_admin && !question.is_pinned)
    ? (
      <Styled.PinQuestionIconHolder onClick={onPinChange}>
        <Styled.PinActionableIconHolder />
        <Styled.PinTooltipMessage>Pin question to the top of the list</Styled.PinTooltipMessage>
      </Styled.PinQuestionIconHolder>
    )
    : (
      <Styled.PinQuestionIconHolder onClick={onPinChange} className="pin-tooltip">
        <Styled.UnpinActionableIconHolder />
        <Styled.PinTooltipMessage>Unpin question from top of the list</Styled.PinTooltipMessage>
      </Styled.PinQuestionIconHolder>
    );

  const nonAdminPinIndicator = !profile.is_admin && question.is_pinned && (
    <Styled.PinnedIndicator>
      <span>Pinned by admin</span>
      {' '}
      <Styled.PinnedIcon />
    </Styled.PinnedIndicator>
  );

  return (
    <Styled.QuestionRowContainer isQuestionModalOpen={isQuestionModalOpen}>
      <Styled.QuestionRowMetadataTop>
        <ConditionalLinkTo to={`/questions/${question.question_id}`} condition={isFromList}>
          <QuestionResponderInfo createdBy={question.created_by}>
            <DateContainer hasJobTitle={hasJobTitle(question.created_by)}>
              <CircleIcon />
              <Styled.QuestionRowDate>
                <em>{isUpdated && ' (edited)'}</em>
                {getDateData(question.createdat)}
              </Styled.QuestionRowDate>
            </DateContainer>
          </QuestionResponderInfo>
        </ConditionalLinkTo>
        <Styled.QuestionRowLine
          isQuestionModalOpen={isQuestionModalOpen}
          hasAnswer={hasAnswer}
        />

        <Styled.RightWrapper>
          {profile.is_admin ? adminPinButton : nonAdminPinIndicator}
          {profile.is_admin && (

            <Styled.DisableControls>
              <Styled.ButtonTooltipMessage>
                Click to
                {' '}
                {question.is_enabled ? 'disable' : 'enable'}
                {' '}
                this
                question
              </Styled.ButtonTooltipMessage>
              <Switch
                id={`question-${question.question_id}`}
                checked={question.is_enabled}
                onChange={handleStatusClick}
              />
            </Styled.DisableControls>
          )}
          {(!question.is_public && question.is_enabled) && (
          <Styled.DisableControls>
            <Styled.ButtonTooltipMessage>
              Click to publish this question.
            </Styled.ButtonTooltipMessage>
            <Button
              id={`question-publish-${question.question_id}`}
              onClick={publishQuestion}
            >
              <MdLockOpen color="var(--toastify-color-progress-success)" size="2em" />
            </Button>

          </Styled.DisableControls>
          )}
        </Styled.RightWrapper>

      </Styled.QuestionRowMetadataTop>
      <Styled.QuestionRowWrapper hasAnswer={hasAnswer} isQuestionModalOpen={isQuestionModalOpen}>
        <ConditionalLinkTo to={`/questions/${question.question_id}`} condition={isFromList}>
          <Styled.QuestionRowContent>
            <QuestionMarkdown
              source={formatCollapsingText(
                question.question,
                shouldCollapse && !isQuestionModalOpen,
                collapsed,
                COLLAPSED_QUESTION_MIN_LENGTH,
              )}
            />
          </Styled.QuestionRowContent>
        </ConditionalLinkTo>
        {children}
        <Styled.QuestionRowMetadataBottom>
          <Styled.QuestionRowMetadataSectionOne>
            {
              isFromList
              && (
                <>
                  <Label text={renderLocation(question.location, locations)} type="Location" />
                  {question.department
                   && question.department.department_id !== NOT_ASSIGNED_DEPARTMENT_ID
                   && <Label text={renderDepartment(question.department)} type="Department" />}
                  {question.assigned_to && <Label text={question.assigned_to.full_name} type="Employee" />}
                </>
              )
            }
          </Styled.QuestionRowMetadataSectionOne>
          <Styled.QuestionId>
            {`Question ID: Q${question.question_id}`}
          </Styled.QuestionId>
        </Styled.QuestionRowMetadataBottom>
        <Styled.QuestionRowBorderBottom />
      </Styled.QuestionRowWrapper>
    </Styled.QuestionRowContainer>
  );
}

QuestionRow.propTypes = {
  question: PropTypes.shape({
    question_id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    is_anonymous: PropTypes.bool.isRequired,
    is_pinned: PropTypes.bool.isRequired,
    is_enabled: PropTypes.bool.isRequired,
    user_hash: PropTypes.string,
    can_edit: PropTypes.bool,
    Department: PropTypes.string,
    assigned_to: PropTypes.shape({
      full_name: PropTypes.string,
    }),
    created_by: PropTypes.shape({
      email: PropTypes.string,
      employee_id: PropTypes.number,
      full_name: PropTypes.string,
      is_admin: PropTypes.bool,
      job_title: PropTypes.string,
      profile_picture: PropTypes.string,
    }),
    createdat: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    numComments: PropTypes.number.isRequired,
    hasVoted: PropTypes.bool.isRequired,
    Answer: PropTypes.shape({
      answer: PropTypes.string,
      answer_id: PropTypes.number,
      answered_at: PropTypes.string,
      answered_by_id: PropTypes.number,
      hasScored: PropTypes.bool,
      canUndoNps: PropTypes.bool,
    }),
    mostUpvoted: PropTypes.bool,
    is_public: PropTypes.bool,
  }).isRequired,
  isQuestionModalOpen: PropTypes.bool.isRequired,
  hasAnswer: PropTypes.bool,
  shouldCollapse: PropTypes.bool,
  collapsed: PropTypes.bool,
  children: PropTypes.node,
  isFromList: PropTypes.bool,
};

QuestionRow.defaultProps = {
  children: null,
  hasAnswer: false,
  shouldCollapse: false,
  collapsed: false,
  isFromList: true,
};

export default QuestionRow;
