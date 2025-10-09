import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { ArrowLeft, Upload, X, CheckCircle } from "lucide-react";
import { categories, cities } from "@/data/dummyData";
import { useTranslation } from 'react-i18next';

const PostAd = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const isRTL = i18n.language === 'ar';
  
  // Form state
  const [images, setImages] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("used");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 10));
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    if (mainImageIndex >= index && mainImageIndex > 0) {
      setMainImageIndex(mainImageIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (images.length === 0) {
        toast.error(t('postAd.pleaseUploadImages'));
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      toast.success(t('postAd.adPosted'));
      setIsLoading(false);
      navigate("/profile");
    }, 1500);
  };

  const selectedCategory = categories.find(cat => cat.id === category);

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('postAd.cancel')}
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{t('postAd.title')}</CardTitle>
            <div className="flex items-center gap-2 mt-4">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`flex-1 h-2 rounded-full transition-colors ${
                    step <= currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {currentStep === 1 && t('postAd.step1Title')}
              {currentStep === 2 && t('postAd.step2Title')}
              {currentStep === 3 && t('postAd.step3Title')}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* Step 1: Images */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>{t('postAd.uploadImages')}</Label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer block"
                    >
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {t('postAd.clickToUpload')}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {t('postAd.maxImages')}
                      </p>
                    </label>
                  </div>

                  {images.length > 0 && (
                    <div className="space-y-2">
                      <Label>{t('postAd.selectMainImage')}</Label>
                      <div className="grid grid-cols-3 gap-4">
                        {images.map((image, index) => (
                          <div
                            key={index}
                            className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                              mainImageIndex === index
                                ? 'border-primary ring-2 ring-primary'
                                : 'border-border hover:border-primary/50'
                            }`}
                            onClick={() => setMainImageIndex(index)}
                          >
                            <img
                              src={image}
                              alt={`${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            {mainImageIndex === index && (
                              <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                {t('postAd.mainImage')}
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(index);
                              }}
                              className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    type="button"
                    onClick={handleNext}
                    className="w-full"
                  >
                    {t('postAd.next')}
                  </Button>
                </div>
              )}

              {/* Step 2: Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">{t('postAd.adTitle')} *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={t('postAd.titlePlaceholder')}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">{t('postAd.category')} *</Label>
                      <Select value={category} onValueChange={setCategory} required>
                        <SelectTrigger id="category">
                          <SelectValue placeholder={t('postAd.selectCategory')} />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-popover" dir={isRTL ? 'rtl' : 'ltr'}>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {t(`categories.${cat.id}`)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedCategory?.subcategories && (
                      <div className="space-y-2">
                        <Label htmlFor="subcategory">{t('postAd.subcategory')}</Label>
                        <Select value={subcategory} onValueChange={setSubcategory}>
                          <SelectTrigger id="subcategory">
                            <SelectValue placeholder={t('postAd.selectSubcategory')} />
                          </SelectTrigger>
                          <SelectContent className="z-50 bg-popover" dir={isRTL ? 'rtl' : 'ltr'}>
                            {selectedCategory.subcategories.map((sub) => (
                              <SelectItem key={sub} value={sub}>
                                {sub}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">{t('postAd.description')} *</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t('postAd.descriptionPlaceholder')}
                      rows={6}
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      onClick={handlePrevious}
                      variant="outline"
                      className="flex-1"
                    >
                      {t('postAd.previous')}
                    </Button>
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="flex-1"
                    >
                      {t('postAd.next')}
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Price and Options */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">{t('postAd.price')} *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder={t('postAd.pricePlaceholder')}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t('filters.condition')} *</Label>
                    <RadioGroup value={condition} onValueChange={setCondition} required>
                      <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <RadioGroupItem value="new" id="new" />
                        <Label htmlFor="new" className="font-normal cursor-pointer">
                          {t('filters.new')}
                        </Label>
                      </div>
                      <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <RadioGroupItem value="used" id="used" />
                        <Label htmlFor="used" className="font-normal cursor-pointer">
                          {t('filters.used')}
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">{t('postAd.location')} *</Label>
                    <Select value={location} onValueChange={setLocation} required>
                      <SelectTrigger id="location">
                        <SelectValue placeholder={t('postAd.selectCity')} />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-popover" dir={isRTL ? 'rtl' : 'ltr'}>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('postAd.phone')} *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t('postAd.phonePlaceholder')}
                      required
                      className="text-left"
                      dir="ltr"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      onClick={handlePrevious}
                      variant="outline"
                      className="flex-1"
                    >
                      {t('postAd.previous')}
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-accent hover:bg-accent/90"
                      disabled={isLoading}
                    >
                      {isLoading ? t('postAd.posting') : t('postAd.publish')}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostAd;
