import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface CouponsPageProps {
  onBack: () => void;
}

const CouponsPage: React.FC<CouponsPageProps> = ({ onBack }) => {
  const coupons = [
    { id: 1, amount: 8, min: 30, title: "通用红包", desc: "全平台通用", expiry: "2026-11-01" },
    { id: 2, amount: 15, min: 100, title: "大额满减券", desc: "限超市便利使用", expiry: "2026-11-05" },
    { id: 3, amount: 5, min: 0, title: "无门槛红包", desc: "新用户专享", expiry: "2026-10-31" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="mr-3 text-gray-700">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">我的优惠券</h1>
      </div>

      <div className="p-4 space-y-3">
         {coupons.map(coupon => (
             <div key={coupon.id} className="bg-white rounded-lg p-0 flex shadow-sm overflow-hidden relative">
                 {/* Left Side (Amount) */}
                 <div className="bg-orange-50 w-24 flex flex-col items-center justify-center p-4 border-r border-dashed border-orange-200">
                     <div className="text-brand-600 font-bold text-2xl">
                        <span className="text-sm">¥</span>{coupon.amount}
                     </div>
                     <div className="text-xs text-brand-400 mt-1">满{coupon.min}可用</div>
                 </div>

                 {/* Right Side (Info) */}
                 <div className="flex-1 p-4 flex justify-between items-center">
                     <div>
                         <h3 className="font-bold text-gray-800 text-sm mb-1">{coupon.title}</h3>
                         <p className="text-xs text-gray-500 mb-2">{coupon.desc}</p>
                         <p className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded inline-block">有效期至 {coupon.expiry}</p>
                     </div>
                     <button className="bg-brand-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm hover:bg-brand-600 transition-colors">
                         去使用
                     </button>
                 </div>

                 {/* Decorative circles */}
                 <div className="absolute top-[-6px] left-[93px] w-3 h-3 bg-gray-50 rounded-full" />
                 <div className="absolute bottom-[-6px] left-[93px] w-3 h-3 bg-gray-50 rounded-full" />
             </div>
         ))}

         <div className="text-center pt-6">
             <button className="text-gray-400 text-xs font-medium border border-gray-200 px-4 py-2 rounded-full">
                 查看失效券
             </button>
         </div>
      </div>
    </div>
  );
};

export default CouponsPage;