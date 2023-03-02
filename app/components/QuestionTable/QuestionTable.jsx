/* eslint-disable no-underscore-dangle */
import React from 'react';
import Table from 'app/components/Atoms/Table/Table';
import PropTypes from 'prop-types';
import commentIcon from 'app/images/ic_comment.svg';
import likeIconVoted from 'app/images/ic_like_pressed.svg';
import * as styled from 'app/components/QuestionTable/QuestionTable.styled';
import ConditionalLinkTo from '../Atoms/ConditionalLinkTo';

function QuestionTable({ questions, title }) {
  const questionsHeaders = [title, '', ''];
  const questionData = questions.map((question, idx) => (
    {
      id: idx,
      data: [{
        item: (
          <div style={{ display: 'flex', width: '100%' }}>
            <ConditionalLinkTo to={`/questions/${question.question_id}`} condition className="">
              {' '}
              { question.question }
              {' '}
            </ConditionalLinkTo>
          </div>
        ),
        icon: null,
      }, {
        item: (
          <div style={{ display: 'flex', padding: '0px 10px' }}>
            <img src={commentIcon} alt="" />
            <div style={{ padding: '0px 5px' }}>
              {' '}
              {question._count.Comments}
              {' '}
            </div>
          </div>
        ),
        icon: null,
      },
      {
        item: (
          <div style={{ display: 'flex', padding: '0px 10px' }}>
            <img src={likeIconVoted} alt="" />
            <div style={{ padding: '0px 5px' }}>
              {' '}
              {question.numLikes}
              {' '}
            </div>
          </div>
        ),
      }],
    }));

  return (
    <styled.Container>
      <Table theaders={questionsHeaders} tdata={questionData} />
    </styled.Container>
  );
}

QuestionTable.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  title: PropTypes.string.isRequired,
};

export default QuestionTable;
