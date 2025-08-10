import { Play, Info } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import VideoPlayer from "./video-player";

interface HeroSectionProps {
  featuredContent?: {
    id: string;
    title: string;
    description: string;
    backdropUrl?: string;
    videoUrl?: string;
  };
}

export default function HeroSection({ featuredContent }: HeroSectionProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [, setLocation] = useLocation();

  const defaultContent = {
    id: "featured",
    title: "Stranger Things",
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    backdropUrl: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
  };

  const content = featuredContent || defaultContent;

  const handlePlay = () => {
    setShowPlayer(true);
  };

  const handleMoreInfo = () => {
    setLocation(`/content/${content.id}`);
  };

  return (
    <>
      {showPlayer && (
        <VideoPlayer
          videoUrl={content.videoUrl}
          title={content.title}
          onClose={() => setShowPlayer(false)}
        />
      )}
      
      <section 
        className="hero-section"
        style={{
          backgroundImage: content.backdropUrl 
            ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${content.backdropUrl})`
            : undefined,
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="hero-title text-white">{content.title}</h1>
            <p className="hero-description text-netflix-muted">
              {content.description}
            </p>
            <div className="flex gap-4 flex-wrap">
              <button 
                onClick={handlePlay}
                className="btn-play"
              >
                <Play size={20} fill="currentColor" />
                Play
              </button>
              <button 
                onClick={handleMoreInfo}
                className="btn-info"
              >
                <Info size={20} />
                More Info
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
