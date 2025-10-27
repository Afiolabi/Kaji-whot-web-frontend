/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/utils/api';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { Transaction } from '../types/wallet.types';
import toast from 'react-hot-toast';

export const walletKeys = {
  all: ['wallet'] as const,
  balance: () => [...walletKeys.all, 'balance'] as const,
  transactions: () => [...walletKeys.all, 'transactions'] as const,
};

// Get wallet balance
export const useWalletBalance = () => {
  return useQuery({
    queryKey: walletKeys.balance(),
    queryFn: async (): Promise<{ balance: number }> => {
      return apiClient.get(API_ENDPOINTS.WALLET);
    },
  });
};

// Get transactions
export const useTransactions = (limit = 50) => {
  return useQuery({
    queryKey: walletKeys.transactions(),
    queryFn: async (): Promise<Transaction[]> => {
      return apiClient.get(API_ENDPOINTS.TRANSACTIONS, { params: { limit } });
    },
  });
};

// Fund wallet mutation
export const useFundWallet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (amount: number) => {
      return apiClient.post(API_ENDPOINTS.FUND_WALLET, { amount });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: walletKeys.balance() });
      queryClient.invalidateQueries({ queryKey: walletKeys.transactions() });
      toast.success('Wallet funded successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to fund wallet');
    },
  });
};

// Withdraw mutation
export const useWithdraw = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { amount: number; bankDetails: any }) => {
      return apiClient.post(API_ENDPOINTS.WITHDRAW, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: walletKeys.balance() });
      queryClient.invalidateQueries({ queryKey: walletKeys.transactions() });
      toast.success('Withdrawal request submitted!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Withdrawal failed');
    },
  });
};