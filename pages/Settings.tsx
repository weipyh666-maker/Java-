import React from 'react';
import { ChevronLeft, ChevronRight, Lock, Bell, Trash2, Info, LogOut } from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const SettingItem = ({ label, icon: Icon, value, isLast = false, isDestructive = false }: any) => (
    <button className={`w-full flex items-center justify-between py-4 ${!isLast ? 'border-b border-gray-50' : ''}`}>
        <div className="flex items-center">
            {Icon && <Icon size={18} className="text-gray-400 mr-3" />}
            <span className={`text-sm font-medium ${isDestructive ? 'text-red-500' : 'text-gray-700'}`}>{label}</span>
        </div>
        <div className="flex items-center">
            {value && <span className="text-xs text-gray-400 mr-2">{value}</span>}
            <ChevronRight size={16} className="text-gray-300" />
        </div>
    </button>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white p-4 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="mr-3 text-gray-700">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">设置</h1>
      </div>

      <div className="p-4 space-y-4">
          <div className="bg-white rounded-xl px-4 shadow-sm">
              <SettingItem icon={Lock} label="账号与安全" value="修改密码" />
              <SettingItem icon={Bell} label="消息推送设置" isLast />
          </div>

          <div className="bg-white rounded-xl px-4 shadow-sm">
              <SettingItem icon={Trash2} label="清除缓存" value="12.5MB" />
              <SettingItem icon={Info} label="关于我们" value="v1.0.2" isLast />
          </div>

          <div className="bg-white rounded-xl px-4 shadow-sm">
              <button 
                className="w-full py-4 text-center text-red-500 font-bold text-sm"
                onClick={() => alert("退出登录成功")}
              >
                  退出当前账号
              </button>
          </div>
      </div>
    </div>
  );
};

export default Settings;