import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { cities } from "@/data/dummyData";
import { useTranslation } from 'react-i18next';

interface CitySelectionDialogProps {
  open: boolean;
  onCitySelect: (city: string) => void;
}

const CitySelectionDialog = ({ open, onCitySelect }: CitySelectionDialogProps) => {
  const { t, i18n } = useTranslation();
  const [selectedCity, setSelectedCity] = useState("");
  const isRTL = i18n.language === 'ar';

  const handleConfirm = () => {
    if (selectedCity) {
      onCitySelect(selectedCity);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md" dir={isRTL ? 'rtl' : 'ltr'}>
        <DialogHeader>
          <DialogTitle className={isRTL ? 'text-right' : 'text-left'}>
            {t('header.selectCity')}
          </DialogTitle>
          <DialogDescription className={isRTL ? 'text-right' : 'text-left'}>
            {t('home.welcomeMessage')}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-full">
              <MapPin className="h-4 w-4 mx-2" />
              <SelectValue placeholder={t('header.selectCity')} />
            </SelectTrigger>
            <SelectContent className="z-[100] bg-popover">
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            onClick={handleConfirm} 
            className="w-full"
            disabled={!selectedCity}
          >
            {t('common.confirm')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CitySelectionDialog;
