import { Ad } from "@/data/dummyData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, TrendingUp, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

interface AdCardProps {
  ad: Ad;
}

const AdCard = ({ ad }: AdCardProps) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (i18n.language === 'ar') {
      if (diffDays === 0) return 'اليوم';
      if (diffDays === 1) return 'أمس';
      if (diffDays < 7) return `منذ ${diffDays} أيام`;
      return date.toLocaleDateString('ar');
    } else {
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      return date.toLocaleDateString('en');
    }
  };

  return (
    <Card 
      className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fade-in border-border/50 hover:border-primary/20"
      onClick={() => navigate(`/ad/${ad.id}`)}
    >
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-muted to-background">
        <img
          src={ad.image}
          alt={ad.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {ad.urgent && (
          <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
            <TrendingUp className="h-3 w-3 mx-1" />
            {t('adCard.urgent')}
          </Badge>
        )}
        {ad.featured && (
          <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
            <Star className="h-3 w-3 mx-1" />
            {t('adCard.featured')}
          </Badge>
        )}
      </div>
      <CardContent className="p-4 bg-gradient-to-b from-card to-background">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">{ad.title}</h3>
        <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
          ${ad.price.toLocaleString()}
        </p>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mx-1" />
          {ad.location}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mx-1" />
          {formatDate(ad.postedDate)}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdCard;
