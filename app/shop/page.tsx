"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ShoppingCart, Heart, Filter, Search, X, Check, ShoppingBag } from "lucide-react"
import Image from "next/image"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast"

// Product data
const products = [
  {
    id: 1,
    name: "Wedding Planner Book",
    description: "Comprehensive wedding planner with checklists, timelines, and budget trackers.",
    price: 39.99,
    image: "/images/shop/planner-book.jpg",
    category: "planning",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true,
    tags: ["planner", "organization", "checklist"],
  },
  {
    id: 2,
    name: "Custom Photo Album",
    description: "Elegant leather-bound photo album with customizable cover and pages.",
    price: 89.99,
    image: "/images/shop/photo-album.jpg",
    category: "keepsakes",
    rating: 4.9,
    reviews: 87,
    inStock: true,
    featured: true,
    tags: ["album", "photos", "memories"],
  },
  {
    id: 3,
    name: "Wedding Vow Journal Set",
    description: "Beautiful matching journals for writing and keeping your wedding vows.",
    price: 29.99,
    image: "/images/shop/vow-journals.jpg",
    category: "keepsakes",
    rating: 4.7,
    reviews: 56,
    inStock: true,
    featured: false,
    tags: ["vows", "journal", "keepsake"],
  },
  {
    id: 4,
    name: "Digital Wedding Template Bundle",
    description: "Collection of digital templates for invitations, save-the-dates, and thank you cards.",
    price: 49.99,
    image: "/images/shop/digital-templates.jpg",
    category: "digital",
    rating: 4.6,
    reviews: 42,
    inStock: true,
    featured: false,
    tags: ["digital", "templates", "invitations"],
  },
  {
    id: 5,
    name: "Wedding Memory Box",
    description: "Handcrafted wooden box for storing wedding mementos and keepsakes.",
    price: 59.99,
    image: "/images/shop/memory-box.jpg",
    category: "keepsakes",
    rating: 4.8,
    reviews: 38,
    inStock: true,
    featured: true,
    tags: ["box", "keepsake", "storage"],
  },
  {
    id: 6,
    name: "First Year Marriage Journal",
    description: "Guided journal for documenting your first year of marriage.",
    price: 34.99,
    image: "/images/shop/marriage-journal.jpg",
    category: "keepsakes",
    rating: 4.5,
    reviews: 29,
    inStock: true,
    featured: false,
    tags: ["journal", "marriage", "memories"],
  },
  {
    id: 7,
    name: "Wedding Budget Calculator",
    description: "Digital tool for planning and tracking your wedding budget.",
    price: 19.99,
    image: "/images/shop/budget-calculator.jpg",
    category: "digital",
    rating: 4.4,
    reviews: 65,
    inStock: true,
    featured: false,
    tags: ["budget", "planning", "digital"],
  },
  {
    id: 8,
    name: "Custom Wedding Website Template",
    description: "Premium template for creating your personalized wedding website.",
    price: 79.99,
    image: "/images/shop/website-template.jpg",
    category: "digital",
    rating: 4.7,
    reviews: 51,
    inStock: true,
    featured: true,
    tags: ["website", "digital", "template"],
  },
]

