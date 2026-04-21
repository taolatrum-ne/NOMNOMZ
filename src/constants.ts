import { Deal } from './types';

export const SEED_DEALS: Deal[] = [
  {
    id: '1',
    restaurantId: 'r1',
    restaurantName: 'Holiday Inn & Suites Saigon Airport',
    price: 59000,
    originalPrice: 600000,
    pickupStart: '2026-04-20T21:00:00',
    pickupEnd: '2026-12-31T23:59:59',
    quantityRemaining: 3,
    tags: ['fast food', 'Hải sản'],
    distance: '0.8 km',
    rating: 4.7,
    type: 'Buffet khách sạn 5 sao',
    description: 'Buffet khách sạn 5 sao, menu đa dạng, rất phù hợp concept surplus.',
    images: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1544025162-d2d05900ccca?auto=format&fit=crop&q=80&w=1000'
    ],
    location: '18E Cộng Hòa, Quận Tân Bình, TP.HCM',
    pickupLabel: 'Nhận trong 30 phút',
    isPaused: true
  },
  {
    id: '2',
    restaurantId: 'r2',
    restaurantName: 'La Brasserie – Hotel Nikko Saigon',
    price: 99000,
    originalPrice: 800000,
    pickupStart: '2026-04-20T21:30:00',
    pickupEnd: '2026-12-31T23:59:59',
    quantityRemaining: 10,
    tags: ['Hải sản', 'Thịt'],
    distance: '2.1 km',
    rating: 4.8,
    type: 'Hải sản cao cấp',
    description: 'Nổi tiếng với tôm hùm và các món hải sản cao cấp. Set buffet chất lượng thượng hạng.',
    images: [
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1533622519334-a705b810bb33?auto=format&fit=crop&q=80&w=1000'
    ],
    location: '235 Nguyễn Văn Cừ, Quận 1, TP.HCM',
    pickupLabel: 'Nhận trong 45 phút'
  },
  {
    id: '3',
    restaurantId: 'r3',
    restaurantName: 'Latest Recipe – Le Méridien Saigon',
    price: 150000,
    originalPrice: 800000,
    pickupStart: '2026-04-20T20:45:00',
    pickupEnd: '2026-12-31T23:59:59',
    quantityRemaining: 10,
    tags: ['Tráng miệng'],
    distance: '1.2 km',
    rating: 4.5,
    type: 'International Buffet',
    description: 'Sự giao thoa văn hóa ẩm thực Á - Âu tại không gian hiện đẳng cấp.',
    images: [
      'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&q=80&w=1000'
    ],
    location: '3C Tôn Đức Thắng, Quận 1, TP.HCM',
    pickupLabel: 'Nhận trong 30 phút',
    options: ['Standard Mix', 'Sweet Treat'],
    specificWarning: 'Sử dụng tốt nhất trong 2 giờ sau khi nhận',
    extraWarnings: [
      'Không phù hợp với người ăn chay',
      'Không phù hợp với người dị ứng các loại hạt'
    ]
  },
  {
    id: '4',
    restaurantId: 'r4',
    restaurantName: 'Buffet Liberty Central Riverside',
    price: 69000,
    originalPrice: 700000,
    pickupStart: '2026-04-20T21:00:00',
    pickupEnd: '2026-12-31T23:59:59',
    quantityRemaining: 15,
    tags: ['Hải sản', 'Thịt'],
    distance: '0.4 km',
    rating: 4.3,
    type: 'Buffet ven sông',
    description: 'Buffet đa dạng với view sông Sài Gòn thơ mộng.',
    images: [
      'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000'
    ],
    location: '17 Tôn Đức Thắng, Quận 1, TP.HCM',
    pickupLabel: 'Nhận trong 30 phút',
    options: ['Hải sản', 'BBQ', 'Tráng miệng'],
    specificWarning: 'Sử dụng tốt nhất trong 2 giờ sau khi nhận',
    certificationText: 'Cửa hàng này đã cứu được hơn 100kg thực phẩm'
  },
  {
    id: '5',
    restaurantId: 'r5',
    restaurantName: 'La Vela Saigon Buffet',
    price: 99000,
    originalPrice: 800000,
    pickupStart: '2026-04-20T21:15:00',
    pickupEnd: '2026-12-31T23:59:59',
    quantityRemaining: 5,
    tags: ['đồ ngọt', 'Fresh Mix'],
    distance: '2.5 km',
    rating: 4.5,
    type: 'Sky Buffet',
    description: 'Buffet trên cao với tầm nhìn 360 độ toàn thành phố.',
    images: [
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=1000'
    ],
    location: '280 Nam Kỳ Khởi Nghĩa, Quận 3, TP.HCM',
    pickupLabel: 'Nhận hàng trong 1 tiếng',
    options: ['Nut-Free', 'Patisserie'],
    specificWarning: 'Sử dụng tốt nhất trong 2 giờ sau khi nhận',
    extraWarnings: [
      'không phù hợp với người dị ứng đường'
    ]
  },
  {
    id: '6',
    restaurantId: 'r6',
    restaurantName: 'The Canvas – Lotte Hotel Saigon',
    price: 99000,
    originalPrice: 700000,
    pickupStart: '2026-04-22T12:00:00',
    pickupEnd: '2026-12-31T23:59:59',
    quantityRemaining: 15,
    tags: ['Veggie', 'Meat Lover'],
    distance: '0.6 km',
    rating: 4.6,
    type: 'Luxury',
    description: 'Trải nghiệm ẩm thực thượng hạng tại Lotte Hotel Saigon.',
    images: [
      'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1550966841-3ee7adac1661?auto=format&fit=crop&q=80&w=1000'
    ],
    location: '2A-4A Tôn Đức Thắng, Quận 1, TP.HCM',
    pickupLabel: 'Sắp mở bán',
    specificWarning: 'Sử dụng trong 2 giờ sau khi nhận',
    extraWarnings: [
      'Không phù hợp với người dị ứng sữa'
    ]
  }
];
