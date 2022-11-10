import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Styled from '~/components/QuestionCommentList/QuestionCommentList.styled';
import {reorderHighlightedComments} from '~/utils/commentUtils'
import QuestionComment from '~/components/QuestionComment';
import SortQuestionCommentsDropdown from '~/components/SortQuestionCommentsDropdown';
import { useLoaderData } from "@remix-run/react";


function QuestionCommentList(props) {

  const {comments} = useLoaderData();
  
    QuestionCommentList.propTypes = {
      questionId: PropTypes.number.isRequired,
      isAdmin: PropTypes.bool.isRequired,
      hasAnswer: PropTypes.bool.isRequired,
      children: PropTypes.node,
    };
  
    QuestionCommentList.defaultProps = {
      profile: {
        name: '',
        picture: '',
        email: '',
      },
      children: null,
    };
  
    const initialState = {
      isLoading: true,
      sortCommentsOption: 'votes',
    };
  
    const {isAdmin, hasAnswer } = props;
    const [state, setState] = useState(initialState);
    const [hasCommentAsAnswer, sethasCommentAsAnswer] = useState(false);
  
    const fetchComments = async () => {
      const { questionId } = props;
      await props.getCommentsByQuestionId(questionId, state.sortCommentsOption);
      setState(prevState => ({
        isLoading: false,
        sortCommentsOption: prevState.sortCommentsOption,
      }));
    };
  
    function checkIfQuestionHasAnAnswer() {
      const commentsFilters = comments.filter(comment => comment.approvedBy !== null);
      sethasCommentAsAnswer(commentsFilters.length > 0);
    }
  
    useEffect(() => {
      fetchComments();
    }, []);
  
    useEffect(() => {
      checkIfQuestionHasAnAnswer();
    }, [state]);
  
    const handleDeleteCommentSuccess = () => fetchComments();
  
    const renderCommentsList = (_comments) => {
      const [
        communityAnswerCommentId,
        reorderedByPriorityComments,
      ] = reorderHighlightedComments(_comments);
      return reorderedByPriorityComments.map(comment => (
        <QuestionComment
          {...comment}
          key={comment.id}
          onSubmitSuccess={handleDeleteCommentSuccess}
          commentData={comment}
          isAdmin={isAdmin}
          hasCommentAsAnswer={hasCommentAsAnswer}
          hasAnswer={hasAnswer}
          isCommunityAnswer={comment.id === communityAnswerCommentId}
        />
      ));
    };
  
    const sortCommentsOptionChangeHandler = (sortCommentsOption) => {
      setState(prevState => ({
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
          defaultSortingOptionText={'Most voted'}
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