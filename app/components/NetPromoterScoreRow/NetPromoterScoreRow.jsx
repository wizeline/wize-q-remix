import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '~/components/Atoms/Button';
import {
  DISPLAY_TEXT_BEFORE_SCORING,
  DISPLAY_TEXT_AFTER_SCORING,
  SCORES,
  UNDO_BUTTON_TEXT,
  TEXT_BUTTON,
} from '~/utils/constants';
import * as Styled from '~/components/NetPromoterScoreRow/NetPromoterScoreRow.styled';

function NetPromoterScoreRow(props) {
  const {
    answer_id,
    hasScored,
    canUndoNps,
    scoreAnswer,
    deleteScore,
  } = props;


  const [scored, setScored] = useState(hasScored);
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [undoNps, setUndoNps] = useState(canUndoNps);
  const [selected, setSelected] = useState(false);

  const sendScore = () => {
    const score = selectedOption;
    if (selected) {
      scoreAnswer(score, answer_id);
      setScored(true);
    }
  };

  const handleOptionsClick = (score) => {
    setSelectedOption(score);
    setUndoNps(true);
    setSelected(true);
  };

  const handleUndoClick = () => {
    deleteScore(answer_id);
    setScored(false);
    setSelected(false);
    setSelectedOption('');
  };

  const generateSendButton = () => (
    <Button
    //   id="nps-send-btn"
      type="button"
      category={TEXT_BUTTON}
      className="send-button"
      onClick={() => sendScore()}
    >
      Send
    </Button>
  );

  const generateUndoButton = canUndoNps_ => canUndoNps_ && (
    <Button
      id="nps-undo-btn"
      type="button"
      category={TEXT_BUTTON}
      className="undo-button"
      onClick={() => handleUndoClick()}
    >
      {UNDO_BUTTON_TEXT}
    </Button>
     );

  const NpsRating = () => (
    <Styled.NpsRowOptionsContainer>
      {SCORES.map(score => (
        <label
          key={score.name}
          className="nps-row__option--container"
          htmlFor={`choice${score.value}`}
        >
          <p>{score.name}</p>
          <input type="radio" name="score" checked={selectedOption === score.value} onClick={() => handleOptionsClick(score.value)} />
        </label>
      ))}
      {generateSendButton()}
    </Styled.NpsRowOptionsContainer>
    );


  return (
    <Styled.NpsRowContainer>
      <Styled.NpsRowDisplayText>
        <p>{scored ? DISPLAY_TEXT_AFTER_SCORING : DISPLAY_TEXT_BEFORE_SCORING}</p>
      </Styled.NpsRowDisplayText>
        
      {scored ? generateUndoButton(undoNps) : NpsRating()}
    </Styled.NpsRowContainer>
  );
}


NetPromoterScoreRow.propTypes = {
  answer_id: PropTypes.number.isRequired,
  hasScored: PropTypes.bool.isRequired,
  canUndoNps: PropTypes.bool.isRequired,
  scoreAnswer: PropTypes.func.isRequired,
  deleteScore: PropTypes.func.isRequired,
};

export default NetPromoterScoreRow;
