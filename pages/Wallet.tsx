import React from 'react';
import { ChevronLeft, CreditCard, PlusCircle, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { MOCK_USER } from '../constants';

interface WalletPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const WalletPage: React.FC<WalletPageProps> = ({ onBack, onNavigate }) => {
  const transactions = [
    { id: 1, name: "汉堡王(中山路)", date: "2026-10-27 12:30", amount: -40.00, type: 'expense' },
    { id: 2, name: "充值", date: "2026-10-20 09:00", amount: +200.00, type: 'income' },
    { id: 3, name: "鲜道寿司", date: "2026-10-15 19:15", amount: -108.00, type: 'expense' },
    { id: 4, name: "退款-老北京炸酱面", date: "2026-10-10 11:50", amount: +18.00, type: 'income' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-brand-500 text-white p-4 pb-12 rounded-b-[2rem]">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-3">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold">我的钱包</h1>
        </div>
        <div className="flex flex-col items-center">
           <span className="text-brand-100 text-sm mb-1">总资产 (元)</span>
           <span className="text-4xl font-bold mb-6">¥{MOCK_USER.balance.toFixed(2)}</span>
           
           <div className="flex space-x-4 w-full justify-center">
              <button className="flex items-center bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full font-bold text-sm hover:bg-white/30 transition-colors">
                  <PlusCircle size={16} className="mr-2" />
                  充值
              </button>
              <button 
                onClick={() => onNavigate('coming_soon:余额提现')}
                className="flex items-center bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full font-bold text-sm hover:bg-white/30 transition-colors"
              >
                  <CreditCard size={16} className="mr-2" />
                  提现
              </button>
           </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="px-4 -mt-6">
        <div className="bg-white rounded-xl shadow-sm p-4 min-h-[400px]">
            <h3 className="font-bold text-gray-800 mb-4">账单明细</h3>
            <div className="space-y-4">
                {transactions.map(t => (
                    <div key={t.id} className="flex justify-between items-center pb-4 border-b border-gray-50 last:border-0">
                        <div className="flex items-center">
                            <div className={`p-2 rounded-full mr-3 ${t.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                {t.type === 'income' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                            </div>
                            <div>
                                <div className="font-bold text-gray-800 text-sm">{t.name}</div>
                                <div className="text-xs text-gray-400">{t.date}</div>
                            </div>
                        </div>
                        <span className={`font-bold ${t.type === 'income' ? 'text-green-600' : 'text-gray-900'}`}>
                            {t.amount > 0 ? '+' : ''}{t.amount.toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;