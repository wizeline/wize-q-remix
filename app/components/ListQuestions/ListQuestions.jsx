import React, { useState, useRef } from 'react';
import { useSubmit, useSearchParams, useTransition } from '@remix-run/react';
import PropTypes from 'prop-types';
import * as Styled from 'app/components/ListQuestions/ListQuestions.Styled';
import Slogan from 'app/components/Slogan';
import QuestionCard from 'app/components/QuestionCard';
import useUser from 'app/utils/hooks/useUser';
import GoToTopButton from 'app/components/GoToTopButton';
import markdownFormatQuestion from 'app/utils/markdownFormatQuestions';
import InfiniteScrollList from 'app/components/Atoms/InfiniteScrollList';
import Filters from 'app/components/Filters';
import ACTIONS from 'app/utils/actions';

function ListQuestions({
  questions,
  onFetchMore,
}) {
  const submit = useSubmit();
  const transition = useTransition();
  const voteQuestionForm = useRef();
  const profile = useUser();

  const [searchParams, setSearchParams] = useSearchParams();

  const [title, setTitle] = useState('Newest Questions');

  // TODO: Implement search
  const state = {
    searchTerm: undefined,
  };

  const decorateQuestion = (question) => ({
    ...question,
    question: markdownFormatQuestion(question.question, state.searchTerm),
    hasVoted: !!question.hasVoted,
  });

  const clearFilters = (params) => {
    params.forEach((param) => {
      searchParams.delete(param);
    });

    setSearchParams(searchParams);
  };

  const modifyQuery = (field, value) => {
    if (field === 'order') {
      if (value === 'oldest') {
        setTitle('Oldest Questions');
      } else if (value === 'newest') {
        setTitle('Newest Questions');
      } else if (value === 'popular') {
        setTitle('Popular Questions');
      } else if (value === 'most_commented') {
        setTitle('Most Commented Questions');
      }
    }

    if (value === undefined) {
      searchParams.delete(field);
    } else {
      searchParams.set(field, value);
    }
    setSearchParams(searchParams);
  };

  const displayUsername = (user) => {
    if (!user) {
      return 'Anonymous';
    }
    return user.full_name;
  };

  const displayAnsweredBy = (username) => {
    const answeredBy = username ? `Answered by ${username}` : '';
    return answeredBy;
  };

  const renderQuestionsList = () => {
    const onLikeButtonClick = (questionId, isUpVote) => {
      if (transition.state !== 'idle') {
        return;
      }
      const data = new FormData(voteQuestionForm.current);
      data.set('action', ACTIONS.VOTE_QUESTION);
      data.set('questionId', questionId);
      data.set('user', JSON.stringify(profile));
      data.set('isUpVote', isUpVote);
      let actionUrl = '/?index';
      searchParams.forEach((value, key) => {
        actionUrl += value ? `&${key}=${value}` : '';
      });
      submit(data, { method: 'post', action: actionUrl, replace: true });
    };

    if (questions.length === 0) { return null; }

    return questions.map((question, index) => (
      <QuestionCard
        key={question.question_id}
        question={decorateQuestion(question)}
        isAdmin={profile.is_admin}
        displayUsername={displayUsername}
        displayAnsweredBy={displayAnsweredBy}
        searchTerm={state.searchTerm}
        index={index}
        onVoteClick={(isUpVote) => onLikeButtonClick(question.question_id, isUpVote)}
        processingFormSubmission={transition.state !== 'idle'}
      />
    ));
  };

  const renderNoResultMessage = () => {
    if (state.searchTerm) {
      return 'Oops! There are no results for your search';
    }
    if (!questions) {
      return 'Loading questions...';
    }
    return 'There are no questions yet, how about asking one?';
  };

  const generateAskQuestionButton = () => (
    <Styled.AskButton to="/questions/new" id="ask-button">
      Ask Question
    </Styled.AskButton>
  );

  return (
    <Styled.Container>
      {/* TODO: Add left hashtag's panel */}
      <Styled.LeftWrapper>
        <Styled.SloganWrapper>
          <Slogan />
        </Styled.SloganWrapper>
      </Styled.LeftWrapper>
      <Styled.CenterWrapper>
        <Styled.QuestionsWrapper>
          <Styled.AskQuestionButtonWrapper>
            <Styled.QuestionsTitle>
              {title}
            </Styled.QuestionsTitle>
            {generateAskQuestionButton()}
          </Styled.AskQuestionButtonWrapper>
          {questions.length === 0 ? (
            <Styled.Alert>{renderNoResultMessage()}</Styled.Alert>
          ) : (
            <InfiniteScrollList onFetch={onFetchMore}>
              <Styled.QuestionList id="questions-list">
                {renderQuestionsList(questions)}
              </Styled.QuestionList>
            </InfiniteScrollList>
          )}
        </Styled.QuestionsWrapper>
      </Styled.CenterWrapper>
      <Styled.RightWrapper>
        <Styled.FiltersWrapper>
          <Filters
            modifyQuery={modifyQuery}
            clearFilters={clearFilters}
          />
        </Styled.FiltersWrapper>
      </Styled.RightWrapper>
      <GoToTopButton />
    </Styled.Container>
  );
}

ListQuestions.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape(),
  ),
  onFetchMore: PropTypes.func.isRequired,
};

ListQuestions.defaultProps = {
  questions: [],
};

export default ListQuestions;
