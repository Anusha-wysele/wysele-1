import { AnimatePresence, motion } from 'framer-motion';
import {
  Clock,
  Edit3,
  Eye,
  FileText,
  Plus,
  Search,
  Send,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import AdminLayout from '../../components/Admin/AdminLayout';
import { useToast } from '../../components/Admin/ToastContext';
import blogService from '../../services/blogService';
import { useAuth } from '../../context/AuthContext';

const ManageBlogs = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const searchParams = new URLSearchParams(window.location.search);
  const activeCompany = searchParams.get('company') || user?.company_name || 'wysele';
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPublishing, setIsPublishing] = useState(null); // blogId being published
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [imageUrlInput, setImageUrlInput] = useState(''); // current URL being typed

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogsCount, setTotalBlogsCount] = useState(0);
  const limit = 10;

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Organisation',
    image_url: '',
    image_urls: [],
    read_time: '5 MIN READ'
  });

  const categories = ['Organisation', 'Innovation', 'Technology', 'Culture', 'AI'];

  // ─── Helpers ────────────────────────────────────────────────────────────────

  const normalizeStatus = (raw = '') => {
    const s = raw.toLowerCase();
    if (s === 'draft') return 'Draft';
    return 'Published';
  };

  // ─── Fetch ───────────────────────────────────────────────────────────────────

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const queryParams = { 
        company: activeCompany,
        page: currentPage,
        limit: limit
      };
      const data = await blogService.getAllBlogs(queryParams);

      let rawBlogs = [];
      if (Array.isArray(data)) rawBlogs = data;
      else if (data.results && Array.isArray(data.results)) rawBlogs = data.results;
      else if (data.blogs && Array.isArray(data.blogs)) rawBlogs = data.blogs;
      else if (data.data && Array.isArray(data.data)) rawBlogs = data.data;

      // Process and parse category prefixes
      const mappedBlogs = rawBlogs.map(blog => {
        const hasPrefix = blog.category && blog.category.includes(':');
        const blogCompany = hasPrefix ? blog.category.split(':')[0] : (blog.company_name || blog.company || 'wysele');
        const cleanCategory = hasPrefix ? blog.category.split(':')[1] : (blog.category || 'Organisation');
        return {
          ...blog,
          company_name: blogCompany,
          category: cleanCategory,
          status: normalizeStatus(blog.status)
        };
      });

      // Client-side fallback filter by company
      let filtered = mappedBlogs;
      if (activeCompany) {
        filtered = mappedBlogs.filter(blog =>
          (blog.company_name)?.toLowerCase() === activeCompany.toLowerCase()
        );
      }

      // Client-side fallback filter by search term
      if (searchTerm.trim()) {
        filtered = filtered.filter(blog =>
          (blog.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
          (blog.category?.toLowerCase() || '').includes(searchTerm.toLowerCase())
        );
      }

      // Client-side fallback filter by tab
      if (activeTab !== 'All') {
        filtered = filtered.filter(blog => blog.status === activeTab);
      }

      let totalCount = 0;
      let calculatedTotalPages = 1;

      if (Array.isArray(data) || (!data.count && !data.total && !data.totalBlogs && !data.totalItems && !data.total_items)) {
        totalCount = filtered.length;
        calculatedTotalPages = Math.ceil(totalCount / limit) || 1;
      } else {
        totalCount = data.count || data.total || data.totalBlogs || data.totalItems || data.total_items || filtered.length;
        calculatedTotalPages = data.totalPages || data.pages || Math.ceil(totalCount / limit) || 1;
      }

      // Slicing for pagination
      const startIndex = (currentPage - 1) * limit;
      const paginatedBlogs = filtered.slice(startIndex, startIndex + limit);

      setBlogs(paginatedBlogs);
      setTotalPages(calculatedTotalPages);
      setTotalBlogsCount(totalCount);
      setError(null);
    } catch (err) {
      setError('Failed to load blog posts. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCompany, activeTab, searchTerm]);

  useEffect(() => {
    fetchBlogs();
  }, [activeCompany, currentPage, activeTab, searchTerm]);

  // ─── Modal handlers ──────────────────────────────────────────────────────────

  const handleOpenCreateModal = () => {
    setModalMode('create');
    setImageUrlInput('');
    setFormData({
      title: '',
      content: '',
      category: 'Organisation',
      image_url: '',
      image_urls: [],
      read_time: '5 MIN READ'
    });
    setIsPostModalOpen(true);
  };

  const handleOpenEditModal = (blog) => {
    setModalMode('edit');
    setSelectedBlog(blog);
    setImageUrlInput('');
    // Normalize image_urls: backend sends array
    const existingUrls = Array.isArray(blog.image_urls)
      ? blog.image_urls
      : (blog.image_urls ? blog.image_urls.split(',').map(u => u.trim()).filter(Boolean) : []);
    setFormData({
      title: blog.title || '',
      content: blog.content || '',
      category: blog.category || 'Organisation',
      image_url: blog.image_url || '',
      image_urls: existingUrls,
      read_time: blog.read_time || '5 MIN READ'
    });
    setIsPostModalOpen(true);
  };

  const handleView = (blog) => {
    setSelectedBlog(blog);
    setIsViewModalOpen(true);
  };

  // ─── Submit (Publish or Draft) ────────────────────────────────────────────────

  const handleSubmit = async (e, saveAsDraft = false) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      // When editing an existing draft, preserve DRAFT status unless explicitly publishing.
      // Only flip to ACTIVE when: creating with Publish, or editing a published blog.
      const isEditingDraft = modalMode === 'edit' && selectedBlog?.status === 'Draft';
      let status;
      if (saveAsDraft) {
        status = 'DRAFT';
      } else if (isEditingDraft) {
        // Main "Update Draft" button — keep it as draft, DO NOT publish
        status = 'DRAFT';
      } else {
        status = 'ACTIVE';
      }

      // Sync image_url to first of image_urls if not set separately
      const firstImage = formData.image_urls[0] || formData.image_url || '';
      const payload = {
        ...formData,
        category: `${activeCompany}:${formData.category}`,
        company_name: activeCompany,
        image_url: firstImage,
        image_urls: formData.image_urls,
        status
      };

      if (modalMode === 'create') {
        await blogService.createBlog(payload);
        showToast(saveAsDraft ? 'Blog saved as draft!' : 'Blog published successfully!', 'success');
        fetchBlogs();
      } else {
        await blogService.updateBlog(selectedBlog._id || selectedBlog.id, {
          ...payload,
          company_name: selectedBlog.company_name || activeCompany
        });
        showToast(isEditingDraft ? 'Draft updated!' : 'Blog updated successfully!', 'success');
        fetchBlogs();
      }
      setIsPostModalOpen(false);
    } catch (err) {
      showToast(err.message || `Failed to ${modalMode} blog.`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Publish draft ────────────────────────────────────────────────────────────

  const handlePublishBlog = async (blog) => {
    const blogId = blog._id || blog.id;
    try {
      setIsPublishing(blogId);
      // Build a full payload from existing data so required fields aren't lost
      const existingUrls = Array.isArray(blog.image_urls) ? blog.image_urls : [];
      const payload = {
        title: blog.title || '',
        content: blog.content || '',
        category: `${blog.company_name || activeCompany}:${blog.category || 'Organisation'}`,
        image_url: existingUrls[0] || blog.image_url || '',
        image_urls: existingUrls,
        read_time: blog.read_time || '5 MIN READ',
        company_name: blog.company_name || activeCompany,
        status: 'ACTIVE'
      };
      await blogService.updateBlog(blogId, payload);
      showToast('Blog published successfully!', 'success');
      fetchBlogs();
    } catch (err) {
      showToast(err.message || 'Failed to publish blog.', 'error');
    } finally {
      setIsPublishing(null);
    }
  };

  // ─── Filtered list ────────────────────────────────────────────────────────────

  const filteredBlogs = blogs;

  // ─── Render ───────────────────────────────────────────────────────────────────

  return (
    <AdminLayout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-lg tracking-normal text-[#005A9E] capitalize font-inter font-semibold">Manage Blogs</h1>
            <p className="text-gray-500 text-sm font-medium mt-1">Create, edit, and manage your enterprise blog content.</p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 px-4 py-3 bg-[#005A9E] text-white rounded-lg font-semibold text-sm hover:bg-[#004b85] hover:text-white transition-all w-fit shadow-sm"
          >
            <Plus size={18} />
            Post Blog
          </button>
        </div>

        {/* Toolbar Card with Tabs & Search */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-2 py-1 w-full md:w-auto">
            {['All', 'Published', 'Draft'].map((tab) => {
              const count = tab === 'All' 
                ? blogs.length 
                : blogs.filter(b => b.status === tab).length;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 text-xs font-semibold capitalize rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    activeTab === tab
                      ? 'bg-[#005A9E] text-white shadow-sm border border-transparent'
                      : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {tab} ({count})
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-md w-full md:w-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search blogs by title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#005A9E] outline-none transition-all"
            />
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
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
                <p className="text-red-500 font-bold">{error}</p>
              </div>
            )}

            {!error && (
              <table className="w-full text-left">
                <colgroup>
                  <col style={{ width: '28%' }} />
                  <col style={{ width: '13%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '15%' }} />
                </colgroup>
                <thead className="bg-blue-200 text-blue-900">
                  <tr>
                    <th className="px-4 py-2 text-[11px] font-semibold text-blue-900 capitalize tracking-wider text-center">Title</th>
                    <th className="px-4 py-2 text-[11px] font-semibold text-blue-900 capitalize tracking-wider text-center">Category</th>
                    <th className="px-4 py-2 text-[11px] font-semibold text-blue-900 capitalize tracking-wider text-center">Read Time</th>
                    <th className="px-4 py-2 text-[11px] font-semibold text-blue-900 capitalize tracking-wider text-center">Status</th>
                    <th className="px-4 py-2 text-[11px] font-semibold text-blue-900 capitalize tracking-wider text-center">Image URL</th>
                    <th className="px-4 py-2 text-[11px] font-semibold text-blue-900 capitalize tracking-wider text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                      <tr key={blog._id || blog.id} className="group hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2.5 text-center">
                          <p className="text-sm font-bold text-gray-900 truncate block max-w-[250px] mx-auto capitalize">
                            {blog.title}
                          </p>
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <span className="px-3 py-1 bg-blue-50 text-[10px] font-bold text-blue-600 rounded-full uppercase tracking-wider">
                            {blog.category}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                            <Clock size={12} />
                            <span className="text-[10px] font-bold">{blog.read_time}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            blog.status === 'Published'
                              ? 'bg-green-50 text-green-600 border border-green-100'
                              : 'bg-amber-50 text-amber-600 border border-amber-100'
                          }`}>
                            {blog.status}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          {(() => {
                            const count = Array.isArray(blog.image_urls) ? blog.image_urls.length : 0;
                            if (count > 0) {
                              return (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                                  {count} {count === 1 ? 'image' : 'images'}
                                </span>
                              );
                            }
                            return <span className="text-gray-300 font-bold text-sm">—</span>;
                          })()}
                        </td>
                        <td className="px-4 py-2.5 text-center">
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
                            {blog.status === 'Draft' && (
                              <button
                                onClick={() => handlePublishBlog(blog)}
                                disabled={isPublishing === (blog._id || blog.id)}
                                className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition-all disabled:opacity-50"
                                title="Publish"
                              >
                                {isPublishing === (blog._id || blog.id)
                                  ? <div className="w-[18px] h-[18px] border-2 border-green-300 border-t-green-600 rounded-full animate-spin" />
                                  : <Send size={18} />
                                }
                              </button>
                            )}

                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                        {activeTab === 'Draft' ? 'No draft blogs found' : activeTab === 'Published' ? 'No published blogs found' : 'No blogs found'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Standalone Pagination UI */}
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg border text-xs font-bold transition-all ${
                currentPage === 1 
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            <span className="text-xs text-gray-500 font-semibold px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                currentPage === totalPages 
                  ? 'border border-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#005A9E] text-white hover:bg-[#004b85]'
              }`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Post/Edit Modal */}
        {createPortal(
          <AnimatePresence>
            {isPostModalOpen && (
              <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setIsPostModalOpen(false)}
                  className="absolute inset-0 bg-black/40 backdrop-blur-md"
                />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-2xl rounded-none shadow-2xl overflow-hidden"
              >
                <div className="bg-blue-200 p-4 flex justify-between items-center text-blue-900">
                  <h3 className="text-[15px] font-semibold uppercase tracking-widest">
                    {modalMode === 'create' ? 'Post New Blog' : 'Edit Blog Post'}
                  </h3>
                  <button onClick={() => setIsPostModalOpen(false)} className="text-blue-900"><X size={20} /></button>
                </div>
                <form
                  onSubmit={(e) => handleSubmit(e, false)}
                  className="p-8 space-y-6 max-h-[80vh] overflow-y-auto hide-scrollbar"
                >
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
                          placeholder="e.g. 5 MIN READ"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Images</label>

                      {/* Add URL row */}
                      <div className="flex gap-2">
                        <input
                          type="url"
                          className="flex-1 border p-2.5 rounded-none text-sm focus:border-[#005A9E] outline-none bg-gray-50 focus:bg-white transition-all"
                          value={imageUrlInput}
                          onChange={(e) => setImageUrlInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const url = imageUrlInput.trim();
                              if (url && !formData.image_urls.includes(url)) {
                                setFormData(prev => ({ ...prev, image_urls: [...prev.image_urls, url] }));
                              }
                              setImageUrlInput('');
                            }
                          }}
                          placeholder="Paste image URL and press Add or Enter"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const url = imageUrlInput.trim();
                            if (url && !formData.image_urls.includes(url)) {
                              setFormData(prev => ({ ...prev, image_urls: [...prev.image_urls, url] }));
                            }
                            setImageUrlInput('');
                          }}
                          className="px-4 py-2 bg-[#005A9E] text-white text-xs font-bold rounded-none hover:bg-[#004b85] transition-all shrink-0"
                        >
                          Add
                        </button>
                      </div>

                      {/* Device Upload option */}
                      <div className="flex flex-col sm:flex-row items-center gap-3 p-3.5 bg-gray-50 border border-gray-100 rounded-none">
                        <div className="flex-1 text-left">
                          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Upload Image from Device</p>
                          <p className="text-[9px] text-gray-400 font-medium">Select a local image (Max: 2MB)</p>
                        </div>
                        <label className="px-4 py-2 bg-[#ffcc00] hover:bg-[#e6b800] text-black text-xs font-bold uppercase tracking-wider rounded-none cursor-pointer transition-all shrink-0 select-none">
                          Choose File
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (!file) return;
                              if (file.size > 2 * 1024 * 1024) {
                                showToast('File exceeds 2MB limit.', 'error');
                                return;
                              }
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const base64Url = event.target.result;
                                if (!formData.image_urls.includes(base64Url)) {
                                  setFormData(prev => ({ ...prev, image_urls: [...prev.image_urls, base64Url] }));
                                  showToast('Image uploaded successfully from device.', 'success');
                                }
                              };
                              reader.readAsDataURL(file);
                            }}
                          />
                        </label>
                      </div>

                      {/* Image list with previews */}
                      {formData.image_urls.length > 0 && (
                        <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                          {formData.image_urls.map((url, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-gray-50 border border-gray-100 p-2 rounded-none group">
                              <img
                                src={url}
                                alt={`img-${idx}`}
                                className="w-12 h-10 object-cover shrink-0 bg-gray-200"
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                              <span className="flex-1 text-[10px] text-gray-500 truncate font-medium">{url}</span>
                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, image_urls: prev.image_urls.filter((_, i) => i !== idx) }))}
                                className="text-gray-300 hover:text-red-500 transition-colors shrink-0 p-1"
                                title="Remove"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {formData.image_urls.length === 0 && (
                        <p className="text-[10px] text-gray-300 italic">No images added yet.</p>
                      )}
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
                    <button
                      type="button"
                      onClick={() => setIsPostModalOpen(false)}
                      className="px-6 py-2 text-xs font-bold text-gray-500 uppercase tracking-widest"
                    >
                      Cancel
                    </button>

                    {/* CREATE mode: Save as Draft | Publish Blog */}
                    {modalMode === 'create' && (
                      <>
                        <button
                          type="button"
                          disabled={isSubmitting}
                          onClick={(e) => handleSubmit(e, true)}
                          className="px-6 py-2.5 border border-amber-400 text-amber-600 rounded-lg text-xs font-semibold hover:bg-amber-50 transition-all flex items-center gap-2"
                        >
                          {isSubmitting
                            ? <div className="w-3 h-3 border-2 border-amber-300 border-t-amber-600 rounded-full animate-spin" />
                            : <FileText size={14} />
                          }
                          Save as Draft
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-8 py-3 bg-[#005A9E] text-white rounded-lg text-xs font-semibold hover:bg-[#004b85] transition-all flex items-center gap-2 shadow-sm"
                        >
                          {isSubmitting && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                          {isSubmitting ? 'Publishing...' : 'Publish Blog'}
                        </button>
                      </>
                    )}

                    {/* EDIT DRAFT mode: only Update Draft — publish via the table row Send icon */}
                    {modalMode === 'edit' && selectedBlog?.status === 'Draft' && (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 border border-amber-400 text-amber-700 bg-amber-50 rounded-lg text-xs font-semibold hover:bg-amber-100 transition-all flex items-center gap-2"
                      >
                        {isSubmitting && <div className="w-3 h-3 border-2 border-amber-300 border-t-amber-600 rounded-full animate-spin"></div>}
                        {isSubmitting ? 'Saving...' : 'Update Draft'}
                      </button>
                    )}

                    {/* EDIT PUBLISHED mode: Update Blog */}
                    {modalMode === 'edit' && selectedBlog?.status !== 'Draft' && (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-[#005A9E] text-white rounded-lg text-xs font-semibold hover:bg-[#004b85] transition-all flex items-center gap-2 shadow-sm"
                      >
                        {isSubmitting && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                        {isSubmitting ? 'Updating...' : 'Update Blog'}
                      </button>
                    )}
                  </div>
                </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

        {/* View Modal */}
        {createPortal(
          <AnimatePresence>
            {isViewModalOpen && selectedBlog && (
              <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setIsViewModalOpen(false)}
                  className="absolute inset-0 bg-black/40 backdrop-blur-md"
                />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-2xl rounded-none shadow-2xl overflow-hidden"
              >
                <div className="bg-blue-200 p-4 flex justify-between items-center text-blue-900">
                  <h3 className="text-[15px] font-semibold uppercase tracking-widest">Blog Preview</h3>
                  <button onClick={() => setIsViewModalOpen(false)} className="text-blue-900"><X size={20} /></button>
                </div>
                <div className="p-8 space-y-6 max-h-[75vh] overflow-y-auto hide-scrollbar">
                  {selectedBlog.image_url && (
                    <div className="w-full h-48 bg-gray-100 overflow-hidden">
                      <img loading="lazy" src={selectedBlog.image_url} alt={selectedBlog.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 bg-crimson-50 text-[10px] font-black text-crimson-600 rounded uppercase tracking-wider">
                        {selectedBlog.category}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        selectedBlog.status === 'Published'
                          ? 'bg-green-50 text-green-600 border border-green-100'
                          : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {selectedBlog.status}
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
          </AnimatePresence>,
          document.body
        )}


      </div>
    </AdminLayout>
  );
};

export default ManageBlogs;
