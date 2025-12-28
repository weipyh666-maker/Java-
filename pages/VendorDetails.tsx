import React, { useState } from 'react';
import { ChevronLeft, Star, Clock, MapPin, Search, Share2, Plus, Minus, ShoppingBag, Phone, Store, ShieldCheck, ThumbsUp, X, Heart } from 'lucide-react';
import { MOCK_VENDORS } from '../constants';
import { MenuItem } from '../types';

interface VendorDetailsProps {
  vendorId: string;
  onBack: () => void;
  onCheckout: (items: Record<string, number>) => void;
}

const VendorDetails: React.FC<VendorDetailsProps> = ({ vendorId, onBack, onCheckout }) => {
  const vendor = MOCK_VENDORS.find(v => v.id === vendorId);
  // Ensure we have a default category if menu exists
  const initialCategory = vendor?.menu?.[0]?.category || '';
  const [activeTab, setActiveTab] = useState<'menu' | 'reviews' | 'info'>('menu');
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [cart, setCart] = useState<Record<string, number>>({});
  
  // Search State
  const [showSearch, setShowSearch] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  // Favorites & Share State
  const [isFavorite, setIsFavorite] = useState(false);

  if (!vendor) return <div className="p-10 text-center">商家不存在</div>;

  // Group items by category
  const categories = Array.from(new Set(vendor.menu?.map(item => item.category) || []));
  const itemsByCategory: Record<string, MenuItem[]> = {};
  vendor.menu?.forEach(item => {
    if (!itemsByCategory[item.category]) {
      itemsByCategory[item.category] = [];
    }
    itemsByCategory[item.category].push(item);
  });

  const addToCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const current = prev[itemId] || 0;
      if (current <= 1) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: current - 1 };
    });
  };

  const handleToggleFavorite = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    if (newState) {
        alert("已添加到收藏夹");
    } else {
        // alert("已取消收藏");
    }
  };

  const handleShare = async () => {
      const shareData = {
          title: `CraveDelivery - ${vendor.name}`,
          text: `快来看看这家店：${vendor.name}，评分 ${vendor.rating}！`,
          url: window.location.href
      };

      if (navigator.share) {
          try {
              await navigator.share(shareData);
          } catch (err) {
              console.log('Share canceled');
          }
      } else {
          // Fallback to clipboard
          navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
          alert('链接已复制，快去分享给好友吧！');
      }
  };

  const totalCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const rawTotalPrice = Object.entries(cart).reduce((total, [itemId, count]) => {
    const item = vendor.menu?.find(i => i.id === itemId);
    return total + (item?.price || 0) * count;
  }, 0);

  // Calculate Vendor Promotion Discount for Cart Display
  let discountAmount = 0;
  if (vendor.promotion) {
      const match = vendor.promotion.match(/满(\d+)减(\d+)/);
      if (match) {
          const threshold = parseInt(match[1]);
          const discount = parseInt(match[2]);
          if (rawTotalPrice >= threshold) {
              discountAmount = discount;
          }
      }
  }
  const finalPrice = Math.max(0, rawTotalPrice - discountAmount);


  // Helper to render individual item card
  const renderItemCard = (item: MenuItem) => (
      <div key={item.id} className="flex mb-4 bg-white p-3 rounded-xl shadow-sm border border-gray-50">
          <img src={item.image} className="w-24 h-24 rounded-lg object-cover bg-gray-100 mr-3" alt={item.name} />
          <div className="flex-1 flex flex-col justify-between py-0.5">
              <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{item.name}</h4>
                  <p className="text-[10px] text-gray-400 line-clamp-1 mb-1">{item.description}</p>
                  <span className="text-[10px] text-gray-400 bg-gray-50 px-1 rounded">月售 {item.sales}</span>
              </div>
              <div className="flex justify-between items-end mt-2">
                  <span className="text-red-500 font-bold text-lg"><span className="text-xs">¥</span>{item.price}</span>
                  
                  <div className="flex items-center">
                      {cart[item.id] > 0 && (
                          <>
                            <button 
                                onClick={() => removeFromCart(item.id)}
                                className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500"
                            >
                                <Minus size={14} />
                            </button>
                            <span className="mx-2 text-sm font-medium w-4 text-center">{cart[item.id]}</span>
                          </>
                      )}
                      <button 
                        onClick={() => addToCart(item.id)}
                        className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-sm shadow-brand-200"
                      >
                          <Plus size={14} />
                      </button>
                  </div>
              </div>
          </div>
      </div>
  );

  // Search View Overlay
  if (showSearch) {
      const searchResults = vendor.menu?.filter(item => item.name.toLowerCase().includes(searchKeyword.toLowerCase())) || [];
      
      return (
        <div className="bg-white min-h-screen flex flex-col z-50">
            <div className="p-4 border-b border-gray-100 flex items-center sticky top-0 bg-white shadow-sm">
                 <button onClick={() => { setShowSearch(false); setSearchKeyword(''); }} className="mr-3 text-gray-700">
                    <ChevronLeft size={24} />
                 </button>
                 <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 py-2">
                    <Search size={16} className="text-gray-400 mr-2"/>
                    <input 
                        className="bg-transparent border-none outline-none text-sm w-full"
                        placeholder="搜索店内商品"
                        value={searchKeyword}
                        onChange={e => setSearchKeyword(e.target.value)}
                        autoFocus
                    />
                    {searchKeyword && (
                        <button onClick={() => setSearchKeyword('')}><X size={14} className="text-gray-400" /></button>
                    )}
                 </div>
                 <button 
                    className="ml-3 text-sm font-bold text-brand-600"
                    onClick={() => {}}
                 >
                    搜索
                 </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                 {searchKeyword ? (
                     searchResults.length > 0 ? (
                         searchResults.map(renderItemCard)
                     ) : (
                         <div className="text-center text-gray-400 mt-10">未找到相关商品</div>
                     )
                 ) : (
                     <div className="mt-4">
                         <div className="text-sm font-bold text-gray-800 mb-3">大家都在搜</div>
                         <div className="flex flex-wrap gap-2">
                             {vendor.menu?.slice(0, 5).map(item => (
                                 <button 
                                    key={item.id} 
                                    onClick={() => setSearchKeyword(item.name)}
                                    className="bg-gray-50 text-gray-600 text-xs px-3 py-1.5 rounded-full"
                                 >
                                     {item.name}
                                 </button>
                             ))}
                         </div>
                     </div>
                 )}
            </div>
            {totalCount > 0 && (
              <div className="p-4 border-t border-gray-100 safe-area-bottom">
                  <div className="bg-black/90 text-white rounded-full p-2 pl-4 flex justify-between items-center shadow-lg backdrop-blur-sm">
                      <div className="flex items-center">
                          <div className="relative mr-4">
                            <ShoppingBag size={28} className="text-white" />
                            <div className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {totalCount}
                            </div>
                          </div>
                          <div>
                              <div className="text-lg font-bold flex items-end">
                                ¥{finalPrice.toFixed(1)}
                                {discountAmount > 0 && (
                                    <span className="text-xs text-gray-400 line-through ml-2 mb-1">¥{rawTotalPrice.toFixed(1)}</span>
                                )}
                              </div>
                              <div className="text-[10px] text-gray-400">预估配送费 ¥{vendor.deliveryFee}</div>
                          </div>
                      </div>
                      <button 
                        onClick={() => onCheckout(cart)}
                        className="bg-brand-500 text-white font-bold text-sm px-6 py-2.5 rounded-full"
                      >
                          去结算
                      </button>
                  </div>
              </div>
            )}
        </div>
      );
  }

  const renderReviews = () => (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 no-scrollbar">
        <div className="bg-white rounded-xl p-4 mb-4 flex items-center justify-between">
            <div className="flex items-center">
                <span className="text-3xl font-bold text-orange-500 mr-2">{vendor.rating}</span>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">商家评分</span>
                    <div className="flex">
                        {[1,2,3,4,5].map(i => (
                            <Star key={i} size={10} className={`${i <= Math.round(vendor.rating) ? 'text-orange-400 fill-orange-400' : 'text-gray-200'}`} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="h-8 w-[1px] bg-gray-100 mx-4"></div>
            <div className="text-center">
                 <div className="text-lg font-bold text-gray-800">{vendor.ratingCount}+</div>
                 <div className="text-xs text-gray-500">全部评价</div>
            </div>
        </div>

        <div className="bg-white rounded-xl p-4">
             {vendor.reviews?.map(review => (
                 <div key={review.id} className="border-b border-gray-50 py-4 last:border-0">
                     <div className="flex justify-between items-start mb-2">
                         <div className="flex items-center">
                             <img src={review.userAvatar} className="w-8 h-8 rounded-full mr-2" alt="avatar" />
                             <div>
                                 <div className="text-sm font-medium text-gray-800">{review.userName}</div>
                                 <div className="text-[10px] text-gray-400">{review.date}</div>
                             </div>
                         </div>
                         <div className="flex">
                             {[1,2,3,4,5].map(i => (
                                <Star key={i} size={10} className={`${i <= review.rating ? 'text-orange-400 fill-orange-400' : 'text-gray-200'}`} />
                             ))}
                         </div>
                     </div>
                     <p className="text-sm text-gray-600 mb-2">{review.content}</p>
                     {review.reply && (
                         <div className="bg-gray-50 p-2 rounded text-xs text-gray-500">
                             {review.reply}
                         </div>
                     )}
                 </div>
             ))}
             {!vendor.reviews?.length && <div className="text-center text-gray-400 py-10">暂无评价</div>}
        </div>
    </div>
  );

  const renderInfo = () => (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 no-scrollbar">
        <div className="bg-white rounded-xl p-4 mb-4">
            <div className="flex items-center text-sm text-gray-800 mb-4 pb-4 border-b border-gray-50">
                <MapPin size={18} className="text-gray-400 mr-3 shrink-0" />
                <span className="flex-1">{vendor.info?.address || vendor.address}</span>
                <div className="w-[1px] h-4 bg-gray-200 mx-3"></div>
                <Phone size={18} className="text-brand-500 shrink-0" />
            </div>
            <div className="flex items-center text-sm text-gray-800 mb-4">
                <Clock size={18} className="text-gray-400 mr-3 shrink-0" />
                <span>营业时间：{vendor.info?.openingHours || "10:00-22:00"}</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {vendor.info?.services.map(s => (
                    <span key={s} className="text-xs text-gray-500 border border-gray-200 px-2 py-0.5 rounded">
                        {s}
                    </span>
                ))}
            </div>
        </div>

        <div className="bg-white rounded-xl p-4 mb-4">
             <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                 <Store size={18} className="mr-2 text-gray-600" />
                 商家公告
             </h3>
             <p className="text-sm text-gray-600 leading-relaxed">
                 {vendor.info?.announcement || "欢迎光临！请尽情挑选。"}
             </p>
        </div>

        <div className="bg-white rounded-xl p-4 flex justify-between items-center">
             <div className="flex items-center text-sm font-medium text-gray-800">
                 <ShieldCheck size={18} className="mr-2 text-green-500" />
                 食品安全档案
             </div>
             <div className="flex items-center text-xs text-gray-400">
                 查看
                 <ChevronLeft size={14} className="rotate-180 ml-1" />
             </div>
        </div>
    </div>
  );

  const renderMenu = () => (
      <div className="flex flex-col flex-1 overflow-hidden bg-gray-50">
          {/* Horizontal Categories Bar */}
          <div className="bg-white border-b border-gray-100 overflow-x-auto no-scrollbar">
              <div className="flex px-4 py-2 space-x-6">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`whitespace-nowrap pb-2 text-sm font-medium transition-colors relative flex-shrink-0 ${
                            activeCategory === cat ? 'text-brand-600 font-bold' : 'text-gray-500'
                        }`}
                    >
                        {cat}
                        {activeCategory === cat && (
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-600 rounded-full" />
                        )}
                    </button>
                ))}
              </div>
          </div>

          {/* Items List (Filtered) */}
          <div className="flex-1 overflow-y-auto p-4 pb-24">
              {/* Show items for active category only */}
              <div className="mb-6">
                  <h3 className="font-bold text-sm text-gray-800 mb-3 pl-1">{activeCategory}</h3>
                  {itemsByCategory[activeCategory]?.map(renderItemCard)}
                  {(!itemsByCategory[activeCategory] || itemsByCategory[activeCategory].length === 0) && (
                      <div className="text-center py-10 text-gray-400">该分类下暂无商品</div>
                  )}
              </div>
          </div>
      </div>
  );

  return (
    <div className="bg-white h-screen flex flex-col relative overflow-hidden">
      {/* Header Image & Info */}
      <div className="relative h-48 bg-gray-200 shrink-0">
         <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
         <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start bg-gradient-to-b from-black/50 to-transparent">
             <button onClick={onBack} className="text-white bg-black/20 p-1.5 rounded-full backdrop-blur-md">
                 <ChevronLeft size={24} />
             </button>
             <div className="flex space-x-2">
                <button 
                    onClick={() => setShowSearch(true)}
                    className="text-white bg-black/20 p-1.5 rounded-full backdrop-blur-md"
                >
                    <Search size={20} />
                </button>
                <button 
                    onClick={handleToggleFavorite}
                    className="text-white bg-black/20 p-1.5 rounded-full backdrop-blur-md"
                >
                    <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : "text-white"} />
                </button>
                <button 
                    onClick={handleShare}
                    className="text-white bg-black/20 p-1.5 rounded-full backdrop-blur-md"
                >
                    <Share2 size={20} />
                </button>
             </div>
         </div>
      </div>

      <div className="bg-white rounded-t-3xl -mt-6 relative z-10 px-4 pt-5 pb-2 border-b border-gray-100 shadow-sm shrink-0">
          <h1 className="text-xl font-bold text-gray-900 mb-1">{vendor.name}</h1>
          <div className="flex items-center text-xs text-gray-500 space-x-3 mb-3">
              <span className="flex items-center text-orange-500 font-bold"><Star size={12} className="mr-0.5" fill="currentColor" /> {vendor.rating}</span>
              <span>月售 {vendor.ratingCount}+</span>
              <span>{vendor.timeEstimate}</span>
              <span>{vendor.distance}</span>
          </div>
          {vendor.promotion && (
              <div className="flex items-center space-x-2 mb-2">
                  <span className="px-1.5 py-0.5 bg-red-50 text-red-500 text-[10px] rounded border border-red-100">满减</span>
                  <span className="text-xs text-gray-600">{vendor.promotion}</span>
              </div>
          )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 shrink-0">
          <button 
            onClick={() => setActiveTab('menu')}
            className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'menu' ? 'text-gray-900 border-b-2 border-brand-500' : 'text-gray-500'}`}
          >
            {vendor.tags.includes("跑腿") ? "服务" : "点餐"}
          </button>
          <button 
             onClick={() => setActiveTab('reviews')}
             className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'reviews' ? 'text-gray-900 border-b-2 border-brand-500' : 'text-gray-500'}`}
          >
              评价
          </button>
          <button 
            onClick={() => setActiveTab('info')}
            className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'info' ? 'text-gray-900 border-b-2 border-brand-500' : 'text-gray-500'}`}
          >
              商家
          </button>
      </div>

      {/* Content Area */}
      {activeTab === 'menu' && renderMenu()}
      {activeTab === 'reviews' && renderReviews()}
      {activeTab === 'info' && renderInfo()}

      {/* Cart Bottom Bar (Only visible in Menu tab with items) */}
      {activeTab === 'menu' && totalCount > 0 && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
              <div className="bg-black/90 text-white rounded-full p-2 pl-4 flex justify-between items-center shadow-lg backdrop-blur-sm">
                  <div className="flex items-center">
                      <div className="relative mr-4">
                        <ShoppingBag size={28} className="text-white" />
                        <div className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                            {totalCount}
                        </div>
                      </div>
                      <div>
                          <div className="text-lg font-bold flex items-end">
                              ¥{finalPrice.toFixed(1)}
                              {discountAmount > 0 && (
                                  <span className="text-xs text-gray-400 line-through ml-2 mb-1">¥{rawTotalPrice.toFixed(1)}</span>
                              )}
                          </div>
                          <div className="text-[10px] text-gray-400">预估配送费 ¥{vendor.deliveryFee}</div>
                      </div>
                  </div>
                  <button 
                    onClick={() => onCheckout(cart)}
                    className="bg-brand-500 text-white font-bold text-sm px-6 py-2.5 rounded-full"
                  >
                      去结算
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};

export default VendorDetails;