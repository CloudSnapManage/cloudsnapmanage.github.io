import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../contexts/DataContext';
import { Lock, LogIn, ArrowLeft, Plus, Trash2, Save, LogOut, Settings, LayoutGrid, FolderGit2, Users, Layers, Search, Edit, X, Menu, Upload, Image as ImageIcon, Copy, Check, AlertTriangle, FileJson, Cloud, UserCircle } from 'lucide-react';
import { Project, HeroData } from '../types';

interface AdminPanelProps {
  onBack: () => void;
}

const ICONS = ['🚀', '💻', '🎨', '📚', '🛠️', '🎮', '🌐', '📱', '📝', '🔒', '☁️', '🤖', '⚡', '💡', '🔥', '✨'];

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const { isAuthenticated, login } = useData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md bg-surface border border-white/10 p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary mb-4">
              <Lock size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">Admin Access</h2>
            <p className="text-muted mt-2">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="••••••••"
              />
            </div>
            
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <LogIn size={18} /> Login
            </button>
          </form>

          <button 
            onClick={onBack}
            className="w-full mt-4 text-sm text-white/50 hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} /> Back to Site
          </button>
        </div>
      </div>
    );
  }

  return <AdminDashboard onBack={onBack} />;
};

// --- Dashboard Sub-Component ---

const AdminDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { 
    projects, otherRepos, customSections, currentUser, heroData,
    addProject, updateProject, removeProject, 
    addRepo, updateRepo, removeRepo, 
    addCustomSection, removeCustomSection, addItemToSection, updateItemInSection, removeItemFromSection,
    updatePassword, logout, users, addUser, removeUser, updateHeroData
  } = useData();

  const [activeTab, setActiveTab] = useState<string>('projects');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Settings & Export State
  const [newPass, setNewPass] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [copied, setCopied] = useState(false);

  // User Mgmt State
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPass, setNewUserPass] = useState('');
  const [userMsg, setUserMsg] = useState('');

  // Section Mgmt State
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionIcon, setNewSectionIcon] = useState('🚀');

  // Hero Edit State
  const [heroForm, setHeroForm] = useState<HeroData>(heroData);

  // Add/Edit Item State
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [imageError, setImageError] = useState('');
  
  const [newItem, setNewItem] = useState<Project>({
    title: '', description: '', tags: [], codeUrl: '', demoUrl: '', image: '', status: ''
  });
  const [tagInput, setTagInput] = useState('');

  // Sync Hero Form when tab changes or data updates
  useEffect(() => {
    setHeroForm(heroData);
  }, [heroData]);

  const resetForm = () => {
    setNewItem({ title: '', description: '', tags: [], codeUrl: '', demoUrl: '', image: '', status: '' });
    setTagInput('');
    setEditIndex(null);
    setIsAdding(false);
    setImageError('');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    resetForm();
    setSearchQuery('');
    setIsMobileMenuOpen(false);
  };

  const handleSave = () => {
    const itemToSave = { ...newItem, tags: newItem.tags.length > 0 ? newItem.tags : ['New'] };
    
    if (activeTab === 'projects') {
      if (editIndex !== null) updateProject(editIndex, itemToSave);
      else addProject(itemToSave);
    } else if (activeTab === 'repos') {
       if (editIndex !== null) updateRepo(editIndex, itemToSave);
       else addRepo(itemToSave);
    } else if (activeTab.startsWith('custom-')) {
      const sectionId = activeTab.replace('custom-', '');
       if (editIndex !== null) updateItemInSection(sectionId, editIndex, itemToSave);
       else addItemToSection(sectionId, itemToSave);
    }

    resetForm();
  };

  const handleSaveHero = () => {
    updateHeroData(heroForm);
    alert('Profile updated successfully!');
  };

  const handleEdit = (item: Project, index: number) => {
    setNewItem(item);
    setTagInput(item.tags.join(', '));
    setEditIndex(index);
    setIsAdding(true);
  };

  const handleDeleteItem = (idx: number) => {
    if(!window.confirm("Are you sure you want to delete this item?")) return;

    if (activeTab === 'projects') {
      removeProject(idx);
    } else if (activeTab === 'repos') {
      removeRepo(idx);
    } else if (activeTab.startsWith('custom-')) {
      const sectionId = activeTab.replace('custom-', '');
      removeItemFromSection(sectionId, idx);
    }
  };

  const handleUpdatePassword = () => {
    if (newPass.length < 6) {
      setPassMsg('Password too short');
      return;
    }
    updatePassword(newPass);
    setPassMsg('Password updated successfully');
    setNewPass('');
  };

  const handleAddUser = () => {
     if(!newUserEmail.includes('@') || newUserPass.length < 6) {
       setUserMsg("Invalid email or password (min 6 chars)");
       return;
     }
     const success = addUser({ email: newUserEmail, passwordHash: newUserPass });
     if(success) {
       setUserMsg("User added successfully");
       setNewUserEmail('');
       setNewUserPass('');
     } else {
       setUserMsg("User already exists");
     }
  };

  const handleCreateSection = () => {
    if(!newSectionTitle) return;
    addCustomSection(newSectionTitle, newSectionIcon);
    setNewSectionTitle('');
    setNewSectionIcon('🚀');
    handleTabChange('manage-sections'); 
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isHero = false) => {
    setImageError('');
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500000) { // 500KB limit
        setImageError('File is too large (Max 500KB). Please compress it or use a URL.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (isHero) {
           setHeroForm({ ...heroForm, image: result });
        } else {
           setNewItem({ ...newItem, image: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Checks if the entered URL is a Google Drive link and converts it to a direct embed link
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>, isHero = false) => {
    let url = e.target.value;
    setImageError('');

    // Check for standard Google Drive Share Link
    // Format: https://drive.google.com/file/d/[ID]/view?usp=sharing
    const driveFileRegex = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const match = url.match(driveFileRegex);

    if (match && match[1]) {
       url = `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }

    if (isHero) {
        setHeroForm({ ...heroForm, image: url });
    } else {
        setNewItem({...newItem, image: url});
    }
  };

  const isGoogleDriveLink = (url: string | undefined) => {
    return url && url.includes('drive.google.com') && url.includes('export=view');
  };

  const handleCopyCode = () => {
    const code = `import { Project, TechItem, HeroData, CustomSection, AdminCredentials } from './types';

// =================================================================================
// 🟢 HERO SECTION
// =================================================================================
export const HERO_CONTENT: HeroData = ${JSON.stringify(heroData, null, 2)};

// =================================================================================
// 🟢 PROJECTS SECTION
// =================================================================================
export const PROJECTS: Project[] = ${JSON.stringify(projects, null, 2)};

// =================================================================================
// 🟢 REPOSITORIES SECTION
// =================================================================================
export const OTHER_REPOS: Project[] = ${JSON.stringify(otherRepos, null, 2)};

// =================================================================================
// 🟢 CUSTOM SECTIONS
// =================================================================================
export const CUSTOM_SECTIONS: CustomSection[] = ${JSON.stringify(customSections, null, 2)};

// =================================================================================
// 🟢 TECH STACK
// =================================================================================
export const TECH_STACK: TechItem[] = [
  { name: "JavaScript", category: "Language" },
  { name: "TypeScript", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "Django", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Prisma", category: "Database" },
  { name: "GraphQL", category: "Backend" },
  { name: "Docker", category: "Tools" },
  { name: "Git", category: "Tools" },
];

// =================================================================================
// 🟢 ADMIN USERS
// =================================================================================
export const ADMIN_USERS: AdminCredentials[] = ${JSON.stringify(users, null, 2)};
`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get current list and filter it based on search
  const getActiveList = () => {
    let list: Project[] = [];
    if (activeTab === 'projects') list = projects;
    else if (activeTab === 'repos') list = otherRepos;
    else if (activeTab.startsWith('custom-')) {
      const id = activeTab.replace('custom-', '');
      list = customSections.find(s => s.id === id)?.items || [];
    }
    
    // Map to include original index before filtering
    return list
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const getTitle = () => {
    if (activeTab === 'projects') return 'Featured Projects';
    if (activeTab === 'repos') return 'Other Repositories';
    if (activeTab === 'users') return 'User Management';
    if (activeTab === 'settings') return 'Settings & Deployment';
    if (activeTab === 'manage-sections') return 'Manage Sections';
    if (activeTab === 'profile') return 'Profile & Hero';
    if (activeTab.startsWith('custom-')) {
      const id = activeTab.replace('custom-', '');
      return customSections.find(s => s.id === id)?.title || 'Section';
    }
    return 'Dashboard';
  };

  // Logic to determine if we are in a content tab
  const isContentTab = activeTab === 'projects' || activeTab === 'repos' || activeTab.startsWith('custom-');

  return (
    <div className="min-h-screen bg-background text-text relative">
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-white/5 p-6 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-8">
           <h2 className="text-xl font-bold text-white flex items-center gap-2">
             <span>Admin Panel</span>
           </h2>
           <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-white/70 hover:text-white">
             <X size={24} />
           </button>
        </div>
        
        <nav className="flex-1 space-y-2 overflow-y-auto">
          <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 mt-4 px-4">Content</div>
          
          <button 
            onClick={() => handleTabChange('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'profile' ? 'bg-primary text-white' : 'text-muted hover:text-white hover:bg-white/5'}`}
          >
            <UserCircle size={18} /> Profile & Hero
          </button>
          <button 
            onClick={() => handleTabChange('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'projects' ? 'bg-primary text-white' : 'text-muted hover:text-white hover:bg-white/5'}`}
          >
            <LayoutGrid size={18} /> Projects
          </button>
          <button 
            onClick={() => handleTabChange('repos')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'repos' ? 'bg-primary text-white' : 'text-muted hover:text-white hover:bg-white/5'}`}
          >
            <FolderGit2 size={18} /> Repositories
          </button>

          {customSections.length > 0 && (
             <>
              <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 mt-6 px-4">Custom Sections</div>
              {customSections.map(section => (
                <button 
                  key={section.id}
                  onClick={() => handleTabChange(`custom-${section.id}`)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === `custom-${section.id}` ? 'bg-primary text-white' : 'text-muted hover:text-white hover:bg-white/5'}`}
                >
                  <span className="text-lg leading-none">{section.icon || '📄'}</span> 
                  <span className="truncate">{section.title}</span>
                </button>
              ))}
             </>
          )}

          <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 mt-6 px-4">Management</div>
           <button 
            onClick={() => handleTabChange('manage-sections')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'manage-sections' ? 'bg-primary text-white' : 'text-muted hover:text-white hover:bg-white/5'}`}
          >
            <Layers size={18} /> Sections
          </button>
          <button 
            onClick={() => handleTabChange('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'users' ? 'bg-primary text-white' : 'text-muted hover:text-white hover:bg-white/5'}`}
          >
            <Users size={18} /> Users
          </button>
          <button 
            onClick={() => handleTabChange('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-primary text-white' : 'text-muted hover:text-white hover:bg-white/5'}`}
          >
            <Settings size={18} /> Settings
          </button>
        </nav>

        <div className="pt-6 border-t border-white/10 space-y-2">
           <button onClick={onBack} className="w-full flex items-center gap-3 px-4 py-2 text-muted hover:text-white transition-colors">
            <ArrowLeft size={18} /> Back to Site
          </button>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-64 p-4 md:p-8 overflow-x-hidden">
        
        {/* Header with Mobile Toggle */}
        <header className="flex flex-col gap-4 mb-8">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="md:hidden p-2 text-white bg-surface rounded-lg border border-white/10"
                >
                  <Menu size={20} />
                </button>
                <h1 className="text-xl md:text-2xl font-bold text-white truncate">{getTitle()}</h1>
             </div>

            {isContentTab && !isAdding && (
              <button 
                onClick={() => setIsAdding(true)}
                className="md:hidden px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center gap-2 whitespace-nowrap text-sm"
              >
                <Plus size={16} /> Add
              </button>
            )}
          </div>
          
          {isContentTab && !isAdding && (
            <div className="flex flex-col md:flex-row gap-3">
               <div className="relative flex-1 md:max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search items..." 
                    className="w-full bg-surface border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>
              <button 
                onClick={() => setIsAdding(true)}
                className="hidden md:flex px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 items-center gap-2 whitespace-nowrap"
              >
                <Plus size={18} /> Add Item
              </button>
            </div>
          )}
        </header>

        {/* Content Area */}
        <div className="max-w-5xl">

          {/* 0. PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="bg-surface border border-white/5 p-6 md:p-8 rounded-xl space-y-8 animate-in fade-in">
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Text Fields */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white mb-2">Intro Information</h3>
                        
                        <div>
                            <label className="text-sm text-muted block mb-1">Greeting (H1)</label>
                            <input 
                                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                                value={heroForm.greeting}
                                onChange={e => setHeroForm({...heroForm, greeting: e.target.value})}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-muted block mb-1">Name</label>
                                <input 
                                    className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                                    value={heroForm.name}
                                    onChange={e => setHeroForm({...heroForm, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="text-sm text-muted block mb-1">Status / Title</label>
                                <input 
                                    className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                                    value={heroForm.title}
                                    onChange={e => setHeroForm({...heroForm, title: e.target.value})}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-muted block mb-1">Bio (Paragraph)</label>
                            <textarea 
                                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary h-40"
                                value={heroForm.bio}
                                onChange={e => setHeroForm({...heroForm, bio: e.target.value})}
                            />
                        </div>
                    </div>

                    {/* Right: Image Upload */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-white">Hero Image</h3>
                             {heroForm.image && (
                                <button onClick={() => setHeroForm({...heroForm, image: ''})} className="text-xs text-red-400 hover:text-red-300">
                                    Reset to Default
                                </button>
                             )}
                        </div>

                        <div className="bg-black/20 p-6 rounded-xl border border-white/10 flex flex-col items-center gap-4">
                             {/* Preview */}
                             <div className="relative w-full aspect-square max-w-xs rounded-2xl overflow-hidden border border-white/10 bg-surface shadow-lg group">
                                {heroForm.image ? (
                                    <>
                                        <img src={heroForm.image} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/20 pointer-events-none" /> {/* Vignette Preview */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-6 pointer-events-none">
                                            <span className="text-white/50 text-xs font-mono">Overlay Preview...</span>
                                        </div>
                                        {isGoogleDriveLink(heroForm.image) && (
                                            <div className="absolute top-2 right-2 bg-black/70 p-1 rounded-full text-green-400" title="Google Drive Link">
                                                <Cloud size={14} />
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-surface to-black flex items-center justify-center">
                                        <span className="text-muted text-sm">Default Abstract View</span>
                                    </div>
                                )}
                             </div>

                             {/* Inputs */}
                             <div className="w-full space-y-3">
                                 <div className="relative">
                                    <input 
                                        placeholder="Image URL or Google Drive Link"
                                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary text-sm pr-10"
                                        value={heroForm.image || ''}
                                        onChange={(e) => handleImageUrlChange(e, true)}
                                    />
                                    {isGoogleDriveLink(heroForm.image) && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400">
                                            <Cloud size={16} />
                                        </div>
                                    )}
                                 </div>
                                 
                                 <div className="text-center text-xs text-muted font-medium">- OR -</div>
                                 
                                 <div className="flex items-center gap-2">
                                     <input 
                                        type="file" 
                                        className="hidden"
                                        ref={fileInputRef}
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, true)}
                                     />
                                     <button 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
                                    >
                                        <Upload size={16} /> Upload Image (Max 500KB)
                                    </button>
                                 </div>
                                 {imageError && <p className="text-xs text-red-400">{imageError}</p>}
                             </div>
                        </div>
                    </div>
                </div>
                
                <div className="pt-4 border-t border-white/10 flex justify-end">
                    <button 
                        onClick={handleSaveHero}
                        className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 font-bold flex items-center gap-2"
                    >
                        <Save size={18} /> Save Profile Changes
                    </button>
                </div>
            </div>
          )}
          
          {/* 1. CONTENT LIST VIEW (Projects, Repos, Custom) */}
          {isContentTab && !isAdding && (
             <div className="grid gap-4">
               {getActiveList().map(({ item, index }) => (
                 <div key={index} className="bg-surface border border-white/5 p-4 rounded-xl flex flex-col sm:flex-row gap-4 group">
                    <div className="flex items-center gap-4 flex-1 min-w-0 w-full">
                      {item.image ? (
                        <img src={item.image} alt="" className="w-16 h-12 object-cover rounded bg-white/5 shrink-0" />
                      ) : (
                        <div className="w-16 h-12 rounded bg-white/5 flex items-center justify-center shrink-0 text-muted">
                           <ImageIcon size={20} />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-white truncate">{item.title}</h3>
                        <p className="text-sm text-muted line-clamp-2">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                       <button 
                        onClick={() => handleEdit(item, index)}
                        className="flex-1 sm:flex-none justify-center px-4 py-2 bg-white/5 text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2 text-sm"
                      >
                        <Edit size={16} /> <span className="sm:hidden lg:inline">Edit</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteItem(index)}
                        className="flex-none px-3 py-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                 </div>
               ))}
               {getActiveList().length === 0 && (
                 <div className="text-center py-20 text-muted">
                    {searchQuery ? 'No items match your search.' : 'No items found. Add one!'}
                 </div>
               )}
             </div>
          )}

          {/* 2. ADD/EDIT ITEM FORM */}
          {isAdding && (
            <div className="bg-surface border border-white/5 p-6 rounded-xl animate-in fade-in slide-in-from-bottom-4">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-white">{editIndex !== null ? 'Edit Item' : 'Add New Item'}</h3>
                 <button onClick={resetForm} className="text-muted hover:text-white"><X size={20}/></button>
              </div>
              
              <div className="space-y-4">
                <input 
                  placeholder="Title"
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                  value={newItem.title}
                  onChange={e => setNewItem({...newItem, title: e.target.value})}
                />
                <textarea 
                  placeholder="Description"
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary h-32"
                  value={newItem.description}
                  onChange={e => setNewItem({...newItem, description: e.target.value})}
                />
                
                {/* Image Upload Section */}
                <div className="space-y-3 p-4 bg-white/5 rounded-lg border border-white/10">
                   <div className="flex items-center justify-between">
                     <label className="text-sm font-medium text-white/70">Project Image</label>
                     {newItem.image && (
                       <button 
                         onClick={() => setNewItem({...newItem, image: ''})} 
                         className="text-xs text-red-400 hover:text-red-300"
                       >
                         Remove Image
                       </button>
                     )}
                   </div>
                   
                   <div className="flex flex-col md:flex-row gap-4 items-start">
                      {newItem.image && (
                        <div className="relative w-full md:w-32 h-32 bg-black/40 rounded-lg overflow-hidden shrink-0 border border-white/10 group">
                          <img src={newItem.image} alt="Preview" className="w-full h-full object-cover" />
                          {isGoogleDriveLink(newItem.image) && (
                              <div className="absolute top-2 right-2 bg-black/70 p-1 rounded-full text-green-400" title="Google Drive Link Detected">
                                  <Cloud size={14} />
                              </div>
                          )}
                        </div>
                      )}
                      
                      <div className="flex-1 w-full space-y-3">
                         <div className="relative">
                            <input 
                                placeholder="Image URL (or paste Google Drive share link)"
                                className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary text-sm pr-10"
                                value={newItem.image}
                                onChange={(e) => handleImageUrlChange(e)}
                            />
                            {isGoogleDriveLink(newItem.image) && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400">
                                    <Cloud size={16} />
                                </div>
                            )}
                         </div>

                          <div className="text-center text-xs text-muted font-medium">- OR -</div>
                          <div className="flex items-center gap-2">
                            <input 
                              type="file" 
                              ref={fileInputRef}
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e)}
                            />
                            <button 
                              onClick={() => fileInputRef.current?.click()}
                              className="w-full py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
                            >
                              <Upload size={16} /> Upload from Computer
                            </button>
                          </div>
                          {imageError ? (
                              <p className="text-xs text-red-400 flex items-center gap-1"><AlertTriangle size={12} /> {imageError}</p>
                          ) : (
                              <p className="text-xs text-muted">
                                  Supports: Direct URLs, Google Drive links, or Local Uploads (max 500KB).
                              </p>
                          )}
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <input 
                    placeholder="Status (Optional)"
                    className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    value={newItem.status || ''}
                    onChange={e => setNewItem({...newItem, status: e.target.value})}
                  />
                   <div className="hidden md:block"></div> {/* Spacer */}
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <input 
                    placeholder="Code URL"
                    className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    value={newItem.codeUrl || ''}
                    onChange={e => setNewItem({...newItem, codeUrl: e.target.value})}
                  />
                   <input 
                    placeholder="Demo URL"
                    className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    value={newItem.demoUrl || ''}
                    onChange={e => setNewItem({...newItem, demoUrl: e.target.value})}
                  />
                </div>
                <div>
                  <input 
                    placeholder="Tags (comma separated)"
                    className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    value={tagInput}
                    onChange={e => {
                      setTagInput(e.target.value);
                      setNewItem({...newItem, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t)});
                    }}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={handleSave}
                    disabled={!!imageError}
                    className={`px-6 py-2 bg-primary text-white rounded-lg flex items-center gap-2 ${!!imageError ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'}`}
                  >
                    <Save size={18} /> {editIndex !== null ? 'Update' : 'Save'}
                  </button>
                  <button 
                    onClick={resetForm}
                    className="px-6 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. SETTINGS TAB (Includes Export) */}
          {activeTab === 'settings' && (
            <div className="space-y-8 max-w-3xl">
               
               {/* Deployment Helper */}
               <div className="bg-surface border border-white/5 p-8 rounded-xl">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                           <FileJson className="text-accent" /> Deployment Helper
                        </h3>
                        <p className="text-sm text-muted mt-2">
                            Since this is a static site, changes made here are saved to your <strong>local browser only</strong>. 
                            To make them permanent for everyone, copy the code below and paste it into your <code>constants.ts</code> file.
                        </p>
                    </div>
                  </div>

                  <div className="bg-black/50 border border-white/10 rounded-lg p-4 font-mono text-xs text-muted overflow-hidden relative group">
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button 
                            onClick={handleCopyCode}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-white text-xs font-bold transition-colors ${copied ? 'bg-green-500' : 'bg-primary hover:bg-primary/90'}`}
                         >
                            {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy Code'}
                         </button>
                      </div>
                      <div className="max-h-64 overflow-y-auto pr-2">
                        <pre className="whitespace-pre-wrap break-all">
                            {`// ... Copy this into constants.ts ...\n\nexport const HERO_CONTENT = ${JSON.stringify(heroData, null, 2)};\n\nexport const PROJECTS: Project[] = ${JSON.stringify(projects, null, 2)};\n\n// ... etc ...`}
                        </pre>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/90 to-transparent pointer-events-none flex items-end justify-center pb-4">
                          <span className="text-white/50 text-xs italic">Click 'Copy Code' to get full content</span>
                      </div>
                  </div>
               </div>

              {/* Password Management */}
              <div className="bg-surface border border-white/5 p-8 rounded-xl max-w-lg">
                <h3 className="text-xl font-bold text-white mb-6">Security</h3>
                <p className="text-sm text-muted mb-4">Logged in as: <span className="text-white">{currentUser}</span></p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-muted mb-2">New Password</label>
                    <input 
                      type="password"
                      placeholder="Enter new password"
                      className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                      value={newPass}
                      onChange={e => setNewPass(e.target.value)}
                    />
                  </div>
                  {passMsg && <p className={`text-sm ${passMsg.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{passMsg}</p>}
                  <button 
                    onClick={handleUpdatePassword}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 4. USERS TAB */}
          {activeTab === 'users' && (
             <div className="space-y-8">
               <div className="bg-surface border border-white/5 p-6 rounded-xl">
                 <h3 className="text-lg font-bold text-white mb-4">Add New User</h3>
                 <div className="flex flex-col md:flex-row gap-4">
                    <input 
                      type="email" 
                      placeholder="Email"
                      className="flex-1 bg-background border border-white/10 rounded-lg px-4 py-2 text-white"
                      value={newUserEmail}
                      onChange={e => setNewUserEmail(e.target.value)}
                    />
                    <input 
                      type="password" 
                      placeholder="Password"
                      className="flex-1 bg-background border border-white/10 rounded-lg px-4 py-2 text-white"
                      value={newUserPass}
                      onChange={e => setNewUserPass(e.target.value)}
                    />
                    <button onClick={handleAddUser} className="bg-primary px-6 py-2 rounded-lg text-white font-bold hover:bg-primary/90">Add User</button>
                 </div>
                 {userMsg && <p className={`text-sm mt-2 ${userMsg.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{userMsg}</p>}
               </div>

               <div className="bg-surface border border-white/5 rounded-xl overflow-x-auto">
                 <table className="w-full text-left min-w-[500px]">
                   <thead className="bg-white/5 text-muted text-sm">
                     <tr>
                       <th className="p-4">Email</th>
                       <th className="p-4 text-right">Action</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                     {users.map((u, idx) => (
                       <tr key={idx} className="hover:bg-white/5">
                         <td className="p-4 text-white max-w-[200px] truncate" title={u.email}>{u.email} {u.email === currentUser && '(You)'}</td>
                         <td className="p-4 text-right">
                           {users.length > 1 && (
                             <button onClick={() => removeUser(u.email)} className="text-red-400 hover:text-red-300">
                               <Trash2 size={16} />
                             </button>
                           )}
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
          )}

          {/* 5. MANAGE SECTIONS TAB */}
          {activeTab === 'manage-sections' && (
             <div className="space-y-8">
               <div className="bg-surface border border-white/5 p-6 rounded-xl">
                 <h3 className="text-lg font-bold text-white mb-4">Create New Section</h3>
                 <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Section Title (e.g. My Startups)"
                      className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white"
                      value={newSectionTitle}
                      onChange={e => setNewSectionTitle(e.target.value)}
                    />
                    
                    {/* Icon Picker */}
                    <div>
                      <p className="text-sm text-muted mb-2">Select Icon</p>
                      <div className="flex flex-wrap gap-2">
                        {ICONS.map(icon => (
                          <button
                            key={icon}
                            onClick={() => setNewSectionIcon(icon)}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg border text-xl transition-all ${newSectionIcon === icon ? 'bg-primary border-primary text-white' : 'bg-background border-white/10 text-white/50 hover:border-white/30'}`}
                          >
                            {icon}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={handleCreateSection} 
                      className="bg-primary px-6 py-2 rounded-lg text-white font-bold hover:bg-primary/90 mt-2"
                    >
                      Create Section
                    </button>
                 </div>
               </div>

               <div className="bg-surface border border-white/5 rounded-xl overflow-x-auto">
                 <table className="w-full text-left min-w-[600px]">
                   <thead className="bg-white/5 text-muted text-sm">
                     <tr>
                       <th className="p-4">Icon</th>
                       <th className="p-4">Title</th>
                       <th className="p-4">Items</th>
                       <th className="p-4 text-right">Action</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                     {customSections.map((s) => (
                       <tr key={s.id} className="hover:bg-white/5">
                         <td className="p-4 text-white text-xl">{s.icon || '📄'}</td>
                         <td className="p-4 text-white font-medium max-w-[150px] truncate" title={s.title}>{s.title}</td>
                         <td className="p-4 text-muted">{s.items.length} items</td>
                         <td className="p-4 text-right">
                            <button onClick={() => removeCustomSection(s.id)} className="text-red-400 hover:text-red-300">
                               <Trash2 size={16} />
                             </button>
                         </td>
                       </tr>
                     ))}
                     {customSections.length === 0 && (
                        <tr><td colSpan={4} className="p-8 text-center text-muted">No custom sections yet.</td></tr>
                     )}
                   </tbody>
                 </table>
               </div>
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;