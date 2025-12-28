import React, { useState } from 'react';
import { ChevronLeft, Navigation, Search, MapPin, List, Star, Clock } from 'lucide-react';
import { MOCK_VENDORS } from '../constants';

interface MapModeProps {
  onBack: () => void;
  onNavigateToVendor: (vendorId: string) => void;
}

const MapMode: React.FC<MapModeProps> = ({ onBack, onNavigateToVendor }) => {
  // Filter only vendors that support pickup
  const pickupVendors = MOCK_VENDORS.filter(v => v.isPickupAvailable);
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);

  // Generate deterministic "random" positions for demo purposes based on ID
  const getPosition = (id: string) => {
    const num = parseInt(id) || 0;
    // Simple hash to spread dots around a 100% x 100% container
    const top = 20 + (num * 17) % 60; 
    const left = 10 + (num * 23) % 80;
    return { top: `${top}%`, left: `${left}%` };
  };

  const selectedVendor = pickupVendors.find(v => v.id === selectedVendorId);

  return (
    <div className="bg-gray-100 h-screen flex flex-col relative overflow-hidden">
      {/* Map Background (Simulated) */}
      <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-80"
            alt="Map"
          />
          {/* User Location Pulse */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
              <div className="w-4 h-4 bg-brand-500 rounded-full border-2 border-white shadow-lg relative z-10"></div>
              <div className="w-12 h-12 bg-brand-500/30 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
          </div>
      </div>

      {/* Header UI Overlay */}
      <div className="relative z-10 p-4 pt-4 flex space-x-3">
          <button onClick={onBack} className="bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center text-gray-800">
              <ChevronLeft size={24} />
          </button>
          <div className="flex-1 bg-white shadow-md rounded-full flex items-center px-4">
              <Search size={16} className="text-gray-400 mr-2"/>
              <input 
                 className="flex-1 py-2.5 text-sm outline-none" 
                 placeholder="搜索地点或商家" 
              />
          </div>
          <button 
            onClick={onBack} // Reuse onBack to essentially go back to list view (Home)
            className="bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center text-gray-800"
          >
              <List size={20} />
          </button>
      </div>

      {/* Map Pins */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          {pickupVendors.map(vendor => {
              const pos = getPosition(vendor.id);
              const isSelected = selectedVendorId === vendor.id;
              
              return (
                  <button
                    key={vendor.id}
                    onClick={(e) => { e.stopPropagation(); setSelectedVendorId(vendor.id); }}
                    className={`absolute pointer-events-auto transform -translate-x-1/2 -translate-y-full transition-all duration-300 ${isSelected ? 'z-20 scale-110' : 'z-10 scale-100 hover:scale-110'}`}
                    style={{ top: pos.top, left: pos.left }}
                  >
                      <div className={`flex flex-col items-center`}>
                          {/* Bubble Label */}
                          <div className={`px-2 py-1 rounded-lg text-[10px] font-bold shadow-md mb-1 whitespace-nowrap ${isSelected ? 'bg-brand-600 text-white' : 'bg-white text-gray-800'}`}>
                              {vendor.name}
                          </div>
                          {/* Pin Icon */}
                          <MapPin 
                            size={isSelected ? 36 : 28} 
                            className={`${isSelected ? 'text-brand-600' : 'text-brand-500'} drop-shadow-md`} 
                            fill="currentColor"
                          />
                      </div>
                  </button>
              );
          })}
      </div>

      {/* Bottom Card - Selected Vendor */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 z-20 safe-area-bottom">
          {selectedVendor ? (
             <div 
                className="bg-white rounded-xl p-4 shadow-xl border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform"
                onClick={() => onNavigateToVendor(selectedVendor.id)}
             >
                 <div className="flex items-start">
                     <img src={selectedVendor.image} className="w-20 h-20 rounded-lg object-cover bg-gray-100 mr-3" />
                     <div className="flex-1">
                         <div className="flex justify-between items-start mb-1">
                             <h3 className="font-bold text-lg text-gray-900">{selectedVendor.name}</h3>
                             <span className="text-xs bg-orange-100 text-brand-600 px-1.5 py-0.5 rounded font-bold">{selectedVendor.rating}分</span>
                         </div>
                         <div className="text-xs text-gray-500 mb-2 flex items-center">
                             <Clock size={12} className="mr-1"/>
                             {selectedVendor.timeEstimate} • {selectedVendor.distance}
                         </div>
                         <div className="text-xs text-gray-400 line-clamp-1 mb-2">
                             {selectedVendor.address}
                         </div>
                         <div className="flex gap-1">
                             {selectedVendor.tags.slice(0,3).map(t => (
                                 <span key={t} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{t}</span>
                             ))}
                         </div>
                     </div>
                 </div>
                 <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                     <span className="text-xs text-brand-600 font-bold bg-brand-50 px-2 py-1 rounded">
                         支持到店自取
                     </span>
                     <button className="bg-brand-500 text-white text-xs font-bold px-4 py-2 rounded-full">
                         去点餐
                     </button>
                 </div>
             </div>
          ) : (
            // Default "Explore" hint if nothing selected
            <div className="flex justify-center">
                <button 
                    onClick={() => {
                        // Reset map (simple re-center simulation)
                        const randomVendor = pickupVendors[0];
                        if(randomVendor) setSelectedVendorId(randomVendor.id);
                    }}
                    className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg font-bold text-sm flex items-center"
                >
                    <Navigation size={16} className="mr-2 text-brand-500" />
                    回到我的位置
                </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default MapMode;