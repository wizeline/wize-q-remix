import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as Styled from './AnswerAdminOptions.Styled';

import editIcon from '~/images/ic_edit.svg';
import deleteIcon from '~/images/ic_delete.svg';
import { DISABLED_ANSWER_ICONS_TOOLTIP_MESSAGE } from '../../utils/constants';

function AnswerAdminOptions({
  isPreview,
  isDisabled,
  onAnswerClick,
  openDeleteAnswerModal,
  question,
}) {
  const [showTootip, setShowTooltip] = useState(false);
  return (
    <Styled.AnswerOptions isPreview={isPreview} isDisabled={isDisabled}>
      <button
        type="button"
        onMouseOver={() => isDisabled && setShowTooltip(true)}
        onFocus={() => isDisabled && setShowTooltip(true)}
        onMouseOut={() => isDisabled && setShowTooltip(false)}
        onBlur={() => isDisabled && setShowTooltip(false)}
        onClick={() => !isDisabled && onAnswerClick(question)}
        disabled={isDisabled}
      >
        <img src={editIcon} alt="Edit" />
      </button>
      <button
        type="button"
        onMouseOver={() => isDisabled && setShowTooltip(true)}
        onFocus={() => isDisabled && setShowTooltip(true)}
        onMouseOut={() => isDisabled && setShowTooltip(false)}
        onBlur={() => isDisabled && setShowTooltip(false)}
        onClick={() => !isDisabled && openDeleteAnswerModal(question)}
        disabled={isDisabled}
      >
        <img src={deleteIcon} alt="Delete" />
      </button>
      {isDisabled && showTootip && (
        <Styled.OptionsTooltip show={showTootip}>
          {DISABLED_ANSWER_ICONS_TOOLTIP_MESSAGE}
        </Styled.OptionsTooltip>
      )}
    </Styled.AnswerOptions>
  );
}

AnswerAdminOptions.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  isPreview: PropTypes.bool,
  onAnswerClick: PropTypes.func.isRequired,
  openDeleteAnswerModal: PropTypes.func.isRequired,
  question: PropTypes.shape().isRequired,
};

AnswerAdminOptions.defaultProps = {
  isPreview: false,
};

export default AnswerAdminOptions;
