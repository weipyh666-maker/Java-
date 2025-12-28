import React from 'react';
import { ChevronLeft, MapPin, Edit2, Plus, Home, Briefcase } from 'lucide-react';

interface AddressListProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const AddressList: React.FC<AddressListProps> = ({ onBack, onNavigate }) => {
  // Mock Address Data
  const addresses = [
    {
      id: 1,
      tag: '公司',
      address: '光谷软件园 F4栋',
      detail: '10楼 1002室',
      name: '张伟',
      gender: '先生',
      phone: '138 0013 8000',
      isDefault: true
    },
    {
      id: 2,
      tag: '家',
      address: '万科城市花园',
      detail: '3期 5栋 2单元 601',
      name: '张伟',
      gender: '先生',
      phone: '138 0013 8000',
      isDefault: false
    },
    {
      id: 3,
      tag: '学校',
      address: '华中科技大学',
      detail: '西七舍 302',
      name: '张伟',
      gender: '先生',
      phone: '138 0013 8000',
      isDefault: false
    }
  ];

  const getTagIcon = (tag: string) => {
    if (tag === '家') return <Home size={14} className="mr-1" />;
    if (tag === '公司') return <Briefcase size={14} className="mr-1" />;
    return <MapPin size={14} className="mr-1" />;
  };

  const getTagColor = (tag: string) => {
    if (tag === '家') return 'bg-orange-100 text-orange-600';
    if (tag === '公司') return 'bg-blue-100 text-blue-600';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col pb-20">
      {/* Header */}
      <div className="bg-white p-4 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="mr-3 text-gray-700">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">我的收货地址</h1>
      </div>

      {/* Address List */}
      <div className="p-4 space-y-3">
        {addresses.map((addr) => (
          <div key={addr.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
            <div className="flex-1 mr-4">
              <div className="flex items-center mb-2">
                <span className={`text-xs px-2 py-0.5 rounded flex items-center font-bold mr-2 ${getTagColor(addr.tag)}`}>
                  {getTagIcon(addr.tag)}
                  {addr.tag}
                </span>
                <span className="text-sm text-gray-500">{addr.address}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{addr.detail}</h3>
              <div className="text-sm text-gray-600">
                <span className="mr-2">{addr.name}</span>
                <span className="mr-2">{addr.gender}</span>
                <span>{addr.phone}</span>
              </div>
            </div>
            <button 
                onClick={() => onNavigate('address_edit')}
                className="p-2 text-gray-400 hover:text-brand-600 border-l border-gray-100 pl-4"
            >
              <Edit2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Add Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 safe-area-bottom">
        <div className="max-w-md mx-auto">
          <button 
            onClick={() => onNavigate('address_edit')}
            className="w-full bg-brand-500 text-white font-bold py-3 rounded-full shadow-lg shadow-brand-200 flex items-center justify-center active:scale-[0.98] transition-transform"
          >
            <Plus size={20} className="mr-2" />
            新增收货地址
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressList;