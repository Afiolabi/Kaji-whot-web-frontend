import { apiClient } from '@/shared/utils/api';
import { API_ENDPOINTS } from '@/services/api/endpoints';

export const authService = {
  async login(credentials: { email: string; password: string }) {
    return apiClient.post(API_ENDPOINTS.LOGIN, credentials);
  },

  async signup(data: { username: string; email: string; password: string }) {
    return apiClient.post(API_ENDPOINTS.SIGNUP, data);
  },

  async getCurrentUser() {
    return apiClient.get(API_ENDPOINTS.ME);
  },

  async logout() {
    return apiClient.post(API_ENDPOINTS.LOGOUT);
  },
};
