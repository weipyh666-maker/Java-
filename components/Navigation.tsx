import React from 'react';
import { Home, ClipboardList, User } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
            activeTab === 'home' ? 'text-brand-600' : 'text-gray-400'
          }`}
        >
          <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">首页</span>
        </button>

        <button
          onClick={() => onTabChange('orders')}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
            activeTab === 'orders' ? 'text-brand-600' : 'text-gray-400'
          }`}
        >
          <ClipboardList size={24} strokeWidth={activeTab === 'orders' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">订单</span>
        </button>

        <button
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
            activeTab === 'profile' ? 'text-brand-600' : 'text-gray-400'
          }`}
        >
          <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">我的</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;