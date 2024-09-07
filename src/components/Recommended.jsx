import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import posterNotFound from "../assets/posterNotFound.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import dateFormat from "./dateFormat";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import styles from "./Recommended.module.css"; // Import CSS module

const skeletonItem = () => {
  return (
    <div className={`${styles.card} group`}>
      <div className={styles.poster}>
        <Skeleton count={1} className={styles.posterImage} />
      </div>
      <Skeleton count={1} className="h-3" />
      <Skeleton count={1} className="h-3" />
    </div>
  );
};

export default function Recommended({ data, loading, endpoint }) {
  const carouselBox = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselBox.current;
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - container.offsetWidth / 1.234
        : container.scrollLeft + container.offsetWidth / 1.234;

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.carouselContainer}>
      {!loading ? (
        <>
          <span
            onClick={() => navigation("left")}
            className={`${styles.carouselNavigationLeft}`}
          >
            <FaChevronLeft />
          </span>
          <span
            onClick={() => navigation("right")}
            className={`${styles.carouselNavigationRight}`}
          >
            <FaChevronRight />
          </span>
          <div
            className={styles.carousel}
            ref={carouselBox}
          >
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.backdrop + item.poster_path
                : posterNotFound;
              return (
                <div
                  key={item.id}
                  className={`${styles.card} group`}
                  onClick={() => {
                    navigate(`/${item.media_type || endpoint}/${item.id}`);
                    window.scrollTo(0, 0);
                  }}
                >
                  <div className={styles.poster}>
                    <LazyLoadImage
                      alt={item.title}
                      src={posterUrl}
                      className={styles.posterImage}
                    />
                  </div>
                  <span className={styles.title}>
                    {item.title || item.name}
                  </span>
                  <div className={styles.cardInfo}>
                    <span className={styles.releaseDate}>
                      {dateFormat(item.release_date || item.first_air_date)}
                    </span>
                    <span className={styles.voteAverage}>
                      {item.vote_average.toFixed(1)}
                      <AiFillStar />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className={styles.carousel}>
          {skeletonItem()}
          {skeletonItem()}
          {skeletonItem()}
          {skeletonItem()}
          {skeletonItem()}
          {skeletonItem()}
          {skeletonItem()}
        </div>
      )}
    </div>
  );
}
