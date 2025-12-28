import React, { useState } from 'react';
import { MOCK_ORDERS } from '../constants';
import { Order, OrderStatus } from '../types';
import { ChevronRight, RefreshCw, ShoppingBag, Truck } from 'lucide-react';

interface OrdersProps {
  onNavigate: (page: string) => void;
  onReorder?: (order: Order) => void;
}

const Orders: React.FC<OrdersProps> = ({ onNavigate, onReorder }) => {
  const [activeStatus, setActiveStatus] = useState<string>('全部');
  const [orders] = useState<Order[]>(MOCK_ORDERS);

  const tabs = ['全部', '进行中', '已完成', '已取消'];

  const filteredOrders = activeStatus === '全部' 
    ? orders 
    : orders.filter(o => {
        if (activeStatus === '进行中') return o.status === OrderStatus.PREPARING || o.status === OrderStatus.PENDING_PAYMENT || o.status === OrderStatus.DELIVERING || o.status === OrderStatus.READY_FOR_PICKUP;
        if (activeStatus === '已完成') return o.status === OrderStatus.COMPLETED;
        if (activeStatus === '已取消') return o.status === OrderStatus.CANCELLED;
        return true;
    });

  const getStatusColor = (status: OrderStatus) => {
    switch(status) {
      case OrderStatus.COMPLETED: return 'text-green-600 bg-green-50';
      case OrderStatus.CANCELLED: return 'text-red-600 bg-red-50';
      case OrderStatus.PREPARING: 
      case OrderStatus.DELIVERING:
      case OrderStatus.READY_FOR_PICKUP:
        return 'text-brand-600 bg-brand-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-3 pb-3 border-b border-gray-50">
        <div className="flex items-center" onClick={() => onNavigate(`vendor:${order.vendorId}`)}>
            <div className="w-10 h-10 rounded-lg overflow-hidden mr-3">
                <img src={order.vendorImage} alt={order.vendorName} className="w-full h-full object-cover" />
            </div>
            <div>
                <h3 className="font-bold text-gray-800 text-sm flex items-center">
                    {order.vendorName}
                    <ChevronRight size={14} className="text-gray-400 ml-1" />
                </h3>
                <span className="text-xs text-gray-400">{order.date}</span>
            </div>
        </div>
        <div className={`px-2 py-1 rounded text-[10px] font-bold tracking-wide ${getStatusColor(order.status)}`}>
            {order.status}
        </div>
      </div>

      {/* Items Summary */}
      <div 
        className="mb-3"
        onClick={() => onNavigate(`vendor:${order.vendorId}`)}
      >
          {order.items.map((item, idx) => (
             <div key={idx} className="flex justify-between text-sm text-gray-600 mb-1">
                 <span>{item.name} <span className="text-xs text-gray-400">x{item.quantity}</span></span>
             </div>
          ))}
          {order.items.length > 2 && <div className="text-xs text-gray-400 mt-1">...等{order.items.length}件商品</div>}
      </div>

      {/* Footer Info & Actions */}
      <div className="flex justify-between items-center mt-3 pt-2">
         <div className="flex flex-col">
             <span className="text-xs text-gray-500">{order.mode === 'delivery' ? '外卖配送' : '到店自取'}</span>
             <span className="font-bold text-gray-800">¥{order.totalAmount.toFixed(2)}</span>
         </div>
         
         <div className="flex space-x-2">
            {order.status === OrderStatus.COMPLETED && (
                <button 
                  onClick={() => onReorder && onReorder(order)}
                  className="px-3 py-1.5 border border-brand-200 text-brand-600 text-xs font-bold rounded-lg hover:bg-brand-50"
                >
                    再来一单
                </button>
            )}
            {(order.status === OrderStatus.PREPARING || order.status === OrderStatus.DELIVERING) && (
                <button 
                  onClick={() => onNavigate(`order_progress:${order.id}`)}
                  className="px-3 py-1.5 bg-brand-500 text-white text-xs font-bold rounded-lg shadow-sm"
                >
                    查看进度
                </button>
            )}
             {order.status === OrderStatus.READY_FOR_PICKUP && (
                 <button 
                  onClick={() => onNavigate('coming_soon:取餐码')}
                  className="px-3 py-1.5 bg-brand-500 text-white text-xs font-bold rounded-lg shadow-sm"
                 >
                     查看取餐码
                 </button>
             )}
            {order.status === OrderStatus.CANCELLED && (
                <button 
                  onClick={() => onNavigate('coming_soon:客服中心')}
                  className="px-3 py-1.5 border border-gray-200 text-gray-500 text-xs font-bold rounded-lg"
                >
                    联系客服
                </button>
            )}
         </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gray-50 flex flex-col relative overflow-hidden">
      {/* Fixed Header */}
      <div className="bg-white z-10 shadow-sm shrink-0">
          <div className="px-4 py-4">
             <h1 className="text-xl font-bold text-gray-900">我的订单</h1>
          </div>
          {/* Tabs */}
          <div className="flex px-4 space-x-6 overflow-x-auto no-scrollbar border-b border-gray-100">
             {tabs.map(tab => (
                 <button
                    key={tab}
                    onClick={() => setActiveStatus(tab)}
                    className={`pb-3 text-sm font-medium whitespace-nowrap transition-colors relative ${
                        activeStatus === tab ? 'text-brand-600' : 'text-gray-500'
                    }`}
                 >
                    {tab}
                    {activeStatus === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 rounded-t-full" />
                    )}
                 </button>
             ))}
          </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {filteredOrders.length > 0 ? (
            filteredOrders.map(order => <OrderCard key={order.id} order={order} />)
        ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <ShoppingBag size={48} className="mb-4 opacity-20" />
                <p>暂无订单</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Orders;