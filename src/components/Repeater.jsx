import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import posterNotFound from "../assets/posterNotFound.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import dateFormat from "./dateFormat";
import { fetchData } from "../utils/api";
import { AiFillStar } from "react-icons/ai";
import { useInfiniteQuery } from "@tanstack/react-query";
import styles from "./Repeater.module.css";

const skeletonItem = () => (
  <div className={styles.item}>
    <div className={styles.poster}>
      <Skeleton count={1} className={styles.posterImage} />
    </div>
    <Skeleton count={1} className="h-3" />
    <Skeleton count={1} className="h-3" />
  </div>
);

export default function Repeater({ genre, endpoint }) {
  const navigate = useNavigate();
  const carouselBox = useRef();
  const { url } = useSelector((state) => state.home);

  const fetchPage = async ({ pageParam = 1 }) => {
    const cinemaFetchingUrl =
      `discover/${endpoint}?page=${pageParam}` +
      (genre ? `&with_genres=${genre}` : '');
    const res = await fetchData(cinemaFetchingUrl);
    return res;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["items", genre, endpoint],
    queryFn: fetchPage,
    getNextPageParam: (lastPage) => lastPage.page + 1,
  });

  return (
    <div className={styles.container}>
      {error ? (
        <div>{error.message}</div>
      ) : !isLoading ? (
        <>
          <div
            className={`${styles.gridContainer} ${styles.sm} ${styles.md} ${styles.xl}`}
            ref={carouselBox}
          >
            {data.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.results.map((item) => {
                  const posterUrl = item.poster_path
                    ? url.backdrop + item.poster_path
                    : posterNotFound;
                  return (
                    <div
                      key={item.id}
                      className={styles.item}
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
                      <div className={styles.info}>
                        <span className={styles.date}>
                          {dateFormat(item.release_date || item.first_air_date)}
                        </span>
                        <span className={styles.rating}>
                          {item.vote_average.toFixed(1)}
                          <AiFillStar />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
          <div className={styles.buttonContainer}>
            {hasNextPage && (
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className={styles.loadMoreButton}
              >
                {isFetchingNextPage ? "Loading.." : "Load more"}
              </button>
            )}
          </div>
        </>
      ) : (
        <div className={styles.skeletonContainer}>
          {skeletonItem()}
          {skeletonItem()}
          {skeletonItem()}
          {skeletonItem()}
          {skeletonItem()}
          {skeletonItem()}
          {skeletonItem()}
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
