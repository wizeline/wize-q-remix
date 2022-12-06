/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'react-bootstrap';
import * as Styled from './CommentInput.styled';
import useUser from '../../utils/hooks/useUser';
import { ANONYMOUS_USER } from '../../utils/constants';

function CommentInputAuthor(props) {
  const {
    anonymousUsername,
    anonymousProfilePicture,
    profilePicture,
    selectPostingAs,
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
        <MenuItem eventKey={anonymousUsername}>
          <Styled.AuthorImg
            variant="dropdown"
            src={anonymousProfilePicture}
          />
          Anonymous
        </MenuItem>
      </Styled.DropdownButtonStyled>
    </Styled.CommentInputAuthor>
  );
}

CommentInputAuthor.propTypes = {
  anonymousUsername: PropTypes.string,
  anonymousProfilePicture: PropTypes.string,
  profilePicture: PropTypes.string.isRequired,
  selectPostingAs: PropTypes.func.isRequired,
};

CommentInputAuthor.defaultProps = {
  anonymousUsername: ANONYMOUS_USER.username,
  anonymousProfilePicture: ANONYMOUS_USER.profilePicture,
};

export default CommentInputAuthor;
