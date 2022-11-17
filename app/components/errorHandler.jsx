import { VscBracketError } from "react-icons/vsc";

const ErrorHandler = () =>
(
  <div style={{display: "flex", justifyContent: "center", paddingTop:"200px"}}>
        <VscBracketError  size='15rem' color='var(--color-primary)'/>
        <h1 style={{paddingTop:"40px"}}>Sorry! Something Went Wrong.</h1>
  </div>
);

export default ErrorHandler;