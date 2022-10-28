import { useLoaderData } from "@remix-run/react";
import * as Styled from '~/styles/QuestionDetails.Styled';
import {MdArrowBackIosNew}from 'react-icons/md';
import { BsCircleFill } from 'react-icons/bs';
import Button from '~/components/Atoms/Button';
import QuestionDetail from "~/components/QuestionDetail";
import Notifications from "~/components/Notifications";
import { useNavigate } from 'react-router-dom';
import { COMMENT_INPUT_PLACEHOLDER, RECOMMENDATIONS_QUESTION } from '~/utils/constants'
import { requireAuth, getAuthenticatedUser } from "~/session.server";
import { getQuestionById } from "~/controllers/questions/getQuestionById";
import { listLocations } from "~/controllers/locations/list";
import { modifyPinStatus } from "~/controllers/questions/modifyPinStatus";
import { voteQuestion } from "~/controllers/questionVotes/voteQuestion";
import { createAnswer } from "~/controllers/answers/create";
import { updateAnswer } from "~/controllers/answers/update";
import { deleteAnswer } from "~/controllers/answers/delete";
import { ACTIONS } from "~/utils/actions";
import { json } from "@remix-run/node";


export const loader = async ({request, params}) => {
  await requireAuth(request);
  const user = await getAuthenticatedUser(request);
  const { questionId } = params
  const {question} = await getQuestionById( parseInt(questionId,10), user);
  const locations = await listLocations();
  return json({
    question,
    locations,
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
    case ACTIONS.CREATE_QUESTION_ANSWER:
      const createAnswerBody = {
        answered_question_id: parseInt(formData.get("questionId")),
        answered_by_employee_id: parseInt(formData.get("employee_id")),
        answer_text: formData.get("answer"),
      };
      response = await createAnswer(createAnswerBody);
      break;
    case ACTIONS.UPDATE_QUESTION_ANSWER:
      const updateAnswerBody = {
        answer_id: parseInt(formData.get("answerId")),
        answer_text: formData.get("answer"),
      };
      response = await updateAnswer(updateAnswerBody);
      break;
    case ACTIONS.DELETE_ANSWER:
      const deleteAnswerBody = {
        answer_id: parseInt(formData.get("answerId")),
      };
      response = await deleteAnswer(deleteAnswerBody);
      break;
  }

  return json(response);
}

const QuestionDetailPage = () => {
    const {question} = useLoaderData();
    const navigate = useNavigate();
 
    const renderBulletPoint = () => {
        <div>
        <BsCircleFill color={'var(--color-secondary)'} size={'7px'} style={{ marginTop: '3px', marginRight: '10px' }} />
      </div>
    }

    return (
        <Styled.Container>
            <Notifications />
            <Styled.BackToHomeQuestion>
                <Button onClick={()=> { navigate('/'); }}>
                  <strong><MdArrowBackIosNew style={{ verticalAlign: 'middle' }} />  Back </strong>
                </Button>
            </Styled.BackToHomeQuestion>
            <Styled.QuestionDetail>
              <QuestionDetail question={question}/>
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
    )
}

export default QuestionDetailPage;