// Imports
import { Link } from "react-router-dom";

// Game pages
import { gamePages } from "./pages.jsx";

// Fontawesome
import "../components/FAIconWrapper.jsx";

// CSS
import "../css/games-page.css";

// My components
import { BothNavs } from "../components/nav/BothNavs.jsx";

// Constants
const LINES_SHOWN = 5;

function Games() {
  return (
    <BothNavs>
      <div className="content-container">
        <h1 className="content-title serif align-self-center">Frong Games</h1>
        <div className="std-grid">
          {gamePages.map(({ label, path, img }) => {
            return (
              <Link key={path} to={path} className="std-grid-item game-link">
                <img src={img} />
                <p>{label}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </BothNavs>
  );
}

export { Games };
