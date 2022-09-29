import Slogan from '~/components/Slogan';
import * as Styled from '~/styles/CreateQuestion.Styled';
import { MAXIMUM_QUESTION_LENGTH, MINIMUM_ANSWER_LENGTH } from '~/utils/backend/constants';
import { RECOMMENDATIONS_QUESTION } from '~/utils/constants';
import { BsCircleFill } from 'react-icons/bs';
import QuestionForm from '~/components/QuestionForm';
import { listLocations } from '~/controllers/locations/list';
import { json, redirect } from '@remix-run/node';
import {  useLoaderData, useSubmit } from '@remix-run/react';
import { getAuthenticatedUser, requireAuth } from '~/session.server';
import { listDepartments } from '~/controllers/departments/list';
import { useRef } from 'react';
import { createQuestion } from '~/controllers/questions/create';
import Notifications from '~/components/Notifications';

export const loader = async ({ request }) => {
  await requireAuth(request);

  const locations = await listLocations();
  const departments = await listDepartments();

  return json({
    locations,
    departments,
  })
}

export const action = async ({request}) => {
  const formData = await request.formData();
  const form = Object.fromEntries(formData.entries());

  const user = await getAuthenticatedUser(request);

  const payload = {
    question: form.question,
    created_by_employee_id: user.employee_id,
    is_anonymous: form.isAnonymous === 'true',
    assigned_department: parseInt(form.assignedDepartment) ?? 1,
    location: form.location,
  };

  const response = await createQuestion(payload);

  if (response.success) {
    return redirect("/", { replace: true });
  }

  return json(response);
};

const CreateQuestion = () => {
  const { locations, departments } = useLoaderData();
  const submit = useSubmit();
  const formRef = useRef();

  const renderBulletPoint = () => (
    <div>
      <BsCircleFill color={'var(--color-secondary)'} size={'7px'} style={{ marginTop: '3px', marginRight: '10px' }} />
    </div>
  );

  const postQuestion = (question) => {
    const data = new FormData(formRef.current);
    for (const [key, value] of Object.entries(question)) {
      data.set(key, value);
    }
    
    submit(
      data,
      { method: "post", action: "/questions/new"}
    );
  };

  return (
    <>
    <Notifications /> 
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
    </>
  );
};

export default CreateQuestion;
