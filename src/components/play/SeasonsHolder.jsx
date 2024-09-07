import PlayContext from "@/context/PlayContext";
import { fetchData } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import "./SeasonsHolder.css"; 

export default function SeasonsHolder({ refetchEpisodes }) {
  const { seasonNumber, setSeasonNumber, id } = useContext(PlayContext);
  const seriesDetails = useQuery({
    queryKey: ["series", id],
    queryFn: () => fetchData(`tv/${id}`),
  });

  return (
    <div id="seasons-holder" className="seasons-holder">
      {seriesDetails?.data?.seasons?.map((item) => {
        return (
          <span
            key={item.id}
            className={`season-item ${
              item.season_number == seasonNumber ? "active" : ""
            }`}
            onClick={() => {
              setSeasonNumber(item.season_number);
              refetchEpisodes();
            }}
          >
            {item.season_number}
          </span>
        );
      })}
    </div>
  );
}
