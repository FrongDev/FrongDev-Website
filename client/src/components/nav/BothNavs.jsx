// My components
import { TopNav } from "./TopNav.jsx";
import { SideNav } from "./SideNav.jsx";

// Webpage container
function BothNavs({ children }) {
  return (
    <div className="full-size flex-column">
      <TopNav />
      <div className="below-nav">
        <SideNav />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}

export { BothNavs };
