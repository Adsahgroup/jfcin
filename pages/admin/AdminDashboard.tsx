
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, FileText, Image, Settings, LogOut, Plus, Trash2, X, Briefcase, MonitorPlay, Edit2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { LOGO_URL } from '../../constants';
import { BlogPost, Member, GalleryItem, Project, SliderItem } from '../../types';

const AdminDashboard = () => {
  const { 
    user, logout, 
    blogs, members, gallery, sliders, projects,
    addBlog, updateBlog, deleteBlog, 
    addMember, updateMember, deleteMember, 
    addGalleryItem, updateGalleryItem, deleteGalleryItem,
    addSlider, updateSlider, deleteSlider,
    addProject, updateProject, deleteProject
  } = useApp();
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'blogs' | 'members' | 'gallery' | 'projects' | 'sliders'>('overview');
  
  // State for Editing
  const [editingId, setEditingId] = useState<string | null>(null);

  // --- Blog Form States ---
  const [blogForm, setBlogForm] = useState({
    title: '', excerpt: '', content: '', category: 'General', image: ''
  });

  // --- Member Form States ---
  const [memberForm, setMemberForm] = useState({
    name: '', role: '', type: 'CHAIRMAN', state: '', image: '', bio: ''
  });

  // --- Gallery Form States ---
  const [galleryForm, setGalleryForm] = useState({
    caption: '', url: '', type: 'image'
  });

  // --- Project Form States ---
  const [projectForm, setProjectForm] = useState({
    title: '', description: '', status: 'Ongoing', location: '', image: '', date: ''
  });

  // --- Slider Form States ---
  const [sliderForm, setSliderForm] = useState({
    title: '', subtitle: '', image: '', ctaText: '', ctaLink: ''
  });

  if (!user || !user.isAdmin) {
    return (
      <div className="h-screen flex items-center justify-center flex-col gap-4">
        <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
        <button onClick={() => navigate('/login')} className="bg-blue-500 text-white px-4 py-2 rounded">Go to Login</button>
      </div>
    );
  }

  const resetForms = () => {
    setEditingId(null);
    setBlogForm({ title: '', excerpt: '', content: '', category: 'General', image: '' });
    setMemberForm({ name: '', role: '', type: 'CHAIRMAN', state: '', image: '', bio: '' });
    setGalleryForm({ caption: '', url: '', type: 'image' });
    setProjectForm({ title: '', description: '', status: 'Ongoing', location: '', image: '', date: '' });
    setSliderForm({ title: '', subtitle: '', image: '', ctaText: '', ctaLink: '' });
  }

  // Populate form for editing
  const handleEdit = (type: string, item: any) => {
    setEditingId(item.id);
    if (type === 'blog') setBlogForm({ ...item });
    if (type === 'member') setMemberForm({ ...item, state: item.state || '' });
    if (type === 'gallery') setGalleryForm({ ...item });
    if (type === 'project') setProjectForm({ ...item });
    if (type === 'slider') setSliderForm({ ...item });
  };

  // --- Handlers ---

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title) return;
    const blogData: BlogPost = {
        id: editingId || Date.now().toString(),
        title: blogForm.title,
        excerpt: blogForm.excerpt || 'No excerpt provided',
        content: blogForm.content || 'No content provided',
        author: user.name,
        date: editingId ? (blogs.find(b => b.id === editingId)?.date || new Date().toISOString().split('T')[0]) : new Date().toISOString().split('T')[0],
        image: blogForm.image || 'https://picsum.photos/800/600',
        category: blogForm.category
    };

    if (editingId) updateBlog(blogData);
    else addBlog(blogData);
    
    resetForms();
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberForm.name) return;
    const memberData: Member = {
        id: editingId || Date.now().toString(),
        name: memberForm.name,
        role: memberForm.role,
        type: memberForm.type as 'EXCO' | 'CHAIRMAN',
        state: memberForm.type === 'CHAIRMAN' ? memberForm.state : undefined,
        image: memberForm.image || 'https://picsum.photos/400/400',
        bio: memberForm.bio || 'Dedicated member of JFCIN.'
    };

    if (editingId) updateMember(memberData);
    else addMember(memberData);

    resetForms();
  }

  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.url) return;
    const galleryData: GalleryItem = {
        id: editingId || Date.now().toString(),
        type: galleryForm.type as 'image' | 'video',
        url: galleryForm.url,
        thumbnail: galleryForm.url,
        caption: galleryForm.caption
    };

    if (editingId) updateGalleryItem(galleryData);
    else addGalleryItem(galleryData);

    resetForms();
  }

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title) return;
    const projectData: Project = {
        id: editingId || Date.now().toString(),
        title: projectForm.title,
        description: projectForm.description,
        status: projectForm.status as 'Completed' | 'Ongoing' | 'Upcoming',
        location: projectForm.location,
        image: projectForm.image || 'https://picsum.photos/800/600',
        date: projectForm.date || new Date().toISOString().split('T')[0]
    };

    if (editingId) updateProject(projectData);
    else addProject(projectData);

    resetForms();
  }

  const handleSaveSlider = (e: React.FormEvent) => {
      e.preventDefault();
      if (!sliderForm.image) return;
      const sliderData: SliderItem = {
          id: editingId || Date.now().toString(),
          image: sliderForm.image,
          title: sliderForm.title,
          subtitle: sliderForm.subtitle,
          ctaText: sliderForm.ctaText || 'Learn More',
          ctaLink: sliderForm.ctaLink || '/about'
      };

      if (editingId) updateSlider(sliderData);
      else addSlider(sliderData);

      resetForms();
  }


  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl hidden md:flex flex-col z-20">
        <div className="p-6 flex items-center gap-3 border-b border-gray-100">
          <img src={LOGO_URL} alt="Logo" className="w-8 h-8 object-contain" />
          <div>
            <h2 className="text-xl font-bold text-jfcin-primary">Admin Panel</h2>
          </div>
        </div>
        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'blogs', label: 'Blogs', icon: FileText },
            { id: 'members', label: 'Team Members', icon: Users },
            { id: 'projects', label: 'Projects', icon: Briefcase },
            { id: 'gallery', label: 'Gallery', icon: Image },
            { id: 'sliders', label: 'Sliders', icon: MonitorPlay },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id as any); resetForms(); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === item.id ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-gray-100">
           <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    <Users size={20} />
                </div>
                <div>
                    <p className="text-sm font-bold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                </div>
           </div>
           <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center justify-center gap-2 text-red-500 bg-red-50 py-2 rounded-lg hover:bg-red-100 transition">
             <LogOut size={18} /> Logout
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-y-auto bg-gray-50">
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                  { label: 'Total Blogs', count: blogs.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
                  { label: 'Team Members', count: members.length, icon: Users, color: 'text-green-600', bg: 'bg-green-100' },
                  { label: 'Projects', count: projects.length, icon: Briefcase, color: 'text-orange-600', bg: 'bg-orange-100' },
                  { label: 'Gallery Media', count: gallery.length, icon: Image, color: 'text-purple-600', bg: 'bg-purple-100' }
              ].map((stat, idx) => (
                 <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                    <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.label}</h3>
                    <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bg} ${stat.color}`}>
                        <stat.icon size={24} />
                    </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- BLOGS TAB --- */}
        {activeTab === 'blogs' && (
          <div className="animate-fade-in space-y-6 max-w-5xl mx-auto">
             <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Manage Blogs</h1>
                {editingId && <button onClick={resetForms} className="text-sm text-gray-500 underline">Cancel Edit</button>}
             </div>
             
             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                 <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                    {editingId ? <Edit2 size={20}/> : <Plus size={20}/>} {editingId ? 'Edit Post' : 'Add New Post'}
                 </h3>
                 <form onSubmit={handleSaveBlog} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
                        <input 
                            type="text" 
                            value={blogForm.title}
                            onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="Enter post title"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select 
                            value={blogForm.category}
                            onChange={(e) => setBlogForm({...blogForm, category: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg p-2.5 bg-white"
                        >
                            <option>News</option>
                            <option>Education</option>
                            <option>Events</option>
                            <option>Grants</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input 
                            type="text" 
                            value={blogForm.image}
                            onChange={(e) => setBlogForm({...blogForm, image: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="https://..."
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                        <input 
                            type="text" 
                            value={blogForm.excerpt}
                            onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="Short summary..."
                        />
                    </div>
                    <div className="col-span-2">
                         <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                         <textarea 
                            rows={3}
                            value={blogForm.content}
                            onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="Full content here..."
                         ></textarea>
                    </div>
                    <div className="col-span-2 flex justify-end mt-2">
                        <button type="submit" className={`text-white px-6 py-2.5 rounded-lg font-medium shadow-md transition ${editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-jfcin-primary hover:bg-jfcin-dark'}`}>
                            {editingId ? 'Update Post' : 'Publish Post'}
                        </button>
                    </div>
                 </form>
             </div>

             <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Article</th>
                            <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {blogs.map(blog => (
                            <tr key={blog.id} className="hover:bg-gray-50">
                                <td className="p-4">
                                    <div className="font-medium text-gray-900">{blog.title}</div>
                                    <div className="text-xs text-gray-500">{blog.date} | {blog.category}</div>
                                </td>
                                <td className="p-4 text-right flex justify-end gap-2">
                                    <button onClick={() => handleEdit('blog', blog)} className="text-blue-500 hover:bg-blue-50 p-2 rounded transition" title="Edit">
                                        <Edit2 size={18} />
                                    </button>
                                    <button onClick={() => deleteBlog(blog.id)} className="text-red-500 hover:bg-red-50 p-2 rounded transition" title="Delete">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
          </div>
        )}

        {/* --- MEMBERS TAB --- */}
        {activeTab === 'members' && (
             <div className="animate-fade-in space-y-6 max-w-5xl mx-auto">
             <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Manage Team</h1>
                {editingId && <button onClick={resetForms} className="text-sm text-gray-500 underline">Cancel Edit</button>}
             </div>
             
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                 <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                    {editingId ? <Edit2 size={20}/> : <Plus size={20}/>} {editingId ? 'Edit Member' : 'Add Team Member'}
                 </h3>
                 <form onSubmit={handleSaveMember} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input 
                            type="text" 
                            value={memberForm.name}
                            onChange={(e) => setMemberForm({...memberForm, name: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="e.g. Dr. John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role / Position</label>
                        <input 
                            type="text" 
                            value={memberForm.role}
                            onChange={(e) => setMemberForm({...memberForm, role: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="e.g. National Secretary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Member Type</label>
                        <select 
                            value={memberForm.type}
                            onChange={(e) => setMemberForm({...memberForm, type: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg p-2.5 bg-white"
                        >
                            <option value="EXCO">National EXCO</option>
                            <option value="CHAIRMAN">State Chairman</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State (If Chairman)</label>
                        <input 
                            type="text" 
                            value={memberForm.state}
                            onChange={(e) => setMemberForm({...memberForm, state: e.target.value})}
                            disabled={memberForm.type !== 'CHAIRMAN'}
                            className={`w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none ${memberForm.type !== 'CHAIRMAN' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}`}
                            placeholder="e.g. Kano"
                        />
                    </div>
                     <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL</label>
                        <input 
                            type="text" 
                            value={memberForm.image}
                            onChange={(e) => setMemberForm({...memberForm, image: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="https://..."
                        />
                    </div>
                    <div className="col-span-2">
                         <label className="block text-sm font-medium text-gray-700 mb-1">Short Bio</label>
                         <textarea 
                            rows={2}
                            value={memberForm.bio}
                            onChange={(e) => setMemberForm({...memberForm, bio: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="Brief description..."
                         ></textarea>
                    </div>
                    <div className="col-span-2 flex justify-end mt-2">
                        <button type="submit" className={`text-white px-6 py-2.5 rounded-lg font-medium shadow-md transition ${editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-jfcin-primary hover:bg-jfcin-dark'}`}>
                             {editingId ? 'Update Member' : 'Add Member'}
                        </button>
                    </div>
                 </form>
             </div>

             <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Profile</th>
                            <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {members.map(member => (
                            <tr key={member.id} className="hover:bg-gray-50">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <img src={member.image} alt="" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                                        <div>
                                            <div className="font-medium text-gray-900">{member.name}</div>
                                            <div className="text-xs text-gray-500">{member.role}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-right flex justify-end gap-2">
                                     <button onClick={() => handleEdit('member', member)} className="text-blue-500 hover:bg-blue-50 p-2 rounded transition" title="Edit">
                                        <Edit2 size={18} />
                                    </button>
                                    <button onClick={() => deleteMember(member.id)} className="text-red-500 hover:bg-red-50 p-2 rounded transition" title="Remove">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
          </div>
        )}

        {/* --- PROJECTS TAB --- */}
        {activeTab === 'projects' && (
             <div className="animate-fade-in space-y-6 max-w-5xl mx-auto">
             <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Manage Projects</h1>
                {editingId && <button onClick={resetForms} className="text-sm text-gray-500 underline">Cancel Edit</button>}
             </div>
             
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                 <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                    {editingId ? <Edit2 size={20}/> : <Plus size={20}/>} {editingId ? 'Edit Project' : 'Add New Project'}
                 </h3>
                 <form onSubmit={handleSaveProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                        <input 
                            type="text" 
                            value={projectForm.title}
                            onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="e.g. Borehole Construction"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select 
                            value={projectForm.status}
                            onChange={(e) => setProjectForm({...projectForm, status: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg p-2.5 bg-white"
                        >
                            <option>Ongoing</option>
                            <option>Completed</option>
                            <option>Upcoming</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input 
                            type="text" 
                            value={projectForm.location}
                            onChange={(e) => setProjectForm({...projectForm, location: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="e.g. Ekiti State"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                         <input 
                            type="date" 
                            value={projectForm.date}
                            onChange={(e) => setProjectForm({...projectForm, date: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>
                     <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input 
                            type="text" 
                            value={projectForm.image}
                            onChange={(e) => setProjectForm({...projectForm, image: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>
                    <div className="col-span-2">
                         <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                         <textarea 
                            rows={2}
                            value={projectForm.description}
                            onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                         ></textarea>
                    </div>
                    <div className="col-span-2 flex justify-end mt-2">
                        <button type="submit" className={`text-white px-6 py-2.5 rounded-lg font-medium shadow-md transition ${editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-jfcin-primary hover:bg-jfcin-dark'}`}>
                             {editingId ? 'Update Project' : 'Add Project'}
                        </button>
                    </div>
                 </form>
             </div>

             <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Project</th>
                            <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">Status</th>
                            <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {projects.map(p => (
                            <tr key={p.id} className="hover:bg-gray-50">
                                <td className="p-4">
                                    <div className="font-medium text-gray-900">{p.title}</div>
                                    <div className="text-xs text-gray-500">{p.location}</div>
                                </td>
                                <td className="p-4 text-gray-500 hidden md:table-cell">{p.status}</td>
                                <td className="p-4 text-right flex justify-end gap-2">
                                     <button onClick={() => handleEdit('project', p)} className="text-blue-500 hover:bg-blue-50 p-2 rounded transition" title="Edit">
                                        <Edit2 size={18} />
                                    </button>
                                    <button onClick={() => deleteProject(p.id)} className="text-red-500 hover:bg-red-50 p-2 rounded transition" title="Remove">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
          </div>
        )}

        {/* --- GALLERY TAB --- */}
        {activeTab === 'gallery' && (
            <div className="animate-fade-in space-y-6 max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Manage Gallery</h1>
                    {editingId && <button onClick={resetForms} className="text-sm text-gray-500 underline">Cancel Edit</button>}
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                         {editingId ? <Edit2 size={20}/> : <Plus size={20}/>} {editingId ? 'Edit Media' : 'Add Media'}
                    </h3>
                    <form onSubmit={handleSaveGallery} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image/Video URL</label>
                            <input 
                                type="text" 
                                value={galleryForm.url}
                                onChange={(e) => setGalleryForm({...galleryForm, url: e.target.value})}
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                                placeholder="https://..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                            <input 
                                type="text" 
                                value={galleryForm.caption}
                                onChange={(e) => setGalleryForm({...galleryForm, caption: e.target.value})}
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                                placeholder="Event name..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select 
                                value={galleryForm.type}
                                onChange={(e) => setGalleryForm({...galleryForm, type: e.target.value})}
                                className="w-full border border-gray-300 rounded-lg p-2.5 bg-white"
                            >
                                <option value="image">Image</option>
                                <option value="video">Video</option>
                            </select>
                        </div>
                        <div className="col-span-2 flex justify-end mt-2">
                            <button type="submit" className={`text-white px-6 py-2.5 rounded-lg font-medium shadow-md transition ${editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-jfcin-primary hover:bg-jfcin-dark'}`}>
                                {editingId ? 'Update Media' : 'Add to Gallery'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {gallery.map(item => (
                        <div key={item.id} className="relative group rounded-lg overflow-hidden shadow-sm bg-white border border-gray-200">
                            <img src={item.url} alt={item.caption} className="w-full h-40 object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 gap-2">
                                <p className="text-white text-xs truncate">{item.caption}</p>
                                <div className="flex gap-2">
                                     <button onClick={() => handleEdit('gallery', item)} className="flex-1 bg-blue-600 text-white text-xs py-1 rounded">Edit</button>
                                     <button onClick={() => deleteGalleryItem(item.id)} className="flex-1 bg-red-600 text-white text-xs py-1 rounded">Delete</button>
                                </div>
                            </div>
                            <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded text-xs font-bold uppercase">
                                {item.type}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* --- SLIDERS TAB --- */}
         {activeTab === 'sliders' && (
            <div className="animate-fade-in space-y-6 max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Manage Home Sliders</h1>
                    {editingId && <button onClick={resetForms} className="text-sm text-gray-500 underline">Cancel Edit</button>}
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                         {editingId ? <Edit2 size={20}/> : <Plus size={20}/>} {editingId ? 'Edit Slide' : 'Add Slide'}
                    </h3>
                    <form onSubmit={handleSaveSlider} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (High Res)</label>
                            <input 
                                type="text" 
                                value={sliderForm.image}
                                onChange={(e) => setSliderForm({...sliderForm, image: e.target.value})}
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                                placeholder="https://..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input 
                                type="text" 
                                value={sliderForm.title}
                                onChange={(e) => setSliderForm({...sliderForm, title: e.target.value})}
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                            <input 
                                type="text" 
                                value={sliderForm.subtitle}
                                onChange={(e) => setSliderForm({...sliderForm, subtitle: e.target.value})}
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                            />
                        </div>
                        <div className="col-span-2 flex justify-end mt-2">
                            <button type="submit" className={`text-white px-6 py-2.5 rounded-lg font-medium shadow-md transition ${editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-jfcin-primary hover:bg-jfcin-dark'}`}>
                                {editingId ? 'Update Slide' : 'Add Slide'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sliders.map(item => (
                        <div key={item.id} className="relative group rounded-xl overflow-hidden shadow-sm bg-white border border-gray-200">
                            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h4 className="font-bold text-lg">{item.title}</h4>
                                <p className="text-sm text-gray-500">{item.subtitle}</p>
                                <div className="flex gap-2 mt-4">
                                     <button onClick={() => handleEdit('slider', item)} className="flex-1 bg-blue-100 text-blue-700 py-2 rounded text-sm font-medium hover:bg-blue-200">Edit</button>
                                     <button onClick={() => deleteSlider(item.id)} className="flex-1 bg-red-100 text-red-700 py-2 rounded text-sm font-medium hover:bg-red-200">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
