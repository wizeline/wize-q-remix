/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'react-bootstrap';
import * as Styled from 'app/components/CommentInput/CommentInput.styled';
import useUser from 'app/utils/hooks/useUser';
import { ANONYMOUS_USER } from 'app/utils/constants';

function CommentInputAuthor(props) {
  const {
    anonymousUsername,
    anonymousProfilePicture,
    profilePicture,
    selectPostingAs,
    is_public
  } = props;

  const profile = useUser();

  const renderUserProfile = ({ full_name, profile_picture }) => full_name && (
    <MenuItem eventKey={full_name}>
      <Styled.AuthorImg
        variant="dropdown"
        src={profile_picture}
      />
      {full_name}
    </MenuItem>
  );

  const renderDropdownTitle = () => (
    <div>
      <Styled.CommentInputAuthorPictureDiv>
        <Styled.AuthorImg src={profilePicture} />
      </Styled.CommentInputAuthorPictureDiv>
      <Styled.AuthorNameContainer>
        <Styled.AuthorNameContainerCaret />
      </Styled.AuthorNameContainer>
    </div>
  );

  return (
    <Styled.CommentInputAuthor>
      <Styled.DropdownButtonStyled
        bsStyle="default"
        title={renderDropdownTitle()}
        onSelect={selectPostingAs}
        noCaret
        dropup
      >
        {renderUserProfile(profile)}
        {is_public && <MenuItem eventKey={anonymousUsername}>
          <Styled.AuthorImg
            variant="dropdown"
            src={anonymousProfilePicture}
          />
          Anonymous
        </MenuItem>}
      </Styled.DropdownButtonStyled>
    </Styled.CommentInputAuthor>
  );
}

CommentInputAuthor.propTypes = {
  anonymousUsername: PropTypes.string,
  anonymousProfilePicture: PropTypes.string,
  profilePicture: PropTypes.string.isRequired,
  selectPostingAs: PropTypes.func.isRequired,
  is_public: PropTypes.bool.isRequired,
};

CommentInputAuthor.defaultProps = {
  anonymousUsername: ANONYMOUS_USER.username,
  anonymousProfilePicture: ANONYMOUS_USER.profilePicture,
  is_public: false,
};

export default CommentInputAuthor;
