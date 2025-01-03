import React from 'react';

interface TokenStatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  subtext?: string;
  loading?: boolean;
}

export const TokenStatCard: React.FC<TokenStatCardProps> = ({
  title,
  value,
  icon,
  bgColor = 'from-gray-800/40 to-gray-800/20',
  textColor = 'text-white',
  subtext,
  loading = false
}) => {
  return (
    <div 
      className={`
        p-6 
        rounded-xl 
        bg-gradient-to-br 
        ${bgColor} 
        border 
        border-gray-700/50 
        transform 
        transition-all 
        duration-300 
        hover:scale-105
        hover:shadow-xl
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full bg-gray-700/50 ${textColor}`}>
            {icon}
          </div>
          <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        </div>
      </div>
      
      <div>
        {loading ? (
          <div className="animate-pulse bg-gray-700/50 h-8 rounded w-3/4"></div>
        ) : (
          <>
            <p 
              className={`
                text-2xl 
                font-bold 
                ${textColor} 
                truncate 
                max-w-full
              `}
              title={String(value)}
            >
              {value}
            </p>
            {subtext && (
              <p className="text-xs text-gray-500 mt-1">{subtext}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TokenStatCard;
