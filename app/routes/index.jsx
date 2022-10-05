import { json } from "@remix-run/node";
// import ListQuestions from "~/components/ListQuestions";
import Notifications from "~/components/Notifications";
import { requireAuth } from "~/session.server";
import * as Styled from '~/styles/Home.Styled';

export const loader = async ({ request }) => {
  await requireAuth(request);
  return json({});
}

export default function Index() {
  return (
    <>
    <Notifications /> 
    <Styled.Container>
      {/* <ListQuestions type="all" /> */}
    </Styled.Container>
  </>
  );
}
