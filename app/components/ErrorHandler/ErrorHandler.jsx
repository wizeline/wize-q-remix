import { VscBracketError } from "react-icons/vsc";

const ErrorHandler = ({error}) =>
(
  <div>
    <div style={{display: "flex", justifyContent: "center", paddingTop:"200px"}}>
        <VscBracketError  size='15rem' color='var(--color-primary)'/>
        <h1 style={{paddingTop:"40px"}}>Sorry! Something Went Wrong.</h1>
    </div>
    <div style={{display: "flex", justifyContent: "center", paddingTop: "20px" }}>
          <pre>{error.message}</pre>
    </div>
  </div>
);

export default ErrorHandler;
