import { categories } from "@/data/dummyData";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

interface CategoryMenuProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (subcategory: string) => void;
}

const CategoryMenu = ({
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
}: CategoryMenuProps) => {
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const { t } = useTranslation();

  const toggleCategory = (categoryId: string) => {
    if (openCategories.includes(categoryId)) {
      setOpenCategories(openCategories.filter(id => id !== categoryId));
    } else {
      setOpenCategories([...openCategories, categoryId]);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
    setSelectedSubcategory('');
    toggleCategory(categoryId);
  };

  const handleSubcategoryClick = (subcategory: string) => {
    setSelectedSubcategory(subcategory === selectedSubcategory ? '' : subcategory);
  };

  return (
    <div className="w-64 bg-card rounded-lg border p-4 shadow-sm">
      <h3 className="font-semibold text-lg mb-4">{t('categories.title')}</h3>
      <div className="space-y-1">
        <Button
          variant={selectedCategory === '' ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => {
            setSelectedCategory('');
            setSelectedSubcategory('');
          }}
        >
          {t('filters.all')}
        </Button>
        {categories.map((category) => {
          const IconComponent = (LucideIcons as any)[category.icon] || LucideIcons.Circle;
          const isOpen = openCategories.includes(category.id);
          const isSelected = selectedCategory === category.id;

          return (
            <Collapsible
              key={category.id}
              open={isOpen}
              onOpenChange={() => toggleCategory(category.id)}
            >
              <div className="space-y-1">
                <CollapsibleTrigger asChild>
                  <Button
                    variant={isSelected ? 'secondary' : 'ghost'}
                    className="w-full justify-between"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <span className="flex items-center">
                      <IconComponent className="h-4 w-4 mx-2" />
                      {t(`categories.${category.id}`)}
                    </span>
                    {category.subcategories && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          isOpen ? 'transform rotate-180' : ''
                        }`}
                      />
                    )}
                  </Button>
                </CollapsibleTrigger>
                {category.subcategories && (
                  <CollapsibleContent className="space-y-1 px-4">
                    {category.subcategories.map((subcategory) => (
                      <Button
                        key={subcategory}
                        variant={selectedSubcategory === subcategory ? 'secondary' : 'ghost'}
                        className="w-full justify-start text-sm"
                        onClick={() => handleSubcategoryClick(subcategory)}
                      >
                        {t(`categories.${subcategory}`)}
                      </Button>
                    ))}
                  </CollapsibleContent>
                )}
              </div>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryMenu;
