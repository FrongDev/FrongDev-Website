import { useContext } from "react";
import { Link } from "react-router-dom";

// CSS
import "../../css/nav.css";

// Fontawesome
import FAIconWrapper from "../FAIconWrapper.jsx";
import {
  faSquareCaretLeft,
  faSquareCaretRight,
  faUser,
  faRightFromBracket,
  faUserPlus,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

// Contexts
import { AccountContext, SettingsContext } from "../../Contexts.jsx";

// List of pages
import { navPages } from "../../pages/pages.jsx";

function SideNav() {
  const { sideNavExpanded, toggleSideNavExpanded } =
    useContext(SettingsContext);

  const { username, isLoggedIn, logout } = useContext(AccountContext);

  return (
    <nav className="side-nav max-w-25dvw group relative flex h-full min-w-fit flex-col border-l-nav-border-width border-r-nav-border-width border-frong-color pb-5 ">
      {/* Links */}
      {navPages.map(({ label, path, icon }) => {
        return <SideNavLink to={path} icon={icon} text={label} key={path} />;
      })}

      {/* Expand toggle */}
      <FAIconWrapper
        icon={sideNavExpanded ? faSquareCaretLeft : faSquareCaretRight}
        className="absolute right-0 top-1/2 mr-0 aspect-square h-[--nav-icon-size] translate-x-1/2 rounded-[5px] border-2 border-frong-color bg-my-white text-frong-color opacity-100 transition-opacity duration-200 group-hover:opacity-100 md:right-[calc(var(--nav-border-width)*0.5)] md:opacity-0"
        onClick={toggleSideNavExpanded}
      />

      {/* Fill empty space */}
      <div className="flex-grow" />

      {/* Account Management */}
      {isLoggedIn ? (
        <>
          <SideNavLine icon={faUser} text={username} />
          <SideNavLine
            icon={faRightFromBracket}
            text="Log out"
            onClick={logout}
            underline={true}
          />
        </>
      ) : (
        <>
          <SideNavLink to="/login" icon={faRightToBracket} text="Log in" />
          <SideNavLink to="/signup" icon={faUserPlus} text="Sign up" />
        </>
      )}
    </nav>
  );
}

function SideNavLine({ icon, text, onClick, underline }) {
  const { sideNavExpanded } = useContext(SettingsContext);

  return (
    <div
      className={`side-nav-line ${underline ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <SideNavIcon icon={icon} />
      {sideNavExpanded && (
        <p className={underline ? "side-nav-link" : ""}>{text}</p>
      )}
    </div>
  );
}

function SideNavLink({ to, icon, text }) {
  const { sideNavExpanded } = useContext(SettingsContext);

  return (
    <div className="side-nav-line cursor-pointer">
      <Link to={to} className="side-nav-link">
        <SideNavIcon icon={icon} />
        {sideNavExpanded && text}
      </Link>
    </div>
  );
}

function SideNavIcon({ icon, className }) {
  return (
    <FAIconWrapper
      icon={icon}
      className={`${className} mr-1 aspect-square h-[--nav-icon-size]`}
    />
  );
}

export { SideNav };
