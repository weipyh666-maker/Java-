import React, { useState } from 'react';
import { ChevronLeft, Plus, CreditCard, MoreHorizontal, CheckCircle2, Circle } from 'lucide-react';

interface PaymentMethodsProps {
  onBack: () => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ onBack }) => {
  // Mock Data
  const [methods, setMethods] = useState([
    { id: 'wx', name: '微信支付', type: 'wallet', icon: 'bg-green-500', connected: true, account: '已绑定' },
    { id: 'ali', name: '支付宝', type: 'wallet', icon: 'bg-blue-500', connected: true, account: '已绑定' },
    { id: 'cmb', name: '招商银行', type: 'credit', bg: 'from-red-500 to-red-700', number: '**** **** **** 8888', holder: '张伟' },
    { id: 'icbc', name: '工商银行', type: 'debit', bg: 'from-red-600 to-orange-600', number: '**** **** **** 6666', holder: '张伟' }
  ]);

  const handleUnbind = (id: string, name: string) => {
    if (window.confirm(`确定要解绑 ${name} 吗？`)) {
        setMethods(methods.filter(m => m.id !== id));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white p-4 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="mr-3 text-gray-700">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">支付方式</h1>
      </div>

      <div className="p-4 space-y-6">
          
          {/* Digital Wallets */}
          <div>
              <h3 className="text-xs font-bold text-gray-500 mb-3 px-1">免密支付 / 第三方支付</h3>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {methods.filter(m => m.type === 'wallet').map((item, idx, arr) => (
                      <div key={item.id} className={`flex items-center justify-between p-4 ${idx !== arr.length -1 ? 'border-b border-gray-50' : ''}`}>
                          <div className="flex items-center">
                              <div className={`w-8 h-8 rounded-full ${item.icon} flex items-center justify-center text-white font-bold text-xs mr-3`}>
                                  {item.id === 'wx' ? '微' : '支'}
                              </div>
                              <span className="font-medium text-gray-800">{item.name}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-400">
                              <span className="mr-2">{item.account}</span>
                              <CheckCircle2 size={18} className="text-brand-500" />
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Bank Cards */}
          <div>
              <h3 className="text-xs font-bold text-gray-500 mb-3 px-1">银行卡</h3>
              <div className="space-y-3">
                  {methods.filter(m => m.type !== 'wallet').map(card => (
                      <div 
                        key={card.id} 
                        className={`relative rounded-xl p-5 shadow-lg bg-gradient-to-r ${card.bg} text-white overflow-hidden`}
                      >
                          {/* Decorative Circles */}
                          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                          <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-full blur-xl"></div>

                          <div className="relative z-10">
                              <div className="flex justify-between items-start mb-6">
                                  <div className="flex items-center">
                                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm mr-3">
                                          <CreditCard size={16} />
                                      </div>
                                      <div>
                                          <div className="font-bold text-sm">{card.name}</div>
                                          <div className="text-[10px] opacity-80">{card.type === 'credit' ? '信用卡' : '储蓄卡'}</div>
                                      </div>
                                  </div>
                                  <button onClick={() => handleUnbind(card.id, card.name)} className="text-white/80 hover:text-white">
                                      <MoreHorizontal size={20} />
                                  </button>
                              </div>
                              <div className="text-xl font-mono tracking-widest shadow-black drop-shadow-sm">
                                  {card.number}
                              </div>
                          </div>
                      </div>
                  ))}
                  
                  {/* Add New Card */}
                  <button 
                    onClick={() => alert("模拟跳转：添加银行卡流程")}
                    className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:border-brand-200 hover:text-brand-500 hover:bg-brand-50 transition-all"
                  >
                      <Plus size={20} className="mr-2" />
                      <span className="font-bold text-sm">添加银行卡</span>
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default PaymentMethods;