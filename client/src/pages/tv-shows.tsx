import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/netflix/navbar";
import ContentRow from "@/components/netflix/content-row";
import type { Content } from "@shared/schema";

export default function TVShows() {
  const { data: tvShows = [], isLoading } = useQuery<Content[]>({
    queryKey: ["/api/content/type/tv"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading TV Shows...</div>
      </div>
    );
  }

  const dramaShows = tvShows.filter(show => show.genre.toLowerCase() === 'drama');
  const comedyShows = tvShows.filter(show => show.genre.toLowerCase() === 'comedy');
  const thrillerShows = tvShows.filter(show => show.genre.toLowerCase() === 'thriller');
  const horrorShows = tvShows.filter(show => show.genre.toLowerCase() === 'horror');

  return (
    <div className="min-h-screen bg-netflix-dark">
      <Navbar />
      
      <main className="pt-24 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">TV Shows</h1>

          {tvShows.length > 0 && (
            <ContentRow 
              title="All TV Shows" 
              content={tvShows} 
            />
          )}

          {dramaShows.length > 0 && (
            <ContentRow 
              title="Drama Series" 
              content={dramaShows} 
            />
          )}

          {comedyShows.length > 0 && (
            <ContentRow 
              title="Comedy Series" 
              content={comedyShows} 
            />
          )}

          {thrillerShows.length > 0 && (
            <ContentRow 
              title="Thriller Series" 
              content={thrillerShows} 
            />
          )}

          {horrorShows.length > 0 && (
            <ContentRow 
              title="Horror Series" 
              content={horrorShows} 
            />
          )}
        </div>
      </main>
    </div>
  );
}