import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import { 
  Search, 
  Plus, 
  Eye, 
  Edit3, 
  Trash2, 
  Download,
  FileText,
  ChevronRight,
  X,
  Clock,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import blogService from '../../services/blogService';
import { useToast } from '../../components/Admin/ToastContext';
import ConfirmModal from '../../components/Admin/ConfirmModal';

const ManageBlogs = () => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Organisation',
    image_url: '',
    read_time: '5 MIN READ'
  });

  const categories = ["Organisation", "Innovation", "Technology", "Culture", "AI"];

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await blogService.getAllBlogs();
      
      let rawBlogs = [];
      if (Array.isArray(data)) rawBlogs = data;
      else if (data.results && Array.isArray(data.results)) rawBlogs = data.results;
      else if (data.blogs && Array.isArray(data.blogs)) rawBlogs = data.blogs;
      else if (data.data && Array.isArray(data.data)) rawBlogs = data.data;
      
      setBlogs(rawBlogs);
      setError(null);
    } catch (err) {
      setError('Failed to load blog posts. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenCreateModal = () => {
    setModalMode('create');
    setFormData({
      title: '',
      content: '',
      category: 'Organisation',
      image_url: '',
      read_time: '5 MIN READ'
    });
    setIsPostModalOpen(true);
  };

  const handleOpenEditModal = (blog) => {
    setModalMode('edit');
    setSelectedBlog(blog);
    setFormData({
      title: blog.title || '',
      content: blog.content || '',
      category: blog.category || 'Organisation',
      image_url: blog.image_url || '',
      read_time: blog.read_time || '5 MIN READ'
    });
    setIsPostModalOpen(true);
  };

  const handleView = (blog) => {
    setSelectedBlog(blog);
    setIsViewModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setBlogToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!blogToDelete) return;
    try {
      await blogService.deleteBlog(blogToDelete);
      setBlogs(blogs.filter(blog => (blog._id || blog.id) !== blogToDelete));
      showToast('Blog deleted successfully.', 'success');
    } catch (err) {
      showToast('Failed to delete the blog.', 'error');
    } finally {
      setIsConfirmModalOpen(false);
      setBlogToDelete(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      if (modalMode === 'create') {
        const response = await blogService.createBlog(formData);
        showToast('Blog published successfully!', 'success');
        // Refresh list
        fetchBlogs();
      } else {
        await blogService.updateBlog(selectedBlog._id || selectedBlog.id, formData);
        showToast('Blog updated successfully!', 'success');
        // Update local state
        setBlogs(blogs.map(b => ((b._id || b.id) === (selectedBlog._id || selectedBlog.id) ? { ...b, ...formData } : b)));
      }
      setIsPostModalOpen(false);
    } catch (err) {
      showToast(`Failed to ${modalMode} blog.`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    (blog.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
    (blog.category?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-black tracking-normal text-[#800000] capitalize font-semibold font-sans">Manage Blogs</h1>
            <p className="text-gray-500 text-sm font-medium mt-1">Create, edit, and manage your enterprise blog content.</p>
          </div>
          <button 
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 px-4 py-3 bg-[#ffcc00]/90 text-black  rounded-none font-semibold text-sm hover:bg-black hover:text-white transition-all w-fit shadow-md"
          >
            <Plus size={18} />
            Post Blog
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Total Blogs', value: blogs.length.toString(), icon: FileText, color: 'text-crimson-600', bg: 'bg-crimson-50' },
            { label: 'Categories', value: new Set(blogs.map(b => b.category)).size.toString(), icon: Tag, color: 'text-blue-600', bg: 'bg-blue-50' },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-none bg-white border border-gray-100 flex items-center gap-5 shadow-sm">
              <div className={`w-12 h-12 rounded-none  ${stat.color} flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-100 bg-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text"
                  placeholder="Search blogs by title or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-none border border-gray-100 bg-gray-50 text-sm  outline-none transition-all"
                />
              </div>
              
             
            </div>
          </div>

          {/* Table */}
          <div className="responsive-table-container min-h-[300px] relative">
            {loading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-crimson-100 border-t-crimson-600 rounded-full animate-spin"></div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Fetching blogs...</p>
                </div>
              </div>
            )}
            
            {error && (
              <div className="p-12 text-center">
                <p className="text-red-500 font-bold mb-4">{error}</p>
                <button 
                  onClick={fetchBlogs}
                  className="px-6 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-black transition-all"
                >
                  Retry Connection
                </button>
              </div>
            )}

            {!error && (
              <table className="w-full text-left">
                <colgroup>
                  <col style={{ width: '30%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '25%' }} />
                  <col style={{ width: '15%' }} />
                </colgroup>
                <thead className="bg-[#800000] text-white">
                  <tr>
                    <th className="px-8 py-4 text-[11px] font-semibold text-white capitalize tracking-wider text-center">Title</th>
                    <th className="px-6 py-4 text-[11px] font-semibold text-white capitalize tracking-wider text-center">Category</th>
                    <th className="px-6 py-4 text-[11px] font-semibold text-white capitalize tracking-wider text-center">Read Time</th>
                    <th className="px-6 py-4 text-[11px] font-semibold text-white capitalize tracking-wider text-center">Image URL</th>
                    <th className="px-8 py-4 text-[11px] font-semibold text-white capitalize tracking-wider text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                      <tr key={blog._id || blog.id} className="group hover:bg-gray-50 transition-colors">
                        <td className="px-8 py-4 text-center">
                          <span className="text-sm font-semibold text-gray-900 truncate block">{blog.title}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="px-3 py-1 bg-gray-100 text-[10px] font-bold text-gray-600 rounded-full uppercase tracking-wider">
                            {blog.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-1.5 text-gray-500">
                            <Clock size={12} />
                            <span className="text-[10px] font-bold">{blog.read_time}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-[10px] font-medium text-gray-400 truncate block max-w-[200px] mx-auto">
                            {blog.image_url}
                          </span>
                        </td>
                        <td className="px-8 py-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button 
                              onClick={() => handleView(blog)}
                              className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-all" title="View"
                            >
                              <Eye size={18} />
                            </button>
                            <button 
                              onClick={() => handleOpenEditModal(blog)}
                              className="p-2 rounded-lg text-amber-600 hover:bg-amber-50 transition-all" title="Edit"
                            >
                              <Edit3 size={18} />
                            </button>
                            <button 
                              onClick={() => handleDeleteClick(blog._id || blog.id)}
                              className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-all" 
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                        No blogs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Post/Edit Modal */}
        <AnimatePresence>
          {isPostModalOpen && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsPostModalOpen(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-2xl rounded-none shadow-2xl overflow-hidden"
              >
                <div className="bg-[#800000] p-4 flex justify-between items-center text-white">
                  <h3 className="text-[15px] font-semibold uppercase tracking-widest">
                    {modalMode === 'create' ? 'Post New Blog' : 'Edit Blog Post'}
                  </h3>
                  <button onClick={() => setIsPostModalOpen(false)}><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto hide-scrollbar">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Blog Title</label>
                      <input 
                        required
                        className="w-full border p-3 rounded-none text-sm focus:border-[#800000] outline-none bg-gray-50 focus:bg-white transition-all" 
                        value={formData.title} 
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="Enter blog title"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</label>
                        <select 
                          className="w-full border p-3 rounded-none text-sm focus:border-[#800000] outline-none bg-gray-50 focus:bg-white transition-all appearance-none"
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Read Time</label>
                        <input 
                          className="w-full border p-3 rounded-none text-sm focus:border-[#800000] outline-none bg-gray-50 focus:bg-white transition-all" 
                          value={formData.read_time} 
                          onChange={(e) => setFormData({...formData, read_time: e.target.value})}
                          placeholder="e.5 MIN READ"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Image URL</label>
                      <input 
                        className="w-full border p-3 rounded-none text-sm focus:border-[#800000] outline-none bg-gray-50 focus:bg-white transition-all" 
                        value={formData.image_url} 
                        onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                        placeholder="Enter direct link to image"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Content</label>
                      <textarea 
                        required
                        className="w-full border p-3 rounded-none text-sm min-h-[200px] focus:border-[#800000] outline-none bg-gray-50 focus:bg-white transition-all resize-none" 
                        value={formData.content} 
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        placeholder="Write your blog content here..."
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <button type="button" onClick={() => setIsPostModalOpen(false)} className="px-6 py-2 text-xs font-bold text-gray-500 uppercase tracking-widest">Cancel</button>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-[#800000] text-white rounded-none text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all"
                    >
                      {isSubmitting && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                      {isSubmitting ? 'Publishing...' : (modalMode === 'create' ? 'Publish Blog' : 'Update Blog')}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* View Modal */}
        <AnimatePresence>
          {isViewModalOpen && selectedBlog && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsViewModalOpen(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-2xl rounded-none shadow-2xl overflow-hidden"
              >
                <div className="bg-[#800000] p-4 flex justify-between items-center text-white">
                  <h3 className="text-[15px] font-semibold uppercase tracking-widest">Blog Preview</h3>
                  <button onClick={() => setIsViewModalOpen(false)}><X size={20} /></button>
                </div>
                <div className="p-8 space-y-6 max-h-[75vh] overflow-y-auto hide-scrollbar">
                  {selectedBlog.image_url && (
                    <div className="w-full h-48 bg-gray-100 overflow-hidden">
                      <img src={selectedBlog.image_url} alt={selectedBlog.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 bg-crimson-50 text-[10px] font-black text-crimson-600 rounded uppercase tracking-wider">
                        {selectedBlog.category}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                        <Clock size={12} /> {selectedBlog.read_time}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 leading-tight">{selectedBlog.title}</h2>
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {selectedBlog.content}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <ConfirmModal 
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete Blog Post?"
          message="Are you sure you want to delete this blog? This action cannot be undone."
          confirmText="Yes, Delete Blog"
          cancelText="No, Keep it"
        />
      </div>
    </AdminLayout>
  );
};

export default ManageBlogs;
