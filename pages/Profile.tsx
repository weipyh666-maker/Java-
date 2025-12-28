import React from 'react';
import { MOCK_USER } from '../constants';
import { Settings, MapPin, Ticket, Heart, MessageCircle, HelpCircle, ChevronRight, Wallet, Bell } from 'lucide-react';

interface ProfileProps {
  onNavigate: (page: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
  const user = MOCK_USER;

  const MenuRow = ({ icon: Icon, label, value, isLast, onClick }: { icon: any, label: string, value?: string, isLast?: boolean, onClick?: () => void }) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center justify-between py-4 pr-4 pl-0 hover:bg-gray-50 transition-colors ${!isLast ? 'border-b border-gray-100' : ''}`}
    >
        <div className="flex items-center">
            <Icon size={20} className="text-gray-500 mr-3" />
            <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
        <div className="flex items-center">
            {value && <span className="text-xs text-gray-400 mr-2">{value}</span>}
            <ChevronRight size={16} className="text-gray-300" />
        </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Profile Section */}
      <div className="bg-white pb-6 pt-8 px-5 mb-3 rounded-b-3xl shadow-sm">
         <div className="flex items-center justify-between mb-6">
             <div className="flex items-center">
                 <div className="w-16 h-16 rounded-full border-2 border-brand-100 p-0.5 mr-4">
                     <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                 </div>
                 <div>
                     <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                     <p className="text-sm text-gray-500">{user.phone}</p>
                 </div>
             </div>
             <button 
                onClick={() => onNavigate('settings')}
                className="p-2 bg-gray-50 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
             >
                 <Settings size={20} />
             </button>
         </div>

         {/* Stats Cards */}
         <div className="grid grid-cols-3 gap-3">
             <button 
                onClick={() => onNavigate('coupons')}
                className="bg-orange-50 p-3 rounded-xl flex flex-col items-center active:bg-orange-100 transition-colors"
             >
                 <span className="text-brand-600 font-bold text-lg">{user.coupons}</span>
                 <span className="text-xs text-brand-400">优惠券</span>
             </button>
             <button 
                onClick={() => onNavigate('coming_soon:我的积分')}
                className="bg-orange-50 p-3 rounded-xl flex flex-col items-center active:bg-orange-100 transition-colors"
             >
                 <span className="text-brand-600 font-bold text-lg">{user.points}</span>
                 <span className="text-xs text-brand-400">积分</span>
             </button>
             <button 
                onClick={() => onNavigate('wallet')}
                className="bg-orange-50 p-3 rounded-xl flex flex-col items-center active:bg-orange-100 transition-colors"
             >
                 <span className="text-brand-600 font-bold text-lg">¥{user.balance}</span>
                 <span className="text-xs text-brand-400">钱包</span>
             </button>
         </div>
      </div>

      {/* Main Menu */}
      <div className="px-4 space-y-4">
         
         <div className="bg-white rounded-xl px-4 shadow-sm">
             <MenuRow 
                icon={MapPin} 
                label="地址管理" 
                onClick={() => onNavigate('address_list')}
             />
             <MenuRow 
                icon={Heart} 
                label="我的收藏" 
                onClick={() => onNavigate('favorites')}
             />
             <MenuRow 
                icon={Wallet} 
                label="支付方式" 
                isLast 
                onClick={() => onNavigate('payment_methods')}
             />
         </div>

         <div className="bg-white rounded-xl px-4 shadow-sm">
             <MenuRow 
                icon={Bell} 
                label="消息通知" 
                onClick={() => onNavigate('notifications')}
             />
             <MenuRow 
                icon={Ticket} 
                label="邀请有礼" 
                value="得50元红包" 
                isLast 
                onClick={() => onNavigate('coming_soon:邀请有礼')}
             />
         </div>

         <div className="bg-white rounded-xl px-4 shadow-sm">
             <MenuRow 
                icon={MessageCircle} 
                label="客服中心" 
                onClick={() => onNavigate('coming_soon:客服中心')}
             />
             <MenuRow 
                icon={HelpCircle} 
                label="关于我们" 
                isLast 
                onClick={() => onNavigate('coming_soon:关于我们')}
             />
         </div>

         <div className="py-4 text-center">
             <button className="text-xs text-gray-400 font-medium hover:text-gray-600">
                 退出登录 v1.0.2
             </button>
         </div>
      </div>
    </div>
  );
};

export default Profile;