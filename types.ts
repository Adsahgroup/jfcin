export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  state?: string; // For State Chairmen
  image: string;
  bio: string;
  type: 'EXCO' | 'CHAIRMAN';
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  caption: string;
}

export interface SliderItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'Completed' | 'Ongoing' | 'Upcoming';
  location: string;
  image: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}