import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

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
  return (
    <div className="w-64 bg-card rounded-lg border p-4 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>

      <Separator />

      {/* Sort By */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Sort By</Label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Price Range</Label>
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
        <Label className="text-sm font-semibold">Condition</Label>
        <RadioGroup value={condition} onValueChange={setCondition}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all" className="font-normal cursor-pointer">
              All
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="new" id="new" />
            <Label htmlFor="new" className="font-normal cursor-pointer">
              New
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="used" id="used" />
            <Label htmlFor="used" className="font-normal cursor-pointer">
              Used
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterSidebar;
