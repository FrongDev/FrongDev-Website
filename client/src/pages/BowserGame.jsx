// Game code
import bowserGame from "../games/bowserGame.js";

// Fontawesome
import "../components/FAIconWrapper.jsx";

// Images
import bowserImg from "../public/games/bowser.png";

// My components
import { PythonGame } from "../components/PythonGame.jsx";
import { BothNavs } from "../components/nav/BothNavs.jsx";

// Constants
const LINES_SHOWN = 5;

function BowserGame() {
  return (
    <BothNavs>
      <PythonGame
        gameCode={bowserGame}
        LINES_SHOWN={LINES_SHOWN}
        middleHTML={
          <div className="text-game-img-container">
            <img src={bowserImg} className="text-game-img" />
          </div>
        }
      />
    </BothNavs>
  );
}

export { BowserGame };
