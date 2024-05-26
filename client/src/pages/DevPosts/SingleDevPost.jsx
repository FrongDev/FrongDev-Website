// Imports
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import TextareaAutosize from "react-textarea-autosize";

// Fontawesome
import FAIconWrapper from "../../components/FAIconWrapper.jsx";
import {
  faArrowLeft,
  faUser,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

// URL of backend
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API;

// CSS
import "../../css/dev-blog.css";
import "../../css/content.css";

// Contexts
import { AccountContext } from "../../Contexts.jsx";

// My components
import { BothNavs } from "../../components/nav/BothNavs.jsx";
import { DevPost } from "../../components/DevPost.jsx";

// Webpage container
function SingleDevPost() {
  const navigate = useNavigate();

  // Get id from redirect
  const location = useLocation();
  const { devPostId, fromPageNum } = location.state;

  const { isAdmin } = useContext(AccountContext);

  // To store post
  const [devPost, setDevPost] = useState({});
  const { title, readableDate, content } = devPost;

  // Fetch dev post
  async function fetchDevPost() {
    try {
      const response = await axios.get(
        `${BACKEND_API_URL}/devPost/getDevPost/${devPostId}`,
      );

      setDevPost(response.data);
    } catch (err) {
      console.log("Failed to fetch dev post");
    }
  }

  useEffect(() => {
    fetchDevPost();
  }, []);

  // To store comments
  const [comments, setComments] = useState([]);

  // Fetch post comments
  async function fetchPostComments() {
    try {
      const response = await axios.get(
        `${BACKEND_API_URL}/devPost/getDevPostComments/${devPostId}`,
      );

      setComments(response.data);
    } catch (err) {
      console.log("Failed to fetch comments");
    }
  }

  useEffect(() => {
    fetchPostComments();
  });

  // Create comment
  const [userCommentInput, setUserCommentInput] = useState("");

  async function handleSubmitComment(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Try logging back in");
      return;
    }

    try {
      await axios.post(
        `${BACKEND_API_URL}/devPost/createComment/${devPostId}`,
        { comment: userCommentInput },
        { headers: { authorization: `Bearer ${token}` } },
      );

      alert("Comment successfully created");

      setUserCommentInput("");
      fetchPostComments();
    } catch (err) {
      alert(err.response.data.err);
    }
  }

  // Delete comment
  async function deleteComment(commentId) {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Try logging back in");
      return;
    }

    try {
      await axios.delete(
        `${BACKEND_API_URL}/devPost/deleteComment/${commentId}`,
        { headers: { authorization: `Bearer ${token}` } },
      );

      alert("Successfully deleted");

      fetchPostComments();
    } catch (err) {
      alert(err.response.data.err);
    }
  }

  return (
    <BothNavs>
      <div className="content-container">
        <div className="flex items-center justify-between">
          <div className="dev-blog-left-controls flex-grow basis-0 text-xl">
            <FAIconWrapper
              icon={faArrowLeft}
              onClick={() =>
                navigate("/", {
                  state: { returnToPageNum: fromPageNum ?? 1 },
                })
              }
            />
          </div>
          <h1 className="serif content-title mb-[0.3rem] self-center">
            Frong Devblog
          </h1>
          <div className="flex-grow"></div>
        </div>
        <div className="flex h-full w-full flex-col gap-3 overflow-y-scroll px-[12px]">
          {/* Post */}
          <DevPost
            id={devPostId}
            title={title}
            readableDate={readableDate}
            content={content}
            showEditBtn={isAdmin}
          />

          {/* Make comment */}
          <form
            className="flex flex-col gap-[1rem] rounded-[--dev-post-border-radius] bg-[--background-color] px-[1.5ch] py-[1ch]"
            onSubmit={handleSubmitComment}
          >
            <h3 className="font-semibold">Make a comment:</h3>
            <TextareaAutosize
              value={userCommentInput}
              onChange={(e) => setUserCommentInput(e.target.value)}
              className="min-h-[4rem] w-full"
            />
            <button type="submit">Submit</button>
          </form>

          {/* Display comments */}
          <div className="flex flex-col gap-[1rem] rounded-[--dev-post-border-radius] bg-[--background-color] px-[1.5ch] py-[1ch]">
            <h3 className="border-b-nav-border-width border-frong-color font-bold">
              Comments:
            </h3>
            {comments.map(({ id, authorUsername, readableDate, comment }) => {
              return (
                <DevPostComment
                  id={id}
                  authorUsername={authorUsername}
                  readableDate={readableDate}
                  comment={comment}
                  showDeleteBtn={isAdmin}
                  deleteComment={deleteComment}
                  key={id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </BothNavs>
  );
}

function DevPostComment({
  id,
  authorUsername,
  readableDate,
  comment,
  showDeleteBtn,
  deleteComment,
}) {
  return (
    <div className="rounded-[--dev-post-border-radius] bg-[--content-background-color] p-[5px]">
      <div className="flex items-center gap-[5px]">
        <FAIconWrapper icon={faUser} inline={true} />
        <p className="text-xl">{authorUsername}</p>
        <div className="flex-grow-1" />
        {showDeleteBtn && (
          <FAIconWrapper
            icon={faTrash}
            onClick={() => deleteComment(id)}
            className="rounded-[3px] border-[5px] border-red-600 bg-red-600"
          />
        )}
      </div>
      <p>{readableDate}</p>
      <br />
      <p>{comment}</p>
    </div>
  );
}

export { SingleDevPost };
