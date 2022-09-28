import Slogan from '~/components/Slogan';
import * as Styled from '~/styles/CreateQuestion.Styled';
import { MAXIMUM_QUESTION_LENGTH, MINIMUM_ANSWER_LENGTH } from '~/utils/backend/constants';
import { RECOMMENDATIONS_QUESTION } from '~/utils/constants';
import { BsCircleFill } from 'react-icons/bs';
import QuestionForm from '~/components/QuestionForm';
import { listLocations } from '~/controllers/locations';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { requireAuth } from '~/session.server';
import { listDepartments } from '~/controllers/department';

export const loader = async ({ request }) => {
  await requireAuth(request);

  const locations = await listLocations();
  const departments = await listDepartments();

  return json({
    locations,
    departments,
  })
}

const CreateQuestion = () => {

  const { locations, departments } = useLoaderData();

  const renderBulletPoint = () => (
    <div>
      <BsCircleFill color={'var(--color-secondary)'} size={'7px'} style={{ marginTop: '3px', marginRight: '10px' }} />
    </div>
  );

  const postQuestion = () => {

  };

  return (
    <Styled.QuestionDiv>
      <Styled.QuestionSlogan>
        <Slogan />
      </Styled.QuestionSlogan>
      <Styled.QuestionInput>
        <QuestionForm
          maximumQuestionLength={MAXIMUM_QUESTION_LENGTH}
          minimumQuestionLength={MINIMUM_ANSWER_LENGTH}
          postQuestion={postQuestion}
          locations={locations}
          departments={departments}
        />
      </Styled.QuestionInput>
      <Styled.QuestionRecommendations>
        <Styled.RecommendationsContainer>
          <Styled.Recommendations>
            <span>Things to keep in mind</span>
            {
              RECOMMENDATIONS_QUESTION.map(text => (
                <span key={text}>
                  {renderBulletPoint()}
                  {text}
                </span>
              ))
            }
          </Styled.Recommendations>
        </Styled.RecommendationsContainer>
      </Styled.QuestionRecommendations>
    </Styled.QuestionDiv>
  );
};

export default CreateQuestion;
