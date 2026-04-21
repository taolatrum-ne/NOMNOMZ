import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../contexts/AppContext';
import { Deal } from '../types';
import { formatVND, cn } from '../lib/utils';
import { Star, Clock, MapPin, ChevronRight, Filter, Bell, X } from 'lucide-react';

export const UserHome: React.FC<{ onSelectDeal: (deal: Deal) => void }> = ({ onSelectDeal }) => {
  const { deals, notifications, markNotificationsAsRead } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const activeDeals = deals.filter(d => d.terminalStatus !== 'expired' && d.terminalStatus !== 'sold_out');
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const isComingSoon = (pickupStart: string) => {
    return new Date(pickupStart) > new Date();
  };

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) markNotificationsAsRead();
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 bg-white border-b border-secondary/30 relative z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-black text-primary tracking-tighter">NOMNOMz</h1>
              <p className="text-slate-500 text-[10px] font-bold flex items-center">
                <MapPin className="w-2.5 h-2.5 mr-1 text-accent" /> Hồ Chí Minh
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <motion.div 
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleNotifications}
                className={cn(
                  "relative w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer",
                  showNotifications ? "bg-primary text-white" : "bg-slate-50 text-slate-400"
                )}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && !showNotifications && (
                  <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                )}
              </motion.div>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    {/* Backdrop */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setShowNotifications(false)}
                      className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
                    />
                    
                    {/* Dropdown */}
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-[280px] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                        <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Thông báo</span>
                        <X className="w-4 h-4 text-slate-300 cursor-pointer" onClick={() => setShowNotifications(false)} />
                      </div>
                      <div className="max-h-[300px] overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map(n => (
                            <div key={n.id} className="p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                              <p className="text-[10px] font-black text-primary uppercase mb-1">{n.title}</p>
                              <p className="text-sm font-bold text-slate-700 leading-snug">{n.message}</p>
                              <p className="text-[9px] text-slate-400 font-bold mt-2 uppercase">Vừa xong</p>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center">
                            <p className="text-sm font-bold text-slate-400 italic">Không có thông báo mới</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <motion.div 
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary cursor-pointer"
            >
              <Filter className="w-5 h-5" />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Featured / Active Deals */}
      <div className="px-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">Deal hot hòn họt 🔥</h2>
          <span className="text-primary text-sm font-semibold">Xem tất cả</span>
        </div>

        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {activeDeals.map((deal) => (
              <motion.div
                key={deal.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl overflow-hidden nomnomz-shadow border border-slate-100 cursor-pointer group"
                onClick={() => onSelectDeal(deal)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={deal.images[0]} 
                    alt={deal.restaurantName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {isComingSoon(deal.pickupStart) && (
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-white shadow-sm ring-2 ring-white/20 uppercase">
                        Sắp mở bán
                      </span>
                    )}
                    {deal.tags.slice(0, 2).map((tag, idx) => (
                      <span key={tag} className={cn(
                        "px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
                        idx % 2 === 0 ? "tag-green" : "tag-orange"
                      )}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {isComingSoon(deal.pickupStart) ? 'Đang chuẩn bị' : `Còn ${deal.quantityRemaining} set`}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-bold text-slate-900 leading-tight pr-4">
                      {deal.restaurantName}
                    </h3>
                    <div className="flex items-center bg-secondary/50 px-2 py-0.5 rounded-lg">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-1" />
                      <span className="text-xs font-black text-primary">{deal.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pb-2 border-b border-dashed border-secondary/50">
                    <div className="flex items-center text-slate-500 text-xs font-medium">
                      <Clock className="w-3.5 h-3.5 mr-1 text-accent" />
                      {deal.pickupLabel}
                    </div>
                    <div className="text-slate-400 text-xs font-medium flex items-center">
                      <MapPin className="w-3 h-3 mr-1" /> {deal.distance}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {isComingSoon(deal.pickupStart) ? (
                      <div>
                        <p className="text-sm font-bold text-slate-400 italic">Giá sẽ công bố khi mở bán</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-[10px] text-slate-400 line-through font-medium">
                          {formatVND(deal.originalPrice)}
                        </p>
                        <p className="text-lg font-black text-primary">
                          {formatVND(deal.price)} <span className="text-xs font-normal text-slate-500">/ 2kg base</span>
                        </p>
                      </div>
                    )}
                    <motion.button 
                      whileHover={{ x: 2 }}
                      className="bg-secondary text-primary p-2 rounded-full"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
