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
    <nav className="side-nav">
      {/* Links */}
      {navPages.map(({ label, path, icon }) => {
        return <SideNavLink to={path} icon={icon} text={label} key={path} />;
      })}

      {/* Expand toggle */}
      <FAIconWrapper
        icon={sideNavExpanded ? faSquareCaretLeft : faSquareCaretRight}
        className="side-nav-icon side-nav-toggle"
        onClick={toggleSideNavExpanded}
      />

      {/* Fill empty space */}
      <div className="flex-grow-1" />

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
      className={`side-nav-line ${underline ? "clickable" : ""}`}
      onClick={onClick}
    >
      <FAIconWrapper icon={icon} className="side-nav-icon" />
      {sideNavExpanded && (
        <p className={underline ? "side-nav-link" : ""}>{text}</p>
      )}
    </div>
  );
}

function SideNavLink({ to, icon, text }) {
  const { sideNavExpanded } = useContext(SettingsContext);

  return (
    <div className="side-nav-line clickable">
      <Link to={to} className="side-nav-link">
        <FAIconWrapper icon={icon} className="side-nav-icon" />
        {sideNavExpanded && text}
      </Link>
    </div>
  );
}

export { SideNav };
