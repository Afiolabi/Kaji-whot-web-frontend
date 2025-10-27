import { useState } from 'react';
// import { useFundWallet } from '../api/walletApi';
import { formatCurrency } from '@/shared/utils/formatters';
import { useFundWallet } from '../api/walletApi';

const QUICK_AMOUNTS = [500, 1000, 2000, 5000, 10000];

const FundWallet = () => {
  const [amount, setAmount] = useState<number>(1000);
  const fundWallet = useFundWallet();

  const handleFund = async () => {
    if (amount < 100) {
      alert('Minimum funding amount is ₦100');
      return;
    }
    await fundWallet.mutateAsync(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min={100}
          className="input-field text-2xl font-bold"
          placeholder="₦0"
        />
      </div>

      {/* Quick Amount Buttons */}
      <div>
        <p className="text-sm text-gray-600 mb-3">Quick amounts</p>
        <div className="grid grid-cols-3 gap-3">
          {QUICK_AMOUNTS.map((quickAmount) => (
            <button
              key={quickAmount}
              onClick={() => setAmount(quickAmount)}
              className={`py-3 rounded-lg font-medium transition ${
                amount === quickAmount
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {formatCurrency(quickAmount)}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleFund}
        disabled={fundWallet.isPending || amount < 100}
        className="w-full py-4 bg-green-500 text-white font-bold text-lg rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {fundWallet.isPending ? 'Processing...' : `Fund ${formatCurrency(amount)}`}
      </button>

      <p className="text-sm text-gray-600 text-center">
        Secure payment powered by Paystack
      </p>
    </div>
  );
};

export default FundWallet;