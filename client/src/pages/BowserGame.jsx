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
          <div className="flex min-h-0 justify-center">
            <img src={bowserImg} className="aspect-square h-full" />
          </div>
        }
      />
    </BothNavs>
  );
}

export { BowserGame };
