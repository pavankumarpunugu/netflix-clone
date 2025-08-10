import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/netflix/navbar";
import ContentRow from "@/components/netflix/content-row";
import type { Content } from "@shared/schema";

export default function Movies() {
  const { data: movies = [], isLoading } = useQuery<Content[]>({
    queryKey: ["/api/content/type/movie"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading Movies...</div>
      </div>
    );
  }

  const actionMovies = movies.filter(movie => movie.genre.toLowerCase() === 'action');
  const dramaMovies = movies.filter(movie => movie.genre.toLowerCase() === 'drama');
  const sciFiMovies = movies.filter(movie => movie.genre.toLowerCase() === 'sci-fi');
  const comedyMovies = movies.filter(movie => movie.genre.toLowerCase() === 'comedy');

  return (
    <div className="min-h-screen bg-netflix-dark">
      <Navbar />
      
      <main className="pt-24 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Movies</h1>

          {movies.length > 0 && (
            <ContentRow 
              title="All Movies" 
              content={movies} 
            />
          )}

          {actionMovies.length > 0 && (
            <ContentRow 
              title="Action Movies" 
              content={actionMovies} 
            />
          )}

          {dramaMovies.length > 0 && (
            <ContentRow 
              title="Drama Movies" 
              content={dramaMovies} 
            />
          )}

          {sciFiMovies.length > 0 && (
            <ContentRow 
              title="Sci-Fi Movies" 
              content={sciFiMovies} 
            />
          )}

          {comedyMovies.length > 0 && (
            <ContentRow 
              title="Comedy Movies" 
              content={comedyMovies} 
            />
          )}
        </div>
      </main>
    </div>
  );
}