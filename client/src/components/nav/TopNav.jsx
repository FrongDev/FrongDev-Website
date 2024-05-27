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
    <nav className="m-[--nav-margin-width] mb-0 flex min-h-[4rem] min-w-[calc(100vw-2*var(--nav-margin-width))] basis-[4rem] items-center overflow-hidden border-nav-border-width border-frong-color p-[--nav-padding-width] sm:min-h-[6rem] sm:basis-[6rem]">
      <img src={frong_img} className="min-w-[40px]" />
      <h1 className="serif flex-grow p-[5px] text-center text-[2rem] font-bold tracking-wide">
        FRONG
      </h1>
      <div className="aspect-square h-full max-w-[20vw]"></div>
      <FAIconWrapper
        icon={faCircleHalfStroke}
        onClick={toggleDarkMode}
        className="fixed right-[calc(var(--nav-icon-size)*0.5)] top-[calc(var(--nav-icon-size)*0.5)] h-[--nav-icon-size] max-h-[--nav-icon-size]"
      />
    </nav>
  );
}

export { TopNav };
