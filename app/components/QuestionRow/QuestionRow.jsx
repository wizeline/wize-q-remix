import { useState } from 'react';
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


const renderLocation = (location, locations) => {
  if (locations.length === 0) {
    return '...';
  }

  return locations.find(loc => loc.code === location).name;
};

const QuestionRow = (props) => {
  const {
    question,
    locations,
    isQuestionModalOpen,
    hasAnswer,
    shouldCollapse,
    collapsed,
    children,
    isAdmin,
    fetchQuestionsList,
    isFromList,
  } = props;
  const [isProcessingPinStateChange, setIsProcessingPinStateChange] = useState(false);

  const isUpdated = false;

  const clickPinOptionHandler = async (event) => {
    // event.stopPropagation();
    // if (isProcessingPinStateChange) return;
    // setIsProcessingPinStateChange(true);
    // const newPinStatusValue = question.is_pinned ? 'false' : 'true';
    // try {
    //   const response = await axios.post(`/api/questions/${question.question_id}/pin-status?pinStatus=${newPinStatusValue}`, {}, axiosConfig());
    //   if (response.status !== 200) {
    //     throw new Error('Unexpected status in the response when trying to update the pin status for the question');
    //   }
    //   if (response.data.is_pinned === undefined
    //         || (response.data.is_pinned !== true && response.data.is_pinned !== false)) {
    //     throw new Error('Unexpected value for is_pinned property in the response of the request');
    //   }
    //   // successAlertWithDuration(`The question has been ${response.data.is_pinned ? 'pinned' : 'unpinned'}`, 1000);
    //   fetchQuestionsList();
    // } catch (e) {
    //   // dangerAlertWithDuration('Error trying to pin/unpin the question', 1000);
    // }
    // setIsProcessingPinStateChange(false);
  };

  const adminPinButton = (isAdmin && !question.is_pinned)
    ? (
      <Styled.PinQuestionIconHolder onClick={clickPinOptionHandler} className="pin-tooltip" >
        <Styled.PinActionableIconHolder src={pinIcon} alt="Icon" />
        <span className="pin-tooltip-message">Pin question to the top of the list</span>
      </Styled.PinQuestionIconHolder>)
    : (
      <Styled.PinQuestionIconHolder onClick={clickPinOptionHandler} className="pin-tooltip" >
        <Styled.UnpinActionableIconHolder src={pinIcon} alt="Icon" />
        <span className="pin-tooltip-message">Unpin question from top of the list</span>
      </Styled.PinQuestionIconHolder>);

  const nonAdminPinIndicator = (!isAdmin && question.is_pinned) && (
    <Styled.PinnedIndicator>
      <span>Pinned by admin</span> <img src={pinIcon} alt="Icon" />
    </Styled.PinnedIndicator>);

  const renderIcon = () => (
    <div className="question-row--locationIcon">
      <HiOutlineLocationMarker />
    </div>
  );

  return (
    <Styled.QuestionRowContainer isQuestionModalOpen={isQuestionModalOpen}>
      <Styled.QuestionRowMetadataTop>
        <ConditionalLinkTo to={`/question/${question.question_id}`} condition={isFromList}>
          <QuestionResponderInfo
            department={renderDepartment(question.Department)}
            createdBy={question.created_by_user}
          />
        </ConditionalLinkTo>
        <Styled.QuestionRowLine isQuestionModalOpen={isQuestionModalOpen} hasAnswer={hasAnswer} />
        {isAdmin ? adminPinButton : nonAdminPinIndicator}
      </Styled.QuestionRowMetadataTop>
      <Styled.QuestionRowWrapper hasAnswer={hasAnswer} isQuestionModalOpen={isQuestionModalOpen}>
        <ConditionalLinkTo to={`/question/${question.question_id}`} condition={isFromList}>
          <Styled.QuestionRowContent>
            <QuestionMarkdown
              source={formatCollapsingText(
                question.question,
                shouldCollapse && !isQuestionModalOpen,
                collapsed,
                COLLAPSED_QUESTION_MIN_LENGTH,
              )
            }
            />
          </Styled.QuestionRowContent>
        </ConditionalLinkTo>
        {children}
        <Styled.QuestionRowMetadataBottom>
          <div className="question-row--metadataWrapper">
            <div className="question-row--locationWrapper">
              {renderIcon()}
              {`${renderLocation(question.location, locations)}`}
            </div>
            {`| Question ID: Q${question.question_id}`}
          </div>
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
  isAdmin: PropTypes.bool.isRequired,
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
    Votes: PropTypes.number.isRequired,
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
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isQuestionModalOpen: PropTypes.bool.isRequired,
  hasAnswer: PropTypes.bool,
  shouldCollapse: PropTypes.bool,
  collapsed: PropTypes.bool,
  children: PropTypes.node,
  fetchQuestionsList: PropTypes.func.isRequired,
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
