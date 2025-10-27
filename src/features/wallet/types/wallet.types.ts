export type TransactionType = 'deposit' | 'withdrawal' | 'game_entry' | 'game_win' | 'observer_win';
export type TransactionStatus = 'pending' | 'completed' | 'failed';

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  description: string;
  reference?: string;
  createdAt: number;
  completedAt?: number;
}

export interface WalletState {
  balance: number;
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}
