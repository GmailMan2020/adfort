import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AdCard from "@/components/AdCard";
import { dummyAds } from "@/data/dummyData";
import {
  ArrowLeft,
  User,
  Heart,
  MessageCircle,
  Settings,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");

  // Mock user data
  const userAds = dummyAds.slice(0, 3);
  const favoriteAds = dummyAds.slice(3, 5);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to home
          </Button>
          <Button
            variant="default"
            className="bg-accent hover:bg-accent/90"
            onClick={() => navigate("/post-ad")}
          >
            <Plus className="h-5 w-5 mr-2" />
            Post New Ad
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Sidebar */}
          <Card className="lg:col-span-1 h-fit">
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white text-3xl font-bold mb-4">
                  JD
                </div>
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-sm text-muted-foreground">john@example.com</p>
                <Badge variant="secondary" className="mt-2">
                  Member since Jan 2024
                </Badge>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate("/profile")}
                >
                  <User className="h-4 w-4 mr-2" />
                  My Profile
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate("/profile")}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={() => navigate("/")}
                >
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="active">
                  Active Ads ({userAds.length})
                </TabsTrigger>
                <TabsTrigger value="favorites">
                  Favorites ({favoriteAds.length})
                </TabsTrigger>
                <TabsTrigger value="messages">
                  Messages (3)
                </TabsTrigger>
                <TabsTrigger value="settings">
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="mt-6">
                <div className="space-y-4">
                  {userAds.map((ad) => (
                    <Card key={ad.id}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <img
                            src={ad.image}
                            alt={ad.title}
                            className="w-32 h-32 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-lg font-semibold mb-2">
                                  {ad.title}
                                </h3>
                                <p className="text-2xl font-bold text-primary mb-2">
                                  ${ad.price.toLocaleString()}
                                </p>
                                <div className="flex gap-2">
                                  <Badge variant="secondary">Active</Badge>
                                  <Badge variant="outline">23 views</Badge>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="favorites" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favoriteAds.map((ad) => (
                    <AdCard key={ad.id} ad={ad} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="messages" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                        >
                          <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                            <User className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold">User {i}</h4>
                              <span className="text-sm text-muted-foreground">
                                2h ago
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Is this item still available?
                            </p>
                          </div>
                          <Badge>New</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Settings functionality coming soon...
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
