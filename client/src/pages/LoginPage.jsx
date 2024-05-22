import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// CSS
import "../css/login.css";

// Contexts
import { AccountContext } from "../Contexts.jsx";

// My components
import { BothNavs } from "../components/nav/BothNavs.jsx";

function LoginPage() {
  const navigate = useNavigate();

  const { login } = useContext(AccountContext);

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const errMsg = await login(usernameInput, passwordInput);

    if (errMsg == "") {
      navigate("/");
    } else {
      setErrorMsg(errMsg);
    }
  }

  return (
    <BothNavs>
      <div className="login-content content-container flex-align-center">
        <h1 className="content-title serif align-self-center">
          Log in to FrongNet
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
          <button type="submit">Submit</button>
          {errorMsg && <p>{errorMsg}</p>}
        </form>
      </div>
    </BothNavs>
  );
}

export { LoginPage };
