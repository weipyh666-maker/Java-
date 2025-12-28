import React from 'react';
import { ChevronLeft, Star, Clock, Trash2 } from 'lucide-react';
import { MOCK_VENDORS } from '../constants';

interface FavoritesProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ onBack, onNavigate }) => {
  // Simulate favorites by picking specific vendors
  const favoriteVendors = MOCK_VENDORS.filter(v => ['1', '2', '8', '9'].includes(v.id));

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white p-4 flex items-center shadow-sm sticky top-0 z-10 justify-between">
        <div className="flex items-center">
            <button onClick={onBack} className="mr-3 text-gray-700">
            <ChevronLeft size={24} />
            </button>
            <h1 className="text-lg font-bold text-gray-900">我的收藏</h1>
        </div>
        <button className="text-xs text-gray-500">编辑</button>
      </div>

      <div className="p-4 space-y-3">
          {favoriteVendors.map(vendor => (
              <div 
                key={vendor.id} 
                onClick={() => onNavigate(`vendor:${vendor.id}`)}
                className="bg-white p-3 rounded-xl shadow-sm flex items-start active:scale-[0.99] transition-transform"
              >
                  <img src={vendor.image} alt={vendor.name} className="w-20 h-20 rounded-lg object-cover bg-gray-100 mr-3" />
                  <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-gray-900 truncate pr-2">{vendor.name}</h3>
                          <span className="text-xs bg-orange-50 text-brand-600 px-1.5 py-0.5 rounded flex items-center shrink-0">
                              <Star size={10} className="mr-0.5" fill="currentColor" /> {vendor.rating}
                          </span>
                      </div>
                      <div className="text-xs text-gray-500 mb-2 flex items-center">
                          <Clock size={12} className="mr-1" />
                          {vendor.timeEstimate} • {vendor.distance}
                      </div>
                      <div className="flex gap-1 overflow-hidden">
                          {vendor.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded whitespace-nowrap">
                                  {tag}
                              </span>
                          ))}
                      </div>
                  </div>
              </div>
          ))}
          {favoriteVendors.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                  暂无收藏商家
              </div>
          )}
      </div>
    </div>
  );
};

export default Favorites;