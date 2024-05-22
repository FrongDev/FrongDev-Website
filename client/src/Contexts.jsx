// Imports
import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { isBrowser } from "react-device-detect";

// URL of backend
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API;

// Contexts
const SettingsContext = createContext();
const defaultSettings = {
  darkMode: true,
  sideNavExpanded: isBrowser ? true : false,
  devBlogPageSize: 2,
};

const AccountContext = createContext();

// Prepares all the data for the site into contexts
function ContextWrapper({ children }) {
  // Account stuff
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setIsLoggedIn(false);
      setIsAdmin(false);
    } else {
      setIsLoggedIn(true);
      setUsername(jwtDecode(localStorage.getItem("token")).username);
      setIsAdmin(jwtDecode(localStorage.getItem("token")).isAdmin);
    }
  }, []);

  // Set login states and local storage token
  function configureLogin(token) {
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token);
    setIsLoggedIn(true);
    setUsername(decodedToken.username);
    setIsAdmin(decodedToken.isAdmin);

    console.log(
      `Successfully logged in to account with username = ${decodedToken.username}`
    );
  }

  async function signup(username, password) {
    try {
      const response = await axios.post(`${BACKEND_API_URL}/account/signup`, {
        username,
        password,
      });

      configureLogin(response.data.token);

      return "";
    } catch (err) {
      return response.data.message ?? "Failed to sign up";
    }
  }

  async function login(username, password) {
    console.log(`${BACKEND_API_URL}/account/login`);
    try {
      const response = await axios.post(`${BACKEND_API_URL}/account/login`, {
        username,
        password,
      });

      configureLogin(response.data.token);

      return "";
    } catch (err) {
      return err.response?.data.message ?? "Failed to log in";
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername("");
    setIsAdmin(false);
  }

  // User settings
  const [darkMode, setDarkMode] = useState(defaultSettings.darkMode);
  const [sideNavExpanded, setSideNavExpanded] = useState(
    defaultSettings.sideNavExpanded
  );
  const [devBlogPageSize, setDevBlogPageSize] = useState(
    defaultSettings.devBlogPageSize
  );

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  function toggleSideNavExpanded() {
    setSideNavExpanded(!sideNavExpanded);
  }

  // Load user settings from browser
  useEffect(() => {
    try {
      const settings = JSON.parse(localStorage.getItem("settings"));
      setDarkMode(settings.darkMode ?? defaultSettings.darkMode);
      setSideNavExpanded(
        settings.sideNavExpanded ?? defaultSettings.sideNavExpanded
      );
      setDevBlogPageSize(
        settings.devBlogPageSize ?? defaultSettings.devBlogPageSize
      );
    } catch {
      console.log("Could not retrieve user settings");
    }
  }, []);

  // Save user settings to browser
  useEffect(() => {
    localStorage.setItem(
      "settings",
      JSON.stringify({
        darkMode: darkMode,
        sideNavExpanded: sideNavExpanded,
        devBlogPageSize: devBlogPageSize,
      })
    );
  }, [darkMode, sideNavExpanded, devBlogPageSize]);

  return (
    <SettingsContext.Provider
      value={{
        darkMode,
        setDarkMode,
        toggleDarkMode,
        sideNavExpanded,
        toggleSideNavExpanded,
        devBlogPageSize,
        setDevBlogPageSize,
      }}
    >
      <AccountContext.Provider
        value={{ isLoggedIn, username, isAdmin, signup, login, logout }}
      >
        {children}
      </AccountContext.Provider>
    </SettingsContext.Provider>
  );
}

export { ContextWrapper, SettingsContext, AccountContext };
