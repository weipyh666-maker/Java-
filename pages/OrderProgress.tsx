import React, { useEffect, useState } from 'react';
import { ChevronLeft, MapPin, Phone, MessageSquare, Clock, Star } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { MOCK_ORDERS } from '../constants';

interface OrderProgressProps {
  orderId: string;
  onBack: () => void;
}

const OrderProgress: React.FC<OrderProgressProps> = ({ orderId, onBack }) => {
  const order = MOCK_ORDERS.find(o => o.id === orderId);
  const [progress, setProgress] = useState(0);

  // Simulate progress animation
  useEffect(() => {
    const timer = setTimeout(() => setProgress(1), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!order) return <div>Order not found</div>;

  const steps = [
    { title: '订单已提交', time: '12:30', completed: true },
    { title: '商家已接单', time: '12:32', completed: true },
    { title: '骑手已接单', time: '12:35', completed: true },
    { title: '骑手配送中', time: '12:40', completed: true }, // Active
    { title: '订单已送达', time: '预计 13:00', completed: false },
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header with Map Background */}
      <div className="relative h-64 bg-gray-200 w-full shrink-0">
         {/* Mock Map Image */}
         <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-60" 
            alt="Map"
         />
         
         <div className="absolute top-0 left-0 right-0 p-4">
             <button onClick={onBack} className="bg-white/80 backdrop-blur-md p-2 rounded-full shadow-sm text-gray-800">
                 <ChevronLeft size={24} />
             </button>
         </div>

         {/* Rider Status Card Overlay */}
         <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-lg p-4">
             <div className="flex justify-between items-center mb-3">
                 <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-800 mr-2">骑手配送中</span>
                    <span className="text-xs bg-brand-100 text-brand-600 px-2 py-0.5 rounded-full font-bold">准时达</span>
                 </div>
                 <div className="text-sm text-gray-500">
                     预计 <span className="text-brand-600 font-bold text-lg">13:00</span> 送达
                 </div>
             </div>
             
             <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                 <div className="flex items-center">
                     <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100" className="w-10 h-10 rounded-full mr-3 border-2 border-brand-100" />
                     <div>
                         <div className="font-bold text-sm text-gray-800">王骑手</div>
                         <div className="text-xs text-gray-500 flex items-center">
                            <Star size={10} className="text-orange-400 mr-1" fill="currentColor" />
                            4.9分
                         </div>
                     </div>
                 </div>
                 <div className="flex space-x-3">
                     <button className="p-2 bg-gray-100 rounded-full text-gray-600">
                         <MessageSquare size={20} />
                     </button>
                     <button className="p-2 bg-brand-500 rounded-full text-white shadow-md shadow-brand-200">
                         <Phone size={20} />
                     </button>
                 </div>
             </div>
         </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 bg-white p-6 rounded-t-3xl -mt-4 relative z-10 overflow-y-auto">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center">
              <Clock size={18} className="mr-2 text-gray-400" />
              订单详情
          </h3>
          
          <div className="relative pl-4 border-l-2 border-gray-100 space-y-8 ml-2">
              {steps.map((step, index) => (
                  <div key={index} className="relative">
                      {/* Dot */}
                      <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white shadow-sm ${index === 3 ? 'bg-brand-500 ring-4 ring-brand-100' : (step.completed ? 'bg-gray-400' : 'bg-gray-200')}`} />
                      
                      <div className="flex justify-between items-start">
                          <div>
                              <div className={`text-sm font-bold ${index === 3 ? 'text-gray-900 text-base' : 'text-gray-500'}`}>{step.title}</div>
                              {index === 3 && <p className="text-xs text-gray-400 mt-1">骑手正在向您飞奔，请耐心等待</p>}
                          </div>
                          <div className="text-xs text-gray-400 font-medium">{step.time}</div>
                      </div>
                  </div>
              ))}
          </div>

          {/* Order Info Summary */}
          <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">订单号码</span>
                  <span className="text-sm font-medium text-gray-800">{orderId}</span>
              </div>
              <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">配送地址</span>
                  <span className="text-sm font-medium text-gray-800 truncate max-w-[200px] text-right">光谷软件园 F4栋 10楼</span>
              </div>
          </div>
      </div>
    </div>
  );
};

export default OrderProgress;