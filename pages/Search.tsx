import React, { useState } from 'react';
import { Search, ChevronLeft, Trash2 } from 'lucide-react';

interface SearchPageProps {
  onBack: () => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const historyTags = ['汉堡王', '奶茶', '麻辣烫', '炸鸡'];
  const hotTags = ['蜜雪冰城', '瑞幸咖啡', '肯德基', '一点点', '必胜客', '螺蛳粉'];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <button onClick={onBack} className="mr-3 text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text" 
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索商家、商品名称" 
              className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
        </div>
        <button className="ml-3 text-sm font-bold text-brand-600">搜索</button>
      </div>

      <div className="p-4">
        {/* History */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-800 text-sm">历史搜索</h3>
            <button className="text-gray-400"><Trash2 size={16} /></button>
          </div>
          <div className="flex flex-wrap gap-2">
            {historyTags.map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hot Search */}
        <div>
          <h3 className="font-bold text-gray-800 text-sm mb-3">热门搜索</h3>
          <div className="flex flex-wrap gap-2">
            {hotTags.map(tag => (
              <span key={tag} className="bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;