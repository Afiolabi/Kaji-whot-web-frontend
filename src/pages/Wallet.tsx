import WalletDashboard from '@/features/wallet/components/WalletDashboard';

const Wallet = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Wallet</h1>
        <p className="text-gray-600">Manage your funds and transactions</p>
      </div>
      <WalletDashboard />
    </div>
  );
};

export default Wallet;