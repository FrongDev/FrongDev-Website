// Imports
import { Link } from "react-router-dom";

// Game pages
import { gamePages } from "./pages.jsx";

// Fontawesome
import "../components/FAIconWrapper.jsx";

// CSS
import "../css/content.css";

// My components
import { BothNavs } from "../components/nav/BothNavs.jsx";

// Constants
const LINES_SHOWN = 5;

function Games() {
  return (
    <BothNavs>
      <div className="content-container">
        <h1 className="content-title serif self-center">Frong Games</h1>
        <div className="grid grid-cols-1 gap-[10px] overflow-x-hidden overflow-y-scroll px-[14px] text-center md:grid-cols-2 lg:grid-cols-3">
          {gamePages.map(({ label, path, img }) => {
            return (
              <Link
                to={path}
                className="flex flex-col items-center rounded-[5px] bg-[--background-color] p-[7px]"
                key={path}
              >
                <img src={img} />
                <p className="text-xl text-frong-color underline">{label}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </BothNavs>
  );
}

export { Games };
