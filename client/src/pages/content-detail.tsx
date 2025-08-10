import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { useState } from "react";
import { Play, Plus, Check, ThumbsUp, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/netflix/navbar";
import VideoPlayer from "@/components/netflix/video-player";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Content } from "@shared/schema";

export default function ContentDetail() {
  const [, params] = useRoute("/content/:id");
  const [showPlayer, setShowPlayer] = useState(false);
  const [isInList, setIsInList] = useState(false);
  const contentId = params?.id;
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: content, isLoading } = useQuery<Content>({
    queryKey: ["/api/content", contentId],
    enabled: !!contentId,
  });

  const addToListMutation = useMutation({
    mutationFn: async () => {
      setIsInList(true);
      toast({ title: "Added to My List", description: `${content?.title || "Content"} has been added to your list.` });
      return Promise.resolve();
    },
  });

  const removeFromListMutation = useMutation({
    mutationFn: async () => {
      setIsInList(false);
      toast({ title: "Removed from My List", description: `${content?.title || "Content"} has been removed from your list.` });
      return Promise.resolve();
    },
  });

  const handlePlay = () => {
    setShowPlayer(true);
  };

  const handleAddToList = () => {
    if (isInList) {
      removeFromListMutation.mutate();
    } else {
      addToListMutation.mutate();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-netflix-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-2xl mb-4">Content not found</h1>
          <Link href="/" className="text-netflix-red hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-dark">
      <Navbar />
      
      {showPlayer && (
        <VideoPlayer
          videoUrl={content.videoUrl}
          title={content.title}
          onClose={() => setShowPlayer(false)}
        />
      )}

      <div
        className="relative h-screen flex items-center"
        style={{
          backgroundImage: content.backdropUrl 
            ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${content.backdropUrl})`
            : `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${content.posterUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <Link href="/" className="inline-flex items-center text-white hover:text-netflix-red transition-colors mb-8">
              <ArrowLeft size={20} className="mr-2" />
              Back to Browse
            </Link>

            <h1 className="text-5xl font-bold text-white mb-4">{content.title}</h1>
            
            <div className="flex items-center gap-4 mb-6 text-sm">
              <span className="text-green-500 font-semibold">{content.rating}% Match</span>
              <span className="text-white">{content.year}</span>
              <span className="text-white capitalize">{content.type}</span>
              <span className="text-white capitalize">{content.genre}</span>
              {content.duration && (
                <span className="text-white">{Math.floor(content.duration / 60)}h {content.duration % 60}m</span>
              )}
              {content.seasons && (
                <span className="text-white">{content.seasons} Season{content.seasons > 1 ? 's' : ''}</span>
              )}
            </div>

            <p className="text-xl text-netflix-muted mb-8 leading-relaxed">
              {content.description}
            </p>

            <div className="flex gap-4 mb-8">
              <button
                onClick={handlePlay}
                className="bg-white text-black px-8 py-3 rounded flex items-center gap-2 font-semibold hover:bg-opacity-80 transition-all"
              >
                <Play size={20} fill="currentColor" />
                Play
              </button>
              <button 
                onClick={handleAddToList}
                disabled={addToListMutation.isPending || removeFromListMutation.isPending}
                className={`px-8 py-3 rounded flex items-center gap-2 font-semibold transition-all ${
                  isInList 
                    ? 'bg-green-700 text-white hover:bg-green-600' 
                    : 'bg-gray-700 bg-opacity-50 text-white hover:bg-opacity-75'
                }`}
              >
                {isInList ? <Check size={20} /> : <Plus size={20} />}
                {isInList ? "In My List" : "My List"}
              </button>
              <button className="bg-gray-700 bg-opacity-50 text-white px-8 py-3 rounded flex items-center gap-2 font-semibold hover:bg-opacity-75 transition-all">
                <ThumbsUp size={20} />
                Rate
              </button>
            </div>

            {content.isNetflixOriginal && (
              <div className="inline-block bg-netflix-red text-white px-3 py-1 rounded text-sm font-semibold">
                Netflix Original
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-white text-2xl font-bold mb-6">About {content.title}</h2>
            <div className="space-y-4">
              <div>
                <span className="text-netflix-muted">Genre: </span>
                <span className="text-white capitalize">{content.genre}</span>
              </div>
              <div>
                <span className="text-netflix-muted">Type: </span>
                <span className="text-white capitalize">{content.type}</span>
              </div>
              <div>
                <span className="text-netflix-muted">Year: </span>
                <span className="text-white">{content.year}</span>
              </div>
              {content.duration && (
                <div>
                  <span className="text-netflix-muted">Duration: </span>
                  <span className="text-white">{Math.floor(content.duration / 60)}h {content.duration % 60}m</span>
                </div>
              )}
              {content.seasons && (
                <div>
                  <span className="text-netflix-muted">Seasons: </span>
                  <span className="text-white">{content.seasons}</span>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <img
              src={content.posterUrl}
              alt={content.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
