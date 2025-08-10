import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import Navbar from "@/components/netflix/navbar";
import ContentRow from "@/components/netflix/content-row";
import type { Content } from "@shared/schema";

export default function Search() {
  const [, params] = useRoute("/search/:query");
  const [searchQuery, setSearchQuery] = useState(params?.query || "");

  const { data: searchResults = [], isLoading } = useQuery<Content[]>({
    queryKey: ["/api/search", { q: searchQuery }],
    enabled: !!searchQuery,
  });

  useEffect(() => {
    if (params?.query) {
      setSearchQuery(decodeURIComponent(params.query));
    }
  }, [params?.query]);

  if (!searchQuery) {
    return (
      <div className="min-h-screen bg-netflix-dark">
        <Navbar />
        <main className="pt-24 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8">Search</h1>
            <p className="text-netflix-muted">Enter a search term to find movies and TV shows.</p>
          </div>
        </main>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-dark">
        <Navbar />
        <main className="pt-24 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8">Searching...</h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-dark">
      <Navbar />
      
      <main className="pt-24 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">
            Search Results for "{searchQuery}"
          </h1>

          {searchResults.length > 0 ? (
            <ContentRow 
              title={`Found ${searchResults.length} results`}
              content={searchResults} 
            />
          ) : (
            <div className="text-center py-16">
              <p className="text-netflix-muted text-xl">No results found for "{searchQuery}"</p>
              <p className="text-netflix-muted mt-4">Try searching for different keywords.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}