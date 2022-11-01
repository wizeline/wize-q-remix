import PropTypes from 'prop-types';

import * as Styled from './/QuestionResponderInfo.Styled';
import UserImage from '~/components/Atoms/UserImage';
import { ANONYMOUS_USER } from '~/utils/constants';

function QuestionerResponderInfo(props) {
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

  const { children, createdBy } = props;
  const fullName = renderName(createdBy);
  const jobTitle = renderJobTitle(createdBy);
  const profilePicture = renderProfilePicture(createdBy);
  return (
    <Styled.QuestionerResponderContainer>
      <UserImage src={profilePicture} size={props.userImgSize} />
      <Styled.QuestionerResponderInfoContainer>
        <Styled.TopContainer>
          <Styled.QuestionerResponderName>
            {fullName}
          </Styled.QuestionerResponderName>
          {children}
        </Styled.TopContainer>
        <Styled.QuestionerResponderJobTitle>
          {jobTitle}
        </Styled.QuestionerResponderJobTitle>
      </Styled.QuestionerResponderInfoContainer>
    </Styled.QuestionerResponderContainer>
  );
}

QuestionerResponderInfo.defaultProps = {
  createdBy: {
    full_name: ANONYMOUS_USER.username,
    profile_picture: ANONYMOUS_USER.profilePicture,
  },
  userImgSize: 'medium',
  circumstance: '',
  department: null,
  isAnswer: false,
  children: null,
};

QuestionerResponderInfo.propTypes = {
  createdBy: PropTypes.shape({
    full_name: PropTypes.string.isRequired,
    profile_picture: PropTypes.string.isRequired,
  }),
  userImgSize: PropTypes.string,
  department: PropTypes.string,
  isAnswer: PropTypes.bool,
  children: PropTypes.node,
};

export default QuestionerResponderInfo;
