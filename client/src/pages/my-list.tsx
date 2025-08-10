import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/netflix/navbar";
import ContentRow from "@/components/netflix/content-row";
import type { Content } from "@shared/schema";

export default function MyList() {
  // For demo purposes, we'll show some sample content as "My List"
  // In a real app, this would fetch user-specific watchlist data
  const { data: allContent = [], isLoading } = useQuery<Content[]>({
    queryKey: ["/api/content"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading My List...</div>
      </div>
    );
  }

  // Simulate user's list with first few items
  const myListContent = allContent.slice(0, 6);

  return (
    <div className="min-h-screen bg-netflix-dark">
      <Navbar />
      
      <main className="pt-24 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">My List</h1>
          
          {myListContent.length > 0 ? (
            <>
              <p className="text-netflix-muted mb-8">
                {myListContent.length} titles in your list
              </p>
              <ContentRow 
                title="Continue Watching" 
                content={myListContent} 
              />
            </>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-white mb-4">Your list is empty</h2>
              <p className="text-netflix-muted mb-8">
                Add movies and shows to your list to watch them later.
              </p>
              <a 
                href="/" 
                className="bg-netflix-red text-white px-8 py-3 rounded hover:bg-red-700 transition-colors"
              >
                Browse Content
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}