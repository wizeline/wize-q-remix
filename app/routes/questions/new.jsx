import React, { useEffect, useRef } from 'react';
import { BsCircleFill } from 'react-icons/bs';
import { json, redirect } from '@remix-run/node';
import { useLoaderData, useSubmit } from '@remix-run/react';
import * as Styled from 'app/styles/CreateQuestion.Styled';
import Slogan from 'app/components/Slogan';
import { MAXIMUM_QUESTION_LENGTH, MINIMUM_ANSWER_LENGTH, NOT_ASSIGNED_DEPARTMENT_ID } from 'app/utils/backend/constants';
import { RECOMMENDATIONS_QUESTION } from 'app/utils/constants';
import QuestionForm from 'app/components/QuestionForm';
import listLocations from 'app/controllers/locations/list';
import {
  commitSession, getAuthenticatedUser, getSession, requireAuth,
} from 'app/session.server';
import listDepartments from 'app/controllers/departments/list';
import createQuestion from 'app/controllers/questions/create';
import Notifications from 'app/components/Notifications';

export const loader = async ({ request }) => {
  await requireAuth(request);

  const locations = await listLocations();
  const departments = await listDepartments();
  return json({
    locations,
    departments,
  });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  // values passed as strings
  const form = Object.fromEntries(formData.entries());
  const { assignedDepartment, assigned_to_employee_id: assignedEmployeeId } = form;
  const user = await getAuthenticatedUser(request);
  const parsedDepartment = parseInt(assignedDepartment, 10);
  const assignedEmployeeValue = assignedEmployeeId !== 'undefined' ? parseInt(assignedEmployeeId, 10) : undefined;

  const payload = {
    question: form.question,
    created_by_employee_id: form.isAnonymous === 'true' ? null : user.employee_id,
    is_anonymous: form.isAnonymous === 'true',
    assigned_department: Number.isNaN(parsedDepartment) ? null : parsedDepartment,
    assigned_to_employee_id: Number.isNaN(assignedEmployeeValue) ? null : assignedEmployeeValue,
    location: form.location,
    accessToken: user.accessToken,
  };

  const response = await createQuestion(payload);

  if (response.successMessage) {
    const session = await getSession(request);
    session.flash('globalSuccess', response.successMessage);

    return redirect('/?index', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  }

  return json(response);
};

function CreateQuestion() {
  const { locations, departments } = useLoaderData();
  const submit = useSubmit();
  const formRef = useRef();

  useEffect(() => {
    departments.unshift({ name: 'I don\'t know whom to assign it.', department_id: NOT_ASSIGNED_DEPARTMENT_ID });
  }, []);

  const renderBulletPoint = () => (
    <div>
      <BsCircleFill color="var(--color-secondary)" size="7px" style={{ marginTop: '3px', marginRight: '10px' }} />
    </div>
  );

  const postQuestion = (question) => {
    const data = new FormData(formRef.current);
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(question)) {
      data.set(key, value);
    }

    submit(
      data,
      { method: 'post', action: '/questions/new' },
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
                RECOMMENDATIONS_QUESTION.map((text) => (
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
}

export default CreateQuestion;
