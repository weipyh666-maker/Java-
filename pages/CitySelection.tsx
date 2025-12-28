import React, { useState } from 'react';
import { ChevronLeft, MapPin, Search, Navigation } from 'lucide-react';

interface CitySelectionProps {
  onBack: () => void;
  onSelectCity: (city: string) => void;
}

const CitySelection: React.FC<CitySelectionProps> = ({ onBack, onSelectCity }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const hotCities = ['上海', '北京', '广州', '深圳', '杭州', '成都', '武汉', '南京', '天津', '重庆'];
  const allCities = [
      { letter: 'A', cities: ['鞍山', '安庆'] },
      { letter: 'B', cities: ['北京', '保定', '包头'] },
      { letter: 'C', cities: ['成都', '重庆', '长沙', '长春'] },
      { letter: 'D', cities: ['大连', '东莞'] },
      { letter: 'F', cities: ['福州', '佛山'] },
      { letter: 'G', cities: ['广州', '贵阳'] },
      { letter: 'H', cities: ['杭州', '哈尔滨', '合肥'] },
      { letter: 'J', cities: ['济南', '金华'] },
      { letter: 'N', cities: ['南京', '宁波', '南昌'] },
      { letter: 'S', cities: ['上海', '深圳', '沈阳', '苏州', '石家庄'] },
      { letter: 'W', cities: ['武汉', '无锡'] },
      { letter: 'X', cities: ['西安', '厦门'] },
      { letter: 'Z', cities: ['郑州', '珠海'] },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center mb-3">
            <button onClick={onBack} className="mr-3">
                <ChevronLeft size={24} className="text-gray-800" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">选择城市</h1>
        </div>
        <div className="relative">
             <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
             <input 
               type="text" 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               placeholder="输入城市名称进行搜索"
               className="w-full bg-gray-100 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-100"
             />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
          {/* Current Location */}
          <div className="p-4 bg-white mb-3">
             <div className="text-xs text-gray-500 mb-3">当前定位城市</div>
             <div className="flex items-center justify-between">
                 <div className="flex items-center font-bold text-gray-900">
                     <MapPin size={16} className="text-brand-500 mr-1" />
                     武汉市
                 </div>
                 <button className="flex items-center text-xs text-brand-600 font-medium">
                     <Navigation size={12} className="mr-1" />
                     重新定位
                 </button>
             </div>
          </div>

          {/* Hot Cities */}
          <div className="p-4 bg-white mb-3">
              <div className="text-xs text-gray-500 mb-3">热门城市</div>
              <div className="grid grid-cols-4 gap-3">
                  {hotCities.map(city => (
                      <button 
                        key={city}
                        onClick={() => onSelectCity(city)}
                        className="bg-gray-50 text-gray-700 text-sm py-2 rounded text-center hover:bg-gray-100 active:bg-brand-50 active:text-brand-600"
                      >
                          {city}
                      </button>
                  ))}
              </div>
          </div>

          {/* All Cities List */}
          <div className="bg-white">
              {allCities.map(group => (
                  <div key={group.letter}>
                      <div className="bg-gray-50 px-4 py-1 text-xs text-gray-500 font-bold sticky top-[108px]">{group.letter}</div>
                      <div>
                          {group.cities.map(city => (
                              <button
                                key={city}
                                onClick={() => onSelectCity(city)}
                                className="w-full text-left px-4 py-3 text-sm text-gray-800 border-b border-gray-50 active:bg-gray-50"
                              >
                                  {city}
                              </button>
                          ))}
                      </div>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};

export default CitySelection;