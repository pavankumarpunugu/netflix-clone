import { useState } from "react";
import type { Content } from "@shared/schema";

interface ContentCardProps {
  content: Content;
  isLarge?: boolean;
  onClick?: (content: Content) => void;
}

export default function ContentCard({ content, isLarge = false, onClick }: ContentCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = () => {
    onClick?.(content);
  };

  return (
    <div 
      className={`content-card ${isLarge ? "large-card" : ""}`}
      onClick={handleClick}
    >
      <img
        src={content.posterUrl}
        alt={content.title}
        onLoad={() => setImageLoaded(true)}
        className={`transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
      />
      <div className="content-overlay">
        <div className="text-sm font-semibold text-white">{content.title}</div>
        <div className="text-xs text-netflix-muted">{content.rating}% Match</div>
      </div>
    </div>
  );
}
