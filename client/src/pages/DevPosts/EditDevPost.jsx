// Imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

// Fontawesome
import FAIconWrapper from "../../components/FAIconWrapper.jsx";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// URL of backend
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API;

// CSS
import "../../css/dev-blog.css";
import "../../css/content.css";

// My components
import { BothNavs } from "../../components/nav/BothNavs.jsx";
import { DevPostEditForm } from "../../components/DevPostEditForm.jsx";

// Webpage container
function EditDevPost() {
  const navigate = useNavigate();

  // Get id from redirect
  const location = useLocation();
  const { fromPageNum } = location && location.state ? location.state : 1;

  // Fetch dev post
  const [devPost, setDevPost] = useState({});
  const [isDevPostFetched, setIsDevPostFetched] = useState(false);
  const { title, dateInput, content } = devPost;

  async function fetchDevPost() {
    try {
      const response = await axios.get(
        `${BACKEND_API_URL}/devPost/getDevPost/${devPostId}`,
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
        { headers: { authorization: `Bearer ${token}` } },
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
        { headers: { authorization: `Bearer ${token}` } },
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
          <div className="flex-grow basis-0" />
        </div>
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
