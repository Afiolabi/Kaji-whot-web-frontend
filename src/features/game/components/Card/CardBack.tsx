const CardBack: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-16 h-24',
    md: 'w-20 h-32',
    lg: 'w-24 h-36',
  };

  return (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg shadow-lg flex items-center justify-center`}>
      <div className="text-4xl font-bold text-white opacity-20">W</div>
    </div>
  );
};

export default CardBack;