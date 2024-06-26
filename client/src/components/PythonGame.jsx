// Imports
import { useState, useEffect, useRef } from "react";
import Sk from "skulpt";

// Fontawesome
import FAIconWrapper from "./FAIconWrapper.jsx";
import "./FAIconWrapper.jsx";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

function PythonGame({ gameCode, middleHTML }) {
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const submitRef = useRef(null);

  // Output is an array of messsages
  const [output, setOutput] = useState([]);

  // Output appends to the array
  function outputfn(text) {
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
    <div className="h-full w-full bg-[--background-color] px-[calc(0.4*var(--nav-icon-size))] py-[8px]">
      <div className="flex h-full w-full flex-col gap-[--page-content-padding-width]">
        {middleHTML}
        <div className="flex flex-shrink-0 flex-grow basis-[60%] flex-col gap-3 overflow-y-hidden rounded-[8px] bg-[--content-background-color] px-[1ch] py-[0.75rem] md:basis-1/2">
          <div
            ref={outputRef}
            className="flex flex-grow flex-col gap-6 overflow-y-scroll px-[17px] py-0"
          >
            {output.map((line, index) => {
              return (
                <p className="h-fit" key={index}>
                  {line}
                </p>
              );
            })}
          </div>
          <div className="flex h-8 flex-shrink-0 flex-grow-0 basis-8">
            <FAIconWrapper
              icon={faPlay}
              onClick={runPythonCode}
              className="mr-[15px] aspect-square h-5 rounded-[20%] border-[5px] border-[--light-green] bg-[--light-green] text-my-white"
            />
            <input
              ref={inputRef}
              className="rounded-bl[3px] h-full w-0 flex-grow rounded-br-none rounded-tl-[3px] rounded-tr-none border-r-0"
            />
            <button
              ref={submitRef}
              className="flex h-full items-center rounded-bl-none rounded-br-[3px] rounded-tl-none rounded-tr-[3px] text-center"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { PythonGame };
