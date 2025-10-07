import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Plus, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./LanguageSwitcher";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cities } from "@/data/dummyData";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

const Header = ({ searchQuery, setSearchQuery, selectedCity, setSelectedCity }: HeaderProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur-lg shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center text-white font-bold text-xl shadow-lg transition-all duration-300 group-hover:shadow-accent/50 group-hover:scale-110">
              D
            </div>
            <span className="mx-2 text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ديوار</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('header.search')}
                className="h-12 px-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Location Selector */}
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-48">
              <MapPin className="h-4 w-4 mx-2" />
              <SelectValue placeholder={t('header.selectCity')} />
            </SelectTrigger>
            <SelectContent className="z-50 bg-popover">
              <SelectItem value="all">{t('header.allCities')}</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* User Menu */}
          <div className="flex items-center gap-2">
            <Button
              variant="gradient"
              className="font-semibold shadow-lg"
              onClick={() => navigate('/post-ad')}
            >
              <Plus className="h-5 w-5 mx-2" />
              {t('header.postAd')}
            </Button>
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/auth')}
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
