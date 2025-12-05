/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React, { createContext, useContext, useState, PropsWithChildren } from 'react';
import { BlogPost, Member, GalleryItem, SliderItem, Project, User } from '../types';

interface AppContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  
  blogs: BlogPost[];
  members: Member[];
  gallery: GalleryItem[];
  sliders: SliderItem[];
  projects: Project[];

  addBlog: (blog: BlogPost) => void;
  updateBlog: (blog: BlogPost) => void;
  deleteBlog: (id: string) => void;

  addMember: (member: Member) => void;
  updateMember: (member: Member) => void;
  deleteMember: (id: string) => void;

  addGalleryItem: (item: GalleryItem) => void;
  updateGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;

  addSlider: (item: SliderItem) => void;
  updateSlider: (item: SliderItem) => void;
  deleteSlider: (id: string) => void;

  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock Data
const MOCK_SLIDERS: SliderItem[] = [
  {
    id: '1',
    image: 'https://picsum.photos/1920/1080?random=1',
    title: 'Empowering Nigerian Farmers',
    subtitle: 'Sustainable agriculture for a food-secure nation.',
    ctaText: 'Join Us Today',
    ctaLink: '/register'
  },
  {
    id: '2',
    image: 'https://picsum.photos/1920/1080?random=2',
    title: 'Modern Farming Techniques',
    subtitle: 'Bridging the gap between tradition and technology.',
    ctaText: 'Learn More',
    ctaLink: '/about'
  },
  {
    id: '3',
    image: 'https://picsum.photos/1920/1080?random=3',
    title: 'Community Driven Growth',
    subtitle: 'Together we cultivate success across all states.',
    ctaText: 'View Gallery',
    ctaLink: '/gallery'
  }
];

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Rural Irrigation Scheme',
    description: 'Providing solar-powered water pumps to 500 farms in Kano State.',
    status: 'Ongoing',
    location: 'Kano',
    image: 'https://picsum.photos/800/600?random=88',
    date: '2023-09-10'
  },
  {
    id: '2',
    title: 'Cassava Value Chain',
    description: 'Establishing processing centers to reduce post-harvest losses.',
    status: 'Completed',
    location: 'Ogun',
    image: 'https://picsum.photos/800/600?random=89',
    date: '2023-05-15'
  },
  {
    id: '3',
    title: 'Youth Agropreneurship',
    description: 'Training 1000 youths in modern agribusiness management.',
    status: 'Upcoming',
    location: 'Abuja',
    image: 'https://picsum.photos/800/600?random=90',
    date: '2024-01-20'
  }
];

const MOCK_BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'New Fertilizer Subsidy Announced',
    excerpt: 'The federal government has approved a new subsidy plan for organic fertilizers...',
    content: 'Full article content would go here...',
    author: 'Admin',
    date: '2023-10-25',
    image: 'https://picsum.photos/800/600?random=4',
    category: 'News'
  },
  {
    id: '2',
    title: 'Dry Season Farming Tips',
    excerpt: 'Maximize your yield this dry season with these irrigation techniques...',
    content: 'Full article content...',
    author: 'Dr. A. Bello',
    date: '2023-11-02',
    image: 'https://picsum.photos/800/600?random=5',
    category: 'Education'
  },
  {
    id: '3',
    title: 'JFCIN Annual Summit Recap',
    excerpt: 'Highlights from our successful gathering in Abuja last week.',
    content: 'Full article content...',
    author: 'Admin',
    date: '2023-11-15',
    image: 'https://picsum.photos/800/600?random=6',
    category: 'Events'
  }
];

