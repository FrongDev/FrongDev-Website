// Game code
import bowserGame from "../games/bowserGame.js";

// Fontawesome
import "../components/FAIconWrapper.jsx";

// Images
import bowserImg from "../public/games/bowser.png";

// My components
import { PythonGame } from "../components/PythonGame.jsx";
import { BothNavs } from "../components/nav/BothNavs.jsx";

function BowserGame() {
  return (
    <BothNavs>
      <PythonGame
        gameCode={bowserGame}
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
