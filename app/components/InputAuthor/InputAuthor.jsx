import PropTypes from 'prop-types';
import UserImage from '~/components/Atoms/UserImage';
import { ANONYMOUS_USER } from '~/utils/constants';

const InputAuthor = (props) => {
  return (
    props.isAnonymous ? (
      <UserImage size="big" src={props.anonymousProfilePicture} />
    ) : (
      <UserImage
        src={props.profilePicture}
        size="big"
      />)
  );
}

InputAuthor.propTypes = {
  anonymousProfilePicture: PropTypes.string,
  profilePicture: PropTypes.string,
  isAnonymous: PropTypes.bool.isRequired,
};

InputAuthor.defaultProps = {
  profile: {},
  anonymousUsername: ANONYMOUS_USER.username,
  anonymousProfilePicture: ANONYMOUS_USER.profilePicture,
  isAsking: true,
  dropDownTitle: '',
  profilePicture: '',
  isAnonymous: false,
};

export default InputAuthor;
