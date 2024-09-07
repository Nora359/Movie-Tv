import { getContinuePlaying } from "@/hooks/useWatchList";
import { AiFillStar } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import posterNotFound from "../assets/posterNotFound.png";
import dateFormat from "../components/dateFormat";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import "./ContinueWatching.css"; // قم بإضافة ملف CSS الجديد

export default function ContinueWatching() {
  const [watchingList, setWatchingList] = useState(getContinuePlaying());
  const notify = (content) => toast(content);
  const navigate = useNavigate();
  let { url } = useSelector((state) => state.home);

  const handleRemove = (itemId) => {
    const updatedItems = watchingList.filter((item) => item.id !== itemId);
    localStorage.setItem("continuePlaying", JSON.stringify(updatedItems));
    setWatchingList(updatedItems);
    notify("Removed successfully");
  };

  if (watchingList.length > 0) {
    return (
      <div className="continue-watching-container">
        <h2 className="continue-watching-title">Continue Watching</h2>
        <div className="watching-list-container">
          <div className="watching-list">
            {watchingList.map((data) => {
              const item = data.details;
              const posterUrl = item.poster_path
                ? url.backdrop + item.poster_path
                : posterNotFound;
              return (
                <div key={item.id} className="watching-item">
                  <div
                    className="watching-item-content"
                    onClick={() => navigate(`/${item.media_type}/${item.id}`)}
                  >
                    <div className="poster-container">
                      <LazyLoadImage
                        alt={item.title}
                        src={posterUrl}
                        className="poster-image"
                      />
                    </div>
                    <span className="watching-item-title">
                      {item.title || item.name}
                    </span>
                    <div className="watching-item-info">
                      <span className="release-date">
                        {dateFormat(item.release_date || item.first_air_date)}
                      </span>
                      <span className="rating">
                        {item.vote_average.toFixed(1)}
                        <AiFillStar />
                      </span>
                    </div>
                  </div>
                  <div
                    className="remove-button"
                    onClick={() => {
                      handleRemove(data.id);
                    }}
                  >
                    <CiTrash size={20} />
                    <span>Remove</span>
                  </div>
                  <ToastContainer
                    position="top-center"
                    autoClose={200}
                    hideProgressBar={true}
                    newestOnTop={true}
                    rtl={false}
                    pauseOnFocusLoss
                    theme="dark"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
