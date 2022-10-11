import PropTypes from 'prop-types';
import { formatCollapsingText } from '~/utils/stringOperations';
import { getFormattedDate } from '~/utils/dateFormat';
import { renderDepartment } from '~/utils/questionUtils';
import { COLLAPSED_QUESTION_MIN_LENGTH } from '~/utils/constants';
import * as Styled from './QuestionRow.Styled';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import pinIcon from '~/images/ic_pin.svg';
import ConditionalLinkTo from '~/components/Atoms/ConditionalLinkTo';
import QuestionResponderInfo from '~/components/QuestionResponderInfo';
import QuestionMarkdown from '~/components/QuestionMarkdown';
import { useLoaderData, useSubmit } from '@remix-run/react';
import { useUser } from '~/utils/hooks/useUser';
import { getDateData } from '~/utils/timeOperations';
import { useRef } from 'react';
import { ACTIONS } from '~/utils/actions';


const renderLocation = (location, locations) => {
  if (locations.length === 0) {
    return '...';
  }

  return locations.find(loc => loc.code === location).name;
};


const QuestionRow = (props) => {
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
  const submit = useSubmit();

  const onPinChange = () => {
    const newPinStatusValue = question.is_pinned ? 'false' : 'true';
    const data = new FormData(pinForm.current);
    data.set("action", ACTIONS.PINNIN);
    data.set("questionId", question.question_id);
    data.set("value", newPinStatusValue);

    submit(
      data,
      { method: "post", action: "/?index"}
    );
  }

  const adminPinButton = (profile.is_admin && !question.is_pinned)
    ? (
      <Styled.PinQuestionIconHolder onClick={onPinChange} >
        <Styled.PinActionableIconHolder src={pinIcon} alt="Icon" />
        <Styled.PinTooltipMessage>Pin question to the top of the list</Styled.PinTooltipMessage>
      </Styled.PinQuestionIconHolder>)
    : (
      <Styled.PinQuestionIconHolder onClick={onPinChange} className="pin-tooltip" >
        <Styled.UnpinActionableIconHolder src={pinIcon} alt="Icon" />
        <Styled.PinTooltipMessage>Unpin question from top of the list</Styled.PinTooltipMessage>
      </Styled.PinQuestionIconHolder>);

  const nonAdminPinIndicator = (!profile.is_admin && question.is_pinned) && (
    <Styled.PinnedIndicator>
      <span>Pinned by admin</span> <img src={pinIcon} alt="Icon" />
    </Styled.PinnedIndicator>);

  const renderIcon = () => (
    <div>
      <HiOutlineLocationMarker />
    </div>
  );

  return (
    <Styled.QuestionRowContainer isQuestionModalOpen={isQuestionModalOpen}>
      <Styled.QuestionRowMetadataTop>
        <ConditionalLinkTo to={`/question/${question.question_id}`} condition={isFromList}>
          <QuestionResponderInfo
            department={renderDepartment(question.Department)}
            createdBy={question.created_by}
          />
        </ConditionalLinkTo>
        <Styled.QuestionRowLine isQuestionModalOpen={isQuestionModalOpen} hasAnswer={hasAnswer} />
        <Styled.RightWrapper>
          <Styled.QuestionRowDate>
            <em>{isUpdated && ' (edited)'}</em>
            {getDateData(question.createdAt)}
          </Styled.QuestionRowDate>
          {profile.is_admin ? adminPinButton : nonAdminPinIndicator}
        </Styled.RightWrapper>      </Styled.QuestionRowMetadataTop>
      <Styled.QuestionRowWrapper hasAnswer={hasAnswer} isQuestionModalOpen={isQuestionModalOpen}>
        <ConditionalLinkTo to={`/questions/${question.question_id}`} condition={isFromList}>
          <Styled.QuestionRowContent>
            {<QuestionMarkdown
              source={formatCollapsingText(
                question.question,
                shouldCollapse && !isQuestionModalOpen,
                collapsed,
                COLLAPSED_QUESTION_MIN_LENGTH,
              )
            }
            />}
          </Styled.QuestionRowContent>
        </ConditionalLinkTo>
        {children}
        <Styled.QuestionRowMetadataBottom>
          <Styled.QuestionRowMetadataSectionOne>
            <Styled.LocationWrapper>
              {renderIcon()}
              {`${renderLocation(question.location, locations)}`}
            </Styled.LocationWrapper>
            {`| Question ID: Q${question.question_id}`}
          </Styled.QuestionRowMetadataSectionOne>
          <div>
            <em>{isUpdated && ' (edited)'}</em>
            {getFormattedDate(question.createdAt)}
          </div>
        </Styled.QuestionRowMetadataBottom>
        <Styled.QuestionRowBorderBottom />
      </Styled.QuestionRowWrapper>
    </Styled.QuestionRowContainer>
  );
};

QuestionRow.propTypes = {
  question: PropTypes.shape({
    question_id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    is_anonymous: PropTypes.bool.isRequired,
    is_pinned: PropTypes.bool.isRequired,
    user_hash: PropTypes.string,
    can_edit: PropTypes.bool,
    created_by_user: PropTypes.shape({
      email: PropTypes.string,
      employee_id: PropTypes.number,
      full_name: PropTypes.string,
      is_admin: PropTypes.bool,
      job_title: PropTypes.string,
      profile_picture: PropTypes.string,
    }),
    createdAt: PropTypes.string.isRequired,
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
  }).isRequired,
  isQuestionModalOpen: PropTypes.bool.isRequired,
  hasAnswer: PropTypes.bool,
  shouldCollapse: PropTypes.bool,
  collapsed: PropTypes.bool,
  children: PropTypes.node,
  isFromList: PropTypes.bool,
  onPinChange: PropTypes.func.isRequired,
};

QuestionRow.defaultProps = {
  children: null,
  hasAnswer: false,
  shouldCollapse: false,
  collapsed: false,
  isFromList: true,
};

export default QuestionRow;