const MOCK_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Alhaji Musa Ibrahim',
    role: 'National President',
    type: 'EXCO',
    image: 'https://picsum.photos/400/400?random=10',
    bio: 'Leading JFCIN with over 30 years of agricultural experience.'
  },
  {
    id: '2',
    name: 'Chief Emeka Okonkwo',
    role: 'Vice President (South)',
    type: 'EXCO',
    image: 'https://picsum.photos/400/400?random=11',
    bio: 'A pioneer in cassava value chain development.'
  },
  {
    id: '3',
    name: 'Mrs. Funke Adeyemi',
    role: 'Lagos State Chairman',
    state: 'Lagos',
    type: 'CHAIRMAN',
    image: 'https://picsum.photos/400/400?random=12',
    bio: 'Championing urban farming initiatives.'
  },
  {
    id: '4',
    name: 'Mr. John Danjuma',
    role: 'Kaduna State Chairman',
    state: 'Kaduna',
    type: 'CHAIRMAN',
    image: 'https://picsum.photos/400/400?random=13',
    bio: 'Expert in grain production and storage.'
  }
];

const MOCK_GALLERY: GalleryItem[] = [
  { id: '1', type: 'image', url: 'https://picsum.photos/800/600?random=20', thumbnail: 'https://picsum.photos/400/300?random=20', caption: '2023 Harvest' },
  { id: '2', type: 'image', url: 'https://picsum.photos/800/600?random=21', thumbnail: 'https://picsum.photos/400/300?random=21', caption: 'Training Workshop' },
  { id: '3', type: 'image', url: 'https://picsum.photos/800/600?random=22', thumbnail: 'https://picsum.photos/400/300?random=22', caption: 'Field Inspection' },
  { id: '4', type: 'image', url: 'https://picsum.photos/800/600?random=23', thumbnail: 'https://picsum.photos/400/300?random=23', caption: 'Youth Outreach' },
];

export const AppProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState<User | null>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>(MOCK_BLOGS);
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [gallery, setGallery] = useState<GalleryItem[]>(MOCK_GALLERY);
  const [sliders, setSliders] = useState<SliderItem[]>(MOCK_SLIDERS);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

  const login = (email: string) => {
    setUser({
      id: 'admin-1',
      name: 'Admin User',
      email,
      isAdmin: true
    });
  };

  const logout = () => setUser(null);

  // Blogs
  const addBlog = (blog: BlogPost) => setBlogs([blog, ...blogs]);
  const updateBlog = (updatedBlog: BlogPost) => {
    setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b));
  };
  const deleteBlog = (id: string) => setBlogs(blogs.filter(b => b.id !== id));

  // Members
  const addMember = (member: Member) => setMembers([...members, member]);
  const updateMember = (updatedMember: Member) => {
    setMembers(members.map(m => m.id === updatedMember.id ? updatedMember : m));
  };
  const deleteMember = (id: string) => setMembers(members.filter(m => m.id !== id));

  // Gallery
  const addGalleryItem = (item: GalleryItem) => setGallery([item, ...gallery]);
  const updateGalleryItem = (updatedItem: GalleryItem) => {
    setGallery(gallery.map(g => g.id === updatedItem.id ? updatedItem : g));
  };
  const deleteGalleryItem = (id: string) => setGallery(gallery.filter(g => g.id !== id));

  // Sliders
  const addSlider = (item: SliderItem) => setSliders([...sliders, item]);
  const updateSlider = (updatedItem: SliderItem) => {
    setSliders(sliders.map(s => s.id === updatedItem.id ? updatedItem : s));
  };
  const deleteSlider = (id: string) => setSliders(sliders.filter(s => s.id !== id));

  // Projects
  const addProject = (project: Project) => setProjects([project, ...projects]);
  const updateProject = (updatedProject: Project) => {
    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
  };
  const deleteProject = (id: string) => setProjects(projects.filter(p => p.id !== id));

  return (
    <AppContext.Provider value={{
      user, login, logout,
      blogs, members, gallery, sliders, projects,
      addBlog, updateBlog, deleteBlog, 
      addMember, updateMember, deleteMember,
      addGalleryItem, updateGalleryItem, deleteGalleryItem,
      addSlider, updateSlider, deleteSlider,
      addProject, updateProject, deleteProject
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};