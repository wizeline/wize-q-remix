/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React from 'react';
import { useLoaderData } from '@remix-run/react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { BsCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { json, redirect } from '@remix-run/node';
import * as Styled from 'app/styles/QuestionDetails.Styled';
import { requireAuth, getAuthenticatedUser } from 'app/session.server';
import Button from 'app/components/Atoms/Button';
import QuestionDetail from 'app/components/QuestionDetail';
import QuestionDetailInfo from 'app/components/QuestionDetailInfo';
import Notifications from 'app/components/Notifications';
import { COMMENT_INPUT_PLACEHOLDER, RECOMMENDATIONS_QUESTION, DEFAULT_QUESTION_COMMENT_SORTING } from 'app/utils/constants';
import getQuestionById from 'app/controllers/questions/getQuestionById';
import listLocations from 'app/controllers/locations/list';
import modifyPinStatus from 'app/controllers/questions/modifyPinStatus';
import voteQuestion from 'app/controllers/profile/questionVotes/voteQuestion';
import createAnswer from 'app/controllers/answers/create';
import updateAnswer from 'app/controllers/answers/update';
import deleteAnswer from 'app/controllers/answers/delete';
import listComments from 'app/controllers/comments/list';
import createComment from 'app/controllers/comments/create';
import updateComment from 'app/controllers/comments/update';
import upsertCommentVote from 'app/controllers/commentVotes/voteComment';
import deleteComment from 'app/controllers/comments/delete';
import createNPS from 'app/controllers/answers/nps/create';
import approvedByComment from 'app/controllers/comments/approvedBy';
import ACTIONS from 'app/utils/actions';
import assignQuestion from 'app/controllers/questions/assignQuestion';
import listDepartments from 'app/controllers/departments/list';
import deleteNPS from 'app/controllers/answers/nps/delete';
import modifyEnabledValue from 'app/controllers/questions/modifyEnableStatus';
import taggingComment from 'app/controllers/comments/tags/tagging.js';

const replacer = (key, value) => (typeof value === 'bigint' ? value.toString() : value);

const jsonCustom = (data, init = {}) => {
  const responseInit = typeof init === 'number' ? {
    status: init,
  } : init;
  const headers = new Headers(responseInit.headers);

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  return new Response(JSON.stringify(data, replacer), {
    ...responseInit,
    headers,
  });
};

