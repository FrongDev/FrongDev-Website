// Imports
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from "react";

// Contexts
import { ContextWrapper, SettingsContext } from "./Contexts.jsx";

// CSS
import "./css/variables.css";
import "./css/theming.css";
import "./css/easy-classes.css";
import "./css/app.css";

// Pages
import { allPages } from "./pages/pages.jsx";

// Wrap contexts
function App() {
  return (
    <ContextWrapper>
      <Pages />
    </ContextWrapper>
  );
}

// Apply theming and router for each page
function Pages() {
  const { darkMode } = useContext(SettingsContext);

  return (
    <div className={`${darkMode ? "" : "light"}`} id="site-container">
      <Router>
        <Routes>
          {allPages.map(({ path, Element }) => {
            return <Route path={path} element={<Element />} key={path} />;
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
