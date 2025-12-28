import React, { useState } from 'react';
import { ChevronLeft, MapPin, Package, ArrowRight, Wallet } from 'lucide-react';

interface RunnerRequestProps {
  onBack: () => void;
  onSubmit: (items: Record<string, number>) => void; // Reusing the checkout interface logic
}

const RunnerRequest: React.FC<RunnerRequestProps> = ({ onBack, onSubmit }) => {
  const [requestText, setRequestText] = useState('');
  const [pickupAddr, setPickupAddr] = useState('');
  const [dropAddr, setDropAddr] = useState('光谷软件园 F4栋 10楼');
  
  // Mock estimation
  const distance = 3.5;
  const basePrice = 12;
  const distancePrice = distance * 2;
  const totalPrice = basePrice + distancePrice;

  const handleSubmit = () => {
    if (!requestText.trim()) {
        alert("请输入您想购买的商品信息");
        return;
    }
    
    // We mock the cart structure to pass to checkout
    // Using a special ID that implies a custom runner order
    const mockCart = {
        'RUNNER_SERVICE_FEE': 1,
        'RUNNER_ESTIMATED_GOODS': 1
    };
    
    onSubmit(mockCart);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-10 shadow-sm flex items-center">
        <button onClick={onBack} className="mr-3 text-gray-700">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">UU跑腿 - 帮我买</h1>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
          {/* Input Area */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
              <div className="flex items-center mb-3">
                  <Package className="text-brand-500 mr-2" size={20} />
                  <h3 className="font-bold text-gray-800">想买点什么？</h3>
              </div>
              <textarea 
                className="w-full bg-gray-50 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-100 min-h-[100px]"
                placeholder="输入您想购买的商品名称、数量、品牌等要求。例如：一杯瑞幸生椰拿铁，去冰，半糖。"
                value={requestText}
                onChange={(e) => setRequestText(e.target.value)}
              />
              <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
                  {['瑞幸咖啡', '感冒药', '便利店', '网红奶茶', '肯德基'].map(tag => (
                      <button 
                        key={tag}
                        onClick={() => setRequestText(prev => prev + (prev ? ' ' : '') + tag)}
                        className="whitespace-nowrap bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full"
                      >
                          {tag}
                      </button>
                  ))}
              </div>
          </div>

          {/* Address Card */}
          <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
              {/* Pickup */}
              <div className="p-4 flex items-center border-b border-gray-50">
                  <div className="w-8 flex flex-col items-center mr-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mb-1"></div>
                      <div className="text-[10px] text-gray-400 font-bold">取</div>
                  </div>
                  <div className="flex-1">
                      <input 
                        type="text" 
                        placeholder="就近购买 (默认)"
                        className="w-full text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none"
                        value={pickupAddr}
                        onChange={(e) => setPickupAddr(e.target.value)}
                      />
                  </div>
                  <button className="text-brand-600 text-xs font-bold border-l border-gray-100 pl-3">
                      指定地址
                  </button>
              </div>
              
              {/* Dropoff */}
              <div className="p-4 flex items-center">
                  <div className="w-8 flex flex-col items-center mr-3">
                      <div className="w-2 h-2 rounded-full bg-brand-500 mb-1"></div>
                      <div className="text-[10px] text-gray-400 font-bold">送</div>
                  </div>
                  <div className="flex-1">
                       <input 
                        type="text" 
                        className="w-full text-sm font-medium text-gray-800 focus:outline-none"
                        value={dropAddr}
                        onChange={(e) => setDropAddr(e.target.value)}
                      />
                      <div className="text-xs text-gray-400 mt-0.5">张伟 138 0013 8000</div>
                  </div>
              </div>
          </div>

          {/* Fee Estimation */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
              <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">基础跑腿费</span>
                  <span className="text-sm font-bold">¥{basePrice}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">距离 ({distance}km)</span>
                  <span className="text-sm font-bold">¥{distancePrice}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                  <span className="text-sm font-bold text-gray-800">预估配送费</span>
                  <span className="text-lg font-bold text-brand-600">¥{totalPrice}</span>
              </div>
              <p className="text-xs text-gray-400 mt-2 bg-gray-50 p-2 rounded">
                  * 商品费用需由骑手垫付，送达后线下支付给骑手或通过平台补差价。
              </p>
          </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white border-t border-gray-100 p-3 px-4 safe-area-bottom">
          <button 
            onClick={handleSubmit}
            className="w-full bg-brand-500 text-white font-bold text-sm py-3 rounded-full shadow-lg shadow-brand-200 active:scale-[0.98] transition-transform flex items-center justify-center"
          >
              <Wallet size={18} className="mr-2" />
              去支付预估费用 ¥{totalPrice}
          </button>
      </div>
    </div>
  );
};

export default RunnerRequest;
