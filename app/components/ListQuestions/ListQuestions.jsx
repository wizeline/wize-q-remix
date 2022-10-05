import { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';
import * as Styled from './ListQuestions.Styled';
import {
  DEFAULT_DEPARTMENT_ID,
  DEFAULT_LOCATION,
  FILTER_BY_USER_TEXT,
  FILTER_BY_USER_TYPES,
  PAGE_QUESTIONS_LIMIT,
  PRIMARY_BUTTON,
} from '~/utils/constants';
import Slogan from '~/components/Slogan';
import Button from '~/components/Atoms/Button';
import QuestionCard from '~/components/QuestionCard';
import { useUser } from '~/utils/hooks/useUser';
import GoToTopButton from '~/components/GoToTopButton';
import markdownFormatQuestion from '~/utils/markdownFormatQuestions';
import InfiniteScrollList from '~/components/Atoms/InfiniteScrollList';
import { Link } from '@remix-run/react';
import Filters from '~/components/Filters';

const ListQuestions = (props) => {
  const profile = useUser();

  const {
    type,
    search,
    questions,
    currentQuestion,
    getQuestionById,
    fetchMoreQuestions,
    fetchQuestions,
  } = props;

  const initialState = {
    initiated: false,
    questionVotes: {},
    searchTerm: '',
    showAnswerModal: false,
    showAssignAnswerModal: false,
    showQuestionModal: false,
    showDeleteAnswerModal: false,
    question: {},
    filterByUserEnum: FILTER_BY_USER_TYPES,
    filterByUserText: FILTER_BY_USER_TEXT,
    open: false,
    answerCollapsing: {},
  };

  const [state, setState] = useState(initialState);
  const [title, setTitle] = useState('Newest Questions');

  const fetchQuestionsQuery = useRef({
    type,
    offset: 0,
    order: '',
    dateRange: '',
    status: '',
    search: '',
    limit: PAGE_QUESTIONS_LIMIT,
    location: DEFAULT_LOCATION,
    filterByUser: false,
    tag: '',
    departmentId: DEFAULT_DEPARTMENT_ID,
  });

  const callFetchQuestions = () => {
    fetchQuestions(fetchQuestionsQuery.current);
  };

  const checkQuestionIdParams = () => {
    // const query = parse(search) || {};
    // if (query.questionId) {
    //   getQuestionById(query.questionId);
    // }
  };


  const decorateQuestion = question => ({
    ...question,
    question: markdownFormatQuestion(question.question, state.searchTerm),
    hasVoted: !!question.hasVoted,
  });


  const modifyQuery = (field, value) => {
    fetchQuestionsQuery.current[field] = value;
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

  const callFetchMoreQuestions = () => {
    const offset = questions.length;
    fetchMoreQuestions({
      ...fetchQuestionsQuery.current,
      offset,
    });
  };


  const renderQuestionsList = () => {
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
        fetchQuestionsList={callFetchQuestions}
      />
    ));
  };

  const renderNoResultMessage = () => {
    if (state.searchTerm) {
      return 'Oops! There are no results for your search';
    }
    if (!questions && type.match(/all/i)) {
      return 'Loading questions...';
    }
    return 'There are no questions yet, how about asking one?';
  };

  const generateAskQuestionButton = () => (
    <Button
      id="ask-question-btn"
      type="button"
      category={PRIMARY_BUTTON}
      className="ask-question-button"
    >
    Ask Question
    </Button>
     );

  useEffect(() => {
    // if (!state.initiated) {
    //   const query = parse(search) || {};
    //   fetchQuestionsQuery.current.tag = query.tag || '';
    //   callFetchQuestions();
    //   checkQuestionIdParams();

    //   setState({
    //     ...state,
    //     initiated: true,
    //   });
    // } else if (currentQuestion && currentQuestion.question_id) {
    //   setState({
    //     ...state,
    //     question: currentQuestion,
    //     showQuestionModal: true,
    //   });
    // }
  }, [currentQuestion]);

  return (
    <Styled.Container>
      {/* TODO: Add left hashtag's panel */}
      <Styled.SloganWrapper>
        <Slogan />
      </Styled.SloganWrapper>
      <Styled.QuestionsWrapper>
        <Styled.AskQuestionButtonWrapper>
          <Styled.QuestionsTitle>
            {title}
          </Styled.QuestionsTitle>
          <Link to="/question">
            {generateAskQuestionButton()}
          </Link>
        </Styled.AskQuestionButtonWrapper>
        {questions.length === 0 ? (
          <Styled.Alert>{renderNoResultMessage()}</Styled.Alert>
          ) : (
            <InfiniteScrollList onFetch={callFetchMoreQuestions}>
              <Styled.QuestionList>
                {renderQuestionsList(questions)}
              </Styled.QuestionList>
            </InfiniteScrollList>
          )}
      </Styled.QuestionsWrapper>
      <Styled.FiltersWrapper>
        <Filters
          callFetchQuestions={callFetchQuestions}
          modifyQuery={modifyQuery}
        />
      </Styled.FiltersWrapper>
      <GoToTopButton />
    </Styled.Container>
  );
};

ListQuestions.contextTypes = {
  router: PropTypes.object,
};

ListQuestions.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape(),
  ),
  currentQuestion: PropTypes.shape(),
  profile: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  type: PropTypes.string,
  fetchQuestions: PropTypes.func.isRequired,
  fetchMoreQuestions: PropTypes.func.isRequired,
  voteSocketQuestion: PropTypes.func.isRequired,
  search: PropTypes.string,
  getQuestionById: PropTypes.func.isRequired,
};

ListQuestions.defaultProps = {
  questions: [],
  currentQuestion: {},
  type: '',
  isValidProfile: false,
  search: null,
};


export default ListQuestions;
