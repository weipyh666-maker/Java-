import { Vendor, Order, OrderStatus, User, Review, VendorInfo } from './types';

export const MOCK_USER: User = {
  name: "张伟",
  phone: "138 0013 8000",
  // Asian male avatar
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
  balance: 145.50,
  points: 1240,
  coupons: 3
};

// Helper to generate generic reviews
const generateReviews = (count: number): Review[] => {
  const reviews: Review[] = [
    {
      id: 'r1',
      userName: '李**',
      userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100',
      rating: 5,
      date: '2026-10-26',
      content: '味道非常好，送餐也很快，下次还会再来！',
    },
    {
      id: 'r2',
      userName: '王**',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100',
      rating: 4,
      date: '2026-10-25',
      content: '包装很严实，没有洒漏。分量也很足。',
      reply: '商家回复：感谢您的支持，期待您的再次光临！'
    },
    {
      id: 'r3',
      userName: 'Chen',
      userAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=100',
      rating: 5,
      date: '2026-10-20',
      content: 'yyds! 闭眼冲！',
    }
  ];
  return reviews.slice(0, count);
};

const commonInfo: VendorInfo = {
  address: "中山路188号",
  phone: "027-88888888",
  openingHours: "10:00 - 22:00",
  announcement: "用餐高峰期请提前下单，以免久候。",
  services: ["WIFI", "宝宝椅", "无烟区"]
};

