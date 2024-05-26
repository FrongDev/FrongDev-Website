// Imports
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// URL of backend
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API;

// Fontawesome
import FAIconWrapper from "../../components/FAIconWrapper.jsx";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// CSS
import "../../css/dev-blog.css";
import "../../css/content.css";

// My components
import { BothNavs } from "../../components/nav/BothNavs.jsx";
import { DevPostEditForm } from "../../components/DevPostEditForm.jsx";

// Webpage container
function NewDevPost() {
  const navigate = useNavigate();

  // Get id from redirect
  const location = useLocation();
  const { fromPageNum } = location && location.state ? location.state : 1;

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
        { headers: { authorization: `Bearer ${token}` } },
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
        <DevPostEditForm handleSubmit={handleSubmit} />
      </div>
    </BothNavs>
  );
}

export { NewDevPost };
