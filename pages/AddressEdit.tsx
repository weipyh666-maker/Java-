import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

interface AddressEditProps {
  onBack: () => void;
  onSave: () => void;
}

const AddressEdit: React.FC<AddressEditProps> = ({ onBack, onSave }) => {
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState('mr');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [door, setDoor] = useState('');
  const [tag, setTag] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const handleSave = () => {
    if (!contact || !phone || !address || !door) {
      alert('请填写完整信息');
      return;
    }
    // Logic to save address would go here
    onSave();
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 flex items-center shadow-sm sticky top-0 z-10 justify-between">
        <button onClick={onBack} className="text-gray-700">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">新增收货地址</h1>
        <button onClick={handleSave} className="text-brand-600 font-bold text-sm">
          保存
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
           {/* Address */}
           <div className="p-4 border-b border-gray-50 flex items-start">
              <label className="w-20 text-sm font-bold text-gray-800 pt-1">收货地址</label>
              <div className="flex-1">
                 <div className="flex items-center justify-between text-gray-400 text-sm mb-2" onClick={() => {}}>
                    <span className={address ? "text-gray-800" : ""}>{address || "点击选择收货地址"}</span>
                    <ChevronRight size={16} />
                 </div>
                 <input 
                    type="text" 
                    placeholder="门牌号：如10号楼 1002室" 
                    className="w-full text-sm font-medium placeholder-gray-400 outline-none"
                    value={door}
                    onChange={e => setDoor(e.target.value)}
                 />
              </div>
           </div>

           {/* Contact */}
           <div className="p-4 border-b border-gray-50 flex items-center">
              <label className="w-20 text-sm font-bold text-gray-800">联系人</label>
              <div className="flex-1">
                 <input 
                    type="text" 
                    placeholder="请填写收货人姓名" 
                    className="w-full text-sm font-bold placeholder-gray-400 outline-none mb-3"
                    value={contact}
                    onChange={e => setContact(e.target.value)}
                 />
                 <div className="flex space-x-4">
                    <button 
                        onClick={() => setGender('mr')}
                        className={`text-xs px-3 py-1 rounded border ${gender === 'mr' ? 'border-brand-500 text-brand-600 bg-brand-50' : 'border-gray-200 text-gray-500'}`}
                    >
                        先生
                    </button>
                    <button 
                        onClick={() => setGender('ms')}
                        className={`text-xs px-3 py-1 rounded border ${gender === 'ms' ? 'border-brand-500 text-brand-600 bg-brand-50' : 'border-gray-200 text-gray-500'}`}
                    >
                        女士
                    </button>
                 </div>
              </div>
           </div>

           {/* Phone */}
           <div className="p-4 flex items-center">
              <label className="w-20 text-sm font-bold text-gray-800">手机号</label>
              <div className="flex-1">
                 <input 
                    type="tel" 
                    placeholder="请填写收货手机号码" 
                    className="w-full text-sm font-bold placeholder-gray-400 outline-none"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                 />
              </div>
           </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
               <label className="text-sm font-bold text-gray-800">标签</label>
               <div className="flex space-x-2">
                   {['家', '公司', '学校'].map(t => (
                       <button
                          key={t}
                          onClick={() => setTag(t)}
                          className={`text-xs px-3 py-1 rounded border transition-colors ${tag === t ? 'border-brand-500 text-brand-600 bg-brand-50' : 'border-gray-200 text-gray-500'}`}
                       >
                           {t}
                       </button>
                   ))}
                   <button 
                     onClick={() => setTag('自定义')}
                     className={`text-xs px-3 py-1 rounded border transition-colors ${tag === '自定义' ? 'border-brand-500 text-brand-600 bg-brand-50' : 'border-gray-200 text-gray-500'}`}
                   >
                       +
                   </button>
               </div>
            </div>
            
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-800">设为默认地址</span>
                    <span className="text-xs text-gray-400">下单时自动填充该地址</span>
                </div>
                <button 
                    onClick={() => setIsDefault(!isDefault)}
                    className={`w-10 h-6 rounded-full p-1 transition-colors ${isDefault ? 'bg-brand-500' : 'bg-gray-200'}`}
                >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isDefault ? 'translate-x-4' : ''}`} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddressEdit;