import { json } from '@remix-run/node';
import {
  useFetcher, useLoaderData, useSearchParams,
} from '@remix-run/react';
import React, { useEffect, useState } from 'react';
import { getAuthenticatedUser, requireAuth } from 'app/session.server';
import * as Styled from 'app/styles/Home.Styled';
import ListQuestions from 'app/components/ListQuestions';
import Notifications from 'app/components/Notifications';
import listDepartments from 'app/controllers/departments/list';
import listLocations from 'app/controllers/locations/list';
import listQuestions from 'app/controllers/questions/list';
import { PAGE_QUESTIONS_LIMIT } from 'app/utils/constants';
import dateRangeConversion from 'app/utils/dateRangeConversion';
import modifyPinStatus from 'app/controllers/questions/modifyPinStatus';
import modifyEnabledValue from 'app/controllers/questions/modifyEnableStatus';
import voteQuestion from 'app/controllers/questionVotes/voteQuestion';
import ACTIONS from 'app/utils/actions';

export const loader = async ({ request }) => {
  await requireAuth(request);
  const user = await getAuthenticatedUser(request);

  const url = new URL(request.url);

  const order = url.searchParams.get('order');
  const status = url.searchParams.get('status');
  const department = Number.parseInt(url.searchParams.get('department'), 10);
  const location = url.searchParams.get('location');
  const dateRange = dateRangeConversion(url.searchParams.get('dateRange'));
  const page = url.searchParams.get('page') ?? 1;

  const questions = await listQuestions({
    user,
    orderBy: order,
    status,
    department: Number.isNaN(department) ? undefined : department,
    location,
    dateRange,
    offset: (page - 1) * PAGE_QUESTIONS_LIMIT,
  });

  const locations = await listLocations();
  const departments = await listDepartments();

  return json({
    questions,
    locations,
    departments,
  });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const formAction = formData.get('action');
  let response;
  let questionId;
  switch (formAction) {
    case ACTIONS.PINNIN:
      questionId = parseInt(formData.get('questionId'), 10);
      const value = formData.get('value') !== 'false';
      response = await modifyPinStatus(questionId, value);
      break;
    case ACTIONS.VOTE_QUESTION:
      const voteQuestionId = parseInt(formData.get('questionId'), 10);
      const voteQuestionUser = JSON.parse(formData.get('user'));
      const isUpVote = formData.get('isUpVote') === 'true';
      response = await voteQuestion(voteQuestionId, voteQuestionUser, isUpVote);
      break;
    case ACTIONS.ENABLED_ACTION:
      questionId = parseInt(formData.get('questionId'), 10);
      const enabledValue = formData.get('enabledValue') !== 'false';
      response = await modifyEnabledValue(questionId, enabledValue);
      break;
    default:
      break;
  }

  return json(response);
};

export default function Index() {
  const { questions: initialQuestions } = useLoaderData();
  const [questions, setQuestions] = useState(initialQuestions);

  const fetcher = useFetcher();
  const [shouldFetch, setShouldFetch] = useState(true);
  const [page, setPage] = useState(2);
  const [searchParams] = useSearchParams();

  const onFetchMore = () => {
    if (!shouldFetch) return;
    fetcher.load(`/?index&${searchParams.toString()}&page=${page}`);
  };

  useEffect(() => {
    if (fetcher.data && fetcher.data.questions && fetcher.data.questions.length === 0) {
      setShouldFetch(false);
      return;
    }

    if (fetcher.data && fetcher.data.questions && fetcher.data.questions.length > 0) {
      setQuestions((prevQuestions) => [...prevQuestions, ...fetcher.data.questions]);
      setPage((prevPage) => prevPage + 1);
      setShouldFetch(true);
    }
  }, [fetcher.data]);

  useEffect(() => {
    setQuestions(initialQuestions);
    setPage(2);
    setShouldFetch(true);
  }, [initialQuestions, searchParams]);

  return (
    <>
      <Notifications />
      <Styled.Container>
        <ListQuestions
          type="all"
          questions={questions}
          onFetchMore={onFetchMore}
        />
      </Styled.Container>
    </>
  );
}
