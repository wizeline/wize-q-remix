import React from 'react';
import { json } from '@remix-run/node';
import ProfileUserInformation from 'app/components/ProfileUserInformation/ProfileUserInformation';
import { getAuthenticatedUser, requireAuth } from 'app/session.server';
import getQuestionsCreated from 'app/controllers/profile/questionsCreated';
import questionCommented from 'app/controllers/profile/questionsCommented';
import questionsAnswered from 'app/controllers/profile/questionsAnswered';
import {
  useLoaderData,
} from '@remix-run/react';

export const loader = async ({ request }) => {
  await requireAuth(request);
  const user = await getAuthenticatedUser(request);

  const questionsCreatedByUser = await getQuestionsCreated({ employee_id: user.employee_id });
  const { questions } = await questionCommented({ userEmail: user.email });
  const questionsAnsweredByUser = await questionsAnswered({ employee_id: user.employee_id });

  return json({
    questionsCreatedByUser,
    questionsCommentedByUser: questions,
    questionsAnsweredByUser: questionsAnsweredByUser.questions,
  });
};

function Profile() {
  const {
    questionsCreatedByUser,
    questionsCommentedByUser,
    questionsAnsweredByUser,
  } = useLoaderData();

  return (
    <ProfileUserInformation
      questions={questionsCreatedByUser}
      questionCommented={questionsCommentedByUser}
      questionsAnswered={questionsAnsweredByUser}
    />
  );
}

export default Profile;
