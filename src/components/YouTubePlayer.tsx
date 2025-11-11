import { useState } from 'react';
import { Search, Play } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const YouTubePlayer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [videoId, setVideoId] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const extractVideoId = (input: string): string | null => {
    // Handle different YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/,
      /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
    ];

    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return null;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const extractedId = extractVideoId(searchQuery.trim());
    if (extractedId) {
      setVideoId(extractedId);
      setIsPlaying(true);
    } else {
      // If no valid ID found, search YouTube with the query
      const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
      window.open(searchUrl, '_blank');
    }
  };

  const popularVideos = [
    { id: 'dQw4w9WgXcQ', title: 'Rick Astley - Never Gonna Give You Up' },
    { id: 'jNQXAC9IVRw', title: 'Me at the zoo' },
    { id: 'kJQP7kiw5Fk', title: 'Luis Fonsi - Despacito' },
    { id: '9bZkp7q19f0', title: 'PSY - Gangnam Style' },
  ];

  const handleVideoSelect = (id: string) => {
    setVideoId(id);
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-red-900/10 to-background/50 p-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Paste YouTube URL or video ID..."
            className="flex-1 bg-background/50 border-border/50"
          />
          <Button type="submit" size="icon" variant="default">
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </form>

      {/* Video Player */}
      {isPlaying && videoId ? (
        <div className="flex-1 bg-black rounded-lg overflow-hidden shadow-2xl">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          {/* YouTube Logo */}
          <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-2xl flex items-center justify-center">
            <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-foreground">YouTube Player</h3>
            <p className="text-sm text-muted-foreground">
              Paste any YouTube URL or video ID above
            </p>
          </div>

          {/* Popular Videos */}
          <div className="w-full max-w-md space-y-2">
            <p className="text-xs text-muted-foreground text-center mb-3">Or try these:</p>
            <div className="grid grid-cols-1 gap-2">
              {popularVideos.map((video) => (
                <Button
                  key={video.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleVideoSelect(video.id)}
                  className="justify-start gap-2 hover:bg-secondary/70"
                >
                  <Play className="w-3 h-3" />
                  <span className="text-xs truncate">{video.title}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
