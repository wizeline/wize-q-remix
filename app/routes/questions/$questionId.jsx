import { useLoaderData } from "@remix-run/react";
import * as Styled from '~/styles/QuestionDetails.Styled';
import {MdArrowBackIosNew}from 'react-icons/md';
import { BsCircleFill } from 'react-icons/bs';
import Button from '~/components/Atoms/Button';
import QuestionDetail from "~/components/QuestionDetail";
import { useNavigate } from 'react-router-dom';
import { COMMENT_INPUT_PLACEHOLDER, RECOMMENDATIONS_QUESTION } from '~/utils/constants'
import { requireAuth, getAuthenticatedUser } from "~/session.server";
import { getQuestionById } from "~/controllers/questions/getQuestionById";
import { listLocations } from "~/controllers/locations/list";
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