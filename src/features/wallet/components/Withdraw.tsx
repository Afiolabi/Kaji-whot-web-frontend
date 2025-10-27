import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useWithdraw } from '../api/walletApi';
import { formatCurrency } from '@/shared/utils/formatters';

const withdrawSchema = z.object({
  amount: z.number().min(1000, 'Minimum withdrawal is ₦1,000'),
  bankName: z.string().min(1, 'Bank name is required'),
  accountNumber: z.string().length(10, 'Account number must be 10 digits'),
  accountName: z.string().min(1, 'Account name is required'),
});

type WithdrawForm = z.infer<typeof withdrawSchema>;

interface WithdrawProps {
  currentBalance: number;
}

const Withdraw: React.FC<WithdrawProps> = ({ currentBalance }) => {
  const withdraw = useWithdraw();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WithdrawForm>({
    resolver: zodResolver(withdrawSchema),
  });

  const onSubmit = async (data: WithdrawForm) => {
    if (data.amount > currentBalance) {
      alert('Insufficient balance');
      return;
    }
    
    await withdraw.mutateAsync({
      amount: data.amount,
      bankDetails: {
        bankName: data.bankName,
        accountNumber: data.accountNumber,
        accountName: data.accountName,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> Withdrawals are processed within 24 hours. Minimum withdrawal is ₦1,000.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amount
        </label>
        <input
          {...register('amount', { valueAsNumber: true })}
          type="number"
          min={1000}
          max={currentBalance}
          className="input-field"
          placeholder="Enter amount"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
        )}
        <p className="text-sm text-gray-600 mt-1">
          Available: {formatCurrency(currentBalance)}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bank Name
        </label>
        <select {...register('bankName')} className="input-field">
          <option value="">Select bank</option>
          <option value="Access Bank">Access Bank</option>
          <option value="GTBank">GTBank</option>
          <option value="First Bank">First Bank</option>
          <option value="UBA">UBA</option>
          <option value="Zenith Bank">Zenith Bank</option>
          {/* Add more banks */}
        </select>
        {errors.bankName && (
          <p className="text-red-500 text-sm mt-1">{errors.bankName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Account Number
        </label>
        <input
          {...register('accountNumber')}
          type="text"
          maxLength={10}
          className="input-field"
          placeholder="0123456789"
        />
        {errors.accountNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.accountNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Account Name
        </label>
        <input
          {...register('accountName')}
          type="text"
          className="input-field"
          placeholder="John Doe"
        />
        {errors.accountName && (
          <p className="text-red-500 text-sm mt-1">{errors.accountName.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={withdraw.isPending}
        className="w-full py-4 bg-red-500 text-white font-bold text-lg rounded-lg hover:bg-red-600 transition disabled:opacity-50"
      >
        {withdraw.isPending ? 'Processing...' : 'Withdraw'}
      </button>
    </form>
  );
};

export default Withdraw;