import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  condition: string;
  setCondition: (condition: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  onReset: () => void;
}

const FilterSidebar = ({
  priceRange,
  setPriceRange,
  condition,
  setCondition,
  sortBy,
  setSortBy,
  onReset,
}: FilterSidebarProps) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);
  const isRTL = i18n.language === 'ar';

  return (
    <div className="w-full bg-gradient-to-b from-card to-background rounded-lg border border-border/50 shadow-lg animate-slide-up">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('filters.title')}</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onReset}>
              {t('filters.reset')}
            </Button>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon">
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>

        <CollapsibleContent>
          <div className="p-4 space-y-6">
            {/* Sort By */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">{t('filters.sortBy')}</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-50 bg-popover">
                  <SelectItem value="newest">{t('filters.newest')}</SelectItem>
                  <SelectItem value="price-low">{t('filters.priceLow')}</SelectItem>
                  <SelectItem value="price-high">{t('filters.priceHigh')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Price Range */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">{t('filters.priceRange')}</Label>
              <div className="pt-2">
                <Slider
                  min={0}
                  max={5000}
                  step={100}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <Separator />

            {/* Condition */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">{t('filters.condition')}</Label>
              <RadioGroup value={condition} onValueChange={setCondition}>
                <div className={cn("flex items-center", isRTL ? "space-x-reverse space-x-2" : "space-x-2")}>
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all" className="font-normal cursor-pointer">
                    {t('filters.all')}
                  </Label>
                </div>
                <div className={cn("flex items-center", isRTL ? "space-x-reverse space-x-2" : "space-x-2")}>
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new" className="font-normal cursor-pointer">
                    {t('filters.new')}
                  </Label>
                </div>
                <div className={cn("flex items-center", isRTL ? "space-x-reverse space-x-2" : "space-x-2")}>
                  <RadioGroupItem value="used" id="used" />
                  <Label htmlFor="used" className="font-normal cursor-pointer">
                    {t('filters.used')}
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default FilterSidebar;
