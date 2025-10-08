import { useParams, useNavigate } from "react-router-dom";
import { dummyAds } from "@/data/dummyData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AdCard from "@/components/AdCard";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  User,
  CheckCircle,
  Share2,
  Heart,
  AlertCircle,
  Headphones,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const AdDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [selectedImage, setSelectedImage] = useState(0);
  const [showPhone, setShowPhone] = useState(false);
  const [showSellerAds, setShowSellerAds] = useState(false);
  const [imageTransition, setImageTransition] = useState(false);

  const ad = dummyAds.find((ad) => ad.id === id);

  if (!ad) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{t("adDetail.adNotFound")}</h2>
          <Button onClick={() => navigate("/")}>{t("adDetail.goHome")}</Button>
        </div>
      </div>
    );
  }

  const similarAds = dummyAds.filter(
    (a) => a.category === ad.category && a.id !== ad.id
  ).slice(0, 3);

  const sellerAds = dummyAds.filter(
    (a) => a.seller.name === ad.seller.name && a.id !== ad.id
  ).slice(0, 6);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isRTL ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleImageChange = (index: number) => {
    if (index === selectedImage) return;
    setImageTransition(true);
    setTimeout(() => {
      setSelectedImage(index);
      setImageTransition(false);
    }, 200);
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-0"
          >
            <ArrowLeft className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
            {t("adDetail.backToListings")}
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Headphones className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t("adDetail.contactSupport")}
            </Button>
            <Button variant="outline" size="sm">
              <AlertCircle className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t("adDetail.reportAd")}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="aspect-video rounded-lg overflow-hidden relative">
                    <img
                      src={ad.images[selectedImage] || ad.image}
                      alt={ad.title}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        imageTransition ? "opacity-0" : "opacity-100"
                      }`}
                    />
                  </div>
                  {ad.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {ad.images.map((image, index) => (
                        <div
                          key={index}
                          className={`aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all hover:scale-105 ${
                            selectedImage === index
                              ? "border-primary"
                              : "border-transparent"
                          }`}
                          onClick={() => handleImageChange(index)}
                        >
                          <img
                            src={image}
                            alt={`${ad.title} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Ad Information */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{ad.title}</h1>
                    <p className="text-4xl font-bold text-primary">
                      ${ad.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    {ad.category.replace("-", " ")}
                  </Badge>
                  {ad.subcategory && (
                    <Badge variant="outline">{ad.subcategory}</Badge>
                  )}
                  <Badge variant={ad.condition === "new" ? "default" : "secondary"}>
                    {ad.condition}
                  </Badge>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {ad.location}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {formatDate(ad.postedDate)}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-2">{t("adDetail.description")}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {ad.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Information */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">{t("adDetail.sellerInformation")}</h3>
                <div 
                  className="flex items-center gap-3 cursor-pointer hover:bg-secondary/50 p-2 rounded-lg transition-colors"
                  onClick={() => ad.seller.isBusiness && setShowSellerAds(true)}
                >
                  <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{ad.seller.name}</p>
                      {ad.seller.verified && (
                        <CheckCircle className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    {ad.seller.verified && (
                      <p className="text-sm text-muted-foreground">
                        {t("adDetail.verifiedSeller")}
                      </p>
                    )}
                    {ad.seller.isBusiness && (
                      <p className="text-xs text-primary font-medium mt-1">
                        {t("adDetail.businessAccount")} • {sellerAds.length} {t("adDetail.activeAds")}
                      </p>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button
                    variant="default"
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => navigate("/auth")}
                  >
                    <MessageCircle className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {t("adDetail.chatWithSeller")}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowPhone(!showPhone)}
                  >
                    <Phone className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {showPhone ? ad.seller.phone : t("adDetail.showPhoneNumber")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card>
              <CardContent className="p-6 space-y-2">
                <h3 className="font-semibold text-lg">{t("adDetail.safetyTips")}</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>{t("adDetail.safetyTip1")}</li>
                  <li>{t("adDetail.safetyTip2")}</li>
                  <li>{t("adDetail.safetyTip3")}</li>
                  <li>{t("adDetail.safetyTip4")}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Ads */}
        {similarAds.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">{t("adDetail.similarAds")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {similarAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Seller Ads Dialog */}
      <Dialog open={showSellerAds} onOpenChange={setShowSellerAds}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {ad.seller.name} - {t("adDetail.activeAds")} ({sellerAds.length})
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {sellerAds.map((sellerAd) => (
              <AdCard key={sellerAd.id} ad={sellerAd} />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdDetail;
