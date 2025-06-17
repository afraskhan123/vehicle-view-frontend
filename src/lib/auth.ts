
import { LoginCredentials, AuthResponse, User } from '@/types/auth';

// Mock authentication - replace with real API calls
export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
      const user: User = {
        id: '1',
        email: credentials.email,
        name: 'Admin User'
      };
      
      const token = 'mock-jwt-token';
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { user, token };
    }
    
    throw new Error('Invalid credentials');
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken');
  }
};
