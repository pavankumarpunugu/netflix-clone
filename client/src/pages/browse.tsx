import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Navbar from "@/components/netflix/navbar";
import ContentRow from "@/components/netflix/content-row";
import CategoryFilter from "@/components/netflix/category-filter";
import type { Content } from "@shared/schema";

export default function Browse() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: allContent = [], isLoading } = useQuery<Content[]>({
    queryKey: ["/api/content"],
  });

  const { data: movies = [] } = useQuery<Content[]>({
    queryKey: ["/api/content/type/movie"],
  });

  const { data: tvShows = [] } = useQuery<Content[]>({
    queryKey: ["/api/content/type/tv"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading Browse...</div>
      </div>
    );
  }

  const filteredContent = selectedCategory === "all" 
    ? allContent 
    : allContent.filter(content => content.genre.toLowerCase() === selectedCategory);

  // Group content by genres
  const actionContent = allContent.filter(content => content.genre.toLowerCase() === 'action');
  const dramaContent = allContent.filter(content => content.genre.toLowerCase() === 'drama');
  const comedyContent = allContent.filter(content => content.genre.toLowerCase() === 'comedy');
  const sciFiContent = allContent.filter(content => content.genre.toLowerCase() === 'sci-fi');
  const horrorContent = allContent.filter(content => content.genre.toLowerCase() === 'horror');
  const thrillerContent = allContent.filter(content => content.genre.toLowerCase() === 'thriller');

  return (
    <div className="min-h-screen bg-netflix-dark">
      <Navbar />
      
      <main className="pt-24 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Browse</h1>

          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {selectedCategory === "all" ? (
            <>
              {movies.length > 0 && (
                <ContentRow 
                  title="Movies" 
                  content={movies} 
                />
              )}

              {tvShows.length > 0 && (
                <ContentRow 
                  title="TV Shows" 
                  content={tvShows} 
                />
              )}

              {actionContent.length > 0 && (
                <ContentRow 
                  title="Action & Adventure" 
                  content={actionContent} 
                />
              )}

              {dramaContent.length > 0 && (
                <ContentRow 
                  title="Dramas" 
                  content={dramaContent} 
                />
              )}

              {comedyContent.length > 0 && (
                <ContentRow 
                  title="Comedies" 
                  content={comedyContent} 
                />
              )}

              {sciFiContent.length > 0 && (
                <ContentRow 
                  title="Sci-Fi & Fantasy" 
                  content={sciFiContent} 
                />
              )}

              {horrorContent.length > 0 && (
                <ContentRow 
                  title="Horror" 
                  content={horrorContent} 
                />
              )}

              {thrillerContent.length > 0 && (
                <ContentRow 
                  title="Thrillers" 
                  content={thrillerContent} 
                />
              )}
            </>
          ) : (
            filteredContent.length > 0 && (
              <ContentRow 
                title={`${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Content`}
                content={filteredContent} 
              />
            )
          )}

          {filteredContent.length === 0 && selectedCategory !== "all" && (
            <div className="text-center py-16">
              <p className="text-netflix-muted text-xl">No {selectedCategory} content found</p>
              <p className="text-netflix-muted mt-4">Try selecting a different category.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}