export const loader = async ({ request, params }) => {
  await requireAuth(request);
  const user = await getAuthenticatedUser(request);
  const url = new URL(request.url);
  const order = url.searchParams.get('order');

  const { questionId } = params;
  const { question } = await getQuestionById(parseInt(questionId, 10), user);

  if (!question) {
    return redirect('/404');
  }

  const locations = await listLocations();
  const { departments } = await listDepartments();

  const parametros = {
    questionId: parseInt(questionId, 10),
    userEmail: user.email,
    userId: user.id,
    sortBy: order !== undefined && order !== null ? order : DEFAULT_QUESTION_COMMENT_SORTING,
    sessionToken: user.accessToken,
  };
  const { comments } = await listComments(parametros);

  return jsonCustom({
    question,
    locations,
    departments,
    comments,
  });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const action = formData.get('action');
  let response;
  let answer_id;
  let questionId;
  const user = await getAuthenticatedUser(request);
  switch (action) {
    case ACTIONS.PINNIN:
      questionId = parseInt(formData.get('questionId'), 10);
      const value = formData.get('value') !== 'false';
      response = await modifyPinStatus(questionId, value);
      break;
    case ACTIONS.ENABLED_ACTION:
      questionId = parseInt(formData.get('questionId'), 10);
      const enabledValue = formData.get('enabledValue') !== 'false';
      response = await modifyEnabledValue(questionId, enabledValue);
      break;
    case ACTIONS.VOTE_QUESTION:
      const voteQuestionId = parseInt(formData.get('questionId'), 10);
      const voteQuestionUser = JSON.parse(formData.get('user'));
      const isUpVote = formData.get('isUpVote') === 'true';
      response = await voteQuestion(voteQuestionId, voteQuestionUser, isUpVote);
      break;
    case ACTIONS.CREATE_QUESTION_ANSWER:
      const createAnswerBody = {
        answered_question_id: parseInt(formData.get('questionId'), 10),
        answered_by_employee_id: parseInt(formData.get('employee_id'), 10),
        answer_text: formData.get('answer'),
      };
      response = await createAnswer(createAnswerBody);
      break;
    case ACTIONS.UPDATE_QUESTION_ANSWER:
      const updateAnswerBody = {
        answer_id: parseInt(formData.get('answerId'), 10),
        answer_text: formData.get('answer'),
      };
      response = await updateAnswer(updateAnswerBody);
      break;
    case ACTIONS.DELETE_ANSWER:
      const deleteAnswerBody = {
        answer_id: parseInt(formData.get('answerId'), 10),
      };
      response = await deleteAnswer(deleteAnswerBody);
      break;
    case ACTIONS.ASSIGN_QUESTION:
      const assignQuestionBody = {
        question_id: parseInt(formData.get('questionId'), 10),
        assigned_department: parseInt(formData.get('assigned_department'), 10),
        assigned_to_employee_id: parseInt(formData.get('assigned_to_employee_id'), 10),
      };
      response = await assignQuestion(assignQuestionBody);
      break;
    case ACTIONS.CREATE_COMMENT:
      const commentToSubmit = JSON.parse(formData.get('commentToSubmit'));
      response = await createComment(commentToSubmit);
      break;
    case ACTIONS.UPDATE_COMMENT:
      const newCommentData = JSON.parse(formData.get('newCommentData'));
      response = await updateComment(newCommentData);
      break;
    case ACTIONS.VOTE_COMMENT:
      const comment_id = parseInt(formData.get('comment_id'), 10);
      const vote = parseInt(formData.get('value'), 10);
      response = await upsertCommentVote({ comment_id, value: vote, user: user.id });
      break;
    case ACTIONS.DELETE_COMMENT:
      const commentid = parseInt(formData.get('comment_id'), 10);
      const { accessToken } = user;
      const useremail = user.email;
      response = await deleteComment({ commentid, accessToken, useremail });
      break;
    case ACTIONS.SCORE_ANSWER:
      answer_id = parseInt(formData.get('answer_id'), 10);
      const score = parseInt(formData.get('score'), 10);
      response = await createNPS({
        score, answer_id, user, accessToken: user.accessToken,
      });
      break;
    case ACTIONS.DELETE_SCORE:
      answer_id = parseInt(formData.get('answer_id'), 10);
      response = await deleteNPS({ id: answer_id, user });
      break;
    case ACTIONS.APPROVED_COMMENT:
      const params = JSON.parse(formData.get('params'));
      params.employeeid = user.employee_id;
      response = await approvedByComment(params);
      break;
    case ACTIONS.TAGGING_COMMENT:
      const { tagId, commentId } = JSON.parse(formData.get('data'));
      response = await taggingComment({
        tagId,
        commentId,
        taggedBy: tagId ? user.employee_id.toString() : null,
      });
      break;
    default:
      break;
  }
  return json(response);
};

function QuestionDetailPage() {
  const { question } = useLoaderData();
  const navigate = useNavigate();

  const renderBulletPoint = () => {
    <div>
      <BsCircleFill color="var(--color-secondary)" size="7px" style={{ marginTop: '3px', marginRight: '10px' }} />
    </div>;
  };

  return (
    <Styled.Container>
      <Notifications />
      <Styled.BackToHomeQuestion>
        <Button onClick={() => { navigate('/'); }}>
          <strong>
            <MdArrowBackIosNew style={{ verticalAlign: 'middle' }} />
            {' '}
            Back
            {' '}
          </strong>
        </Button>
        <QuestionDetailInfo
          location={question.location}
          department={question.department}
          employeeName={question.assigned_to?.full_name}
        />
      </Styled.BackToHomeQuestion>
      <Styled.QuestionDetail>
        <QuestionDetail question={question} />
      </Styled.QuestionDetail>
      <Styled.QuestionRecommendations>
        <Styled.RecommendationsContainer>
          <Styled.Recommendations>
            <span> Things to keep in mind</span>
            <span>
              {renderBulletPoint()}
              {COMMENT_INPUT_PLACEHOLDER}
            </span>
            {
                  RECOMMENDATIONS_QUESTION.map((text, index) => (
                    <span key={index}>
                      {renderBulletPoint()}
                      {text}
                    </span>
                  ))
                }
          </Styled.Recommendations>
        </Styled.RecommendationsContainer>
      </Styled.QuestionRecommendations>
    </Styled.Container>
  );
}

export default QuestionDetailPage;
