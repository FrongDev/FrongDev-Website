// Imports
import { useState, useRef } from "react";
import Sk from "skulpt";

// Fontawesome
import FAIconWrapper from "./FAIconWrapper.jsx";
import "./FAIconWrapper.jsx";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

// CSS
import "../css/text-game.css";

function PythonGame({ gameCode, middleHTML, LINES_SHOWN }) {
  const [output, setOutput] = useState(
    Array.from({ length: LINES_SHOWN }, () => "")
  );

  const inputRef = useRef(null);
  const submitRef = useRef(null);

  function outputfn(text) {
    setOutput((prev) => [...prev.slice(-LINES_SHOWN + 1), text]);
  }

  function inputFun(prompt) {
    return new Promise((resolve) => {
      inputRef.current.focus();

      function submit() {
        submitRef.current.removeEventListener("click", submit);
        inputRef.current.removeEventListener("keypress", handleKeyPress);

        const inp = inputRef.current.value;

        inputRef.current.value = "";

        resolve(inp);
      }

      function handleKeyPress(e) {
        if (e.key === "Enter") {
          e.preventDefault();

          submit();
        }
      }

      inputRef.current.addEventListener("keypress", handleKeyPress);
      submitRef.current.addEventListener("click", submit);
    });
  }

  async function runPythonCode() {
    try {
      Sk.configure({
        output: outputfn,
        inputfun: inputFun,
      });
      Sk.misceval.asyncToPromise(() => {
        return Sk.importMainWithBody("<stdin>", false, gameCode, true);
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="text-game-container">
      {middleHTML}
      <div className="text-game-bottom">
        <FAIconWrapper
          icon={faPlay}
          onClick={runPythonCode}
          className="text-game-play-button"
        />
        <div className="text-game-output">
          {output.map((line) => {
            return <p className="text-game-output-line">{line}</p>;
          })}
          <input ref={inputRef} />
        </div>
        <button ref={submitRef} className="text-game-submit">
          Submit
        </button>
      </div>
    </div>
  );
}

export { PythonGame };
