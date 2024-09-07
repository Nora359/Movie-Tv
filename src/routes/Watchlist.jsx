import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import { getWatchListCinemas } from "../hooks/useWatchList";
import { useSelector } from "react-redux";
import posterNotFound from "../assets/posterNotFound.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import dateFormat from "../components/dateFormat";
import { AiFillStar } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./Watchlist.css"; 

export default function Watchlist() {
  const [watchlistItems, setWatchlistItems] = useState(getWatchListCinemas());
  const notify = (content) => toast(content);
  const navigate = useNavigate();
  let { url } = useSelector((state) => state.home);

  const handleRemove = (itemId) => {
    const updatedItems = watchlistItems.filter((item) => item.id !== itemId);
    localStorage.setItem("watchlist", JSON.stringify(updatedItems));
    setWatchlistItems(updatedItems);
    notify("Removed successfully");
  };

  return (
    <div className="watchlist-container">
      <Menu className="menu" />
      <div className="main-content">
        {watchlistItems.length > 0 ? (
          <div className="watchlist-grid">
            {watchlistItems.map((item) => {
              const posterUrl = item.poster_path
                ? url.backdrop + item.poster_path
                : posterNotFound;
              return (
                <div key={item.id} className="watchlist-item">
                  <div
                    className="poster"
                    onClick={() => navigate(`/${item.media_type}/${item.id}`)}
                  >
                    <LazyLoadImage
                      alt={item.title}
                      src={posterUrl}
                      className="object-cover w-full h-full object-center rounded-md"
                    />
                  </div>
                  <span className="title">{item.title || item.name}</span>
                  <div className="info">
                    <span className="date">
                      {dateFormat(item.release_date || item.first_air_date)}
                    </span>
                    <span className="rating">
                      {item.vote_average.toFixed(1)}
                      <AiFillStar />
                    </span>
                  </div>
                  <div
                    className="remove-button"
                    onClick={() => handleRemove(item.id)}
                  >
                    <CiTrash size={20} /> Remove
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>Your Watchlist is Empty!</div>
        )}
        <ToastContainer
          position="top-center"
          autoClose={200}
          hideProgressBar={true}
          newestOnTop={true}
          rtl={false}
          pauseOnFocusLoss
          theme="dark"
          className="toast-container"
        />
      </div>
    </div>
  );
}
