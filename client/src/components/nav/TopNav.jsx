// Basic stuff
import { useContext } from "react";

// Contexts
import { SettingsContext } from "../../Contexts.jsx";

// CSS
import "../../css/nav.css";

// Images
import frong_img from "../../public/frong.png";

// Fontawesome
import FAIconWrapper from "../FAIconWrapper.jsx";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";

// Navbar at top
function TopNav() {
  const { toggleDarkMode } = useContext(SettingsContext);

  return (
    <nav className="top-nav">
      <img src={frong_img} className="frong-logo" />
      <h1 className="site-title serif">FRONG</h1>
      <div className="top-nav-right-spacer"></div>
      <div className="top-nav-icons full-height flex-column flex-justify-start">
        <FAIconWrapper
          icon={faCircleHalfStroke}
          onClick={toggleDarkMode}
          className="nav-icon"
        />
      </div>
    </nav>
  );
}

export { TopNav };
