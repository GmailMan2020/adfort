import { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import CategoryMenu from "@/components/CategoryMenu";
import FilterSidebar from "@/components/FilterSidebar";
import AdCard from "@/components/AdCard";
import CitySelectionDialog from "@/components/CitySelectionDialog";
import { dummyAds } from "@/data/dummyData";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const Home = () => {
  const { i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [condition, setCondition] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showCityDialog, setShowCityDialog] = useState(false);
  
  const isRTL = i18n.language === 'ar';

  // Check if user has selected a city before
  useEffect(() => {
    const savedCity = Cookies.get('selectedCity');
    if (!savedCity) {
      setShowCityDialog(true);
    } else {
      setSelectedCity(savedCity);
    }
  }, []);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    Cookies.set('selectedCity', city, { expires: 365 }); // Save for 1 year
    setShowCityDialog(false);
  };

  const handleResetFilters = () => {
    setPriceRange([0, 5000]);
    setCondition("all");
    setSortBy("newest");
    setSelectedCategory("");
    setSelectedSubcategory("");
  };

  const filteredAds = useMemo(() => {
    let filtered = [...dummyAds];

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter((ad) =>
        ad.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by city
    if (selectedCity && selectedCity !== "all") {
      filtered = filtered.filter((ad) => ad.location.includes(selectedCity.split(',')[0]));
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((ad) => ad.category === selectedCategory);
    }

    // Filter by subcategory
    if (selectedSubcategory) {
      filtered = filtered.filter((ad) => ad.subcategory === selectedSubcategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      (ad) => ad.price >= priceRange[0] && ad.price <= priceRange[1]
    );

    // Filter by condition
    if (condition !== "all") {
      filtered = filtered.filter((ad) => ad.condition === condition);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    searchQuery,
    selectedCity,
    selectedCategory,
    selectedSubcategory,
    priceRange,
    condition,
    sortBy,
  ]);

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <CitySelectionDialog 
        open={showCityDialog} 
        onCitySelect={handleCitySelect}
      />
      
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />

      <div className="container mx-auto px-4 py-6">
        <div className={`flex gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}  dir={isRTL ? 'ltr' : ''}>
          <div className="w-64 space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
            <CategoryMenu
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSubcategory={selectedSubcategory}
              setSelectedSubcategory={setSelectedSubcategory}
            />
            
            <FilterSidebar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              condition={condition}
              setCondition={setCondition}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onReset={handleResetFilters}
            />
          </div>

          <div className="flex-1">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">
                {filteredAds.length} {filteredAds.length === 1 ? 'Ad' : 'Ads'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
