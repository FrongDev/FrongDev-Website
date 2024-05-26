import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Contexts
import { AccountContext } from "../Contexts.jsx";

// CSS
import "../css/content.css";

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
      <div className="content-container flex items-center gap-[20px]">
        <h1 className="content-title serif items-center">
          Sign up for FrongNet
        </h1>
        <form
          className="flex w-[70%] min-w-[25ch] max-w-[40ch] flex-col items-center gap-[1rem]"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="w-full">
            <p>Username:</p>
            <input
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              className="w-full"
            ></input>
          </div>
          <div className="w-full">
            <p>Password:</p>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full"
            ></input>
          </div>
          <div className="w-full">
            <p>Confirm Password:</p>
            <input
              type="password"
              value={confirmPasswordInput}
              onChange={(e) => setConfirmPasswordInput(e.target.value)}
              className="w-full"
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
