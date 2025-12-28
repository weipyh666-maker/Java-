import React from 'react';
import { ChevronLeft, Construction, Clock } from 'lucide-react';

interface ComingSoonPageProps {
  title: string;
  onBack: () => void;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ title, onBack }) => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="p-4 flex items-center border-b border-gray-100 sticky top-0 bg-white z-10">
        <button onClick={onBack} className="mr-3 text-gray-700">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">{title}</h1>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center -mt-20">
        <div className="bg-brand-50 p-6 rounded-full mb-6 relative">
            <Construction size={48} className="text-brand-500" />
            <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full">
                <Clock size={20} className="text-brand-400" />
            </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-3">功能开发中</h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          程序员正在疯狂敲代码中...<br/>
          <span className="font-medium text-brand-600">"{title}"</span> 功能即将上线，敬请期待！
        </p>
        
        <button 
            onClick={onBack}
            className="mt-8 px-6 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors"
        >
            返回上一页
        </button>
      </div>
    </div>
  );
};

export default ComingSoonPage;