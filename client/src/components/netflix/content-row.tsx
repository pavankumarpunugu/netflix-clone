import { useRef } from "react";
import ContentCard from "./content-card";
import type { Content } from "@shared/schema";
import { useLocation } from "wouter";

interface ContentRowProps {
  title: string;
  content: Content[];
  isLarge?: boolean;
}

export default function ContentRow({ title, content, isLarge = false }: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();

  const handleContentClick = (contentItem: Content) => {
    setLocation(`/content/${contentItem.id}`);
  };

  if (!content.length) {
    return (
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
        <div className="text-netflix-muted">No content available</div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
      <div 
        ref={scrollRef}
        className="content-row"
      >
        {content.map((item) => (
          <ContentCard
            key={item.id}
            content={item}
            isLarge={isLarge}
            onClick={handleContentClick}
          />
        ))}
      </div>
    </section>
  );
}
