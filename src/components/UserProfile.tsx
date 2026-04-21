import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { User, LogOut, Heart, ShieldAlert, History, MapPin, Plus, Check, ChevronLeft, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, formatVND } from '../lib/utils';

export const UserProfile: React.FC = () => {
  const { currentUser, logout, updateUserPreferences } = useApp();
  const [otherAllergy, setOtherAllergy] = useState('');
  const [otherFavorite, setOtherFavorite] = useState('');
  const [showHeartMessage, setShowHeartMessage] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const { orders } = useApp();

  if (!currentUser) return null;

  const allergyOptions = ['Hải sản', 'Đồ cay', 'Đậu phộng', 'Sữa', 'Gluten'];
  const favoriteOptions = ['Thịt bò', 'Thịt lợn', 'Hải sản', 'Đồ chay', 'Đồ ngọt', 'Món Á', 'Món Âu'];

  const togglePreference = (type: 'allergies' | 'favorites', value: string) => {
    const current = [...currentUser[type]];
    const index = current.indexOf(value);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(value);
    }
    updateUserPreferences(
      type === 'allergies' ? current : currentUser.allergies,
      type === 'favorites' ? current : currentUser.favorites
    );
  };

  const addOther = (type: 'allergies' | 'favorites') => {
    const value = type === 'allergies' ? otherAllergy : otherFavorite;
    if (!value.trim()) return;
    if (!currentUser[type].includes(value)) {
      togglePreference(type, value);
    }
    if (type === 'allergies') setOtherAllergy('');
    else setOtherFavorite('');
  };

  return (
    <div className="pb-24">
      <header className="px-6 pt-16 pb-12 bg-white border-b border-slate-100">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-primary">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 leading-tight">{currentUser.name}</h2>
            <p className="text-slate-400 font-bold text-sm tracking-tight">{currentUser.phoneNumber}</p>
          </div>
        </div>
      </header>

      <div className="px-6 mt-10 space-y-10">
        <section>
          <div className="flex items-center gap-2 mb-6 px-2">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            <h3 className="text-sm uppercase font-black text-slate-800 tracking-widest">Hồ sơ dị ứng</h3>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {allergyOptions.map(option => (
              <button
                key={option}
                onClick={() => togglePreference('allergies', option)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                  currentUser.allergies.includes(option) 
                    ? "bg-red-500 text-white shadow-md" 
                    : "bg-slate-100 text-slate-400"
                )}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Khác..."
              value={otherAllergy}
              onChange={(e) => setOtherAllergy(e.target.value)}
              className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold focus:ring-1 focus:ring-red-200"
            />
            <button 
              onClick={() => addOther('allergies')}
              className="bg-red-100 text-red-500 p-2 rounded-xl"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6 px-2">
            <Heart className="w-5 h-5 text-primary" />
            <h3 className="text-sm uppercase font-black text-slate-800 tracking-widest">Món ăn yêu thích</h3>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {favoriteOptions.map(option => (
              <button
                key={option}
                onClick={() => togglePreference('favorites', option)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                  currentUser.favorites.includes(option) 
                    ? "bg-primary text-white shadow-md" 
                    : "bg-slate-100 text-slate-400"
                )}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Khác..."
              value={otherFavorite}
              onChange={(e) => setOtherFavorite(e.target.value)}
              className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold focus:ring-1 focus:ring-primary/20"
            />
            <button 
              onClick={() => addOther('favorites')}
              className="bg-secondary text-primary p-2 rounded-xl"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </section>

        <section className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xs uppercase font-black text-slate-400 tracking-widest px-2">Hoạt động</h3>
          {[
            { label: 'Theo dõi đơn hàng', icon: ShoppingBag, onClick: () => setShowTracking(true) },
            { label: 'Lịch sử đơn hàng', icon: History, onClick: () => setShowHistory(true) },
            { label: 'Địa chỉ đã lưu', icon: MapPin, onClick: () => setShowHeartMessage(true) },
          ].map(item => (
            <motion.div 
              key={item.label}
              whileTap={{ scale: 0.98 }}
              onClick={item.onClick}
              className="flex items-center justify-between p-6 bg-white rounded-[32px] border border-slate-100 nomnomz-shadow cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-700">{item.label}</span>
              </div>
            </motion.div>
          ))}
        </section>

        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="w-full py-5 bg-white border border-slate-100 rounded-[32px] text-rose-500 font-bold flex items-center justify-center gap-3 shadow-sm"
        >
          <LogOut className="w-5 h-5" />
          Đăng xuất
        </motion.button>
      </div>

      <AnimatePresence>
        {showHeartMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHeartMessage(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xs bg-white rounded-3xl p-8 shadow-2xl text-center"
            >
              <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-rose-500 fill-rose-500 animate-pulse" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Bên trong trái tim</h3>
              <p className="text-slate-500 text-sm font-medium">Bạn luôn có một vị trí đặc biệt ở đây.</p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowHeartMessage(false)}
                className="mt-8 w-full py-3 bg-rose-500 text-white font-bold rounded-xl shadow-lg shadow-rose-200"
              >
                Đóng
              </motion.button>
            </motion.div>
          </div>
        )}

        {showHistory && (
          <div className="fixed inset-0 z-50 flex flex-col bg-white">
            <header className="px-6 pt-16 pb-6 border-b border-slate-100 flex items-center gap-4">
              <button onClick={() => setShowHistory(false)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-black text-slate-900">Lịch sử đơn hàng</h2>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
              {orders.length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <History className="w-10 h-10 text-slate-300" />
                  </div>
                  <p className="font-bold text-slate-400 italic">Chưa có đơn hàng nào!</p>
                </div>
              ) : (
                orders.map(order => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={order.id}
                    className="p-6 rounded-[32px] border border-slate-100 nomnomz-shadow bg-white"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                          <History className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-black text-slate-400 mb-1">{new Date(order.timestamp).toLocaleDateString('vi-VN')}</p>
                          <h4 className="font-black text-slate-900 leading-tight">{order.restaurantName}</h4>
                        </div>
                      </div>
                      <div className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                        order.status === 'accepted' ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                      )}>
                        {order.status === 'accepted' ? 'Đã nhận đơn' : 'Đang xử lý'}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-primary">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <p className="text-xs font-bold text-slate-500">{order.quantity} Set Buffet</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <p className="text-lg font-black text-primary">{formatVND(order.price)}</p>
                      <div className="text-[10px] font-bold text-slate-400">
                        Mã: <span className="font-black text-slate-600">#{order.id}</span>
                      </div>
                    </div>
                    
                    {order.status === 'accepted' && (
                      <div className="mt-4 p-3 bg-primary/5 rounded-2xl flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center animate-pulse">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <p className="text-[10px] font-bold text-primary italic">Shipper đang trên đường tới nhà hàng!</p>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}

        {showTracking && (
          <div className="fixed inset-0 z-50 flex flex-col bg-white">
            <header className="px-6 pt-16 pb-6 border-b border-slate-100 flex items-center gap-4">
              <button onClick={() => setShowTracking(false)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-black text-slate-900">Theo dõi đơn hàng</h2>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
              {orders.filter(o => o.status !== 'delivered').length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-slate-300" />
                  </div>
                  <p className="font-bold text-slate-400 italic">Không có đơn hàng đang giao!</p>
                </div>
              ) : (
                orders.filter(o => o.status !== 'delivered').map(order => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={order.id}
                    className="p-6 rounded-[32px] border-2 border-primary/20 bg-primary/5 shadow-inner"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-black text-primary text-lg">{order.restaurantName}</h4>
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-3 h-3 rounded-full",
                          order.status === 'pending' ? "bg-amber-400 animate-pulse" : "bg-green-500"
                        )} />
                        <p className={cn("text-sm font-bold", order.status === 'pending' ? "text-amber-600" : "text-green-600")}>
                          {order.status === 'pending' ? 'Nhà hàng đang xác nhận...' : 'Đã xác nhận & đang chuẩn bị'}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4 pl-0.5">
                        <div className={cn(
                          "w-2 h-8 border-l-2 border-dashed mx-auto",
                          order.status === 'accepted' ? "border-primary" : "border-slate-200"
                        )} />
                      </div>

                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-3 h-3 rounded-full",
                          order.status === 'accepted' ? "bg-primary animate-pulse" : "bg-slate-200"
                        )} />
                        <p className={cn("text-sm font-bold", order.status === 'accepted' ? "text-primary" : "text-slate-400")}>
                          Shipper đang di chuyển đến
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-primary/10 flex justify-between items-center">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">Mã đơn: #{order.id}</p>
                      <p className="text-base font-black text-primary">{formatVND(order.price)}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            <div className="p-6">
              <button 
                onClick={() => setShowTracking(false)}
                className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-green-900/10"
              >
                XÁC NHẬN
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
