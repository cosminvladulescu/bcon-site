import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FileText, 
  MessageSquare, 
  FolderOpen, 
  Star,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Edit,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const AdminDashboard = () => {
  const { user } = useOutletContext();
  const [activeTab, setActiveTab] = useState("blog");
  const [blogPosts, setBlogPosts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image_url: "",
    category: "",
    published: false
  });
  const [blogDialogOpen, setBlogDialogOpen] = useState(false);

  // Testimonial form state
  const [testimonialForm, setTestimonialForm] = useState({
    client_name: "",
    company: "",
    role: "",
    content: "",
    rating: 5,
    is_active: true
  });
  const [testimonialDialogOpen, setTestimonialDialogOpen] = useState(false);

  // Project form state
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    challenge: "",
    solution: "",
    results: "",
    category: "",
    image_url: "",
    year: "",
    is_featured: false
  });
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("admin_token")}`
  });

  useEffect(() => {
    fetchAllData();
    
    // Handle hash navigation
    const hash = window.location.hash.replace("#", "");
    if (hash) setActiveTab(hash);
  }, []);

  const fetchAllData = async () => {
    try {
      const [postsRes, contactsRes, projectsRes, testimonialsRes] = await Promise.all([
        axios.get(`${API}/admin/blog`, { headers: getAuthHeaders() }),
        axios.get(`${API}/admin/contacts`, { headers: getAuthHeaders() }),
        axios.get(`${API}/admin/projects`, { headers: getAuthHeaders() }),
        axios.get(`${API}/admin/testimonials`, { headers: getAuthHeaders() })
      ]);
      
      setBlogPosts(postsRes.data);
      setContacts(contactsRes.data);
      setProjects(projectsRes.data);
      setTestimonials(testimonialsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Eroare la încărcarea datelor");
    } finally {
      setLoading(false);
    }
  };

  // Blog handlers
  const handleCreateBlogPost = async () => {
    try {
      await axios.post(`${API}/admin/blog`, blogForm, { headers: getAuthHeaders() });
      toast.success("Articol creat cu succes!");
      setBlogDialogOpen(false);
      setBlogForm({ title: "", slug: "", excerpt: "", content: "", image_url: "", category: "", published: false });
      fetchAllData();
    } catch (error) {
      toast.error(error.response?.data?.detail || "Eroare la crearea articolului");
    }
  };

  const handleDeleteBlogPost = async (postId) => {
    if (!window.confirm("Sigur vrei să ștergi acest articol?")) return;
    try {
      await axios.delete(`${API}/admin/blog/${postId}`, { headers: getAuthHeaders() });
      toast.success("Articol șters!");
      fetchAllData();
    } catch (error) {
      toast.error("Eroare la ștergerea articolului");
    }
  };

  const handleTogglePublished = async (post) => {
    try {
      await axios.put(`${API}/admin/blog/${post.id}`, 
        { published: !post.published }, 
        { headers: getAuthHeaders() }
      );
      toast.success(post.published ? "Articol depublicat" : "Articol publicat!");
      fetchAllData();
    } catch (error) {
      toast.error("Eroare la actualizarea articolului");
    }
  };

  // Contact handlers
  const handleMarkRead = async (contactId) => {
    try {
      await axios.put(`${API}/admin/contacts/${contactId}/read`, {}, { headers: getAuthHeaders() });
      fetchAllData();
    } catch (error) {
      toast.error("Eroare la marcarea ca citit");
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (!window.confirm("Sigur vrei să ștergi acest mesaj?")) return;
    try {
      await axios.delete(`${API}/admin/contacts/${contactId}`, { headers: getAuthHeaders() });
      toast.success("Mesaj șters!");
      fetchAllData();
    } catch (error) {
      toast.error("Eroare la ștergerea mesajului");
    }
  };

  // Testimonial handlers
  const handleCreateTestimonial = async () => {
    try {
      await axios.post(`${API}/admin/testimonials`, testimonialForm, { headers: getAuthHeaders() });
      toast.success("Testimonial adăugat!");
      setTestimonialDialogOpen(false);
      setTestimonialForm({ client_name: "", company: "", role: "", content: "", rating: 5, is_active: true });
      fetchAllData();
    } catch (error) {
      toast.error("Eroare la adăugarea testimonialului");
    }
  };

  const handleDeleteTestimonial = async (testimonialId) => {
    if (!window.confirm("Sigur vrei să ștergi acest testimonial?")) return;
    try {
      await axios.delete(`${API}/admin/testimonials/${testimonialId}`, { headers: getAuthHeaders() });
      toast.success("Testimonial șters!");
      fetchAllData();
    } catch (error) {
      toast.error("Eroare la ștergerea testimonialului");
    }
  };

  // Project handlers
  const handleCreateProject = async () => {
    try {
      await axios.post(`${API}/admin/projects`, projectForm, { headers: getAuthHeaders() });
      toast.success("Proiect adăugat!");
      setProjectDialogOpen(false);
      setProjectForm({ title: "", description: "", challenge: "", solution: "", results: "", category: "", image_url: "", year: "", is_featured: false });
      fetchAllData();
    } catch (error) {
      toast.error("Eroare la adăugarea proiectului");
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Sigur vrei să ștergi acest proiect?")) return;
    try {
      await axios.delete(`${API}/admin/projects/${projectId}`, { headers: getAuthHeaders() });
      toast.success("Proiect șters!");
      fetchAllData();
    } catch (error) {
      toast.error("Eroare la ștergerea proiectului");
    }
  };

  const stats = [
    { label: "Articole Blog", value: blogPosts.length, icon: FileText, color: "bg-blue-500" },
    { label: "Mesaje noi", value: contacts.filter(c => !c.is_read).length, icon: MessageSquare, color: "bg-green-500" },
    { label: "Proiecte", value: projects.length, icon: FolderOpen, color: "bg-purple-500" },
    { label: "Testimoniale", value: testimonials.length, icon: Star, color: "bg-yellow-500" }
  ];

  const tabs = [
    { id: "blog", label: "Articole Blog", icon: FileText },
    { id: "contacts", label: "Mesaje Contact", icon: MessageSquare },
    { id: "projects", label: "Proiecte", icon: FolderOpen },
    { id: "testimonials", label: "Testimoniale", icon: Star }
  ];

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <p className="text-slate-500">Se încarcă...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8" data-testid="admin-dashboard">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-slate-900 mb-2">
          Bine ai venit, {user?.name || "Admin"}!
        </h1>
        <p className="text-slate-600">
          Gestionează conținutul website-ului B-CON Consulting.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 border border-slate-200"
            data-testid={`admin-stat-${index}`}
          >
            <div className={`w-10 h-10 ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
            <p className="font-heading text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-slate-600 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
            data-testid={`admin-tab-${tab.id}`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Blog Tab */}
      {activeTab === "blog" && (
        <div data-testid="admin-blog-section">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading text-xl font-semibold text-slate-900">Articole Blog</h2>
            <Dialog open={blogDialogOpen} onOpenChange={setBlogDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-none" data-testid="admin-add-blog">
                  <Plus className="mr-2 h-4 w-4" />
                  Articol nou
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Adaugă articol nou</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Titlu</Label>
                      <Input
                        value={blogForm.title}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Titlul articolului"
                        data-testid="blog-form-title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Slug (URL)</Label>
                      <Input
                        value={blogForm.slug}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="titlul-articolului"
                        data-testid="blog-form-slug"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Categorie</Label>
                      <Input
                        value={blogForm.category}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, category: e.target.value }))}
                        placeholder="FIDIC, Decontări..."
                        data-testid="blog-form-category"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>URL Imagine</Label>
                      <Input
                        value={blogForm.image_url}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, image_url: e.target.value }))}
                        placeholder="https://..."
                        data-testid="blog-form-image"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Rezumat</Label>
                    <Textarea
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm(prev => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Scurtă descriere a articolului..."
                      rows={2}
                      data-testid="blog-form-excerpt"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Conținut</Label>
                    <Textarea
                      value={blogForm.content}
                      onChange={(e) => setBlogForm(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Conținutul complet al articolului..."
                      rows={6}
                      data-testid="blog-form-content"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={blogForm.published}
                      onCheckedChange={(checked) => setBlogForm(prev => ({ ...prev, published: checked }))}
                      data-testid="blog-form-published"
                    />
                    <Label>Publicat</Label>
                  </div>
                  <Button onClick={handleCreateBlogPost} className="w-full bg-slate-900 hover:bg-slate-800 rounded-none" data-testid="blog-form-submit">
                    Salvează articolul
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-white border border-slate-200">
            {blogPosts.length === 0 ? (
              <p className="p-8 text-center text-slate-500">Nu există articole.</p>
            ) : (
              <div className="divide-y divide-slate-200">
                {blogPosts.map((post) => (
                  <div key={post.id} className="p-4 flex items-center justify-between" data-testid={`blog-item-${post.id}`}>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-slate-900 truncate">{post.title}</h3>
                      <p className="text-sm text-slate-500">{post.category || "Fără categorie"}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleTogglePublished(post)}
                        className={`p-2 rounded ${post.published ? "text-green-600" : "text-slate-400"}`}
                        title={post.published ? "Depublică" : "Publică"}
                        data-testid={`blog-toggle-${post.id}`}
                      >
                        {post.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => handleDeleteBlogPost(post.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                        data-testid={`blog-delete-${post.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contacts Tab */}
      {activeTab === "contacts" && (
        <div data-testid="admin-contacts-section">
          <h2 className="font-heading text-xl font-semibold text-slate-900 mb-6">Mesaje Contact</h2>
          <div className="bg-white border border-slate-200">
            {contacts.length === 0 ? (
              <p className="p-8 text-center text-slate-500">Nu există mesaje.</p>
            ) : (
              <div className="divide-y divide-slate-200">
                {contacts.map((contact) => (
                  <div 
                    key={contact.id} 
                    className={`p-4 ${!contact.is_read ? "bg-blue-50" : ""}`}
                    data-testid={`contact-item-${contact.id}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-slate-900">{contact.name}</h3>
                        <p className="text-sm text-slate-500">{contact.email} {contact.company && `• ${contact.company}`}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {!contact.is_read && (
                          <button
                            onClick={() => handleMarkRead(contact.id)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                            title="Marchează ca citit"
                            data-testid={`contact-read-${contact.id}`}
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteContact(contact.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                          data-testid={`contact-delete-${contact.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-slate-700 text-sm">{contact.message}</p>
                    <p className="text-xs text-slate-400 mt-2">
                      {new Date(contact.created_at).toLocaleString('ro-RO')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <div data-testid="admin-projects-section">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading text-xl font-semibold text-slate-900">Proiecte</h2>
            <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-none" data-testid="admin-add-project">
                  <Plus className="mr-2 h-4 w-4" />
                  Proiect nou
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Adaugă proiect nou</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Titlu</Label>
                      <Input
                        value={projectForm.title}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Numele proiectului"
                        data-testid="project-form-title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Categorie</Label>
                      <Input
                        value={projectForm.category}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, category: e.target.value }))}
                        placeholder="Infrastructură, Construcții..."
                        data-testid="project-form-category"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>An</Label>
                      <Input
                        value={projectForm.year}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, year: e.target.value }))}
                        placeholder="2024"
                        data-testid="project-form-year"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>URL Imagine</Label>
                      <Input
                        value={projectForm.image_url}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, image_url: e.target.value }))}
                        placeholder="https://..."
                        data-testid="project-form-image"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Descriere</Label>
                    <Textarea
                      value={projectForm.description}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Descrierea proiectului..."
                      rows={2}
                      data-testid="project-form-description"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Provocare</Label>
                    <Textarea
                      value={projectForm.challenge}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, challenge: e.target.value }))}
                      rows={2}
                      data-testid="project-form-challenge"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Rezultate</Label>
                    <Textarea
                      value={projectForm.results}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, results: e.target.value }))}
                      rows={2}
                      data-testid="project-form-results"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={projectForm.is_featured}
                      onCheckedChange={(checked) => setProjectForm(prev => ({ ...prev, is_featured: checked }))}
                      data-testid="project-form-featured"
                    />
                    <Label>Proiect Featured</Label>
                  </div>
                  <Button onClick={handleCreateProject} className="w-full bg-slate-900 hover:bg-slate-800 rounded-none" data-testid="project-form-submit">
                    Salvează proiectul
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-white border border-slate-200">
            {projects.length === 0 ? (
              <p className="p-8 text-center text-slate-500">Nu există proiecte.</p>
            ) : (
              <div className="divide-y divide-slate-200">
                {projects.map((project) => (
                  <div key={project.id} className="p-4 flex items-center justify-between" data-testid={`project-item-${project.id}`}>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-slate-900 truncate">
                        {project.title}
                        {project.is_featured && (
                          <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5">Featured</span>
                        )}
                      </h3>
                      <p className="text-sm text-slate-500">{project.category} • {project.year}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                      data-testid={`project-delete-${project.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Testimonials Tab */}
      {activeTab === "testimonials" && (
        <div data-testid="admin-testimonials-section">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading text-xl font-semibold text-slate-900">Testimoniale</h2>
            <Dialog open={testimonialDialogOpen} onOpenChange={setTestimonialDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-none" data-testid="admin-add-testimonial">
                  <Plus className="mr-2 h-4 w-4" />
                  Testimonial nou
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Adaugă testimonial</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>Nume client</Label>
                    <Input
                      value={testimonialForm.client_name}
                      onChange={(e) => setTestimonialForm(prev => ({ ...prev, client_name: e.target.value }))}
                      placeholder="Ion Popescu"
                      data-testid="testimonial-form-name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Companie</Label>
                      <Input
                        value={testimonialForm.company}
                        onChange={(e) => setTestimonialForm(prev => ({ ...prev, company: e.target.value }))}
                        placeholder="Compania SRL"
                        data-testid="testimonial-form-company"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Funcție</Label>
                      <Input
                        value={testimonialForm.role}
                        onChange={(e) => setTestimonialForm(prev => ({ ...prev, role: e.target.value }))}
                        placeholder="Director"
                        data-testid="testimonial-form-role"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Testimonial</Label>
                    <Textarea
                      value={testimonialForm.content}
                      onChange={(e) => setTestimonialForm(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Ce a spus clientul..."
                      rows={4}
                      data-testid="testimonial-form-content"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={testimonialForm.is_active}
                      onCheckedChange={(checked) => setTestimonialForm(prev => ({ ...prev, is_active: checked }))}
                      data-testid="testimonial-form-active"
                    />
                    <Label>Activ</Label>
                  </div>
                  <Button onClick={handleCreateTestimonial} className="w-full bg-slate-900 hover:bg-slate-800 rounded-none" data-testid="testimonial-form-submit">
                    Salvează testimonialul
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-white border border-slate-200">
            {testimonials.length === 0 ? (
              <p className="p-8 text-center text-slate-500">Nu există testimoniale.</p>
            ) : (
              <div className="divide-y divide-slate-200">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="p-4 flex items-center justify-between" data-testid={`testimonial-item-${testimonial.id}`}>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-slate-900 truncate">{testimonial.client_name}</h3>
                      <p className="text-sm text-slate-500">{testimonial.company}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteTestimonial(testimonial.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                      data-testid={`testimonial-delete-${testimonial.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
