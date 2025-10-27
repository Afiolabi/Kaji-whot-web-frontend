/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/utils/api';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { User } from '@/shared/types/common.types';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  username: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

// Login mutation
export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<AuthResponse> => {
      return apiClient.post(API_ENDPOINTS.LOGIN, credentials);
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      queryClient.setQueryData(authKeys.user(), data.user);
      toast.success('Login successful!');
      navigate('/play');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });
};

// Signup mutation
export const useSignup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SignupData): Promise<AuthResponse> => {
      return apiClient.post(API_ENDPOINTS.SIGNUP, data);
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      queryClient.setQueryData(authKeys.user(), data.user);
      toast.success('Account created successfully!');
      navigate('/play');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Signup failed');
    },
  });
};

// Get current user query
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: async (): Promise<User> => {
      return apiClient.get(API_ENDPOINTS.ME);
    },
    enabled: !!localStorage.getItem('token'),
    staleTime: Infinity, // User data doesn't change often
  });
};

// Logout mutation
export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return apiClient.post(API_ENDPOINTS.LOGOUT);
    },
    onSuccess: () => {
      localStorage.removeItem('token');
      queryClient.clear();
      navigate('/');
    },
  });
};