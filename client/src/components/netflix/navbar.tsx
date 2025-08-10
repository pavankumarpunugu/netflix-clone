import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, User, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search/${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className={`netflix-nav ${isScrolled ? "scrolled" : ""}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="netflix-logo">
              NETFLIX
            </Link>
            <ul className="nav-links hidden md:flex">
              <li>
                <Link href="/" className={location === "/" ? "text-white" : ""}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/movies" className={location === "/movies" ? "text-white" : "hover:text-netflix-muted transition-colors"}>
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/tv-shows" className={location === "/tv-shows" ? "text-white" : "hover:text-netflix-muted transition-colors"}>
                  TV Shows
                </Link>
              </li>
              <li>
                <Link href="/my-list" className={location === "/my-list" ? "text-white" : "hover:text-netflix-muted transition-colors"}>
                  My List
                </Link>
              </li>
              <li>
                <Link href="/browse" className={location === "/browse" ? "text-white" : "hover:text-netflix-muted transition-colors"}>
                  Browse
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                className="search-input"
                placeholder="Search movies, shows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-netflix-muted hover:text-white transition-colors"
              >
                <Search size={16} />
              </button>
            </form>

            <div className="relative">
              <button className="flex items-center space-x-2 hover:text-netflix-muted transition-colors">
                <div className="profile-avatar">
                  <User size={16} />
                </div>
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
