// Imports
import { useNavigate } from "react-router-dom";
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
function NewDevPost() {
  const navigate = useNavigate();

  // Submit post edit
  async function handleSubmit(editTitleInp, editDateInp, editContentInp) {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Try logging back in");
      return;
    }

    try {
      await axios.post(
        `${BACKEND_API_URL}/devPost/createDevPost`,
        { title: editTitleInp, date: editDateInp, content: editContentInp },
        { headers: { authorization: `Bearer ${token}` } }
      );

      alert("Post successfully created");

      navigate("/");
    } catch (err) {
      alert(err.response.data.err);
    }
  }

  return (
    <BothNavs>
      <div className="content-container">
        <h1 className="content-title serif align-self-center">Frong Devblog</h1>
        <DevPostEditForm handleSubmit={handleSubmit} />
      </div>
    </BothNavs>
  );
}

export { NewDevPost };
