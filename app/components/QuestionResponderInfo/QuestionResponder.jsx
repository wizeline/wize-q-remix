import PropTypes from 'prop-types';

import * as Styled from './/QuestionResponderInfo.Styled';
import UserImage from '~/components/Atoms/UserImage';
import { ANONYMOUS_USER } from '~/utils/constants';

function QuestionerResponderInfo(props) {
  const { department, isAnswer } = props;

  const renderName = (createdBy) => {
    if (createdBy && createdBy.full_name) {
      return createdBy.full_name;
    }
    return ANONYMOUS_USER.username;
  };

  const renderProfilePicture = (createdBy) => {
    if (createdBy && createdBy.profile_picture) {
      return createdBy.profile_picture;
    }
    return ANONYMOUS_USER.profilePicture;
  };

  const renderJobTitle = (createdBy) => {
    if (createdBy && createdBy.is_admin && createdBy.job_title) {
      return createdBy.job_title;
    }
    return '';
  };

  const renderDepartment = () => (department &&
      (<Styled.QuestionResponderDepartment isAnswer={isAnswer} department={department}>
        {props.department}
      </Styled.QuestionResponderDepartment>));

  const { createdBy } = props;
  const fullName = renderName(createdBy);
  const jobTitle = renderJobTitle(createdBy);
  const profilePicture = renderProfilePicture(createdBy);
  return (
    <Styled.QuestionerResponderContainer>
      <UserImage src={profilePicture} size={props.userImgSize} />
      <Styled.QuestionerResponderInfoContainer>
        <Styled.QuestionerResponderName>
          {fullName}
        </Styled.QuestionerResponderName>
        <Styled.QuestionerResponderJobTitle>
          {jobTitle}
        </Styled.QuestionerResponderJobTitle>
        {renderDepartment()}
      </Styled.QuestionerResponderInfoContainer>
    </Styled.QuestionerResponderContainer>
  );
}

QuestionerResponderInfo.defaultProps = {
  createdBy: {
    full_name: ANONYMOUS_USER.username,
    profile_picture: ANONYMOUS_USER.profilePicture,
  },
  userImgSize: 'big',
  circumstance: '',
  department: null,
  isAnswer: false,
};

QuestionerResponderInfo.propTypes = {
  createdBy: PropTypes.shape({
    full_name: PropTypes.string.isRequired,
    profile_picture: PropTypes.string.isRequired,
  }),
  userImgSize: PropTypes.string,
  department: PropTypes.string,
  isAnswer: PropTypes.bool,
};

export default QuestionerResponderInfo;