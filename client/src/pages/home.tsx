import { useState, useEffect } from "react";
import Navbar from "@/components/netflix/navbar";
import HeroSection from "@/components/netflix/hero-section";
import ContentRow from "@/components/netflix/content-row";
import CategoryFilter from "@/components/netflix/category-filter";
import { mockApi, type Content } from "@/lib/mockData";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [allContent, setAllContent] = useState<Content[]>([]);
  const [trendingContent, setTrendingContent] = useState<Content[]>([]);
  const [netflixOriginals, setNetflixOriginals] = useState<Content[]>([]);
  const [movies, setMovies] = useState<Content[]>([]);
  const [tvShows, setTvShows] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [allData, trending, originals, moviesData, tvData] = await Promise.all([
          mockApi.getContent(),
          mockApi.getTrending(),
          mockApi.getNetflixOriginals(),
          mockApi.getContentByType('movie'),
          mockApi.getContentByType('tv'),
        ]);

        setAllContent(allData);
        setTrendingContent(trending);
        setNetflixOriginals(originals);
        setMovies(moviesData);
        setTvShows(tvData);
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredContent = selectedCategory === "all" 
    ? allContent 
    : allContent.filter(content => content.genre.toLowerCase() === selectedCategory);

  const featuredContent = trendingContent[0] || allContent[0];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading Netflix...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-dark">
      <Navbar />
      
      <HeroSection featuredContent={featuredContent} />
      
      <main className="relative z-10 -mt-24 px-4">
        <div className="container mx-auto">
          {trendingContent.length > 0 && (
            <ContentRow 
              title="Trending Now" 
              content={trendingContent} 
              isLarge={true}
            />
          )}

          {movies.length > 0 && (
            <ContentRow 
              title="Popular Movies" 
              content={movies} 
            />
          )}

          {tvShows.length > 0 && (
            <ContentRow 
              title="TV Shows" 
              content={tvShows} 
            />
          )}

          {netflixOriginals.length > 0 && (
            <ContentRow 
              title="Netflix Originals" 
              content={netflixOriginals} 
            />
          )}

          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {filteredContent.length > 0 && (
            <ContentRow 
              title={selectedCategory === "all" ? "All Content" : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Content`}
              content={filteredContent} 
            />
          )}
        </div>
      </main>

      <footer className="bg-netflix-gray mt-16 py-12 border-t border-netflix-light-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h6 className="text-white mb-4 text-sm font-semibold">Company</h6>
              <div className="space-y-2">
                <a href="#" className="block text-netflix-muted text-sm hover:text-white transition-colors">About Netflix</a>
                <a href="#" className="block text-netflix-muted text-sm hover:text-white transition-colors">Jobs</a>
                <a href="#" className="block text-netflix-muted text-sm hover:text-white transition-colors">Press</a>
                <a href="#" className="block text-netflix-muted text-sm hover:text-white transition-colors">Blog</a>
              </div>
            </div>
            <div>
              <h6 className="text-white mb-4 text-sm font-semibold">Support</h6>
              <div className="space-y-2">
                <a href="#" className="block text-netflix-muted text-sm hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block text-netflix-muted text-sm hover:text-white transition-colors">Contact Us</a>
                <a href="#" className="block text-netflix-muted text-sm hover:text-white transition-colors">Redeem Gift Cards</a>
                <a href="#" className="block text-netflix-muted text-sm hover:text-white transition-colors">Netflix Shop</a>
              </div>
            </div>
            <div>
              <h6 className="text-white mb-4 text-sm font-semibold">Legal</h6>
              <div className="space-y-2">
                <a href="#" className="block text-netflix-muted text-sm hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="block text-netflix-muted text-sm hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="block text-netflix-muted text-sm hover:text-white transition-colors">Cookie Preferences</a>
                <a href="#" className="block text-netflix-muted text-sm hover:text-white transition-colors">Corporate Information</a>
              </div>
            </div>
            <div>
              <h6 className="text-white mb-4 text-sm font-semibold">Connect</h6>
              <div className="space-y-2">
                <a href="#" className="block text-netflix-muted text-sm hover:text-white transition-colors">Facebook</a>
                <a href="#" className="block text-netflix-muted text-sm hover:text-white transition-colors">Instagram</a>
                <a href="#" className="block text-netflix-muted text-sm hover:text-white transition-colors">Twitter</a>
                <a href="#" className="block text-netflix-muted text-sm hover:text-white transition-colors">YouTube</a>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-netflix-muted text-sm">&copy; 2024 Netflix Clone. This is a demo application.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
