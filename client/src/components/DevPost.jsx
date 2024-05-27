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
    <div className="rounded-[--dev-post-border-radius] bg-[--background-color] p-[6px]">
      <div className="flex flex-row items-start">
        <h1 className="flex-grow text-xl font-semibold sm:text-3xl">{title}</h1>
        {showEditBtn && (
          <FAIconWrapper
            icon={faPenToSquare}
            onClick={() =>
              navigate("/editDevPost", {
                state: { devPostId: id, fromPageNum: pageNum },
              })
            }
            className="h-[--nav-icon-size]"
          />
        )}
      </div>
      <h5 className="text-sm font-bold">{readableDate}</h5>
      <br />
      <p className="text-base">{content}</p>
      {showCommentBtn && (
        <>
          <br />
          <button
            onClick={() =>
              navigate("/viewDevPost", {
                state: { devPostId: id, fromPageNum: pageNum },
              })
            }
            className="flex items-center gap-[5px]"
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
