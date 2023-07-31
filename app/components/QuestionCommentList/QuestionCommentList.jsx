import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLoaderData } from '@remix-run/react';
import * as Styled from 'app/components/QuestionCommentList/QuestionCommentList.styled';
import reorderHighlightedComments from 'app/utils/comments/commentUtils';
import QuestionComment from 'app/components/QuestionComment';
import SortQuestionCommentsDropdown from 'app/components/SortQuestionCommentsDropdown';

function QuestionCommentList(props) {
  const { comments } = useLoaderData();

  QuestionCommentList.propTypes = {
    questionId: PropTypes.number.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    hasAnswer: PropTypes.bool.isRequired,
    children: PropTypes.node,
  };

  QuestionCommentList.defaultProps = {
    children: null,
  };

  const initialState = {
    isLoading: true,
    sortCommentsOption: 'votes',
  };

  const { isAdmin, hasAnswer } = props;
  const [, setState] = useState(initialState);

  // const handleDeleteCommentSuccess = () => fetchComments();

  const renderCommentsList = (_comments) => {
    const [
      communityAnswerCommentId,
      reorderedByPriorityComments,
    ] = reorderHighlightedComments(_comments);
    return reorderedByPriorityComments.map((comment) => (
      <QuestionComment
        {...comment}
        key={comment.id}
       // onSubmitSuccess={handleDeleteCommentSuccess}
        commentData={comment}
        isAdmin={isAdmin}
        hasCommentAsAnswer={comments.some((_comment) => _comment.approvedby !== null)}
        hasAnswer={hasAnswer}
        isCommunityAnswer={comment.id === communityAnswerCommentId}
      />
    ));
  };

  const sortCommentsOptionChangeHandler = (sortCommentsOption) => {
    setState((prevState) => ({
      isLoading: prevState.isLoading,
      sortCommentsOption,
    }));
  };

  const sortCommentsDropdown = (
    <Styled.SortSelectorContainer>
      <Styled.SortSelectorText>Order by:</Styled.SortSelectorText>
      <SortQuestionCommentsDropdown
        questionId={props.questionId}
        onSortCommentsOptionChange={sortCommentsOptionChangeHandler}
        defaultSortingOptionText="Most voted"
      />
    </Styled.SortSelectorContainer>
  );

  return (
    <Styled.CommentListContainer>
      <Styled.CommentListHeader>
        {props.children}
        {comments.length > 0 && sortCommentsDropdown}
      </Styled.CommentListHeader>
      {renderCommentsList(comments)}
    </Styled.CommentListContainer>
  );
}

export default QuestionCommentList;
