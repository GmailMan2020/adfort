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
  };
  urgent?: boolean;
  featured?: boolean;
}

export const categories: Category[] = [
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: 'Home',
    subcategories: ['Apartments', 'Houses', 'Commercial', 'Land']
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    icon: 'Car',
    subcategories: ['Cars', 'Motorcycles', 'Bicycles', 'Parts']
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: 'Laptop',
    subcategories: ['Phones', 'Computers', 'Cameras', 'Gaming']
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    icon: 'Sofa',
    subcategories: ['Furniture', 'Appliances', 'Decor', 'Garden']
  },
  {
    id: 'jobs',
    name: 'Jobs',
    icon: 'Briefcase',
    subcategories: ['Full-time', 'Part-time', 'Freelance', 'Internship']
  },
  {
    id: 'services',
    name: 'Services',
    icon: 'Wrench',
    subcategories: ['Repair', 'Cleaning', 'Moving', 'Professional']
  },
  {
    id: 'personal',
    name: 'Personal Items',
    icon: 'ShoppingBag',
    subcategories: ['Clothing', 'Accessories', 'Beauty', 'Sports']
  },
  {
    id: 'leisure',
    name: 'Leisure',
    icon: 'Music',
    subcategories: ['Books', 'Music', 'Games', 'Hobbies']
  },
  {
    id: 'misc',
    name: 'Miscellaneous',
    icon: 'MoreHorizontal',
    subcategories: ['Free Items', 'Exchange', 'Other']
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
  const titles = [
    'iPhone 14 Pro Max 256GB', 'شقة للإيجار 2 غرفة', 'هوندا سيفيك 2020', 'لابتوب ديل جديد',
    'طاولة طعام خشبية', 'خدمات تصوير احترافية', 'حذاء نايكي مقاس 42', 'جيتار فندر',
    'iPad Air 2024', 'فيلا للبيع 4 غرف', 'تويوتا كامري 2019', 'كاميرا كانون',
    'كنب جلد فاخر', 'مصمم جرافيك', 'ساعة رولكس أصلية', 'بلايستيشن 5',
    'Samsung Galaxy S23', 'مكتب للإيجار', 'مرسيدس E-Class', 'ماك بوك برو M3',
    'غرفة نوم كاملة', 'خدمات نقل أثاث', 'فستان زفاف', 'دراجة هوائية جبلية',
    'ثلاجة سامسونج', 'أرض للبيع', 'لكزس RX', 'جهاز ألعاب Xbox',
    'مكيف سبليت', 'محاسب خبير', 'حقيبة لويس فيتون', 'كتب جامعية',
    'غسالة LG', 'محل للإيجار', 'نيسان باترول', 'هاتف Xiaomi',
    'مرآة حائط كبيرة', 'مدرس خصوصي', 'عطر شانيل', 'آلة قهوة نسبريسو'
  ];
  
  const descriptions = [
    'حالة ممتازة، استخدام خفيف',
    'نظيف جداً، مع جميع الملحقات',
    'سعر قابل للتفاوض',
    'فرصة رائعة، سعر مناسب',
    'جودة عالية، ضمان متوفر',
    'للبيع بسبب السفر',
    'شبه جديد، بحالة الوكالة',
    'صيانة دورية، بدون حوادث'
  ];

  const categories = ['electronics', 'real-estate', 'vehicles', 'home-kitchen', 'jobs', 'services', 'personal', 'leisure'];
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
    'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400'
  ];

  const ads: Ad[] = [];
  
  for (let i = 1; i <= 100; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const price = Math.floor(Math.random() * 5000) + 50;
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    
    ads.push({
      id: i.toString(),
      title: titles[Math.floor(Math.random() * titles.length)] + ' ' + i,
      price: price,
      location: city,
      postedDate: date.toISOString().split('T')[0],
      image: images[Math.floor(Math.random() * images.length)],
      category: category,
      subcategory: 'متنوع',
      condition: condition,
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      images: [images[Math.floor(Math.random() * images.length)]],
      seller: {
        name: 'بائع ' + i,
        phone: '+973 ' + (3300 + i).toString() + ' ' + (1000 + i).toString(),
        verified: Math.random() > 0.5
      },
      featured: Math.random() > 0.9,
      urgent: Math.random() > 0.85
    });
  }
  
  return ads;
};

export const dummyAds: Ad[] = generateDummyAds();
