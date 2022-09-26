import { Form } from "@remix-run/react";
import Button from "~/components/Atoms/Button";
import { PRIMARY_BUTTON } from "~/utils/constants";
import * as Styled from './LoginContainer.Styled';

const LoginContainer = () => {
  const redirectTo = "/";

  return (
      <Styled.LoginDiv>
        <Styled.LoginSubDiv>
          <Styled.SH3>Welcome Wizeliner!</Styled.SH3>
          <Form action="/auth/auth0" method="POST" >
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <Button type="submit" category={PRIMARY_BUTTON} className="login-button">
              Log in with your Wizeline account
            </Button>
          </Form>
          <Styled.Paragraph>
            <Styled.Span>Wizeline Questions</Styled.Span>
            <Styled.Span variant="bold"> DOES NOT </Styled.Span>
            <Styled.Span>
              store any personal information so that you can ask anything.
            </Styled.Span>
          </Styled.Paragraph>
        </Styled.LoginSubDiv>
    </Styled.LoginDiv>
  );
}

export default LoginContainer;
