import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../contexts/AppContext';
import { formatVND, cn } from '../lib/utils';
import { Package, Plus, ClipboardList, LogOut, ChevronRight, Image as ImageIcon, LayoutDashboard, TrendingUp, Leaf, Calendar, MessageSquare, Users, Heart, Star } from 'lucide-react';
import { Deal, Order } from '../types';

export const RestaurantDashboard: React.FC = () => {
  const { currentRestaurant, orders, deals, acceptOrder, updateDeal, logout } = useApp();
  const [activeTab, setActiveTab] = useState<'orders' | 'deals' | 'add' | 'reports' | 'experience'>('orders');
  const [reportRange, setReportRange] = useState<'week' | 'month'>('week');
  const [isAdding, setIsAdding] = useState(false);
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);

  const restaurantDeals = deals.filter(d => d.restaurantId === currentRestaurant?.id);
  const restaurantOrders = orders.filter(o => o.restaurantName === currentRestaurant?.name);

  const [newDeal, setNewDeal] = useState<Partial<Deal>>({
    restaurantId: currentRestaurant?.id,
    restaurantName: currentRestaurant?.name,
    price: 40000,
    quantityRemaining: 1,
    tags: ['Thịt'],
    images: ['https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1000']
  });

  const handleCreateDeal = () => {
    updateDeal({
      ...newDeal,
      id: Math.random().toString(36).substr(2, 9),
      originalPrice: 1000000,
      pickupStart: new Date().toISOString(),
      pickupEnd: new Date(Date.now() + 7200000).toISOString(),
      distance: '0.0 km',
      rating: 4.5,
      description: 'Set buffet dư tươi ngon mỗi ngày từ nhà hàng.',
      type: 'NomNomz Special',
      location: 'Địa chỉ nhà hàng'
    } as Deal);
    setActiveTab('deals');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-6 pt-16 pb-8 bg-white border-b border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black tracking-tighter italic text-primary">NOMNOMz <span className="text-slate-300 font-normal">Business</span></h1>
          </div>
          <button onClick={logout} className="p-2 bg-slate-50 text-slate-400 rounded-full">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Đối tác sở hữu</p>
          <h2 className="text-xl font-black text-slate-800">{currentRestaurant?.name}</h2>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-6 mt-8 flex gap-4 overflow-x-auto no-scrollbar">
        {[
          { id: 'orders', label: 'Đơn hàng', icon: ClipboardList },
          { id: 'deals', label: 'Quản lý Deal', icon: Package },
          { id: 'reports', label: 'Báo cáo & Quản lý', icon: LayoutDashboard },
          { id: 'experience', label: 'Trải nghiệm khách hàng', icon: MessageSquare },
          { id: 'add', label: 'Tạo Tin', icon: Plus },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all",
              activeTab === tab.id ? "bg-primary text-white shadow-lg" : "bg-white text-slate-400"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-6 mt-8">
        <AnimatePresence mode="wait">
          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {restaurantOrders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-slate-200">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ClipboardList className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="text-slate-400 font-bold">Chưa có đơn hàng nào</p>
                </div>
              ) : (
                restaurantOrders.map(order => (
                  <div key={order.id} className="bg-white p-6 rounded-[32px] border border-slate-100 nomnomz-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xs font-bold text-slate-400 mb-1">#{order.id}</p>
                        <p className="font-black text-slate-800">{order.quantity} Set Buffet</p>
                        {order.status === 'accepted' && (
                          <p className="text-[10px] font-bold text-primary mt-2 flex items-center gap-1.5 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Shipper đang đến lấy đơn, hãy chuẩn bị set!
                          </p>
                        )}
                      </div>
                      <span className={cn(
                        "text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest",
                        order.status === 'accepted' ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                      )}>
                        {order.status === 'pending' ? 'Chưa nhận' : 'Đã nhận'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <p className="text-lg font-black text-primary">{formatVND(order.price)}</p>
                      {order.status === 'pending' && (
                        <motion.button 
                          whileTap={{ scale: 0.95 }}
                          onClick={() => acceptOrder(order.id)}
                          className="bg-primary text-white px-6 py-2 rounded-xl font-bold text-sm"
                        >
                          Xác nhận đơn
                        </motion.button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === 'deals' && (
            <motion.div
              key="deals"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {restaurantDeals.map(deal => (
                <div 
                  key={deal.id} 
                  onClick={() => setSelectedDealId(deal.id)}
                  className="bg-white overflow-hidden rounded-[32px] border border-slate-100 flex h-32 cursor-pointer transition-transform active:scale-[0.98]"
                >
                  <img src={deal.images[0]} className="w-32 h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-black text-sm text-slate-800 line-clamp-1">{deal.restaurantName}</h3>
                      <p className="text-primary font-bold text-xs">{formatVND(deal.price)} / 2kg</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-bold">Còn {deal.quantityRemaining} set</span>
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <AnimatePresence>
                {selectedDealId && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setSelectedDealId(null)}
                      className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      className="relative w-full max-w-sm bg-white rounded-[40px] p-8 shadow-2xl overflow-hidden"
                    >
                      {(() => {
                        const deal = restaurantDeals.find(d => d.id === selectedDealId);
                        if (!deal) return null;
                        
                        const ordersForDeal = orders.filter(o => o.dealId === deal.id);
                        const peopleCount = ordersForDeal.length;

                        return (
                          <>
                            <div className="flex justify-between items-center mb-8">
                              <h3 className="text-xl font-black text-slate-900">Chi tiết quản lý</h3>
                              <button onClick={() => setSelectedDealId(null)} className="text-slate-400 font-bold text-sm">Đóng</button>
                            </div>

                            <div className="bg-slate-50 rounded-3xl p-6 mb-6 space-y-6">
                              <div className="flex flex-col gap-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tên set</p>
                                <p className="font-bold text-slate-800 text-lg">{deal.restaurantName}</p>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white rounded-2xl border border-slate-100">
                                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Đã đặt đơn</p>
                                  <p className="text-2xl font-black text-primary">{peopleCount} <span className="text-xs font-normal opacity-60">người</span></p>
                                </div>
                                <div className="p-4 bg-white rounded-2xl border border-slate-100">
                                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Đơn còn lại</p>
                                  <p className="text-2xl font-black text-slate-800">{deal.quantityRemaining} <span className="text-xs font-normal opacity-60">set</span></p>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-3">
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Trạng thái hiện tại</p>
                              <div className={cn(
                                "py-3 rounded-2xl text-center font-bold text-sm",
                                deal.terminalStatus === 'paused' ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-600"
                              )}>
                                {deal.terminalStatus === 'paused' ? 'Đang tạm ẩn' : 'Deal đang hiển thị tốt'}
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === 'add' && (
            <motion.div
              key="add"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100"
            >
              <h3 className="text-xl font-black text-slate-800 mb-8">Tạo deal mới</h3>
              
              <div className="space-y-8">
                <div>
                  <label className="text-[10px] uppercase font-black text-slate-400 block mb-3">Tên set buffet</label>
                  <input 
                    type="text" 
                    placeholder="VD: Seafood Surprise Box"
                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/20 text-slate-800 font-bold transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-black text-slate-400 block mb-3">Giá bán (VNĐ/kg)</label>
                  <input 
                    type="number" 
                    value={newDeal.price}
                    max={70000}
                    onChange={(e) => setNewDeal({...newDeal, price: parseInt(e.target.value)})}
                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/20 text-slate-800 font-bold transition-all"
                  />
                  <p className="text-[10px] text-slate-400 mt-2 italic">* Giá không vượt quá 70.000 VNĐ</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-[10px] uppercase font-black text-slate-400">Số lượng set</label>
                    <span className="text-primary font-black">{newDeal.quantityRemaining}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" max="20" 
                    value={newDeal.quantityRemaining}
                    onChange={(e) => setNewDeal({...newDeal, quantityRemaining: parseInt(e.target.value)})}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-black text-slate-400 block mb-3">Hình ảnh thật (Bắt buộc)</label>
                  <div className="w-full aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400 group hover:border-primary/30 transition-all cursor-pointer">
                    <ImageIcon className="w-10 h-10 mb-2 group-hover:text-primary transition-colors" />
                    <p className="text-[10px] font-bold">Chỉ tải lên ảnh thực tế tại nhà hàng</p>
                  </div>
                </div>

                <motion.button 
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCreateDeal}
                  className="w-full py-5 bg-primary text-white rounded-3xl font-black text-lg shadow-xl"
                >
                  ĐĂNG DEAL
                </motion.button>
              </div>
            </motion.div>
          )}

          {activeTab === 'reports' && (
            <motion.div
              key="reports"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Range Toggle */}
              <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                <button 
                  onClick={() => setReportRange('week')}
                  className={cn(
                    "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                    reportRange === 'week' ? "bg-white text-primary shadow-sm" : "text-slate-400"
                  )}
                >
                  Theo Tuần
                </button>
                <button 
                  onClick={() => setReportRange('month')}
                  className={cn(
                    "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                    reportRange === 'month' ? "bg-white text-primary shadow-sm" : "text-slate-400"
                  )}
                >
                  Theo Tháng
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-[32px] border border-slate-100 nomnomz-shadow">
                  <div className="w-10 h-10 bg-secondary rounded-2xl flex items-center justify-center text-primary mb-4">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Số kg đã bán</p>
                  <p className="text-2xl font-black text-slate-800">{reportRange === 'week' ? '24.2' : '102.5'} <span className="text-xs font-normal opacity-60">kg</span></p>
                  <p className="text-[10px] font-bold text-green-500 mt-2">+{reportRange === 'week' ? '5%' : '3%'} so với kỳ trước</p>
                </div>
                <div className="bg-white p-6 rounded-[32px] border border-slate-100 nomnomz-shadow">
                  <div className="w-10 h-10 bg-secondary rounded-2xl flex items-center justify-center text-primary mb-4">
                    <Package className="w-5 h-5" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Doanh thu</p>
                  <p className="text-2xl font-black text-slate-800">
                    {reportRange === 'week' ? '4.2M' : '20.2M'}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 mt-2">
                    {reportRange === 'week' ? 'Số tiền tiết kiệm được' : 'Số tiền tiết kiệm được trong 3 tháng'}
                  </p>
                </div>
              </div>

              <div className="bg-primary/5 p-6 rounded-[32px] border border-primary/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-primary uppercase tracking-widest">Chỉ số xanh (ESG)</p>
                    <p className="text-[10px] font-bold text-slate-500 mt-0.5">Giảm thiểu rác thải thực phẩm</p>
                  </div>
                </div>
                <div className="w-full h-3 bg-secondary rounded-full overflow-hidden mb-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    className="h-full bg-primary"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-primary uppercase">Mức độ tích cực</span>
                  <span className="text-sm font-black text-slate-800">85%</span>
                </div>
              </div>

              {/* Reconciliation History */}
              <div className="bg-white p-6 rounded-[32px] border border-slate-100 nomnomz-shadow">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-black text-slate-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-slate-400" />
                    Lịch sử đối soát
                  </h4>
                  <span className="text-[10px] font-black uppercase text-slate-400">Kết toán</span>
                </div>
                <div className="space-y-4">
                  {(reportRange === 'week' ? [1250000, 800000, 2199000] : [6999350, 5250010, 7950000]).map((amount, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">
                          {reportRange === 'week' ? `Tuần ${idx + 1} - Tháng 4` : `Kỳ quyết toán ${idx + 1}/2024`}
                        </p>
                        <p className="text-sm font-bold text-slate-800">Giao dịch hoàn tất</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-primary">{formatVND(amount)}</p>
                        <p className="text-[9px] font-bold text-green-500 uppercase tracking-tighter">Thành công</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Experience Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-[32px] border border-slate-100 nomnomz-shadow">
                  <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Mức độ tiếp cận</p>
                  <p className="text-2xl font-black text-slate-800">1.2k</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-2">Khách hàng mới nhìn thấy bạn</p>
                </div>
                <div className="bg-white p-6 rounded-[32px] border border-slate-100 nomnomz-shadow">
                  <div className="w-10 h-10 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-4">
                    <Heart className="w-5 h-5" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Yêu thích</p>
                  <p className="text-2xl font-black text-slate-800">58</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-2">Khách hàng đã lưu</p>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="bg-white p-6 rounded-[32px] border border-slate-100 nomnomz-shadow">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h4 className="font-black text-lg text-slate-900">Đánh giá khách hàng</h4>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                      ))}
                      <span className="text-xs font-black text-slate-500 ml-1">4.8 / 5.0</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { user: "Minh Anh", rating: 5, comment: "Đồ ăn từ Holiday Inn vẫn rất chất lượng, packaging đẹp thể hiện tôn trọng khách hàng, ủng hộ dự án giảm lãng phí thực phẩm này!", time: "2 giờ trước" },
                    { user: "Hoàng Nam", rating: 5, comment: "Lần đầu mua set surplus nhưng bất ngờ vì đồ vẫn rất tươi. Sẽ đặt bàn vào tuần sau cho cả gia đình", time: "Hôm qua" },
                    { 
                      user: "Thu Thủy", 
                      rating: 4, 
                      comment: "Phần ăn rất đầy đặn, hi vọng khi đến buffet sẽ được thử thêm món khác.", 
                      time: "2 ngày trước",
                      reply: "cảm ơn đánh giá từ bạn! Tại Holiday Inn & Suites Saigon Airport phục vụ hơn 50 món ăn hấp dẫn mỗi buổi và còn hơn thế nữa. Hi vọng sẽ có cơ hội được phục vụ bạn trực tiếp."
                    }
                  ].map((rev, idx) => (
                    <div key={idx} className="p-5 bg-slate-50 rounded-[24px] border border-slate-100">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-sm font-black text-slate-800">{rev.user}</p>
                          <div className="flex gap-0.5 mt-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={cn("w-2.5 h-2.5", i < rev.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200")} />
                            ))}
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{rev.time}</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed italic">"{rev.comment}"</p>
                      
                      {rev.reply && (
                        <div className="mt-4 p-4 bg-white rounded-2xl border border-primary/10 relative">
                          <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-l border-t border-primary/10 rotate-45" />
                          <p className="text-[10px] font-black uppercase text-primary mb-1">Phản hồi từ nhà hàng</p>
                          <p className="text-xs text-slate-500 leading-relaxed">{rev.reply}</p>
                        </div>
                      )}
                      
                      <div className="mt-4 flex gap-2">
                        <button className="text-[10px] font-black uppercase text-primary tracking-widest px-3 py-1.5 bg-white rounded-lg border border-primary/10 shadow-sm">Phản hồi</button>
                        <button className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-3 py-1.5 bg-white rounded-lg border border-slate-100 shadow-sm">Ghim</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
