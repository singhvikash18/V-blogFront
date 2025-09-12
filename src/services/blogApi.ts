import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:5000/api';

export interface BlogPost {
  _id?: string;
  title: string;
  category: string;
  content: string;
  createdAt: Date;
  author?: string;
}

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('blogapp_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('blogapp_token');
      localStorage.removeItem('blogapp_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('blogapp_token', token);
      localStorage.setItem('blogapp_user', JSON.stringify(user));
      
      return { success: true, user };
    } catch (error: any) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      };
    }
  },
};

export const blogApi = {
  // Create a new blog post
  createPost: async (post: Omit<BlogPost, '_id' | 'createdAt'>): Promise<BlogPost> => {
    try {
      const response = await apiClient.post('/posts', post);
      toast.success('Blog post created successfully!');
      return response.data;
    } catch (error: any) {
      console.error('Error creating post:', error);
      const errorMessage = error.response?.data?.error || 'Failed to create blog post';
      toast.error(errorMessage);
      throw error;
    }
  },

  // Get all blog posts
  getAllPosts: async (category?: string): Promise<BlogPost[]> => {
    try {
      const params = category && category !== 'All' ? { category } : {};
      const response = await apiClient.get('/posts', { params });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      const errorMessage = error.response?.data?.error || 'Failed to fetch blog posts';
      toast.error(errorMessage);
      throw error;
    }
  },

  // Get a single blog post by ID
  getPostById: async (id: string): Promise<BlogPost | null> => {
    try {
      const response = await apiClient.get(`/posts/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching post:', error);
      if (error.response?.status === 404) {
        return null;
      }
      const errorMessage = error.response?.data?.error || 'Failed to fetch blog post';
      toast.error(errorMessage);
      throw error;
    }
  },

  // Update a blog post
  updatePost: async (id: string, post: Partial<BlogPost>): Promise<void> => {
    try {
      await apiClient.put(`/posts/${id}`, post);
      toast.success('Blog post updated successfully!');
    } catch (error: any) {
      console.error('Error updating post:', error);
      const errorMessage = error.response?.data?.error || 'Failed to update blog post';
      toast.error(errorMessage);
      throw error;
    }
  },

  // Delete a blog post
  deletePost: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/posts/${id}`);
      toast.success('Blog post deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting post:', error);
      const errorMessage = error.response?.data?.error || 'Failed to delete blog post';
      toast.error(errorMessage);
      throw error;
    }
  },
};