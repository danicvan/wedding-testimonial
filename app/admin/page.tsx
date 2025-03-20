"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, XCircle, Users, MessageSquare, ImageIcon, Film, Music, ShoppingBag } from "lucide-react"
import AdminSidebar from "@/components/admin-sidebar"
import AdminHeader from "@/components/admin-header"
import { useAuth } from "@/lib/use-auth"
import { useRouter } from "next/navigation"

// Mock data for pending testimonials
const pendingTestimonials = [
  {
    id: 1,
    user: {
      name: "Sarah & Michael",
      image: "/placeholder.svg?height=40&width=40",
      initials: "SM",
    },
    date: "2 hours ago",
    content: "Our beach wedding was absolutely magical! The sunset ceremony was everything we dreamed of.",
    mediaType: "image",
  },
  {
    id: 2,
    user: {
      name: "David & Emma",
      image: "/placeholder.svg?height=40&width=40",
      initials: "DE",
    },
    date: "5 hours ago",
    content: "Our rustic barn wedding was filled with so much love and laughter. Best day ever!",
    mediaType: "video",
  },
  {
    id: 3,
    user: {
      name: "James & Olivia",
      image: "/placeholder.svg?height=40&width=40",
      initials: "JO",
    },
    date: "Yesterday",
    content: "Our first dance song was 'Perfect' by Ed Sheeran. What was yours?",
    mediaType: "music",
  },
]

// Mock data for statistics
const statistics = {
  users: 1245,
  posts: 3782,
  comments: 9541,
  likes: 27893,
  mediaUploads: {
    images: 2456,
    videos: 843,
    music: 321,
  },
  engagement: {
    daily: [120, 132, 101, 134, 90, 110, 120],
    weekly: [720, 830, 790, 850, 810, 860, 900],
    monthly: [3200, 3500, 3700, 3800, 4000, 4200, 4500],
  },
  postTypes: {
    images: 65,
    videos: 25,
    music: 10,
  },
  userGrowth: [120, 150, 180, 220, 250, 280, 310],
  sales: {
    total: 12500,
    products: [
      { name: "Wedding Planners", sales: 45 },
      { name: "Photo Albums", sales: 32 },
      { name: "Custom Frames", sales: 28 },
      { name: "Memory Boxes", sales: 18 },
    ],
  },
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [pendingItems, setPendingItems] = useState(pendingTestimonials)

  // Redirect if not admin
  if (user && !user.isAdmin) {
    router.push("/")
    return null
  }

  // Handle approve/reject testimonial
  const handleTestimonialAction = (id: number, action: "approve" | "reject") => {
    setPendingItems(pendingItems.filter((item) => item.id !== id))
    // In a real app, you would update the database
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader title="Dashboard" />

        <main className="p-6">
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="approvals">Approvals</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="shop">Shop</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{statistics.users}</div>
                      <Users className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{statistics.posts}</div>
                      <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">+8% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{statistics.comments}</div>
                      <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">+15% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{statistics.likes}</div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-muted-foreground"
                      >
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                      </svg>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">+20% from last month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                    <CardDescription>New users over the last 7 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-end gap-2">
                      {statistics.userGrowth.map((value, i) => (
                        <div key={i} className="relative flex-1 bg-primary/20 rounded-t-md">
                          <div
                            className="absolute bottom-0 w-full bg-primary rounded-t-md"
                            style={{ height: `${(value / Math.max(...statistics.userGrowth)) * 100}%` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Content Distribution</CardTitle>
                    <CardDescription>Breakdown of post types</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <div className="relative h-40 w-40 rounded-full border-8 border-primary">
                        <div
                          className="absolute top-0 right-0 bottom-0 left-0 border-8 border-[#22c55e] rounded-full"
                          style={{
                            clipPath: `polygon(50% 50%, 100% 50%, 100% 0, 0 0, 0 ${statistics.postTypes.images}%)`,
                          }}
                        ></div>
                        <div
                          className="absolute top-0 right-0 bottom-0 left-0 border-8 border-[#eab308] rounded-full"
                          style={{
                            clipPath: `polygon(50% 50%, 0 ${statistics.postTypes.images}%, 0 ${statistics.postTypes.images + statistics.postTypes.videos}%)`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-primary"></div>
                        <span className="text-sm">Images ({statistics.postTypes.images}%)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-[#22c55e]"></div>
                        <span className="text-sm">Videos ({statistics.postTypes.videos}%)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-[#eab308]"></div>
                        <span className="text-sm">Music ({statistics.postTypes.music}%)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Media Uploads & Sales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Media Uploads</CardTitle>
                    <CardDescription>Total uploads by type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ImageIcon className="h-4 w-4 text-primary" />
                          <span>Images</span>
                        </div>
                        <span className="font-medium">{statistics.mediaUploads.images}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Film className="h-4 w-4 text-primary" />
                          <span>Videos</span>
                        </div>
                        <span className="font-medium">{statistics.mediaUploads.videos}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Music className="h-4 w-4 text-primary" />
                          <span>Music</span>
                        </div>
                        <span className="font-medium">{statistics.mediaUploads.music}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Shop Sales</CardTitle>
                    <CardDescription>Total: ${statistics.sales.total}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {statistics.sales.products.map((product, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{product.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{product.sales} sold</span>
                            <ShoppingBag className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="approvals" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Approvals</CardTitle>
                  <CardDescription>Review and approve user testimonials before they go public</CardDescription>
                </CardHeader>
                <CardContent>
                  {pendingItems.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No pending testimonials to approve</div>
                  ) : (
                    <div className="space-y-6">
                      {pendingItems.map((item) => (
                        <div key={item.id} className="flex gap-4 pb-6 border-b last:border-0">
                          <Avatar>
                            <AvatarImage src={item.user.image} alt={item.user.name} />
                            <AvatarFallback>{item.user.initials}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex justify-between">
                              <div>
                                <p className="font-medium">{item.user.name}</p>
                                <p className="text-sm text-muted-foreground">{item.date}</p>
                              </div>
                              <Badge variant="outline">
                                {item.mediaType === "image" && "Photo"}
                                {item.mediaType === "video" && "Video"}
                                {item.mediaType === "music" && "Music"}
                              </Badge>
                            </div>
                            <p>{item.content}</p>
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleTestimonialAction(item.id, "approve")}>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleTestimonialAction(item.id, "reject")}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">User management interface would go here</div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Content Management</CardTitle>
                  <CardDescription>Manage posts, comments, and media</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    Content management interface would go here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shop">
              <Card>
                <CardHeader>
                  <CardTitle>Shop Management</CardTitle>
                  <CardDescription>Manage products, orders, and inventory</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">Shop management interface would go here</div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

