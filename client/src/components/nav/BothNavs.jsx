// My components
import { TopNav } from "./TopNav.jsx";
import { SideNav } from "./SideNav.jsx";

// Webpage container
function BothNavs({ children }) {
  return (
    <div className="flex h-full w-full flex-col">
      <TopNav />
      <div className="mx-[--nav-margin-width] my-0 flex flex-grow overflow-hidden">
        <SideNav />
        <div className="flex-grow overflow-x-hidden bg-[--content-background-color] p-[--page-content-padding-width]">
          {children}
        </div>
      </div>
    </div>
  );
}

export { BothNavs };
