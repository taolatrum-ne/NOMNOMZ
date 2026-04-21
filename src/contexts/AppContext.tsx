import React, { createContext, useContext, useState, useEffect } from 'react';
import { Deal, Order, User, AppNotification } from '../types';
import { SEED_DEALS } from '../constants';

interface AppContextType {
  deals: Deal[];
  orders: Order[];
  currentUser: User | null;
  notifications: AppNotification[];
  currentRestaurant: { id: string; name: string } | null;
  addOrder: (order: Order) => void;
  updateDeal: (deal: Deal) => void;
  acceptOrder: (orderId: string) => void;
  markNotificationsAsRead: () => void;
  loginUser: (phone: string) => void;
  loginRestaurant: (phone: string) => void;
  updateUserPreferences: (allergies: string[], favorites: string[]) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deals, setDeals] = useState<Deal[]>(SEED_DEALS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentRestaurant, setCurrentRestaurant] = useState<{ id: string; name: string } | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'n1',
      title: 'Deal mới từ Le Méridien',
      message: 'Le Méridien Sài Gòn - nhà hàng yêu thích của bạn đang có deal',
      timestamp: new Date().toISOString(),
      isRead: false,
      type: 'deal'
    },
    {
      id: 'n2',
      title: 'Lời cảm ơn',
      message: 'The Canvas – Lotte Hotel Saigon gửi lời cảm ơn đến bạn',
      timestamp: new Date().toISOString(),
      isRead: false,
      type: 'thanks'
    }
  ]);

  // Real-time logic mock: update deal statuses based on time
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setDeals(prev => prev.map(deal => {
        if (deal.isPaused) {
          return { ...deal, terminalStatus: 'paused' as const };
        }
        const endTime = new Date(deal.pickupEnd);
        if (now > endTime) {
          return { ...deal, terminalStatus: 'expired' as const };
        }
        if (deal.quantityRemaining <= 0) {
          return { ...deal, terminalStatus: 'sold_out' as const };
        }
        return { ...deal, terminalStatus: 'active' as const };
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    setDeals(prev => prev.map(d => 
      d.id === order.dealId ? { ...d, quantityRemaining: Math.max(0, d.quantityRemaining - order.quantity) } : d
    ));
  };

  const updateDeal = (deal: Deal) => {
    setDeals(prev => {
      const exists = prev.find(d => d.id === deal.id);
      if (exists) {
        return prev.map(d => d.id === deal.id ? deal : d);
      }
      return [deal, ...prev];
    });
  };

  const acceptOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'accepted' } : o));
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const loginUser = (phone: string) => {
    setCurrentUser({
      id: 'u1',
      name: 'Người dùng NOMNOMz',
      phoneNumber: phone,
      allergies: ['hải sản'],
      favorites: ['Saigon Café']
    });
    setCurrentRestaurant(null);
  };

  const loginRestaurant = (phone: string) => {
    setCurrentRestaurant({
      id: 'r1',
      name: 'Holiday Inn & Suites Saigon Airport'
    });
    setCurrentUser(null);
  };

  const updateUserPreferences = (allergies: string[], favorites: string[]) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, allergies, favorites });
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentRestaurant(null);
  };

  return (
    <AppContext.Provider value={{ 
      deals, 
      orders, 
      currentUser, 
      notifications,
      currentRestaurant,
      addOrder, 
      updateDeal, 
      acceptOrder,
      markNotificationsAsRead,
      loginUser,
      loginRestaurant,
      updateUserPreferences,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
