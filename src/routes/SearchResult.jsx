import { useParams } from "react-router-dom";
import SearchRepeater from "../components/SearchRepeater";
import Menu from "../components/Menu";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import './styles.css'; 

export default function SearchResult() {
  const { query } = useParams();
  const [type, setType] = useState("multi");

  return (
    <div className="search-result-container">
      <Menu />
      <div className="content-container">
        <section
          id="filters"
          className="filters-section"
        >
          <Tabs defaultValue={type} onValueChange={setType}>
            <TabsList className="tabs-container">
              <TabsTrigger
                value="movie"
                className="tabs-trigger"
              >
                Movies
              </TabsTrigger>
              <TabsTrigger
                value="tv"
                className="tabs-trigger"
              >
                TV shows
              </TabsTrigger>
              <TabsTrigger
                value="multi"
                className="tabs-trigger"
              >
                All
              </TabsTrigger>
            </TabsList>
            <TabsContent value="movie">
              <SearchRepeater keyword={query} type="movie" />
            </TabsContent>
            <TabsContent value="tv">
              <SearchRepeater keyword={query} type="tv" />
            </TabsContent>
            <TabsContent value="multi">
              <SearchRepeater keyword={query} type="multi" />
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}