export const MOCK_VENDORS: Vendor[] = [
  {
    id: '1',
    name: "汉堡王(中山路)",
    rating: 4.8,
    ratingCount: 1200,
    distance: "0.8km",
    timeEstimate: "25分钟",
    deliveryFee: 3,
    minOrderPrice: 20,
    tags: ["西式快餐", "汉堡", "炸鸡"],
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",
    promotion: "满30减15",
    isPickupAvailable: true,
    address: "中山路188号",
    info: { ...commonInfo, address: "中山路188号" },
    reviews: generateReviews(3),
    menu: [
      { id: '101', category: '必点主食', name: '皇堡', price: 24, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300', description: '火烤牛肉，经典美味', sales: 1200 },
      { id: '102', category: '必点主食', name: '双层芝士牛堡', price: 28, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=300', description: '双层牛肉，双层满足', sales: 950 },
      { id: '103', category: '必点主食', name: '狠霸王牛堡', price: 32, image: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?q=80&w=300', description: '超大分量，肉食者最爱', sales: 500 },
      { id: '104', category: '小食甜点', name: '大份薯条', price: 12, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=300', description: '金黄酥脆，经典配方', sales: 2000 },
      { id: '105', category: '小食甜点', name: '霸王鸡条(5条)', price: 12, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=300', description: '鲜嫩多汁，香辣可口', sales: 800 },
      { id: '106', category: '小食甜点', name: '巧克力圣代', price: 8, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=300', description: '浓郁巧克力酱', sales: 600 },
      { id: '107', category: '快乐肥宅水', name: '可口可乐(中)', price: 8, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=300', sales: 1500 },
      { id: '108', category: '快乐肥宅水', name: '零度可乐', price: 8, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=300', sales: 800 },
    ]
  },
  {
    id: '2',
    name: "鲜道寿司",
    rating: 4.9,
    ratingCount: 850,
    distance: "2.5km",
    timeEstimate: "45分钟",
    deliveryFee: 5,
    minOrderPrice: 50,
    tags: ["日料", "寿司", "刺身"],
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600&auto=format&fit=crop",
    promotion: "赠送加州卷一份",
    isPickupAvailable: true,
    address: "海淀区中关村大街1号",
    info: { ...commonInfo, address: "海淀区中关村大街1号", openingHours: "11:00 - 21:00" },
    reviews: generateReviews(3),
    menu: [
      { id: '201', category: '极鲜刺身', name: '三文鱼刺身(5片)', price: 48, image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?q=80&w=300', description: '挪威直运，厚切口感', sales: 300 },
      { id: '202', category: '极鲜刺身', name: '北极甜虾(10只)', price: 58, image: 'https://images.unsplash.com/photo-1559563820-e717df302324?q=80&w=300', sales: 200 },
      { id: '203', category: '手握寿司', name: '火炙三文鱼手握(2粒)', price: 16, image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=300', description: '火炙香气，入口即化', sales: 600 },
      { id: '204', category: '手握寿司', name: '蒲烧鳗鱼手握(2粒)', price: 18, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=300', sales: 500 },
      { id: '205', category: '经典卷物', name: '招牌加州卷', price: 22, image: 'https://images.unsplash.com/photo-1558985250-27a406d64cb3?q=80&w=300', sales: 800 },
      { id: '206', category: '暖胃汤品', name: '日式味噌汤', price: 6, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=300', sales: 1000 },
    ]
  },
  {
    id: '3',
    name: "老北京炸酱面",
    rating: 4.5,
    ratingCount: 500,
    distance: "1.2km",
    timeEstimate: "30分钟",
    deliveryFee: 0,
    minOrderPrice: 15,
    tags: ["面食", "北京菜", "家常菜"],
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=600&auto=format&fit=crop",
    isPickupAvailable: true,
    address: "东城区南锣鼓巷12号",
    info: { ...commonInfo, address: "东城区南锣鼓巷12号" },
    reviews: generateReviews(2),
    menu: [
      { id: '301', category: '招牌面食', name: '老北京炸酱面', price: 18, image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=300', description: '八样菜码，秘制干黄酱', sales: 1500 },
      { id: '302', category: '招牌面食', name: '西红柿鸡蛋面', price: 16, image: 'https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?q=80&w=300', sales: 600 },
      { id: '303', category: '招牌面食', name: '红烧牛肉面', price: 28, image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=300', sales: 400 },
      { id: '304', category: '经典凉菜', name: '拍黄瓜', price: 8, image: 'https://images.unsplash.com/photo-1625938145744-e3805152422b?q=80&w=300', description: '清爽解腻', sales: 900 },
      { id: '305', category: '经典凉菜', name: '老醋花生', price: 10, image: 'https://images.unsplash.com/photo-1582234057697-3f338d35661d?q=80&w=300', sales: 700 },
      { id: '306', category: '京味饮品', name: '北冰洋汽水', price: 6, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=300', sales: 1200 },
      { id: '307', category: '京味饮品', name: '自熬酸梅汤', price: 5, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=300', sales: 800 },
    ]
  },
  {
    id: '4',
    name: "轻食主义沙拉",
    rating: 4.7,
    ratingCount: 300,
    distance: "0.5km",
    timeEstimate: "15分钟",
    deliveryFee: 2,
    minOrderPrice: 25,
    tags: ["健康餐", "沙拉", "低卡"],
    // Fresh salad image
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop",
    promotion: "鲜榨果汁买一送一",
    isPickupAvailable: true,
    address: "朝阳区三里屯SOHO",
    info: commonInfo,
    reviews: generateReviews(3),
    menu: [
       { id: '401', category: '主食沙拉', name: '鸡胸肉考伯沙拉', price: 28, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=300', sales: 100 },
       { id: '402', category: '主食沙拉', name: '大虾牛油果沙拉', price: 38, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=300', sales: 80 }
    ]
  },
  {
    id: '5',
    name: "深夜烧烤",
    rating: 4.2,
    ratingCount: 2000,
    distance: "5.0km",
    timeEstimate: "60分钟",
    deliveryFee: 8,
    minOrderPrice: 50,
    tags: ["烧烤", "烤串", "夜宵"],
    // BBQ/Skewers image
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
    isPickupAvailable: false, // Delivery only
    address: "丰台区方庄美食街",
    info: { ...commonInfo, openingHours: "17:00 - 04:00" },
    reviews: generateReviews(1),
    menu: [
       { id: '501', category: '必点肉串', name: '羊肉串(10串)', price: 30, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=300', sales: 200 },
       { id: '502', category: '必点肉串', name: '烤鸡翅(2串)', price: 12, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=300', sales: 150 }
    ]
  },
  {
    id: '6',
    name: "张虎麻辣烫",
    rating: 4.6,
    ratingCount: 320,
    distance: "1.5km",
    timeEstimate: "35分钟",
    deliveryFee: 1.5,
    minOrderPrice: 18,
    tags: ["麻辣烫", "川菜", "小吃"],
    // Spicy soup bowl
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=600&auto=format&fit=crop",
    promotion: "满25减8",
    isPickupAvailable: true,
    address: "中山路210号",
    info: commonInfo,
    reviews: generateReviews(2),
    menu: [
       { id: '601', category: '自选套餐', name: '单人超值套餐', price: 22, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=300', sales: 500 }
    ]
  },
  {
    id: '7',
    name: "塔斯特中国汉堡",
    rating: 4.7,
    ratingCount: 560,
    distance: "2.1km",
    timeEstimate: "40分钟",
    deliveryFee: 4,
    minOrderPrice: 25,
    tags: ["中式汉堡", "炸鸡", "国潮"],
    // Burger
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop",
    promotion: "新品套餐8折",
    isPickupAvailable: true,
    address: "建设大道55号",
    info: commonInfo,
    reviews: generateReviews(2),
    menu: [
       { id: '701', category: '主食', name: '香辣鸡腿堡', price: 16, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=300', sales: 200 }
    ]
  },
  {
    id: '8',
    name: "蜜雪冰城",
    rating: 4.9,
    ratingCount: 2000,
    distance: "0.6km",
    timeEstimate: "20分钟",
    deliveryFee: 0,
    minOrderPrice: 10,
    tags: ["奶茶", "冰淇淋", "饮品"],
    // Ice cream/drink
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=600&auto=format&fit=crop",
    isPickupAvailable: true,
    address: "中山路步行街A01",
    info: commonInfo,
    reviews: generateReviews(5),
    menu: [
       { id: '801', category: '招牌', name: '冰鲜柠檬水', price: 4, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=300', sales: 5000 },
       { id: '802', category: '冰淇淋', name: '新鲜冰淇淋', price: 2, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=300', sales: 3000 }
    ]
  },
  {
    id: '9',
    name: "好利来(万达店)",
    rating: 4.8,
    ratingCount: 2200,
    distance: "1.2km",
    timeEstimate: "30分钟",
    deliveryFee: 2,
    minOrderPrice: 25,
    tags: ["甜点", "蛋糕", "面包"],
    // Cake/Pastry
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop",
    promotion: "半熟芝士买二送一",
    isPickupAvailable: true,
    address: "中山路万达广场1楼",
    info: commonInfo,
    reviews: generateReviews(3),
    menu: [
       { id: '901', category: '网红产品', name: '半熟芝士(5枚)', price: 38, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=300', sales: 1000 }
    ]
  },
  {
    id: '10',
    name: "全家便利店",
    rating: 4.6,
    ratingCount: 500,
    distance: "0.3km",
    timeEstimate: "20分钟",
    deliveryFee: 0,
    minOrderPrice: 0,
    tags: ["超市", "便利店", "零食"],
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop",
    isPickupAvailable: true,
    address: "中山路166号",
    info: { ...commonInfo, openingHours: "24小时营业" },
    reviews: generateReviews(2),
    menu: [
      { id: '1001', category: '快乐水', name: '可口可乐 500ml', price: 3.5, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=300', sales: 900 },
      { id: '1002', category: '快乐水', name: '农夫山泉 550ml', price: 2, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=300', sales: 1200 },
      { id: '1003', category: '休闲零食', name: '乐事薯片(原味)', price: 7.5, image: 'https://images.unsplash.com/photo-1566478919030-26d81dd812de?q=80&w=300', sales: 500 },
      { id: '1004', category: '休闲零食', name: '卫龙辣条', price: 4, image: 'https://images.unsplash.com/photo-1566478919030-26d81dd812de?q=80&w=300', sales: 800 },
      { id: '1005', category: '速食便当', name: '咖喱猪排饭', price: 16.8, image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=300', sales: 200 },
      { id: '1006', category: '日用百货', name: '清风纸巾', price: 2, image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=300', sales: 300 },
    ]
  },
  {
    id: '12',
    name: "海王星辰健康药房",
    rating: 4.7,
    ratingCount: 150,
    distance: "1.5km",
    timeEstimate: "30分钟",
    deliveryFee: 4,
    minOrderPrice: 0,
    tags: ["药店", "药品", "口罩"],
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=600&auto=format&fit=crop",
    isPickupAvailable: true,
    address: "建设大道12号",
    info: { ...commonInfo, openingHours: "24小时营业", announcement: "夜间买药请按门铃" },
    reviews: generateReviews(1),
    menu: [
      { id: '1201', category: '感冒用药', name: '999感冒灵颗粒', price: 15, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300', sales: 200 },
      { id: '1202', category: '感冒用药', name: '连花清瘟胶囊', price: 24, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300', sales: 300 },
      { id: '1203', category: '日常护理', name: '医用外科口罩(10只)', price: 5, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300', sales: 1000 },
      { id: '1204', category: '日常护理', name: '75%酒精消毒液', price: 8, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300', sales: 400 },
      { id: '1205', category: '家庭常备', name: '创可贴(20片)', price: 6, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300', sales: 500 },
      { id: '1206', category: '家庭常备', name: '电子体温计', price: 29, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300', sales: 100 },
    ]
  },
  {
    id: '13',
    name: "UU跑腿",
    rating: 4.8,
    ratingCount: 3000,
    distance: "附近",
    timeEstimate: "最快15分钟",
    deliveryFee: 10,
    minOrderPrice: 0,
    tags: ["跑腿", "帮买", "帮送"],
    // Updated image for runner service
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=600",
    isPickupAvailable: false,
    address: "全城服务",
    info: { ...commonInfo, address: "全城覆盖", announcement: "24小时接单，风雨无阻" },
    reviews: generateReviews(5),
    menu: [
      { id: '1301', category: '帮我买', name: '代买咖啡/奶茶', price: 15, image: 'https://images.unsplash.com/photo-1596525727187-57551000490d?q=80&w=300', description: '指定店铺，指定商品', sales: 5000 },
      { id: '1302', category: '帮我买', name: '代买香烟/酒水', price: 15, image: 'https://images.unsplash.com/photo-1596525727187-57551000490d?q=80&w=300', description: '附近购买，快速送达', sales: 2000 },
      { id: '1303', category: '帮我买', name: '万能代买 (任意商品)', price: 20, image: 'https://images.unsplash.com/photo-1596525727187-57551000490d?q=80&w=300', description: '备注商品详情，实报实销', sales: 3000 },
      { id: '1304', category: '帮我送', name: '3公里内文件配送', price: 12, image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=300', description: '专人直送，安全快捷', sales: 4000 },
      { id: '1305', category: '帮我送', name: '同城急送 (5-10公里)', price: 25, image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=300', description: '一小时达', sales: 1500 },
      { id: '1306', category: '帮办事', name: '代排队 (1小时)', price: 40, image: 'https://images.unsplash.com/photo-1596525727187-57551000490d?q=80&w=300', description: '网红店、医院挂号等', sales: 800 },
    ]
  },
  {
    id: '14',
    name: "茶百道",
    rating: 4.7,
    ratingCount: 1500,
    distance: "0.7km",
    timeEstimate: "25分钟",
    deliveryFee: 0,
    minOrderPrice: 15,
    tags: ["奶茶", "饮品", "果茶"],
    image: "https://images.unsplash.com/photo-1543253687-c931c8e01820?q=80&w=600&auto=format&fit=crop",
    promotion: "招牌豆乳玉麒麟7折",
    isPickupAvailable: true,
    address: "中山路步行街B12",
    info: commonInfo,
    reviews: generateReviews(2),
    menu: [
        { id: '1401', category: '招牌', name: '豆乳玉麒麟', price: 16, image: 'https://images.unsplash.com/photo-1543253687-c931c8e01820?q=80&w=300', sales: 800 }
    ]
  },
  {
    id: '16',
    name: "大润发",
    rating: 4.8,
    ratingCount: 900,
    distance: "3.0km",
    timeEstimate: "60分钟",
    deliveryFee: 6,
    minOrderPrice: 39,
    tags: ["超市", "生鲜", "日用品"],
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=600&auto=format&fit=crop",
    promotion: "周末大促",
    isPickupAvailable: true,
    address: "建设大道888号",
    info: { ...commonInfo, openingHours: "08:00 - 22:00" },
    reviews: generateReviews(2),
    menu: [
        { id: '1601', category: '生鲜', name: '精品五花肉 500g', price: 25, image: 'https://images.unsplash.com/photo-1607623814075-e51df1bd6562?q=80&w=300', sales: 300 }
    ]
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: '1001',
    vendorId: '1',
    vendorName: "汉堡王(中山路)",
    vendorImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",
    items: [
      { name: "双层芝士牛堡", quantity: 1, price: 28 },
      { name: "大份薯条", quantity: 1, price: 12 }
    ],
    totalAmount: 40,
    status: OrderStatus.PREPARING,
    date: "2026-10-27 12:30",
    mode: 'delivery'
  },
  {
    id: '1002',
    vendorId: '2',
    vendorName: "鲜道寿司",
    vendorImage: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600&auto=format&fit=crop",
    items: [
      { name: "三文鱼刺身(5片)", quantity: 2, price: 48 }, // Fixed mismatched name
      { name: "日式味噌汤", quantity: 2, price: 6 } // Fixed mismatched name
    ],
    totalAmount: 108,
    status: OrderStatus.COMPLETED,
    date: "2026-10-26 19:15",
    mode: 'pickup'
  },
  {
    id: '1003',
    vendorId: '3',
    vendorName: "老北京炸酱面",
    vendorImage: "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=600&auto=format&fit=crop",
    items: [
      { name: "老北京炸酱面", quantity: 1, price: 18 } // Fixed mismatched name
    ],
    totalAmount: 18,
    status: OrderStatus.CANCELLED,
    date: "2026-10-25 11:45",
    mode: 'delivery'
  }
];