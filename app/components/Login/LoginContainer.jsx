import { Form } from "@remix-run/react";
import logo from '~/images/logo-white.png';
import Button from "~/components/Atoms/Button";
import Slogan from "~/components/Slogan";
import { PRIMARY_BUTTON } from "~/utils/constants";
import * as Styled from './LoginContainer.Styled';

const LoginContainer = () => {
  const redirectTo = "/";

  return (
      <Styled.LoginDiv>
        <Styled.LoginSubDiv>
          <Styled.LeftDiv>
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
          </Styled.LeftDiv>
          <Styled.RightDiv>
            <Styled.RedDiv />
            <Styled.GoldDiv />
            <img src={logo} alt="logo" />
            <Styled.Slogan>
              <Slogan />
                <Styled.AdviceContainer> 
                 <p>Before asking a question verify if you can get the information you need from these resources. </p>
                 <ul>
                  <li><a href="https://wizeline.slack.com/archives/C1UDJCL9E"> #Questions </a>- Slack Channel</li>
                  <li><a href="https://ticketing.wizeline.com/ticketing.html"> Ticketing</a></li>
                 </ul> 
                </Styled.AdviceContainer>
            </Styled.Slogan>
          </Styled.RightDiv>
        </Styled.LoginSubDiv>
    </Styled.LoginDiv>
  );
}

export default LoginContainer;
