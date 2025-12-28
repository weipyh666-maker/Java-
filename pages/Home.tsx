import React, { useState, useRef } from 'react';
import { Search, MapPin, ChevronDown, Clock, Star, Bike, ShoppingBag } from 'lucide-react';
import { DeliveryMode, Vendor } from '../types';
import { MOCK_VENDORS } from '../constants';

interface HomeProps {
  onNavigate: (page: string) => void;
}

// Mapping of UI categories to Vendor tags
const CATEGORY_MAPPING: Record<string, string[]> = {
  '甜点饮品': ['甜点', '蛋糕', '面包', '奶茶', '冰淇淋', '饮品'],
  '超市便利': ['超市', '便利店', '零食', '日用品'],
  '蔬菜水果': ['水果', '生鲜', '蔬菜', '沙拉', '果切'],
  '看病买药': ['药店', '药品', '医疗', '口罩', '感冒药'],
  '跑腿': ['跑腿', '帮买', '帮送']
};

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('delivery');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [vendors] = useState<Vendor[]>(MOCK_VENDORS);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter vendors based on mode, search term, and selected category
  const filteredVendors = vendors.filter(v => {
    const matchesMode = deliveryMode === 'delivery' ? true : v.isPickupAvailable;
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    let matchesCategory = true;
    if (selectedCategory) {
      const targetTags = CATEGORY_MAPPING[selectedCategory] || [];
      matchesCategory = v.tags.some(tag => targetTags.includes(tag));
    }

    return matchesMode && matchesSearch && matchesCategory;
  });

  const handleScroll = () => {
    if (scrollContainerRef.current) {
        setIsScrolled(scrollContainerRef.current.scrollTop > 10);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null); // Toggle off if already selected
    } else {
      setSelectedCategory(categoryName);
    }
  };

  const ModeToggle = () => (
    <div className="bg-gray-100 p-1 rounded-xl flex relative mb-4">
      {/* Animated Background Pill */}
      <div 
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-out ${
          deliveryMode === 'pickup' ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0'
        }`}
      />
      
      <button 
        onClick={() => setDeliveryMode('delivery')}
        className={`flex-1 flex items-center justify-center py-2 relative z-10 text-sm font-bold transition-colors ${
          deliveryMode === 'delivery' ? 'text-brand-600' : 'text-gray-500'
        }`}
      >
        <Bike size={18} className="mr-2" />
        外卖配送
      </button>
      <button 
        onClick={() => setDeliveryMode('pickup')}
        className={`flex-1 flex items-center justify-center py-2 relative z-10 text-sm font-bold transition-colors ${
          deliveryMode === 'pickup' ? 'text-brand-600' : 'text-gray-500'
        }`}
      >
        <ShoppingBag size={18} className="mr-2" />
        到店自取
      </button>
    </div>
  );

  const VendorCard: React.FC<{ vendor: Vendor }> = ({ vendor }) => (
    <div 
      onClick={() => onNavigate(`vendor:${vendor.id}`)}
      className="bg-white rounded-xl overflow-hidden shadow-sm mb-4 active:scale-[0.98] transition-transform duration-150 cursor-pointer"
    >
      <div className="relative h-40">
        <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
        {vendor.promotion && (
          <div className="absolute top-3 left-3 bg-brand-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
            {vendor.promotion}
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-white px-2 py-1 rounded-lg shadow text-xs font-bold flex items-center">
          <Clock size={12} className="mr-1" />
          {vendor.timeEstimate}
        </div>
      </div>
      
      <div className="p-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-800">{vendor.name}</h3>
          <div className="flex items-center bg-orange-50 px-1.5 py-0.5 rounded text-brand-600">
            <Star size={12} fill="currentColor" className="mr-0.5" />
            <span className="text-xs font-bold">{vendor.rating}</span>
          </div>
        </div>

        <div className="flex items-center text-gray-500 text-xs mt-1 space-x-2">
           <span className="flex items-center">
              <Star size={12} className="mr-1 text-yellow-400" /> 
              {vendor.ratingCount}+ 评价
           </span>
           <span>•</span>
           <span>{vendor.distance}</span>
           {deliveryMode === 'delivery' && (
             <>
                <span>•</span>
                <span>配送 ¥{vendor.deliveryFee}</span>
             </>
           )}
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {vendor.tags.map(tag => (
            <span key={tag} className="text-[10px] text-gray-500 border border-gray-200 px-1.5 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Pickup Specific Info */}
        {deliveryMode === 'pickup' && (
             <div className="mt-3 pt-2 border-t border-dashed border-gray-200">
                <p className="text-xs text-brand-600 font-medium flex items-center">
                    <MapPin size={12} className="mr-1" />
                    {vendor.address}
                </p>
             </div>
           )}
      </div>
    </div>
  );

  const Categories = () => {
    const categories = [
      { name: '甜点饮品', icon: '🧋', color: 'bg-pink-100 text-pink-500' },
      { name: '超市便利', icon: '🏪', color: 'bg-blue-100 text-blue-500' },
      { name: '蔬菜水果', icon: '🍎', color: 'bg-green-100 text-green-500' },
      { name: '看病买药', icon: '💊', color: 'bg-red-100 text-red-500' },
      { name: '跑腿', icon: '🏃', color: 'bg-yellow-100 text-yellow-600' },
    ];

    return (
      <div className="grid grid-cols-5 gap-2 mb-6 px-1">
         {categories.map((cat, i) => {
             const isSelected = selectedCategory === cat.name;
             return (
               <button 
                 key={i} 
                 onClick={() => handleCategoryClick(cat.name)}
                 className="flex flex-col items-center space-y-2 group"
               >
                   <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-sm transition-all duration-200 ${cat.color} ${isSelected ? 'ring-2 ring-offset-2 ring-brand-400 scale-105' : 'bg-opacity-50'}`}>
                       {cat.icon}
                   </div>
                   <span className={`text-[11px] font-medium whitespace-nowrap transition-colors ${isSelected ? 'text-brand-600 font-bold' : 'text-gray-700'}`}>
                     {cat.name}
                   </span>
               </button>
             );
         })}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 h-screen flex flex-col relative overflow-hidden">
      {/* Fixed Header */}
      <div className={`bg-white z-40 transition-shadow duration-200 px-4 pt-4 pb-2 shrink-0 ${isScrolled ? 'shadow-md' : ''}`}>
        
        {/* Location & Search */}
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => onNavigate('city_selection')}
            className="flex items-center max-w-[70%] active:opacity-70 transition-opacity"
          >
            <MapPin className="text-brand-500 mr-1 shrink-0" size={20} />
            <div className="flex flex-col text-left">
                <span className="text-[10px] text-gray-400 font-medium leading-tight">当前定位</span>
                <div className="flex items-center">
                    <span className="font-bold text-gray-800 truncate">汉堡王(中山路)</span>
                    <ChevronDown size={16} className="text-gray-400 ml-1" />
                </div>
            </div>
          </button>
          <div 
             className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer"
             onClick={() => onNavigate('search')}
          >
             <Search size={18} className="text-gray-600" />
          </div>
        </div>

        {/* Search Input (Button trigger) */}
        <div 
          className="relative mb-4 cursor-pointer"
          onClick={() => onNavigate('search')}
        >
             <Search className="absolute left-3 top-3 text-gray-400" size={18} />
             <div className="w-full bg-gray-100 text-sm text-gray-400 rounded-xl py-2.5 pl-10 pr-4">
               {deliveryMode === 'delivery' ? "搜索美食、饮品..." : "搜索附近自取..."}
             </div>
        </div>

        {/* Toggle */}
        <ModeToggle />
      </div>

      {/* Scrollable Content */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 mt-2 pb-24 no-scrollbar"
      >
        {deliveryMode === 'delivery' && (
            <>
                <Categories />
                
                {/* Featured Banner - Hide when filtering */}
                {!selectedCategory && (
                    <div className="bg-gradient-to-r from-brand-500 to-brand-400 rounded-xl p-4 text-white mb-6 flex justify-between items-center shadow-lg shadow-brand-200">
                        <div>
                            <h2 className="font-bold text-xl mb-1">午市特惠</h2>
                            <p className="text-brand-100 text-sm mb-2">精选套餐 5折起</p>
                            <button className="bg-white text-brand-600 px-3 py-1 rounded-full text-xs font-bold">立即抢购</button>
                        </div>
                        <div className="text-4xl">🥘</div>
                    </div>
                )}
            </>
        )}

        {deliveryMode === 'pickup' && (
             <div className="bg-white border border-brand-100 rounded-xl p-4 mb-6 flex items-start space-x-3">
                 <div className="bg-brand-50 p-2 rounded-lg">
                    <MapPin className="text-brand-500" size={20} />
                 </div>
                 <div className="flex-1">
                     <h3 className="text-sm font-bold text-gray-800">地图模式</h3>
                     <p className="text-xs text-gray-500 mt-1">查看附近的自取商家</p>
                 </div>
                 <button 
                    onClick={() => onNavigate('map_mode')}
                    className="text-brand-600 text-xs font-bold border border-brand-200 px-3 py-1.5 rounded-full hover:bg-brand-50"
                 >
                     打开地图
                 </button>
             </div>
        )}

        {/* List Header */}
        <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg text-gray-800 flex items-center">
                {selectedCategory ? (
                  <>
                    <span className="mr-2">{selectedCategory}</span>
                    <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full cursor-pointer" onClick={() => setSelectedCategory(null)}>清除筛选 x</span>
                  </>
                ) : (
                  deliveryMode === 'delivery' ? '附近推荐' : '附近自取'
                )}
            </h2>
            <div className="flex space-x-2">
                <button className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">排序</button>
                <button className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">筛选</button>
            </div>
        </div>

        {/* Vendors List */}
        <div className="space-y-4">
            {filteredVendors.map(vendor => (
                <VendorCard key={vendor.id} vendor={vendor} />
            ))}
            {filteredVendors.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                    <p>暂无符合条件的商家</p>
                    {selectedCategory && (
                         <button 
                            onClick={() => setSelectedCategory(null)}
                            className="mt-2 text-brand-600 text-sm font-medium hover:underline"
                         >
                            查看全部商家
                         </button>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Home;