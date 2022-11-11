import { json } from "@remix-run/node";
import { useFetcher, useLoaderData, useSearchParams, useLocation, useNavigate } from "@remix-run/react";
import ListQuestions from "~/components/ListQuestions";
import Notifications from "~/components/Notifications";
import { listDepartments } from "~/controllers/departments/list";
import { listLocations } from "~/controllers/locations/list";
import { listQuestions } from "~/controllers/questions/list";
import { PAGE_QUESTIONS_LIMIT, LSPIN_MEDIUM } from "~/utils/constants";
import { getAuthenticatedUser, requireAuth } from "~/session.server";
import * as Styled from '~/styles/Home.Styled';
import dateRangeConversion from "../utils/dateRangeConversion";
import { useEffect, useState } from "react";
import { modifyPinStatus } from "~/controllers/questions/modifyPinStatus";
import { voteQuestion } from "~/controllers/questionVotes/voteQuestion";
import { ACTIONS } from "~/utils/actions";
import Loader from '~/components/Loader';
import logomarkX1 from '~/images/logomark_medium.png';


export const loader = async ({ request }) => {
  await requireAuth(request);
  const user = await getAuthenticatedUser(request);

  const url = new URL(request.url);
  
  const order = url.searchParams.get("order");
  const status = url.searchParams.get("status");
  const department = Number.parseInt(url.searchParams.get("department"));
  const location = url.searchParams.get("location");
  const dateRange = dateRangeConversion(url.searchParams.get("dateRange"));
  const page = url.searchParams.get("page") ?? 1;

  const questions = await listQuestions({
    user: user,
    orderBy: order,
    status: status,
    department: isNaN(department) ? undefined : department,
    location: location,
    dateRange: dateRange,
    offset: (page - 1) * PAGE_QUESTIONS_LIMIT,
  });

  const locations = await listLocations();
  const departments = await listDepartments();

  return json({
    questions,
    locations,
    departments,
  });
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const action = formData.get("action");
  let response;

  switch (action) {
    case ACTIONS.PINNIN:
      const questionId = parseInt(formData.get("questionId"));
      const value = formData.get("value") !== 'false';
      response = await modifyPinStatus(questionId, value);
      break;
    case ACTIONS.VOTE_QUESTION:
      const voteQuestionId = parseInt(formData.get("questionId"));
      const voteQuestionUser = JSON.parse(formData.get("user"));
      response = await voteQuestion(voteQuestionId, voteQuestionUser);
      break;
  }

  return json(response);
}

export default function Index() {
  const { questions: initialQuestions } = useLoaderData();
  const [questions, setQuestions] = useState(initialQuestions);

  const fetcher = useFetcher();
  const [shouldFetch, setShouldFetch] = useState(true);
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoadign] = useState(true);
  const [searchParams, ] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const onFetchMore = () => {
    if(!shouldFetch) return;
    fetcher.load(`/?index&${searchParams.toString()}&page=${page}`);
  };

  useEffect(() => {
    if(location.hash.includes('questionId')){
      const hashQuestion = location.hash;
      const questionId = hashQuestion.substring(hashQuestion.indexOf('questionId=') + 11, hashQuestion.length);
      if(parseInt(questionId,10)){
        navigate(`/questions/${questionId}`);
      }
      else {
        setIsLoadign(false);
        //To-Do Redirect to Not Found Question Page.
      }
    }
    else{
      setIsLoadign(false);
    }
  }, [])

  useEffect(() => {
    if (fetcher.data && fetcher.data.questions && fetcher.data.questions.length === 0) {
      setShouldFetch(false);
      return;
    }

    if (fetcher.data && fetcher.data.questions && fetcher.data.questions.length > 0) {
      setQuestions((prevQuestions) => [...prevQuestions, ...fetcher.data.questions]);
      setPage((page) => page + 1);
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
      { isLoading ? 
       <Loader src={logomarkX1} size={LSPIN_MEDIUM} />: 
      <ListQuestions
        type="all"
        questions={questions}
        onFetchMore={onFetchMore}
      />}
    </Styled.Container>
  </>
  );
}
