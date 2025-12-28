import React from 'react';
import { ChevronLeft, Bell, Tag, Info, Clock } from 'lucide-react';

interface NotificationsProps {
  onBack: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ onBack }) => {
  const messages = [
    {
        id: 1,
        type: 'order',
        title: '订单已送达',
        content: '您在汉堡王(中山路)的订单已送达，别忘了给五星好评哦~',
        time: '10分钟前',
        read: false
    },
    {
        id: 2,
        type: 'promo',
        title: '大额红包到账',
        content: '恭喜您获得一张满30减15元的大额红包，仅限今日使用！',
        time: '2小时前',
        read: true
    },
    {
        id: 3,
        type: 'system',
        title: '系统维护通知',
        content: '为了提供更好的服务，我们将于今晚02:00-04:00进行系统维护，期间无法下单。',
        time: '昨天',
        read: true
    }
  ];

  const getIcon = (type: string) => {
      switch(type) {
          case 'order': return <Clock size={20} className="text-blue-500" />;
          case 'promo': return <Tag size={20} className="text-orange-500" />;
          default: return <Info size={20} className="text-gray-500" />;
      }
  };

  const getBgColor = (type: string) => {
      switch(type) {
          case 'order': return 'bg-blue-50';
          case 'promo': return 'bg-orange-50';
          default: return 'bg-gray-100';
      }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white p-4 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="mr-3 text-gray-700">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">消息通知</h1>
      </div>

      <div className="p-4 space-y-3">
          {messages.map(msg => (
              <div key={msg.id} className="bg-white p-4 rounded-xl shadow-sm relative overflow-hidden">
                  {!msg.read && <div className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full"></div>}
                  <div className="flex items-start">
                      <div className={`w-10 h-10 rounded-full ${getBgColor(msg.type)} flex items-center justify-center mr-3 shrink-0`}>
                          {getIcon(msg.type)}
                      </div>
                      <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                              <h3 className="font-bold text-gray-900 text-sm">{msg.title}</h3>
                              <span className="text-xs text-gray-400 font-normal mr-4">{msg.time}</span>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed">{msg.content}</p>
                      </div>
                  </div>
              </div>
          ))}
          <div className="text-center py-6 text-xs text-gray-400">
              没有更多消息了
          </div>
      </div>
    </div>
  );
};

export default Notifications;