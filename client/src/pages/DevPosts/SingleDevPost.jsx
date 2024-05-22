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
        `${BACKEND_API_URL}/devPost/getDevPost/${devPostId}`
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
        `${BACKEND_API_URL}/devPost/getDevPostComments/${devPostId}`
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
        { headers: { authorization: `Bearer ${token}` } }
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
        { headers: { authorization: `Bearer ${token}` } }
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
        <div className="flex-row flex-justify-space-between">
          <div className="dev-blog-left-controls">
            <FAIconWrapper
              icon={faArrowLeft}
              onClick={() =>
                navigate("/", {
                  state: { returnToPageNum: fromPageNum ?? 1 },
                })
              }
            />
          </div>
          <h1 className="content-title serif align-self-center">
            Frong Devblog
          </h1>
          <div className="flex-grow-1"></div>
        </div>
        <div className="full-size overflow-y-scroll">
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
            className="dev-post-comments-container"
            onSubmit={handleSubmitComment}
          >
            <h3>Make a comment:</h3>
            <TextareaAutosize
              value={userCommentInput}
              onChange={(e) => setUserCommentInput(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>

          {/* Display comments */}
          <div className="dev-post-comments-container">
            <h3 className="title">Comments:</h3>
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
    <div className="dev-post-comment">
      <div className="dev-post-comment-author">
        <FAIconWrapper icon={faUser} />
        <p>{authorUsername}</p>
        <div className="flex-grow-1" />
        {showDeleteBtn && (
          <FAIconWrapper
            icon={faTrash}
            onClick={() => deleteComment(id)}
            className="delete-comment-btn"
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
