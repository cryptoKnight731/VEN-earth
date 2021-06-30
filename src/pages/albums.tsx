import FadeIn from "react-fade-in";
import { GenericMeta } from "../components/GenericMeta";
import useSWR from "swr";
import { LastFMResponse } from "../types/lastFM";
import { truncate } from "../lib/utils";
import { v4 as uuidv4 } from "uuid";
import { AlbumCard } from "../components/AlbumCard";

export default function Albums() {
  const { data }: { data?: LastFMResponse } = useSWR("/api/topAlbums", (url) =>
    fetch(url).then((res) => res.json())
  );

  return (
    <>
      <GenericMeta title="Albums" description="My top albums on Spotify." />

      {data && (
        <div className="md:px-8">
          <FadeIn>
            <div
              className="rounded-lg justify-center md:justify-start
           grid grid-flow-row xs:grid-flow-col gap-6 xs:grid-rows-2 overflow-scroll p-3"
            >
              {data.topalbums.album
                .filter((album) => album.image[3]["#text"])
                .map((album) => (
                  <AlbumCard
                    key={uuidv4()}
                    artist={album.artist.name}
                    name={truncate(album.name, 25)}
                    coverImage={album.image[3]["#text"]}
                    href={album.url}
                  />
                ))}
            </div>
          </FadeIn>
        </div>
      )}
    </>
  );
}
