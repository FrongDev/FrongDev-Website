// Pages
import { Index } from "./Index.jsx";
import { Games } from "./Games.jsx";
import { BowserGame } from "./BowserGame.jsx";
// import { BlackjackGame } from "./BlackjackGame.jsx";
import { Gallery } from "./Gallery.jsx";
import { LoginPage } from "./LoginPage.jsx";
import { SignupPage } from "./SignupPage.jsx";
import { EditDevPost } from "./DevPosts/EditDevPost.jsx";
import { SingleDevPost } from "./DevPosts/SingleDevPost.jsx";
import { NewDevPost } from "./DevPosts/NewDevPost.jsx";

// Icons
import {
  faHouse,
  faGamepad,
  faBrush,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

// Pics
import bowserPlushImg from "../public/games/bowserplush.png";

const navPages = [
  { label: "Home", path: "/", icon: faHouse, Element: Index },
  { label: "Games", path: "/games", icon: faGamepad, Element: Games },
  // { label: "About Us", path: "/about", icon: faCircleInfo },
  {
    label: "Image Gallery",
    path: "/gallery",
    icon: faBrush,
    Element: Gallery,
  },
];

const gamePages = [
  {
    label: "Bowser Game",
    path: "/bowser-game",
    Element: BowserGame,
    img: bowserPlushImg,
  },
  // {
  //   label: "Blackjack Game",
  //   path: "/blackjack-game",
  //   Element: BlackjackGame,
  //   img: bowserPlushImg,
  // },
];

const extraPages = [
  { path: "/login", Element: LoginPage },
  { path: "/signup", Element: SignupPage },
  { path: "/editDevPost", Element: EditDevPost },
  { path: "/viewDevPost", Element: SingleDevPost },
  { path: "/newDevPost", Element: NewDevPost },
];

const allPages = [...navPages, ...gamePages, ...extraPages];

export { navPages, gamePages, allPages };
