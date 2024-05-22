// Imports
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Fontawesome
import FAIconWrapper from "../components/FAIconWrapper.jsx";
import {
  faAngleLeft,
  faAnglesLeft,
  faAngleRight,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

// URL of backend
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API;

// Contexts
import { SettingsContext, AccountContext } from "../Contexts.jsx";

// CSS
import "../css/dev-blog.css";

// My components
import { BothNavs } from "../components/nav/BothNavs.jsx";
import { DevPost } from "../components/DevPost.jsx";

// My functions
import noop from "../functions/noop.jsx";

// Pickable page sizes
const PAGE_SIZE_OPTIONS = [1, 2, 5, 10, 50, 100];

// Webpage container
function Index() {
  const navigate = useNavigate();

  const { isAdmin } = useContext(AccountContext);

  // If returned to from a single dev post restore the page num
  const location = useLocation();
  const returnToPageNum = location?.state?.returnToPageNum;
  const initialPageNum = returnToPageNum || 1;

  // Page for dev posts
  const [pageNum, setPageNum] = useState(initialPageNum);
  const { devBlogPageSize, setDevBlogPageSize } = useContext(SettingsContext);
  const [devPostPage, setDevPostPage] = useState([]);

  const [isPrevPage, setIsPrevPage] = useState(false);
  const [isNextPage, setIsNextPage] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch dev posts
  async function fetchDevPosts(pageSize, pageNum) {
    try {
      const response = await axios.get(
        `${BACKEND_API_URL}/devPost/getDevPostPage?pageSize=${pageSize}&pageNum=${pageNum}`
      );
      const data = response.data;

      setDevPostPage(data.devPostPage);
      setIsPrevPage(data.isPrevPage);
      setIsNextPage(data.isNextPage);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.log("Failed to fetch dev posts");
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchDevPosts(devBlogPageSize, pageNum);
  }, []);

  // Set pageNum
  function goToPage(newPageNum) {
    setPageNum(newPageNum);
    fetchDevPosts(devBlogPageSize, newPageNum);
  }

  // Jump by a certain number of pages
  function jumpPage(jumpSize) {
    const newPageNum = Math.max(1, pageNum + jumpSize);

    setPageNum(newPageNum);
    fetchDevPosts(devBlogPageSize, newPageNum);
  }

  // Button onClicks
  const goFirstPage = () => goToPage(1);
  const goLastPage = () => goToPage(totalPages);

  const goPrevPage = () => jumpPage(-1);
  const goNextPage = () => jumpPage(1);

  // Page size select
  function changePageSize(newPageSize) {
    const pageNum0Index = pageNum - 1;
    const topPost0Index = pageNum0Index * devBlogPageSize;
    const newPage0Index = Math.floor(topPost0Index / newPageSize);

    const newPageNum = newPage0Index + 1;

    setPageNum(newPageNum);
    setDevBlogPageSize(newPageSize);

    fetchDevPosts(newPageSize, newPageNum);
  }

  useEffect(() => {
    changePageSize(devBlogPageSize);
  }, [devBlogPageSize]);

  return (
    <BothNavs>
      <div className="content-container">
        <div className="dev-blog-top-row">
          <div className="dev-blog-left-controls">
            {/* Page 1 */}
            <FAIconWrapper
              icon={faAnglesLeft}
              onClick={isPrevPage ? goFirstPage : noop}
              className={`${isPrevPage ? "" : "disabled"}`}
            />
            <FAIconWrapper
              icon={faAngleLeft}
              onClick={isPrevPage ? goPrevPage : noop}
              className={`${isPrevPage ? "" : "disabled"}`}
            />
            <p className="inline">{pageNum}</p>
            <FAIconWrapper
              icon={faAngleRight}
              onClick={isNextPage ? goNextPage : noop}
              className={`${isNextPage ? "" : "disabled"}`}
            />
            <FAIconWrapper
              icon={faAnglesRight}
              onClick={isNextPage ? goLastPage : noop}
              className={`${isNextPage ? "" : "disabled"}`}
            />
          </div>
          <h1 className="content-title serif">Frong Devblog</h1>
          <div className="dev-blog-right-controls">
            <p>Page Size:</p>
            <select
              value={devBlogPageSize}
              onChange={(e) => changePageSize(e.target.value)}
            >
              {PAGE_SIZE_OPTIONS.map((x) => {
                return <option key={x}>{x}</option>;
              })}
            </select>
          </div>
        </div>

        {isAdmin && (
          <button
            onClick={() => navigate("/newDevPost")}
            className="align-self-center"
          >
            New Dev Post
          </button>
        )}

        <div className="dev-posts-container">
          {devPostPage.map(({ title, content, readableDate, id }) => {
            return (
              <DevPost
                key={id}
                id={id}
                title={title}
                readableDate={readableDate}
                content={content}
                showCommentBtn={true}
                showEditBtn={isAdmin}
                pageNum={pageNum}
              />
            );
          })}
        </div>
      </div>
    </BothNavs>
  );
}

export { Index };
