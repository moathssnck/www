import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplets, Leaf, Shield, Award, Star } from "lucide-react"

export default function ArabivWaterLanding() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            Premium Natural Water
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Pure Water, <span className="text-primary">Pure Life</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Experience the pristine taste of Arabiv Water - sourced from natural springs and purified to perfection for
            your health and wellness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Shop Now
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Arabiv Water?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our commitment to purity, quality, and sustainability makes us the trusted choice for premium water.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-border/50 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Droplets className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Pure Source</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Sourced from pristine natural springs, ensuring the highest quality and mineral content.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-border/50 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Advanced Filtration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Multi-stage purification process removes impurities while preserving essential minerals.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-border/50 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Eco-Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Sustainable packaging and carbon-neutral delivery for a better planet.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-border/50 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Certified Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  International quality certifications and regular testing ensure consistent excellence.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Premium Collection</h2>
            <p className="text-lg text-muted-foreground">
              Choose from our range of premium water products, each crafted for perfection.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <Droplets className="w-16 h-16 text-primary" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Natural Spring</CardTitle>
                <CardDescription>500ml • Premium Glass Bottle</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Pure spring water with natural minerals, perfect for daily hydration.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">$2.99</span>
                  <Button>Add to Cart</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-primary/20">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative">
                <Badge className="absolute top-4 right-4">Best Seller</Badge>
                <Droplets className="w-16 h-16 text-primary" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Alkaline Plus</CardTitle>
                <CardDescription>750ml • Enhanced Formula</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  pH-balanced alkaline water with added electrolytes for optimal wellness.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">$3.99</span>
                  <Button>Add to Cart</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <Droplets className="w-16 h-16 text-primary" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Sparkling Pure</CardTitle>
                <CardDescription>330ml • Naturally Carbonated</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Refreshing sparkling water with natural carbonation and crisp taste.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">$2.49</span>
                  <Button>Add to Cart</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Trusted by Thousands</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <p className="text-muted-foreground">Purity Level</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <p className="text-muted-foreground">Quality Certifications</p>
            </div>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-lg text-muted-foreground mb-4">
                "Arabiv Water has completely changed my hydration routine. The taste is incredibly pure and refreshing.
                I can't imagine drinking anything else!"
              </blockquote>
              <cite className="text-sm font-medium text-foreground">Sarah Johnson, Wellness Coach</cite>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience Pure Perfection?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who have made the switch to Arabiv Water.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Start Your Order
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Find a Store
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Arabiv Water</h3>
              <p className="text-muted-foreground text-sm">
                Premium natural water sourced from pristine springs for your health and wellness.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Natural Spring</li>
                <li>Alkaline Plus</li>
                <li>Sparkling Pure</li>
                <li>Bulk Orders</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Sustainability</li>
                <li>Quality Promise</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Contact Us</li>
                <li>FAQ</li>
                <li>Shipping Info</li>
                <li>Returns</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Arabiv Water Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
