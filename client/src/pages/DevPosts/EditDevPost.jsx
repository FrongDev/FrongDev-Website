// Imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

// URL of backend
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API;

// CSS
import "../../css/dev-blog.css";
import "../../css/edit-dev-post.css";

// My components
import { BothNavs } from "../../components/nav/BothNavs.jsx";
import { DevPostEditForm } from "../../components/DevPostEditForm.jsx";

// Webpage container
function EditDevPost() {
  const navigate = useNavigate();

  // Get id from redirect
  const location = useLocation();
  const { devPostId } = location.state;

  // Fetch dev post
  const [devPost, setDevPost] = useState({});
  const [isDevPostFetched, setIsDevPostFetched] = useState(false);
  const { title, dateInput, content } = devPost;

  async function fetchDevPost() {
    try {
      const response = await axios.get(
        `${BACKEND_API_URL}/devPost/getDevPost/${devPostId}`
      );

      setDevPost(response.data);
      setIsDevPostFetched(true);
    } catch (err) {
      console.log("Failed to fetch dev post");
    }
  }

  useEffect(() => {
    fetchDevPost();
  }, []);

  // Submit edit
  async function handleSubmit(editTitleInp, editDateInp, editContentInp) {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Try logging back in");
      return;
    }

    try {
      await axios.patch(
        `${BACKEND_API_URL}/devPost/editDevPost/${devPostId}`,
        { title: editTitleInp, date: editDateInp, content: editContentInp },
        { headers: { authorization: `Bearer ${token}` } }
      );

      alert("Successfully updated");

      navigate("/viewDevPost", { state: { devPostId } });
    } catch (err) {
      alert(err.response.data.err);
    }
  }

  // Delete post
  async function handleDelete() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Try logging back in");
      return;
    }

    try {
      await axios.delete(
        `${BACKEND_API_URL}/devPost/deleteDevPost/${devPostId}`,
        { headers: { authorization: `Bearer ${token}` } }
      );

      alert("Successfully deleted");

      navigate("/");
    } catch (err) {
      alert(err.response.data.err);
    }
  }

  return (
    <BothNavs>
      <div className="content-container">
        <h1 className="content-title serif align-self-center">Frong Devblog</h1>
        {isDevPostFetched && (
          <DevPostEditForm
            handleSubmit={handleSubmit}
            defaultTitle={title}
            defaultDate={dateInput}
            defaultContent={content}
            handleDelete={handleDelete}
            showDeleteBtn={true}
          />
        )}
      </div>
    </BothNavs>
  );
}

export { EditDevPost };
