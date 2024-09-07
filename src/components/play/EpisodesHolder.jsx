import { LazyLoadImage } from "react-lazy-load-image-component";
import { fetchData } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import posterNotFound from "../../assets/posterNotFound.png";
import { useSelector } from "react-redux";
import PlayContext from "@/context/PlayContext";
import { updateContinuePlaying } from "@/hooks/useWatchList";
import "./EpisodesHolder.css"; 

export default function EpisodesHolder() {
  const {
    seasonNumber,
    nowPlaying,
    episodeNumber,
    setNowPlaying,
    id,
    handleEpisodeClick,
  } = useContext(PlayContext);

  const { url: urlTemp } = useSelector((state) => state.home);

  const episodesDetail = useQuery({
    queryKey: ["episodes", id, seasonNumber],
    queryFn: () => fetchData(`tv/${id}/season/${seasonNumber}`),
  });

  useEffect(() => {
    if (episodesDetail.data && episodesDetail.data.episodes && !nowPlaying.T) {
      const episodeName =
        episodesDetail.data.episodes[parseInt(episodeNumber) - 1]?.name;
      setNowPlaying((prev) => ({
        ...prev,
        T: episodeName,
      }));
    }
  }, [episodesDetail.data, episodeNumber, setNowPlaying, nowPlaying.T]);

  return (
    <div id="episodes-holder" className="episodes-holder">
      <p className="episodes-overview">{episodesDetail?.data?.overview}</p>

      {episodesDetail?.data?.episodes?.map((item, index) => {
        const posterUrl = item.still_path
          ? urlTemp.backdrop + item.still_path
          : posterNotFound;
        return (
          <div
            key={item.id}
            className="episode-item"
            onClick={() => {
              const episodeName =
                episodesDetail.data.episodes[index]?.name | null;
              handleEpisodeClick(index, episodeName, false);
              updateContinuePlaying(id, seasonNumber, parseInt(index) + 1);
            }}
          >
            <div className="episode-content">
              <div className="episode-image">
                <LazyLoadImage
                  alt={item?.name || "poster image"}
                  src={posterUrl}
                  className="image"
                  loading="lazy"
                />
              </div>

              <div className="episode-details">
                <h3>{item.episode_number}. {item.name}</h3>
                <h4 className="episode-rating">Rated: {item?.vote_average || 0}</h4>
              </div>
            </div>
            <p className="episode-description">{item.overview}</p>
          </div>
        );
      })}
    </div>
  );
}
