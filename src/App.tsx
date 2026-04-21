import React, { useState } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { UserHome } from './components/UserHome';
import { DealDetails } from './components/DealDetails';
import { RestaurantDashboard } from './components/RestaurantDashboard';
import { UserProfile } from './components/UserProfile';
import { Deal } from './types';
import { Home, User as UserIcon, Store, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

const MainLayout = () => {
  const { currentUser, currentRestaurant, loginUser, loginRestaurant } = useApp();
  const [activeView, setActiveView] = useState<'home' | 'profile' | 'dashboard'>('home');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [showNomMatchInfo, setShowNomMatchInfo] = useState(false);

  if (!currentUser && !currentRestaurant) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 overflow-hidden relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm text-center relative z-10"
        >
          <div className="bg-white rounded-[40px] p-10 nomnomz-shadow border border-slate-100">
            <div className="flex flex-col items-center mb-6">
              <h1 className="text-5xl font-black text-primary italic tracking-tighter">NOMNOMz</h1>
            </div>
            <p className="text-slate-500 font-medium text-base leading-snug mb-10">
              Just Nomnomz!
            </p>

            <div className="space-y-4">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  loginUser('0901234567');
                  setActiveView('home');
                }}
                className="w-full py-5 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg shadow-green-900/10 flex items-center justify-center gap-3"
              >
                <UserIcon className="w-5 h-5" /> Khách hàng
              </motion.button>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => loginRestaurant('0907654321')}
                className="w-full py-5 bg-white border-2 border-slate-100 text-slate-400 rounded-2xl font-bold text-lg flex items-center justify-center gap-3"
              >
                <Store className="w-5 h-5" /> Đối tác
              </motion.button>
            </div>
          </div>
          
          <motion.button 
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowNomMatchInfo(true)}
            className="mt-8 w-full bg-primary/5 p-6 rounded-3xl border border-primary/10 transition-colors hover:bg-primary/10"
          >
            <p className="text-primary font-bold text-sm italic">About us</p>
          </motion.button>
        </motion.div>

        {/* About Us Modal */}
        <AnimatePresence>
          {showNomMatchInfo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowNomMatchInfo(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl text-left max-h-[80vh] overflow-y-auto"
              >
                <h3 className="text-2xl font-black text-primary italic mb-4">NOMNOMz</h3>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p className="font-bold text-slate-900">Team 8386 xin chào!</p>
                  <p>
                    <span className="font-bold text-slate-800">Chúng tôi là ai?</span> Chỉ là những con người nhỏ bé đang tìm cách sống rực rỡ. NOMNOMz được tạo nên từ tiếng ăn nhomnhom và genz. Đối với chúng tôi, đã dám thử hôm nay đã là thành công, nhưng nếu được ủng hộ thì mới trọn vẹn! 
                  </p>
                  <p>
                    Chúng tôi vận hành mô hình kinh doanh cùng có lợi cho tất cả các bên: con người, lợi nhuận và hành tinh.
                  </p>
                  <p>
                    <span className="font-bold text-slate-800">Sứ mệnh</span> của chúng tôi là giúp cứu vớt thực phẩm tốt khỏi bị lãng phí. Bằng cách đó, chúng tôi giúp các doanh nghiệp khai thác doanh thu và tăng độ nhận diện, giúp người tiêu dùng thưởng thức thực phẩm ngon với giá cả phải chăng, và trao quyền cho nhân viên và đối tác của chúng tôi để giúp bảo vệ môi trường.
                  </p>
                  <p>
                    <span className="font-bold text-slate-800">Trách nhiệm</span> của chúng tôi là đảm bảo lợi ích các bên: sức khỏe khách hàng - lợi nhuận doanh nghiệp - ESG cho hành tinh.
                  </p>
                  <p>
                    <span className="font-bold text-slate-800">Giá trị cốt lõi</span> của chúng tôi là trân thành - trách nhiệm - bền vững. 
                  </p>
                  <p>
                    <span className="font-bold text-slate-800">Tầm nhìn</span> của chúng tôi là trở thành công ty đạt chứng nhận B Corp và có tác động xã hội, với sứ mệnh truyền cảm hứng và trao quyền cho mọi người.
                  </p>
                  <p className="italic">
                    8386 và NOMNOMz vẫn còn non trẻ, không thể tránh khỏi sai sót. Mong nhận được sự ủng hộ từ mọi người.
                  </p>
                  <p className="font-bold text-primary">8386 trân thành cảm ơn!</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNomMatchInfo(false)}
                  className="mt-8 w-full py-3 bg-secondary text-primary font-bold rounded-xl"
                >
                  Đóng
                </motion.button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (currentRestaurant) {
    return <RestaurantDashboard />;
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        {selectedDeal ? (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="absolute inset-0 z-50 overflow-y-auto"
          >
            <DealDetails 
              deal={selectedDeal} 
              onBack={() => {
                setSelectedDeal(null);
                // Redirect back to home interface as requested
                setActiveView('home'); 
              }} 
            />
          </motion.div>
        ) : (
          <motion.div
            key={activeView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {activeView === 'home' && <UserHome onSelectDeal={setSelectedDeal} />}
            {activeView === 'profile' && <UserProfile />}
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedDeal && (
        <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-100 flex items-center justify-around z-40">
          {[
            { id: 'home', icon: Home, label: 'Trang chủ' },
            { id: 'profile', icon: UserIcon, label: 'Cá nhân' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as any)}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors duration-300",
                activeView === item.id ? "text-primary" : "text-slate-400"
              )}
            >
              <item.icon className={cn("w-6 h-6", activeView === item.id ? "stroke-[2.5px]" : "stroke-[2px]")} />
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-wider",
                activeView === item.id ? "opacity-100" : "opacity-80"
              )}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

