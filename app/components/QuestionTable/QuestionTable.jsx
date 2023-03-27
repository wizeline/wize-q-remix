/* eslint-disable react/no-array-index-key */
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
          <div style={{ display: 'flex', width: '100%' }} key={`${idx}-question${question.question_id}-1`}>
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
          <div style={{ display: 'flex', padding: '0px 10px' }} key={`${idx}-question${question.question_id}-2`}>
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
          <div style={{ display: 'flex', padding: '0px 10px' }} key={`${idx}-question${question.question_id}-3`}>
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
      <Table theaders={questionsHeaders} tdata={questionData} key={title} />
    </styled.Container>
  );
}

QuestionTable.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  title: PropTypes.string.isRequired,
};

export default QuestionTable;
