import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import SearchPage from './pages/Search';
import WalletPage from './pages/Wallet';
import CouponsPage from './pages/Coupons';
import ComingSoonPage from './pages/ComingSoon';
import VendorDetails from './pages/VendorDetails';
import CitySelection from './pages/CitySelection';
import Checkout from './pages/Checkout';
import OrderProgress from './pages/OrderProgress';
import RunnerRequest from './pages/RunnerRequest';
import AddressList from './pages/AddressList';
import AddressEdit from './pages/AddressEdit';
import MapMode from './pages/MapMode';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import Favorites from './pages/Favorites';
import PaymentMethods from './pages/PaymentMethods';
import { Order } from './types';
import { MOCK_VENDORS } from './constants';

function App() {
  // Use a history stack for navigation to support multi-level back functionality
  const [history, setHistory] = useState<string[]>(['home']);
  const activeTab = history[history.length - 1];

  const [comingSoonTitle, setComingSoonTitle] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [orderProgressId, setOrderProgressId] = useState('');
  const [cartData, setCartData] = useState<{vendorId: string; items: Record<string, number>} | null>(null);

  const handleNavigate = (page: string) => {
    let targetPage = page;

    // Special handling for Runner Vendor (ID 13)
    if (page === 'vendor:13') {
        targetPage = 'runner_request';
    }
    // Special handling for dynamic pages
    else if (page.startsWith('coming_soon:')) {
        setComingSoonTitle(page.split(':')[1]);
        targetPage = 'coming_soon';
    } else if (page.startsWith('vendor:')) {
        setVendorId(page.split(':')[1]);
        targetPage = 'vendor_detail';
    } else if (page.startsWith('order_progress:')) {
        setOrderProgressId(page.split(':')[1]);
        targetPage = 'order_progress';
    }

    // If navigating to a root tab, reset the history stack
    if (['home', 'orders', 'profile'].includes(targetPage)) {
        setHistory([targetPage]);
        return;
    }

    // Push new page to history if it's different from current
    if (targetPage !== activeTab) {
        setHistory(prev => [...prev, targetPage]);
    }
  };

  const handleBack = () => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
    }
  };

  const handleCitySelect = (city: string) => {
      // Simulate city not available by redirecting to coming soon
      setComingSoonTitle(`${city}暂未开通服务`);
      setHistory(prev => [...prev, 'coming_soon']);
  };

  const handleCheckout = (items: Record<string, number>) => {
      // Check if this is coming from runner request (using generic '13' or active vendor)
      const currentVendorId = activeTab === 'runner_request' ? '13' : vendorId;
      setCartData({ vendorId: currentVendorId, items });
      setHistory(prev => [...prev, 'checkout']);
  };

  // Logic to reorder items from history
  const handleReorder = (order: Order) => {
    const vendor = MOCK_VENDORS.find(v => v.id === order.vendorId);
    if (!vendor) return;

    // Map order item names back to menu IDs to construct cart
    const items: Record<string, number> = {};
    order.items.forEach(orderItem => {
        const menuItem = vendor.menu?.find(m => m.name === orderItem.name);
        if (menuItem) {
            items[menuItem.id] = orderItem.quantity;
        }
    });

    if (Object.keys(items).length > 0) {
        setCartData({ vendorId: order.vendorId, items });
        setHistory(prev => [...prev, 'checkout']);
    } else {
        alert("商品已下架，无法一键再来");
    }
  };

  const handleOrderPlaced = () => {
      setCartData(null);
      // Reset to Orders tab
      setHistory(['orders']);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'orders':
        return <Orders onNavigate={handleNavigate} onReorder={handleReorder} />;
      case 'profile':
        return <Profile onNavigate={handleNavigate} />;
      case 'search':
        return <SearchPage onBack={handleBack} />;
      case 'wallet':
        return <WalletPage onBack={handleBack} onNavigate={handleNavigate} />;
      case 'coupons':
        return <CouponsPage onBack={handleBack} />;
      case 'address_list':
        return <AddressList onBack={handleBack} onNavigate={handleNavigate} />;
      case 'address_edit':
        return <AddressEdit onBack={handleBack} onSave={handleBack} />;
      case 'map_mode':
        return <MapMode onBack={handleBack} onNavigateToVendor={(id) => handleNavigate(`vendor:${id}`)} />;
      case 'coming_soon':
        return <ComingSoonPage title={comingSoonTitle} onBack={handleBack} />;
      case 'vendor_detail':
        return <VendorDetails vendorId={vendorId} onBack={handleBack} onCheckout={handleCheckout} />;
      case 'city_selection':
        return <CitySelection onBack={handleBack} onSelectCity={handleCitySelect} />;
      case 'checkout':
        return <Checkout cartData={cartData} onBack={handleBack} onPay={handleOrderPlaced} />;
      case 'order_progress':
        return <OrderProgress orderId={orderProgressId} onBack={handleBack} />;
      case 'runner_request':
        return <RunnerRequest onBack={handleBack} onSubmit={handleCheckout} />;
      case 'settings':
        return <Settings onBack={handleBack} />;
      case 'notifications':
        return <Notifications onBack={handleBack} />;
      case 'favorites':
        return <Favorites onBack={handleBack} onNavigate={handleNavigate} />;
      case 'payment_methods':
        return <PaymentMethods onBack={handleBack} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  // Only show bottom navigation on main tabs
  const showNavigation = ['home', 'orders', 'profile'].includes(activeTab);

  return (
    <div className="mx-auto max-w-md bg-white min-h-screen shadow-2xl overflow-hidden relative">
       {/* 
         max-w-md makes it look like a mobile app on desktop screens.
         On actual mobile, it will be 100% width due to defaults.
       */}
       
       <main className={`h-full ${showNavigation ? '' : 'pb-0'}`}>
        {renderContent()}
       </main>

      {showNavigation && <Navigation activeTab={activeTab} onTabChange={handleNavigate} />}
    </div>
  );
}

export default App;