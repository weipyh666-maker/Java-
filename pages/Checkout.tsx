import React, { useState, useEffect } from 'react';
import { ChevronLeft, MapPin, Clock, ChevronRight, Wallet, Ticket, Percent, X, CheckCircle2, Circle, Home, Briefcase } from 'lucide-react';
import { MOCK_VENDORS } from '../constants';

interface CheckoutProps {
  cartData: { vendorId: string; items: Record<string, number> } | null;
  onBack: () => void;
  onPay: () => void;
}

// Mock Address Data
const MOCK_ADDRESSES = [
    { id: 'addr1', tag: '公司', address: '光谷软件园 F4栋', detail: '10楼 1002室', name: '张伟', phone: '138 0013 8000', gender: '先生' },
    { id: 'addr2', tag: '家', address: '万科城市花园', detail: '3期 5栋 2单元 601', name: '张伟', phone: '138 0013 8000', gender: '先生' },
];

const MOCK_TIMES = [
    '立即送出 (预计12:45)',
    '13:00',
    '13:15',
    '13:30',
    '13:45',
    '14:00',
    '14:15',
    '14:30'
];

const Checkout: React.FC<CheckoutProps> = ({ cartData, onBack, onPay }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Modal States
  const [showCouponSelector, setShowCouponSelector] = useState(false);
  const [showAddressSelector, setShowAddressSelector] = useState(false);
  const [showTimeSelector, setShowTimeSelector] = useState(false);

  // Selection States
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(MOCK_ADDRESSES[0].id);
  const [selectedTime, setSelectedTime] = useState<string>(MOCK_TIMES[0]);
  
  // Derived active address
  const currentAddress = MOCK_ADDRESSES.find(a => a.id === selectedAddressId) || MOCK_ADDRESSES[0];

  // Mock User Coupons for logic demonstration
  const myCoupons = [
    { id: 'c1', title: '通用红包', amount: 5, min: 0, desc: '无门槛使用' },
    { id: 'c2', title: '满减神券', amount: 8, min: 35, desc: '满35可用' },
    { id: 'c3', title: '大额补贴', amount: 15, min: 80, desc: '满80可用' },
  ];

  if (!cartData) return null;

  const vendor = MOCK_VENDORS.find(v => v.id === cartData.vendorId);
  if (!vendor) return <div>Vendor not found</div>;

  const orderItems = Object.entries(cartData.items).map(([itemId, qty]) => {
      const item = vendor.menu?.find(i => i.id === itemId);
      return item ? { ...item, qty } : null;
  }).filter(Boolean) as any[];

  // 1. Calculate Subtotal
  const subtotal = orderItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  
  // 2. Calculate Vendor Promotion (Man Jian)
  let vendorDiscount = 0;
  let promoText = '';
  if (vendor.promotion) {
      // Regex to parse "满30减15"
      const match = vendor.promotion.match(/满(\d+)减(\d+)/);
      if (match) {
          const threshold = parseInt(match[1]);
          const discount = parseInt(match[2]);
          if (subtotal >= threshold) {
              vendorDiscount = discount;
              promoText = `满${threshold}减${discount}`;
          }
      }
  }

  // 3. Coupon Logic
  // Sort coupons: Available first, then by value
  const sortedCoupons = [...myCoupons].sort((a, b) => {
      const aAvailable = subtotal >= a.min;
      const bAvailable = subtotal >= b.min;
      if (aAvailable && !bAvailable) return -1;
      if (!aAvailable && bAvailable) return 1;
      return b.amount - a.amount;
  });

  // Initial Auto-select Best Coupon (Run once)
  useEffect(() => {
    const best = sortedCoupons.find(c => subtotal >= c.min);
    if (best) {
        setSelectedCouponId(best.id);
    }
  }, []); 

  const selectedCoupon = myCoupons.find(c => c.id === selectedCouponId);
  const isCouponValid = selectedCoupon ? subtotal >= selectedCoupon.min : false;
  const couponDiscount = isCouponValid && selectedCoupon ? selectedCoupon.amount : 0;

  const deliveryFee = vendor.deliveryFee || 0;
  
  // 4. Final Total
  const total = Math.max(0, subtotal + deliveryFee - vendorDiscount - couponDiscount);

  const handlePay = () => {
      setIsProcessing(true);
      setTimeout(() => {
          setIsProcessing(false);
          alert('支付成功！您的订单已提交。');
          onPay();
      }, 1500);
  };

  const getTagColor = (tag: string) => {
    if (tag === '家') return 'bg-orange-100 text-orange-600';
    if (tag === '公司') return 'bg-blue-100 text-blue-600';
    return 'bg-gray-100 text-gray-600';
  };

  const getTagIcon = (tag: string) => {
    if (tag === '家') return <Home size={12} className="mr-1" />;
    if (tag === '公司') return <Briefcase size={12} className="mr-1" />;
    return <MapPin size={12} className="mr-1" />;
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col relative">
       <div className="bg-brand-500 p-4 pb-12">
            <div className="flex items-center text-white mb-4">
                <button onClick={onBack} className="mr-3">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-lg font-bold">提交订单</h1>
            </div>
       </div>

       <div className="flex-1 px-4 -mt-8 pb-24 overflow-y-auto">
           {/* Address Card (Clickable) */}
           <button 
                onClick={() => setShowAddressSelector(true)}
                className="w-full text-left bg-white rounded-xl p-4 shadow-sm mb-3 active:scale-[0.99] transition-transform"
           >
               <div className="flex items-center justify-between mb-2">
                   <div className="flex items-center text-brand-600 font-bold text-sm">
                       <MapPin size={16} className="mr-1" />
                       武汉市
                   </div>
                   <div className="flex items-center text-xs text-gray-400">
                       切换地址
                       <ChevronRight size={14} />
                   </div>
               </div>
               <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center">
                   <span className={`text-xs px-1.5 py-0.5 rounded font-normal mr-2 flex items-center ${getTagColor(currentAddress.tag)}`}>
                       {getTagIcon(currentAddress.tag)}
                       {currentAddress.tag}
                   </span>
                   {currentAddress.address} {currentAddress.detail}
               </h2>
               <div className="text-sm text-gray-500 pl-[4.5rem]">{currentAddress.name} ({currentAddress.gender}) {currentAddress.phone}</div>
           </button>

           {/* Time Card (Clickable) */}
           <button 
                onClick={() => setShowTimeSelector(true)}
                className="w-full bg-white rounded-xl p-4 shadow-sm mb-3 flex justify-between items-center active:scale-[0.99] transition-transform"
           >
               <div className="flex items-center font-bold text-gray-800 text-sm">
                   <Clock size={16} className="mr-2 text-gray-400" />
                   送达时间
               </div>
               <div className="flex items-center text-brand-600 text-sm font-medium">
                   {selectedTime}
                   <ChevronRight size={16} />
               </div>
           </button>

           {/* Order Items & Bill */}
           <div className="bg-white rounded-xl p-4 shadow-sm mb-3">
               <h3 className="font-bold text-gray-800 text-sm mb-3 border-b border-gray-100 pb-2">{vendor.name}</h3>
               <div className="space-y-4 mb-4">
                   {orderItems.map((item: any) => (
                       <div key={item.id} className="flex">
                           <img src={item.image} className="w-14 h-14 rounded bg-gray-100 object-cover mr-3" />
                           <div className="flex-1 flex flex-col justify-between">
                               <div className="flex justify-between items-start">
                                   <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                   <div className="text-sm font-bold text-gray-900">¥{item.price}</div>
                               </div>
                               <div className="text-xs text-gray-500">x {item.qty}</div>
                           </div>
                       </div>
                   ))}
               </div>
               
               {/* Fees Breakdown */}
               <div className="space-y-2 pt-2 border-t border-gray-50">
                   <div className="flex justify-between items-center text-sm">
                       <span className="text-gray-600">商品小计</span>
                       <span className="font-medium">¥{subtotal.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                       <span className="text-gray-600">配送费</span>
                       <span className="font-medium">¥{deliveryFee.toFixed(2)}</span>
                   </div>
                   
                   {/* Vendor Discount (Man Jian) */}
                   {vendorDiscount > 0 && (
                       <div className="flex justify-between items-center text-sm">
                           <span className="text-gray-600 flex items-center">
                               <Percent size={14} className="mr-1 text-red-500" />
                               商家满减 ({promoText})
                           </span>
                           <span className="font-medium text-red-500">-¥{vendorDiscount.toFixed(2)}</span>
                       </div>
                   )}

                   {/* Coupon Selector Trigger */}
                   <button 
                        onClick={() => setShowCouponSelector(true)}
                        className="w-full flex justify-between items-center text-sm py-3 border-t border-dashed border-gray-100 mt-2"
                   >
                       <span className="text-gray-600 flex items-center">
                           <Ticket size={14} className="mr-1 text-orange-500" />
                           红包/抵用券
                       </span>
                       <div className="flex items-center">
                           {isCouponValid && selectedCoupon ? (
                               <span className="text-red-500 font-medium">-¥{couponDiscount.toFixed(2)}</span>
                           ) : (
                               <span className="text-gray-400">
                                   {sortedCoupons.some(c => subtotal >= c.min) ? '请选择' : '暂无可用'}
                               </span>
                           )}
                           <ChevronRight size={14} className="text-gray-300 ml-1" />
                       </div>
                   </button>
               </div>
               
               {/* Total */}
               <div className="flex justify-end items-center pt-4 mt-2 border-t border-gray-100">
                   <span className="text-xs text-gray-500 mr-2">共 {Object.values(cartData.items).reduce((a,b)=>a+b,0)} 件</span>
                   <div className="flex items-end">
                       {(vendorDiscount > 0 || couponDiscount > 0) && (
                           <span className="text-xs text-gray-400 line-through mr-2">¥{(subtotal + deliveryFee).toFixed(2)}</span>
                       )}
                       <span className="text-sm text-gray-900 mr-1">合计</span>
                       <span className="text-lg font-bold text-gray-900">¥{total.toFixed(2)}</span>
                   </div>
               </div>
           </div>
           
           {/* Payment Method */}
           <div className="bg-white rounded-xl p-4 shadow-sm mb-3 flex justify-between items-center">
               <div className="flex items-center text-sm text-gray-800">
                   <Wallet size={18} className="mr-2 text-green-500" />
                   微信支付
               </div>
               <ChevronRight size={16} className="text-gray-300" />
           </div>
       </div>

       {/* Bottom Action Bar */}
       <div className="bg-white border-t border-gray-100 p-3 px-4 fixed bottom-0 left-0 right-0 z-40 safe-area-bottom">
           <div className="max-w-md mx-auto flex justify-between items-center">
               <div className="flex flex-col">
                   <div className="flex items-end">
                        <span className="text-2xl font-bold text-brand-600 leading-none">
                            <span className="text-sm">¥</span>{total.toFixed(2)}
                        </span>
                   </div>
                   {(vendorDiscount > 0 || couponDiscount > 0) && (
                       <span className="text-[10px] text-red-500">
                           已优惠 ¥{(vendorDiscount + couponDiscount).toFixed(2)}
                       </span>
                   )}
               </div>
               <button 
                onClick={handlePay}
                disabled={isProcessing}
                className={`bg-brand-500 text-white font-bold text-sm px-8 py-3 rounded-full shadow-lg shadow-brand-200 transition-transform active:scale-95 ${isProcessing ? 'opacity-70' : ''}`}
               >
                   {isProcessing ? '支付中...' : '提交订单'}
               </button>
           </div>
       </div>

       {/* Coupon Selector Modal */}
       {showCouponSelector && (
           <div className="fixed inset-0 z-50 flex flex-col justify-end">
               <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCouponSelector(false)} />
               <div className="bg-gray-50 rounded-t-2xl relative z-10 max-h-[70vh] flex flex-col">
                   <div className="p-4 bg-white rounded-t-2xl flex justify-between items-center border-b border-gray-100">
                       <h3 className="font-bold text-gray-900">选择优惠券</h3>
                       <button onClick={() => setShowCouponSelector(false)}>
                           <X size={24} className="text-gray-500" />
                       </button>
                   </div>
                   
                   <div className="overflow-y-auto p-4 space-y-3 flex-1">
                       <button 
                           onClick={() => { setSelectedCouponId(null); setShowCouponSelector(false); }}
                           className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center"
                       >
                           <span className="text-sm text-gray-700 font-medium">不使用优惠券</span>
                           {selectedCouponId === null ? <CheckCircle2 className="text-brand-500" size={20} /> : <Circle className="text-gray-300" size={20} />}
                       </button>

                       {sortedCoupons.map(coupon => {
                           const isAvailable = subtotal >= coupon.min;
                           return (
                               <button 
                                   key={coupon.id}
                                   disabled={!isAvailable}
                                   onClick={() => { if(isAvailable) { setSelectedCouponId(coupon.id); setShowCouponSelector(false); } }}
                                   className={`w-full relative flex rounded-xl overflow-hidden shadow-sm transition-opacity ${isAvailable ? 'bg-white active:scale-[0.99]' : 'bg-gray-100 opacity-60'}`}
                               >
                                   <div className={`w-24 flex flex-col items-center justify-center p-3 ${isAvailable ? 'bg-orange-50 text-brand-600' : 'bg-gray-200 text-gray-500'}`}>
                                       <div className="font-bold text-xl"><span className="text-xs">¥</span>{coupon.amount}</div>
                                       <div className="text-[10px]">满{coupon.min}可用</div>
                                   </div>
                                   <div className="flex-1 p-3 text-left flex justify-between items-center">
                                       <div>
                                           <div className={`font-bold text-sm ${isAvailable ? 'text-gray-800' : 'text-gray-500'}`}>{coupon.title}</div>
                                           <div className="text-xs text-gray-400 mt-1">{coupon.desc}</div>
                                           {!isAvailable && <div className="text-[10px] text-red-400 mt-1">还差 ¥{(coupon.min - subtotal).toFixed(1)} 可用</div>}
                                       </div>
                                       <div className="ml-2">
                                           {selectedCouponId === coupon.id ? 
                                              <CheckCircle2 className={isAvailable ? "text-brand-500" : "text-gray-400"} size={20} /> 
                                              : 
                                              <Circle className="text-gray-300" size={20} />
                                           }
                                       </div>
                                   </div>
                               </button>
                           );
                       })}
                   </div>
               </div>
           </div>
       )}

       {/* Address Selector Modal */}
       {showAddressSelector && (
           <div className="fixed inset-0 z-50 flex flex-col justify-end">
               <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddressSelector(false)} />
               <div className="bg-gray-50 rounded-t-2xl relative z-10 max-h-[70vh] flex flex-col">
                   <div className="p-4 bg-white rounded-t-2xl flex justify-between items-center border-b border-gray-100">
                       <h3 className="font-bold text-gray-900">选择收货地址</h3>
                       <button onClick={() => setShowAddressSelector(false)}>
                           <X size={24} className="text-gray-500" />
                       </button>
                   </div>
                   
                   <div className="overflow-y-auto p-4 space-y-3 flex-1">
                       {MOCK_ADDRESSES.map(addr => {
                           const isSelected = selectedAddressId === addr.id;
                           return (
                               <button 
                                   key={addr.id}
                                   onClick={() => { setSelectedAddressId(addr.id); setShowAddressSelector(false); }}
                                   className={`w-full bg-white p-4 rounded-xl shadow-sm border text-left flex justify-between items-center transition-all ${isSelected ? 'border-brand-500 ring-1 ring-brand-500 bg-brand-50/10' : 'border-gray-100'}`}
                               >
                                   <div className="flex-1 mr-4">
                                       <div className="flex items-center mb-1">
                                            <span className={`text-xs px-1.5 py-0.5 rounded font-medium mr-2 flex items-center ${getTagColor(addr.tag)}`}>
                                                {getTagIcon(addr.tag)}
                                                {addr.tag}
                                            </span>
                                            <span className="font-bold text-gray-900 text-sm truncate">{addr.address} {addr.detail}</span>
                                       </div>
                                       <div className="text-sm text-gray-500 pl-[3.5rem]">{addr.name} {addr.gender} {addr.phone}</div>
                                   </div>
                                   {isSelected && <CheckCircle2 className="text-brand-500 shrink-0" size={20} />}
                               </button>
                           );
                       })}
                       <button className="w-full py-3 text-center text-brand-600 font-bold text-sm bg-white border border-dashed border-brand-200 rounded-xl mt-2">
                           + 新增收货地址
                       </button>
                   </div>
               </div>
           </div>
       )}

       {/* Time Selector Modal */}
       {showTimeSelector && (
           <div className="fixed inset-0 z-50 flex flex-col justify-end">
               <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowTimeSelector(false)} />
               <div className="bg-white rounded-t-2xl relative z-10 max-h-[50vh] flex flex-col">
                   <div className="p-4 flex justify-between items-center border-b border-gray-100">
                       <h3 className="font-bold text-gray-900">选择送达时间</h3>
                       <button onClick={() => setShowTimeSelector(false)}>
                           <X size={24} className="text-gray-500" />
                       </button>
                   </div>
                   <div className="overflow-y-auto flex-1">
                       <div className="flex h-64">
                           {/* Date Column (Left) */}
                           <div className="w-24 bg-gray-50 overflow-y-auto text-center">
                               <div className="py-4 text-sm font-bold bg-white text-brand-600 border-l-4 border-brand-600">
                                   今天
                               </div>
                               <div className="py-4 text-sm text-gray-500">
                                   明天
                               </div>
                           </div>
                           {/* Time Column (Right) */}
                           <div className="flex-1 overflow-y-auto">
                               {MOCK_TIMES.map(time => (
                                   <button 
                                       key={time}
                                       onClick={() => { setSelectedTime(time); setShowTimeSelector(false); }}
                                       className="w-full text-left px-6 py-4 text-sm text-gray-800 border-b border-gray-50 flex justify-between items-center active:bg-gray-50"
                                   >
                                       {time}
                                       {selectedTime === time && <CheckCircle2 size={16} className="text-brand-600" />}
                                   </button>
                               ))}
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       )}
    </div>
  );
};

export default Checkout;