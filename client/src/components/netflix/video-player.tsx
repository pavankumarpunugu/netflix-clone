import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react";

interface VideoPlayerProps {
  videoUrl?: string;
  title: string;
  onClose: () => void;
}

export default function VideoPlayer({ videoUrl, title, onClose }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(7200); // 2 hours demo duration
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const togglePlay = () => {
    if (isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="w-full h-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-60 text-white hover:text-netflix-red transition-colors text-2xl"
        >
          ×
        </button>

        {/* Simulated Video Display */}
        <div 
          className="w-full h-full bg-black flex items-center justify-center relative"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          
          {/* Video "Playing" Indicator */}
          <div className="relative z-10 text-center text-white">
            <div className="mb-6">
              <h2 className="text-4xl font-bold mb-4">{title}</h2>
              <div className="flex items-center justify-center gap-4">
                {isPlaying ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-6 bg-netflix-red animate-pulse"></div>
                    <div className="w-2 h-6 bg-netflix-red animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-6 bg-netflix-red animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    <span className="ml-4 text-lg">Now Playing...</span>
                  </div>
                ) : (
                  <div className="text-lg">Paused</div>
                )}
              </div>
            </div>
            
            {/* Simulated Video Content */}
            <div className="text-netflix-muted">
              <p>Demo Video Player - Using HTML/CSS/JavaScript/React</p>
              <p className="text-sm mt-2">This simulates video playback functionality</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={togglePlay}
              className="bg-white text-black rounded-full p-3 hover:bg-opacity-80 transition-all"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            <button 
              onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
              className="text-white hover:text-netflix-red transition-colors"
            >
              <SkipBack size={24} />
            </button>

            <button 
              onClick={() => setCurrentTime(Math.min(duration, currentTime + 10))}
              className="text-white hover:text-netflix-red transition-colors"
            >
              <SkipForward size={24} />
            </button>

            <button
              onClick={toggleMute}
              className="text-white hover:text-netflix-red transition-colors flex items-center gap-2"
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              <span className="text-sm">{isMuted ? "Muted" : "100%"}</span>
            </button>

            <div className="flex-1 mx-4">
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-netflix-gray rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #e50914 0%, #e50914 ${(currentTime / duration) * 100}%, #333 ${(currentTime / duration) * 100}%, #333 100%)`
                }}
              />
            </div>

            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <button className="text-white hover:text-netflix-red transition-colors">
              <Maximize size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
