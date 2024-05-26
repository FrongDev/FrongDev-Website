// Fontawesome
import "../components/FAIconWrapper.jsx";

// Images
import frongGunImg from "../public/gallery/fronggun.gif";
import frongStrutImg from "../public/gallery/frongstrut.gif";
import raccoonImg from "../public/gallery/raccoon.png";

// CSS
import "../css/content.css";

// My components
import { BothNavs } from "../components/nav/BothNavs.jsx";

function Gallery() {
  return (
    <BothNavs>
      <div className="content-container">
        <h1 className="content-title serif self-center">Frong Gallery</h1>
        <div className="grid grid-cols-1 gap-[10px] overflow-x-hidden overflow-y-scroll px-[14px] text-center md:grid-cols-2 lg:grid-cols-3">
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
    <div className="flex flex-col items-center gap-[4px] rounded-[5px] bg-[--background-color] p-[7px] text-center">
      <img src={src} />
      <h4>{title}</h4>
      <p>{author}</p>
    </div>
  );
}

export { Gallery };
