// Mock data for Netflix clone - replaces backend API calls
export interface Content {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  backdropUrl: string | null;
  videoUrl: string | null;
  type: string;
  genre: string;
  rating: number;
  year: number;
  duration: number | null;
  seasons: number | null;
  isNetflixOriginal: boolean | null;
  isTrending: boolean | null;
  createdAt: Date | null;
}

export const mockContent: Content[] = [
  {
    id: '1',
    title: 'Stranger Things',
    description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
    posterUrl: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=800&h=1200',
    backdropUrl: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=1600&h=900',
    videoUrl: null,
    type: 'tv',
    genre: 'Sci-Fi',
    rating: 8.7,
    year: 2016,
    duration: null,
    seasons: 3,
    isNetflixOriginal: true,
    isTrending: true,
    createdAt: null,
  },
  {
    id: '2',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
    posterUrl: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=1200',
    backdropUrl: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1600&h=900',
    videoUrl: null,
    type: 'movie',
    genre: 'Action',
    rating: 9.0,
    year: 2008,
    duration: 152,
    seasons: null,
    isNetflixOriginal: false,
    isTrending: true,
    createdAt: null,
  },
  {
    id: '3',
    title: 'Breaking Bad',
    description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.',
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=1200',
    backdropUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&h=900',
    videoUrl: null,
    type: 'tv',
    genre: 'Drama',
    rating: 9.5,
    year: 2008,
    duration: null,
    seasons: 5,
    isNetflixOriginal: false,
    isTrending: false,
    createdAt: null,
  },
  {
    id: '4',
    title: 'Inception',
    description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into a CEO.',
    posterUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=1200',
    backdropUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1600&h=900',
    videoUrl: null,
    type: 'movie',
    genre: 'Sci-Fi',
    rating: 8.8,
    year: 2010,
    duration: 148,
    seasons: null,
    isNetflixOriginal: false,
    isTrending: true,
    createdAt: null,
  },
  {
    id: '5',
    title: 'The Crown',
    description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.',
    posterUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1200',
    backdropUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=900',
    videoUrl: null,
    type: 'tv',
    genre: 'Drama',
    rating: 8.6,
    year: 2016,
    duration: null,
    seasons: 6,
    isNetflixOriginal: true,
    isTrending: false,
    createdAt: null,
  },
  {
    id: '6',
    title: 'Avengers: Endgame',
    description: 'After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos\' actions and restore balance to the universe.',
    posterUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&h=1200',
    backdropUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1600&h=900',
    videoUrl: null,
    type: 'movie',
    genre: 'Action',
    rating: 8.4,
    year: 2019,
    duration: 181,
    seasons: null,
    isNetflixOriginal: false,
    isTrending: true,
    createdAt: null,
  },
  {
    id: '7',
    title: 'The Office',
    description: 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.',
    posterUrl: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800&h=1200',
    backdropUrl: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1600&h=900',
    videoUrl: null,
    type: 'tv',
    genre: 'Comedy',
    rating: 8.9,
    year: 2005,
    duration: null,
    seasons: 9,
    isNetflixOriginal: false,
    isTrending: false,
    createdAt: null,
  },
  {
    id: '8',
    title: 'Pulp Fiction',
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
    posterUrl: 'https://images.unsplash.com/photo-1489599809925-27ddf43be7d3?w=800&h=1200',
    backdropUrl: 'https://images.unsplash.com/photo-1489599809925-27ddf43be7d3?w=1600&h=900',
    videoUrl: null,
    type: 'movie',
    genre: 'Thriller',
    rating: 8.9,
    year: 1994,
    duration: 154,
    seasons: null,
    isNetflixOriginal: false,
    isTrending: true,
    createdAt: null,
  },
];

// Mock API functions to replace backend calls
export const mockApi = {
  getContent: () => Promise.resolve(mockContent),
  
  getContentById: (id: string) => 
    Promise.resolve(mockContent.find(item => item.id === id)),
  
  getContentByType: (type: 'movie' | 'tv') => 
    Promise.resolve(mockContent.filter(item => item.type === type)),
  
  getTrending: () => 
    Promise.resolve(mockContent.slice(0, 5)),
  
  getNetflixOriginals: () => 
    Promise.resolve(mockContent.filter(item => item.isNetflixOriginal)),
  
  searchContent: (query: string) => 
    Promise.resolve(mockContent.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.genre.toLowerCase().includes(query.toLowerCase())
    )),
};