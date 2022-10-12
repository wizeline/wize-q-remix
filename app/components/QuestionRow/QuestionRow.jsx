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
import { useLoaderData } from '@remix-run/react';
import { useUser } from '~/utils/hooks/useUser';
import { getDateData } from '~/utils/timeOperations';


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
  // const [isProcessingPinStateChange, setIsProcessingPinStateChange] = useState(false);

  const profile = useUser();

  const { locations } = useLoaderData();
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

  const adminPinButton = (profile.is_admin && !question.is_pinned)
    ? (
      <Styled.PinQuestionIconHolder onClick={clickPinOptionHandler} >
        <Styled.PinActionableIconHolder src={pinIcon} alt="Icon" />
        <Styled.PinTooltipMessage>Pin question to the top of the list</Styled.PinTooltipMessage>
      </Styled.PinQuestionIconHolder>)
    : (
      <Styled.PinQuestionIconHolder onClick={clickPinOptionHandler} className="pin-tooltip" >
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
        <ConditionalLinkTo to={`/questions/${question.question_id}`} condition={isFromList}>
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
};

QuestionRow.defaultProps = {
  children: null,
  hasAnswer: false,
  shouldCollapse: false,
  collapsed: false,
  isFromList: true,
};

export default QuestionRow;
