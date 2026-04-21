import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Deal, Order } from '../types';
import { formatVND, cn } from '../lib/utils';
import { useApp } from '../contexts/AppContext';
import { Star, Clock, MapPin, AlertCircle, ShoppingBag, ChevronLeft, Minus, Plus, ShieldCheck, Info } from 'lucide-react';

export const DealDetails: React.FC<{ deal: Deal; onBack: () => void }> = ({ deal, onBack }) => {
  const { addOrder, currentUser } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState(2);
  const [isOrdered, setIsOrdered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(deal.options ? deal.options[0] : null);

  useEffect(() => {
    if (deal.options) {
      setSelectedOption(deal.options[0]);
    } else {
      setSelectedOption(null);
    }
  }, [deal.id]);

  const [showCertTooltip, setShowCertTooltip] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'Tiền mặt' | 'MOMO' | 'VNPAYS'>('Tiền mặt');
  const [countdown, setCountdown] = useState(7);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showConfirmModal && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showConfirmModal, countdown]);

  const handleOrder = () => {
    setShowConfirmModal(true);
    setCountdown(7);
  };

  const confirmOrder = () => {
    setShowConfirmModal(false);
    setShowPaymentModal(true);
  };

  const processPayment = () => {
    const totalPrice = (deal.price / 2) * weight * quantity;
    const order: Order = {
      id: Math.random().toString(36).substr(2, 9),
      dealId: deal.id,
      restaurantName: deal.restaurantName,
      quantity: quantity,
      price: totalPrice,
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    addOrder(order);
    setIsOrdered(true);
    setShowPaymentModal(false);
    
    // Redirect to profile (where order tracking/history is) after payment
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  const isComingSoon = new Date(deal.pickupStart) > new Date();
  const canOrder = deal.quantityRemaining > 0 && !isComingSoon;

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Visual Header */}
      <div className="relative h-80">
        <img 
          src={deal.images[0]} 
          alt={deal.restaurantName}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="absolute top-12 left-6 w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-black leading-tight">{deal.restaurantName}</h1>
            {deal.certificationText && (
              <div className="relative">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowCertTooltip(!showCertTooltip)}
                  className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-white shadow-sm"
                >
                  <ShieldCheck className="w-3 h-3" />
                </motion.button>
                <AnimatePresence>
                  {showCertTooltip && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                      className="absolute bottom-full left-0 mb-2 w-48 bg-slate-900/90 backdrop-blur-md text-white text-[10px] p-2 rounded-xl border border-white/20 z-50 shadow-xl"
                    >
                      <p className="font-bold flex items-center mb-0.5">
                        <ShieldCheck className="w-2.5 h-2.5 mr-1 text-accent" /> Đối tác tin cậy
                      </p>
                      {deal.certificationText}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center text-xs font-bold">
              <Star className="w-3.5 h-3.5 mr-1 text-amber-400 fill-amber-400" />
              {deal.rating} sao
            </div>
            <div className="flex items-center text-xs font-bold">
              <MapPin className="w-3.5 h-3.5 mr-1 text-accent" />
              {deal.distance}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pt-8 -mt-6 rounded-t-3xl bg-white relative">
        <div className="flex items-center gap-2 mb-6">
          <span className="tag-green text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
            {deal.type}
          </span>
          <span className="tag-orange text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
            {deal.tags.join(', ')}
          </span>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-black text-slate-900 mb-2">Sunset Collection</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            {deal.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-secondary/30 p-4 rounded-2xl border border-secondary/50">
            <p className="text-[8px] uppercase font-bold text-primary mb-1">Thời gian nhận</p>
            <div className="flex items-center text-primary font-black uppercase text-xs">
              <Clock className="w-3 h-3 mr-1.5" />
              {deal.pickupLabel}
            </div>
          </div>
          <div className="bg-secondary/30 p-4 rounded-2xl border border-secondary/50">
            <p className="text-[8px] uppercase font-bold text-primary mb-1">Số lượng còn</p>
            <div className="flex items-center text-primary font-black uppercase text-xs">
              <ShoppingBag className="w-3 h-3 mr-1.5" />
              {isComingSoon ? 'Đang chuẩn bị' : `${deal.quantityRemaining} set dư`}
            </div>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex gap-4">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="text-[10px] text-red-800 leading-relaxed font-medium">
              <p className="font-bold mb-1 uppercase tracking-tight">⚠️ QUAN TRỌNG</p>
              <ul className="list-disc list-inside space-y-1">
                <li>{deal.specificWarning || 'Sử dụng tốt nhất trong 3 giờ sau khi nhận.'}</li>
                {deal.extraWarnings ? (
                  deal.extraWarnings.map((w, i) => <li key={i}>{w}</li>)
                ) : (
                  <li>Không phù hợp với người dị ứng hải sản.</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Options Selection */}
        {deal.options && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-slate-800">Chọn loại phần ăn (Set)</span>
              <span className="text-primary font-black text-xs uppercase bg-secondary/50 px-2 py-1 rounded-md">Yêu cầu</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {deal.options.map(option => (
                <motion.button
                  key={option}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedOption(option)}
                  className={cn(
                    "px-4 py-2.5 rounded-xl border-2 font-bold text-sm transition-all",
                    selectedOption === option 
                      ? "bg-primary border-primary text-white nomnomz-shadow" 
                      : "bg-white border-slate-100 text-slate-500"
                  )}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Order controls */}
        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="font-bold text-slate-800 block">Dự kiến khối lượng</span>
                <span className="text-[10px] text-slate-400 font-medium">Bạn có thể chọn từ 2kg - {deal.restaurantId === 'r2' ? '3kg' : '5kg'} cho set này</span>
              </div>
              <span className="text-primary font-black">{weight.toFixed(1)} kg</span>
            </div>
            <input 
              type="range" 
              min="2" 
              max={deal.restaurantId === 'r2' ? 3 : 5} 
              step="0.5" 
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2">
              <span>2 kg</span>
              <span>{deal.restaurantId === 'r2' ? '3 kg' : '5 kg'}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800">Số lượng set</span>
            <div className="flex items-center gap-4">
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary"
              >
                <Minus className="w-5 h-5" />
              </motion.button>
              <span className="text-lg font-black text-slate-900 w-4 text-center">{quantity}</span>
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(Math.min(deal.quantityRemaining, quantity + 1))}
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary"
              >
                <Plus className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Order Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 flex items-center gap-6">
        <div className="flex-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tổng cộng</p>
          {isComingSoon ? (
            <p className="text-sm font-bold text-slate-400 italic">Chưa công bố giá</p>
          ) : (
            <p className="text-xl font-black text-primary">{formatVND((deal.price / 2) * weight * quantity)}</p>
          )}
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleOrder}
          disabled={!canOrder || isOrdered}
          className={cn(
            "flex-[2] py-4 rounded-2xl text-white font-bold text-lg shadow-lg shadow-green-900/10 transition-all",
            canOrder && !isOrdered ? "bg-primary" : "bg-slate-300 pointer-events-none"
          )}
        >
          {isOrdered ? 'Đã đặt hàng!' : (isComingSoon ? `CHƯA MỞ BÁN` : (canOrder ? 'ĐẶT NGAY' : 'HẾT HÀNG'))}
        </motion.button>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirmModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[40px] p-10 shadow-2xl text-center border border-slate-100"
            >
              <div className="w-20 h-20 bg-secondary/50 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3">
                <AlertCircle className="w-10 h-10 text-primary -rotate-3" />
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Xác nhận đặt hàng</h3>
              
              <div className="space-y-4 mb-10">
                <p className="text-slate-500 text-sm font-medium leading-relaxed px-2">
                  Vui lòng kiểm tra lại thông tin và xác nhận bạn đồng ý với các điều khoản của chúng tôi.
                </p>
                
                <div className="p-3 bg-primary/5 rounded-2xl border border-primary/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-primary/5 rounded-full -mr-6 -mt-6 transition-transform group-hover:scale-150" />
                  <p className="text-primary font-black text-[10px] mb-1 italic relative z-10">
                    "Nomnomz: Để thưởng thức, để sẻ chia, không để bán."
                  </p>
                  <div className="h-px bg-primary/10 my-2" />
                  <p className="text-slate-500 font-bold text-[8px] leading-snug uppercase tracking-wider relative z-10">
                    Thực phẩm dành cho thưởng thức.<br/>Vui lòng không thương mại hóa dưới mọi hình thức !
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={confirmOrder}
                  disabled={countdown > 0}
                  className={cn(
                    "w-full py-5 rounded-[24px] font-black text-sm uppercase tracking-widest transition-all nomnomz-shadow",
                    countdown > 0 
                      ? "bg-slate-100 text-slate-400" 
                      : "bg-primary text-white shadow-xl shadow-green-900/10"
                  )}
                >
                  {countdown > 0 ? `Chờ xác nhận (${countdown}s)` : 'XÁC NHẬN NGAY'}
                </motion.button>
                
                <button 
                  onClick={() => setShowConfirmModal(false)}
                  className="w-full py-2 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-600 transition-colors"
                >
                  Bỏ qua đơn này
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Payment and Bill Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPaymentModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
            >
              <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8 sm:hidden" />
              
              <div className="mb-8">
                <h3 className="text-lg font-black text-slate-900 mb-4 px-1">Hóa đơn chi tiết</h3>
                <div className="bg-secondary/20 p-5 rounded-2xl border border-secondary/30 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-bold">Món ăn</span>
                    <span className="text-slate-800 font-black">{deal.restaurantName}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-bold">Lựa chọn</span>
                    <span className="text-slate-800 font-black">{selectedOption || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-bold">Khối lượng</span>
                    <span className="text-slate-800 font-black">{weight.toFixed(1)} kg x {quantity} set</span>
                  </div>
                  <div className="h-px bg-slate-200 my-1" />
                  <div className="flex justify-between items-center">
                    <span className="text-slate-800 font-black text-sm">Tổng thanh toán</span>
                    <span className="text-lg font-black text-primary">{formatVND((deal.price / 2) * weight * quantity)}</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <p className="font-bold text-slate-800 mb-4 px-1">Phương thức thanh toán</p>
                <div className="grid grid-cols-1 gap-3">
                  {(['Tiền mặt', 'MOMO', 'VNPAYS'] as const).map(method => (
                    <motion.button
                      key={method}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPaymentMethod(method)}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl border-2 transition-all",
                        paymentMethod === method 
                          ? "border-primary bg-primary/5 text-primary" 
                          : "border-slate-100 text-slate-500 bg-slate-50"
                      )}
                    >
                      <span className="font-black text-sm uppercase tracking-wide">{method}</span>
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        paymentMethod === method ? "border-primary bg-primary" : "border-slate-300"
                      )}>
                        {paymentMethod === method && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={processPayment}
                className="w-full py-5 bg-primary text-white font-black text-lg rounded-2xl nomnomz-shadow uppercase tracking-widest"
              >
                Hoàn tất thanh toán
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
