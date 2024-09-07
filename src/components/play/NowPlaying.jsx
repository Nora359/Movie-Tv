import PlayContext from "@/context/PlayContext";
import { updateContinuePlaying } from "@/hooks/useWatchList";
import { fetchData } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FaChevronRight } from "react-icons/fa";
import "./NowPlaying.css"; 

export default function NowPlaying() {
  const { nowPlaying, id, handleEpisodeClick } = useContext(PlayContext);

  const episodesDetail = useQuery({
    queryKey: ["episodes", id, nowPlaying.S],
    queryFn: () => fetchData(`tv/${id}/season/${nowPlaying.S}`),
  });

  return (
    <section className="now-playing-section">
      <div id="episode-details" className="episode-details">
        <span>Now Playing:</span>
        <span>
          S{nowPlaying.S}E{nowPlaying.E}.{nowPlaying.T}
        </span>
      </div>
      <div
        className="play-next-episode"
        onClick={() => {
          const episodeName =
            episodesDetail.data.episodes[nowPlaying.E]?.name || null;
          handleEpisodeClick(nowPlaying.E, episodeName, true);
          updateContinuePlaying(id, nowPlaying.S, parseInt(nowPlaying.E) + 1);
        }}
      >
        <span>Play Next Episode</span>
        <FaChevronRight />
      </div>
    </section>
  );
}