// Cart type
interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export default function ShopPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [sortBy, setSortBy] = useState("featured")
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Filter products based on search, category, and price
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = activeCategory === "all" || product.category === activeCategory

    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1] * 2

    return matchesSearch && matchesCategory && matchesPrice
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id - a.id
      default:
        return b.featured ? 1 : -1
    }
  })

  // Add to cart
  const addToCart = (product: (typeof products)[0]) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)

      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
          },
        ]
      }
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  // Remove from cart
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))

    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    })
  }

  // Update cart quantity
  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return

    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  // Toggle wishlist
  const toggleWishlist = (id: number) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(id)) {
        toast({
          title: "Removed from wishlist",
          description: "Item has been removed from your wishlist.",
        })
        return prevWishlist.filter((itemId) => itemId !== id)
      } else {
        toast({
          title: "Added to wishlist",
          description: "Item has been added to your wishlist.",
        })
        return [...prevWishlist, id]
      }
    })
  }

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  // Checkout function
  const handleCheckout = () => {
    toast({
      title: "Checkout initiated",
      description: "Redirecting to payment gateway...",
    })

    // In a real app, this would redirect to a payment gateway
    setTimeout(() => {
      setCart([])
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase.",
      })
      setIsCartOpen(false)
    }, 2000)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Wedding Shop</h1>
            <p className="text-muted-foreground">Find everything you need for your wedding journey</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full md:w-[200px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-9 w-9"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <Button variant="outline" size="icon" onClick={() => setIsFilterOpen(true)} className="md:hidden">
              <Filter className="h-4 w-4" />
            </Button>

            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                      {cart.reduce((total, item) => total + item.quantity, 0)}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md flex flex-col">
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                  <SheetDescription>
                    {cart.length === 0
                      ? "Your cart is empty"
                      : `You have ${cart.reduce((total, item) => total + item.quantity, 0)} items in your cart`}
                  </SheetDescription>
                </SheetHeader>

                {cart.length > 0 ? (
                  <>
                    <div className="flex-1 overflow-auto py-4">
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <div className="relative h-16 w-16 overflow-hidden rounded-md">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{item.name}</p>
                              <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              >
                                -
                              </Button>
                              <span className="w-6 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-4">
                        <span className="font-medium">Total</span>
                        <span className="font-bold">${cartTotal.toFixed(2)}</span>
                      </div>
                      <Button className="w-full" onClick={handleCheckout}>
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Checkout
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center gap-4 py-8">
                    <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                    <p className="text-muted-foreground">Your cart is empty</p>
                    <SheetClose asChild>
                      <Button>Continue Shopping</Button>
                    </SheetClose>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters - Desktop */}
          <Card className="hidden md:block">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Categories</h3>
                <div className="space-y-1">
                  {["all", "planning", "keepsakes", "digital"].map((category) => (
                    <Button
                      key={category}
                      variant="ghost"
                      className={`w-full justify-start ${activeCategory === category ? "bg-secondary" : ""}`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                      {activeCategory === category && <Check className="ml-auto h-4 w-4" />}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <h3 className="font-medium">Price Range</h3>
                  <span className="text-sm text-muted-foreground">
                    ${priceRange[0]} - ${priceRange[1] * 2}
                  </span>
                </div>
                <Slider
                  defaultValue={[0, 50]}
                  max={50}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="py-4"
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Sort By</h3>
                <div className="space-y-1">
                  {[
                    { value: "featured", label: "Featured" },
                    { value: "price-low", label: "Price: Low to High" },
                    { value: "price-high", label: "Price: High to Low" },
                    { value: "rating", label: "Highest Rated" },
                    { value: "newest", label: "Newest" },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant="ghost"
                      className={`w-full justify-start ${sortBy === option.value ? "bg-secondary" : ""}`}
                      onClick={() => setSortBy(option.value)}
                    >
                      {option.label}
                      {sortBy === option.value && <Check className="ml-auto h-4 w-4" />}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filters - Mobile */}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetContent side="left" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Categories</h3>
                  <div className="space-y-1">
                    {["all", "planning", "keepsakes", "digital"].map((category) => (
                      <Button
                        key={category}
                        variant="ghost"
                        className={`w-full justify-start ${activeCategory === category ? "bg-secondary" : ""}`}
                        onClick={() => {
                          setActiveCategory(category)
                          setIsFilterOpen(false)
                        }}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                        {activeCategory === category && <Check className="ml-auto h-4 w-4" />}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Price Range</h3>
                    <span className="text-sm text-muted-foreground">
                      ${priceRange[0]} - ${priceRange[1] * 2}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 50]}
                    max={50}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="py-4"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Sort By</h3>
                  <div className="space-y-1">
                    {[
                      { value: "featured", label: "Featured" },
                      { value: "price-low", label: "Price: Low to High" },
                      { value: "price-high", label: "Price: High to Low" },
                      { value: "rating", label: "Highest Rated" },
                      { value: "newest", label: "Newest" },
                    ].map((option) => (
                      <Button
                        key={option.value}
                        variant="ghost"
                        className={`w-full justify-start ${sortBy === option.value ? "bg-secondary" : ""}`}
                        onClick={() => {
                          setSortBy(option.value)
                          setIsFilterOpen(false)
                        }}
                      >
                        {option.label}
                        {sortBy === option.value && <Check className="ml-auto h-4 w-4" />}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <SheetFooter>
                <Button onClick={() => setIsFilterOpen(false)}>Apply Filters</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Product Grid */}
          <div className="md:col-span-3">
            <Tabs defaultValue="grid" className="mb-6">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Showing {sortedProducts.length} of {products.length} products
                </p>
                <TabsList>
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="grid" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="relative">
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 ${
                            wishlist.includes(product.id) ? "text-primary" : "text-muted-foreground"
                          }`}
                          onClick={() => toggleWishlist(product.id)}
                        >
                          <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-primary" : ""}`} />
                        </Button>
                        {product.featured && <Badge className="absolute top-2 left-2">Featured</Badge>}
                      </div>
                      <CardContent className="pt-4">
                        <div className="flex justify-between mb-2">
                          <h3 className="font-semibold truncate">{product.name}</h3>
                          <p className="font-bold">${product.price.toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-primary" : "text-muted"}`}
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {product.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" onClick={() => addToCart(product)}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="list" className="mt-6">
                <div className="space-y-4">
                  {sortedProducts.map((product) => (
                    <Card key={product.id}>
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative h-48 sm:h-auto sm:w-48 overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 ${
                              wishlist.includes(product.id) ? "text-primary" : "text-muted-foreground"
                            }`}
                            onClick={() => toggleWishlist(product.id)}
                          >
                            <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-primary" : ""}`} />
                          </Button>
                          {product.featured && <Badge className="absolute top-2 left-2">Featured</Badge>}
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex justify-between mb-2">
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="font-bold">${product.price.toFixed(2)}</p>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                          <div className="flex items-center gap-1 mb-2">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <svg
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.rating) ? "text-primary" : "text-muted"
                                  }`}
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {product.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button onClick={() => addToCart(product)}>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {sortedProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setActiveCategory("all")
                    setPriceRange([0, 50])
                    setSortBy("featured")
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

