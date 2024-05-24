// Imports
import { useState, useEffect, useRef } from "react";
import Sk from "skulpt";

// Fontawesome
import FAIconWrapper from "./FAIconWrapper.jsx";
import "./FAIconWrapper.jsx";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

// CSS
import "../css/text-game.css";

function PythonGame({ gameCode, middleHTML, LINES_SHOWN }) {
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const submitRef = useRef(null);

  // Output is an array of messsages
  const [output, setOutput] = useState(
    // Array.from({ length: LINES_SHOWN }, () => "")
    []
  );

  // Output appends to the array
  function outputfn(text) {
    // setOutput((prev) => [...prev.slice(-LINES_SHOWN + 1), text]);
    setOutput((prev) => [...prev, text]);
  }

  // Input submitted with event listeners either by submit button or enter key
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

  // Auto scroll to end of output when message is appended
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

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
    <div className="text-game-padding">
      <div className="text-game-container">
        {middleHTML}
        <div className="text-game-menu">
          <div ref={outputRef} className="text-game-output">
            {output.map((line, index) => {
              return (
                <p className="text-game-output-line" key={index}>
                  {line}
                </p>
              );
            })}
          </div>
          <div className="text-game-controls">
            <FAIconWrapper
              icon={faPlay}
              onClick={runPythonCode}
              className="text-game-play-button"
            />
            <input ref={inputRef} className="text-game-input" />
            <button ref={submitRef} className="text-game-submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { PythonGame };
