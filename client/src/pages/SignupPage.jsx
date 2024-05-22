import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// CSS
import "../css/login.css";

// Contexts
import { AccountContext } from "../Contexts.jsx";

// My components
import { BothNavs } from "../components/nav/BothNavs.jsx";

function SignupPage() {
  const navigate = useNavigate();

  const { signup } = useContext(AccountContext);

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordInput === confirmPasswordInput) {
      const errMsg = await signup(usernameInput, passwordInput);

      if (errMsg == "") {
        navigate("/");
      } else {
        setErrorMsg(errMsg);
      }
    } else {
      setErrorMsg("Passwords do not match");
    }
  }

  return (
    <BothNavs>
      <div className="login-content content-container flex-align-center">
        <h1 className="content-title serif align-self-center">
          Sign up for FrongNet
        </h1>
        <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="login-line">
            <p>Username:</p>
            <input
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            ></input>
          </div>
          <div className="login-line">
            <p>Password:</p>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            ></input>
          </div>
          <div className="login-line">
            <p>Confirm Password:</p>
            <input
              type="password"
              value={confirmPasswordInput}
              onChange={(e) => setConfirmPasswordInput(e.target.value)}
            ></input>
          </div>
          <button type="submit">Submit</button>
          {errorMsg && <p>{errorMsg}</p>}
        </form>
      </div>
    </BothNavs>
  );
}

export { SignupPage };
