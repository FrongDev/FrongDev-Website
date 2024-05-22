// Fontawesome
import "../components/FAIconWrapper.jsx";

// CSS
import "../css/gallery.css";

// Images
import frongGunImg from "../public/gallery/fronggun.gif";
import frongStrutImg from "../public/gallery/frongstrut.gif";
import raccoonImg from "../public/gallery/raccoon.png";

// My components
import { BothNavs } from "../components/nav/BothNavs.jsx";

function Gallery() {
  return (
    <BothNavs>
      <div className="content-container">
        <h1 className="content-title serif align-self-center">Frong Gallery</h1>
        <div className="std-grid">
          <GalleryImg
            src={frongGunImg}
            title="Frong Wit A Gun"
            author="Philip"
          />
          <GalleryImg
            src={frongStrutImg}
            title="Frong Struttin"
            author="Philip"
          />
          <GalleryImg
            src={raccoonImg}
            title="Reginald The Raccoon"
            author="Zinn"
          />
        </div>
      </div>
    </BothNavs>
  );
}

function GalleryImg({ src, title, author }) {
  return (
    <div className="gallery-img">
      <img src={src} />
      <h4>{title}</h4>
      <p>{author}</p>
    </div>
  );
}

export { Gallery };
