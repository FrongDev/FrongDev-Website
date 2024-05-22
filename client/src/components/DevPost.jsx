// Fontawesome
import { useNavigate } from "react-router-dom";
import FAIconWrapper from "./FAIconWrapper.jsx";
import { faPenToSquare, faComment } from "@fortawesome/free-solid-svg-icons";

// CSS
import "../css/dev-blog.css";

function DevPost({
  id,
  title,
  readableDate,
  content,
  showCommentBtn,
  showEditBtn,
  pageNum,
}) {
  const navigate = useNavigate();

  return (
    <div className="dev-post">
      <div className="flex-row flex-align-start">
        <h1 className="dev-post-title">{title}</h1>
        {showEditBtn && (
          <FAIconWrapper
            icon={faPenToSquare}
            onClick={() =>
              navigate("/editDevPost", {
                state: { devPostId: id, fromPageNum: pageNum },
              })
            }
            className="nav-icon"
          />
        )}
      </div>
      <h5 className="dev-post-date">{readableDate}</h5>
      <br />
      <p className="dev-post-content">{content}</p>
      {showCommentBtn && (
        <>
          <br />
          <button
            onClick={() =>
              navigate("/viewDevPost", {
                state: { devPostId: id, fromPageNum: pageNum },
              })
            }
            className="dev-post-comment-btn"
          >
            <FAIconWrapper icon={faComment} />
            Comment
          </button>
        </>
      )}
    </div>
  );
}

export { DevPost };
