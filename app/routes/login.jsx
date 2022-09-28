import { json, redirect } from "@remix-run/node";
import LoginContainer from "~/components/Login/LoginContainer";
import { getAuthenticatedUser } from "~/session.server";

export const loader = async ({request}) => {
  const authenticated = await getAuthenticatedUser(request);
  console.log(authenticated);

  if (authenticated) {
    return redirect('/');
  };

  return json({});
}

const Login = () => {
  return <LoginContainer /> 
};

export default Login;
