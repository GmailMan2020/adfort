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

export const dummyAds: Ad[] = [
  {
    id: '1',
    title: 'iPhone 14 Pro Max 256GB - Like New',
    price: 1200,
    location: 'New York, Manhattan',
    postedDate: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400',
    category: 'electronics',
    subcategory: 'Phones',
    condition: 'used',
    description: 'iPhone 14 Pro Max in excellent condition. Barely used for 3 months. Comes with original box and accessories.',
    images: [
      'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=800',
      'https://images.unsplash.com/photo-1678911820864-e5c67c5d1f14?w=800'
    ],
    seller: {
      name: 'John Smith',
      phone: '+1 555-0123',
      verified: true
    },
    featured: true
  },
  {
    id: '2',
    title: 'Modern 2BR Apartment Downtown',
    price: 2500,
    location: 'San Francisco, CA',
    postedDate: '2024-01-14',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
    category: 'real-estate',
    subcategory: 'Apartments',
    condition: 'new',
    description: 'Beautiful 2-bedroom apartment in the heart of downtown. Modern amenities, gym, and parking included.',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    ],
    seller: {
      name: 'Sarah Johnson',
      phone: '+1 555-0124',
      verified: true
    },
    urgent: true
  },
  {
    id: '3',
    title: '2020 Honda Civic - Low Mileage',
    price: 18500,
    location: 'Los Angeles, CA',
    postedDate: '2024-01-13',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400',
    category: 'vehicles',
    subcategory: 'Cars',
    condition: 'used',
    description: 'Well-maintained Honda Civic with only 25k miles. Single owner, all service records available.',
    images: [
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'
    ],
    seller: {
      name: 'Mike Wilson',
      phone: '+1 555-0125',
      verified: false
    }
  },
  {
    id: '4',
    title: 'Gaming Laptop RTX 4070 - Brand New',
    price: 1800,
    location: 'Seattle, WA',
    postedDate: '2024-01-12',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
    category: 'electronics',
    subcategory: 'Computers',
    condition: 'new',
    description: 'High-performance gaming laptop with RTX 4070. Never used, still in original packaging.',
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800'
    ],
    seller: {
      name: 'Tech Store',
      phone: '+1 555-0126',
      verified: true
    },
    featured: true
  },
  {
    id: '5',
    title: 'Scandinavian Dining Table Set',
    price: 450,
    location: 'Portland, OR',
    postedDate: '2024-01-11',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400',
    category: 'home-kitchen',
    subcategory: 'Furniture',
    condition: 'used',
    description: 'Beautiful Scandinavian-style dining table with 4 chairs. Solid wood construction.',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800'
    ],
    seller: {
      name: 'Emily Chen',
      phone: '+1 555-0127',
      verified: false
    }
  },
  {
    id: '6',
    title: 'Professional Photographer Available',
    price: 200,
    location: 'Boston, MA',
    postedDate: '2024-01-10',
    image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400',
    category: 'services',
    subcategory: 'Professional',
    condition: 'new',
    description: 'Experienced photographer offering portrait, event, and product photography services.',
    images: [
      'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800'
    ],
    seller: {
      name: 'David Lee',
      phone: '+1 555-0128',
      verified: true
    }
  },
  {
    id: '7',
    title: 'Nike Air Max Sneakers - Size 10',
    price: 95,
    location: 'Chicago, IL',
    postedDate: '2024-01-09',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    category: 'personal',
    subcategory: 'Clothing',
    condition: 'used',
    description: 'Gently used Nike Air Max sneakers. Clean and in great condition.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'
    ],
    seller: {
      name: 'Alex Brown',
      phone: '+1 555-0129',
      verified: false
    }
  },
  {
    id: '8',
    title: 'Electric Guitar Fender Stratocaster',
    price: 650,
    location: 'Austin, TX',
    postedDate: '2024-01-08',
    image: 'https://images.unsplash.com/photo-1556449895-a33c9dba33dd?w=400',
    category: 'leisure',
    subcategory: 'Music',
    condition: 'used',
    description: 'Classic Fender Stratocaster in excellent playing condition. Includes case and accessories.',
    images: [
      'https://images.unsplash.com/photo-1556449895-a33c9dba33dd?w=800'
    ],
    seller: {
      name: 'Music Store',
      phone: '+1 555-0130',
      verified: true
    }
  }
];

export const cities = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
  'San Antonio, TX',
  'San Diego, CA',
  'Dallas, TX',
  'San Jose, CA',
  'Austin, TX',
  'Jacksonville, FL',
  'San Francisco, CA',
  'Seattle, WA',
  'Denver, CO',
  'Boston, MA',
  'Portland, OR'
];
