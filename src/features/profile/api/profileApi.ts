/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/utils/api';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { User, UserStats } from '@/shared/types/common.types';
import toast from 'react-hot-toast';

export const profileKeys = {
  all: ['profile'] as const,
  stats: () => [...profileKeys.all, 'stats'] as const,
  friends: () => [...profileKeys.all, 'friends'] as const,
};

// Get user stats
export const useUserStats = () => {
  return useQuery({
    queryKey: profileKeys.stats(),
    queryFn: async (): Promise<UserStats> => {
      return apiClient.get(API_ENDPOINTS.STATS);
    },
  });
};

// Get friends list
export const useFriends = () => {
  return useQuery({
    queryKey: profileKeys.friends(),
    queryFn: async (): Promise<User[]> => {
      return apiClient.get(API_ENDPOINTS.FRIENDS);
    },
  });
};

// Update profile mutation
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<User>) => {
      return apiClient.put(API_ENDPOINTS.UPDATE_PROFILE, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
      toast.success('Profile updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    },
  });
};

// Add friend mutation
export const useAddFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (friendId: string) => {
      return apiClient.post(API_ENDPOINTS.ADD_FRIEND, { friendId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.friends() });
      toast.success('Friend added!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to add friend');
    },
  });
};

// Remove friend mutation
export const useRemoveFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (friendId: string) => {
      return apiClient.delete(API_ENDPOINTS.REMOVE_FRIEND(friendId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.friends() });
      toast.success('Friend removed');
    },
  });
};