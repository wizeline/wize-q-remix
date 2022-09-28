import { redirect } from "@remix-run/node";
import LoginContainer from "~/components/Login/LoginContainer";
import { getAuthenticatedUser } from "~/session.server";

export const loader = ({request}) => {
  const authenticated = getAuthenticatedUser(request);

  if (authenticated) {
    return redirect('/');
  };
}

const Login = () => {
  return <LoginContainer /> 
};

export default Login;
