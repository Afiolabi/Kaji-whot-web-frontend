/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Wallet, ArrowUpCircle, ArrowDownCircle, History } from 'lucide-react';
import { useWalletBalance, useTransactions } from '../api/walletApi';
import { formatCurrency, formatDate } from '@/shared/utils/formatters';
// import FundWallet from './FundWallet';
// import Withdraw from './Withdraw';
import LoadingScreen from '@/shared/components/common/LoadingScreen';
import FundWallet from './FundWallet';
import Withdraw from './Withdraw';

const WalletDashboard = () => {
  const [activeTab, setActiveTab] = useState<'fund' | 'withdraw' | 'history'>('fund');
  const { data: walletData, isLoading: balanceLoading } = useWalletBalance();
  const { data: transactions, isLoading: transactionsLoading } = useTransactions();

  if (balanceLoading) return <LoadingScreen />;

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <div className="bg-linear-to-br from-primary-500 to-primary-600 rounded-lg p-8 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Wallet className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Wallet Balance</h2>
        </div>
        <p className="text-5xl font-bold">{formatCurrency(walletData?.balance || 0)}</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('fund')}
              className={`flex-1 px-6 py-4 font-medium transition ${
                activeTab === 'fund'
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ArrowUpCircle className="w-5 h-5 inline-block mr-2" />
              Fund Wallet
            </button>
            <button
              onClick={() => setActiveTab('withdraw')}
              className={`flex-1 px-6 py-4 font-medium transition ${
                activeTab === 'withdraw'
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ArrowDownCircle className="w-5 h-5 inline-block mr-2" />
              Withdraw
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 px-6 py-4 font-medium transition ${
                activeTab === 'history'
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <History className="w-5 h-5 inline-block mr-2" />
              History
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'fund' && <FundWallet />}
          {activeTab === 'withdraw' && <Withdraw currentBalance={walletData?.balance || 0} />}
          {activeTab === 'history' && (
            <TransactionHistory transactions={transactions || []} isLoading={transactionsLoading} />
          )}
        </div>
      </div>
    </div>
  );
};

// Transaction History Component
const TransactionHistory: React.FC<{ transactions: any[]; isLoading: boolean }> = ({
  transactions,
  isLoading,
}) => {
  if (isLoading) return <div className="text-center py-8">Loading...</div>;

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No transactions yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div>
            <p className="font-medium text-gray-900">{transaction.description}</p>
            <p className="text-sm text-gray-600">{formatDate(transaction.createdAt)}</p>
          </div>
          <div className="text-right">
            <p
              className={`font-bold ${
                transaction.type.includes('deposit') || transaction.type.includes('win')
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {transaction.type.includes('deposit') || transaction.type.includes('win') ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </p>
            <span
              className={`inline-block px-2 py-1 text-xs rounded-full ${
                transaction.status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : transaction.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {transaction.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WalletDashboard;