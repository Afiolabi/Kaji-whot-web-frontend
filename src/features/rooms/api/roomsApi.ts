/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/utils/api';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { RoomInfo, CreateRoomData } from '../types/room.types';
import { GameMode } from '@/shared/types/common.types';
import toast from 'react-hot-toast';

export const roomKeys = {
  all: ['rooms'] as const,
  lists: () => [...roomKeys.all, 'list'] as const,
  list: (mode?: GameMode) => [...roomKeys.lists(), mode] as const,
  details: () => [...roomKeys.all, 'detail'] as const,
  detail: (id: string) => [...roomKeys.details(), id] as const,
};

// Get all rooms
export const useRooms = (mode?: GameMode) => {
  return useQuery({
    queryKey: roomKeys.list(mode),
    queryFn: async (): Promise<RoomInfo[]> => {
      const params = mode ? { mode } : {};
      return apiClient.get(API_ENDPOINTS.ROOMS, { params });
    },
    refetchInterval: 5000, // Refresh every 5 seconds
  });
};

// Get room details
export const useRoom = (roomId: string | null) => {
  return useQuery({
    queryKey: roomKeys.detail(roomId || ''),
    queryFn: async (): Promise<RoomInfo> => {
      return apiClient.get(API_ENDPOINTS.ROOM(roomId!));
    },
    enabled: !!roomId,
  });
};

// Create room mutation
export const useCreateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateRoomData): Promise<{ roomId: string }> => {
      return apiClient.post(API_ENDPOINTS.CREATE_ROOM, data);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: roomKeys.list(variables.mode) });
      toast.success('Room created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create room');
    },
  });
};

// Join room mutation
export const useJoinRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ roomId, asPlayer }: { roomId: string; asPlayer: boolean }) => {
      return apiClient.post(API_ENDPOINTS.JOIN_ROOM(roomId), { asPlayer });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: roomKeys.detail(variables.roomId) });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to join room');
    },
  });
};