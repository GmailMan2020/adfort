export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories?: string[];
}

export interface Ad {
  id: string;
  title: string;
  price: number;
  location: string;
  postedDate: string;
  image: string;
  category: string;
  subcategory?: string;
  condition: 'new' | 'used';
  description: string;
  images: string[];
  seller: {
    name: string;
    phone: string;
    verified: boolean;
    isBusiness?: boolean;
  };
  urgent?: boolean;
  featured?: boolean;
}

export const categories: Category[] = [
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: 'Home',
    subcategories: ['apartments', 'houses', 'commercial', 'land']
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    icon: 'Car',
    subcategories: ['cars', 'motorcycles', 'bicycles', 'parts']
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: 'Laptop',
    subcategories: ['phones', 'computers', 'cameras', 'gaming']
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    icon: 'Sofa',
    subcategories: ['furniture', 'appliances', 'decor', 'garden']
  },
  {
    id: 'jobs',
    name: 'Jobs',
    icon: 'Briefcase',
    subcategories: ['fullTime', 'partTime', 'freelance', 'internship']
  },
  {
    id: 'services',
    name: 'Services',
    icon: 'Wrench',
    subcategories: ['repair', 'cleaning', 'moving', 'professional']
  },
  {
    id: 'personal',
    name: 'Personal Items',
    icon: 'ShoppingBag',
    subcategories: ['clothing', 'accessories', 'beauty', 'sports']
  },
  {
    id: 'leisure',
    name: 'Leisure',
    icon: 'Music',
    subcategories: ['books', 'music', 'games', 'hobbies']
  },
  {
    id: 'misc',
    name: 'Miscellaneous',
    icon: 'MoreHorizontal',
    subcategories: ['freeItems', 'exchange', 'other']
  }
];

export const cities = [
  'المنامة',
  'المحرق',
  'الرفاع',
  'مدينة حمد',
  'مدينة عيسى',
  'سترة',
  'جدحفص',
  'البديع',
  'سار',
  'عالي',
  'الحد',
  'الدراز',
  'باربار',
  'بوري',
  'الجسرة'
];

const generateDummyAds = (): Ad[] => {
  const categoryData = {
    'real-estate': {
      subcategories: ['apartments', 'houses', 'commercial', 'land'],
      titles: ['شقة للإيجار', 'فيلا للبيع', 'مكتب تجاري', 'أرض سكنية', 'شقة مفروشة', 'بيت دورين', 'محل للإيجار'],
      priceRange: [500, 3000]
    },
    'vehicles': {
      subcategories: ['cars', 'motorcycles', 'bicycles', 'parts'],
      titles: ['تويوتا كامري', 'هوندا سيفيك', 'مرسيدس بنز', 'لكزس', 'نيسان', 'دراجة نارية ياماها', 'دراجة هوائية', 'قطع غيار'],
      priceRange: [1000, 5000]
    },
    'electronics': {
      subcategories: ['phones', 'computers', 'cameras', 'gaming'],
      titles: ['iPhone 14 Pro', 'Samsung Galaxy', 'MacBook Pro', 'لابتوب Dell', 'كاميرا Canon', 'PlayStation 5', 'Xbox Series X', 'آيباد'],
      priceRange: [200, 2000]
    },
    'home-kitchen': {
      subcategories: ['furniture', 'appliances', 'decor', 'garden'],
      titles: ['طاولة طعام', 'كنب جلد', 'غرفة نوم', 'ثلاجة سامسونج', 'غسالة LG', 'مكيف سبليت', 'مرآة ديكور', 'أدوات حديقة'],
      priceRange: [100, 1500]
    },
    'jobs': {
      subcategories: ['fullTime', 'partTime', 'freelance', 'internship'],
      titles: ['مهندس برمجيات', 'محاسب', 'مصمم جرافيك', 'مندوب مبيعات', 'موظف استقبال', 'مدير مشروع', 'مساعد إداري'],
      priceRange: [400, 2000]
    },
    'services': {
      subcategories: ['repair', 'cleaning', 'moving', 'professional'],
      titles: ['خدمات تصليح', 'تنظيف منازل', 'نقل أثاث', 'خدمات تصوير', 'تصميم داخلي', 'صيانة مكيفات', 'سباكة'],
      priceRange: [50, 500]
    },
    'personal': {
      subcategories: ['clothing', 'accessories', 'beauty', 'sports'],
      titles: ['فستان زفاف', 'بدلة رجالية', 'حقيبة لويس فيتون', 'ساعة رولكس', 'عطر شانيل', 'أحذية رياضية', 'معدات رياضية'],
      priceRange: [50, 1000]
    },
    'leisure': {
      subcategories: ['books', 'music', 'games', 'hobbies'],
      titles: ['كتب جامعية', 'مجموعة روايات', 'جيتار فندر', 'بيانو', 'ألعاب فيديو', 'أدوات رسم', 'معدات تصوير'],
      priceRange: [20, 800]
    },
    'misc': {
      subcategories: ['freeItems', 'exchange', 'other'],
      titles: ['أغراض مجانية', 'للتبادل', 'متنوعات', 'أثاث قديم', 'أدوات منزلية', 'إلكترونيات قديمة'],
      priceRange: [0, 300]
    }
  };
  
  const descriptions = [
    'حالة ممتازة، استخدام خفيف',
    'نظيف جداً، مع جميع الملحقات',
    'سعر قابل للتفاوض',
    'فرصة رائعة، سعر مناسب',
    'جودة عالية، ضمان متوفر',
    'للبيع بسبب السفر',
    'شبه جديد، بحالة الوكالة',
    'صيانة دورية، بدون حوادث',
    'استخدام شخصي فقط',
    'يمكن التوصيل مجاناً'
  ];

  const conditions: ('new' | 'used')[] = ['new', 'used'];
  const images = [
    'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
    'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400',
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
    'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400',
    'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    'https://images.unsplash.com/photo-1556449895-a33c9dba33dd?w=400',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400',
    'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400',
    'https://images.unsplash.com/photo-1585399000684-d2f72660f092?w=400'
  ];

  const ads: Ad[] = [];
  let adId = 1;
  
  // Generate at least 7 ads per subcategory
  Object.entries(categoryData).forEach(([category, data]) => {
    data.subcategories.forEach((subcategory) => {
      for (let i = 0; i < 7; i++) {
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const price = Math.floor(Math.random() * (data.priceRange[1] - data.priceRange[0])) + data.priceRange[0];
        const daysAgo = Math.floor(Math.random() * 30);
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        
        ads.push({
          id: adId.toString(),
          title: data.titles[Math.floor(Math.random() * data.titles.length)] + ' ' + adId,
          price: price,
          location: city,
          postedDate: date.toISOString().split('T')[0],
          image: images[Math.floor(Math.random() * images.length)],
          category: category,
          subcategory: subcategory,
          condition: condition,
          description: descriptions[Math.floor(Math.random() * descriptions.length)],
          images: [
            images[Math.floor(Math.random() * images.length)],
            images[Math.floor(Math.random() * images.length)],
            images[Math.floor(Math.random() * images.length)]
          ],
          seller: {
            name: 'بائع ' + adId,
            phone: '+973 ' + (3300 + adId).toString() + ' ' + (1000 + adId).toString(),
            verified: Math.random() > 0.4,
            isBusiness: Math.random() > 0.7 // 30% chance of being a business account
          },
          featured: Math.random() > 0.92,
          urgent: Math.random() > 0.88
        });
        
        adId++;
      }
    });
  });
  
  return ads;
};

export const dummyAds: Ad[] = generateDummyAds();
