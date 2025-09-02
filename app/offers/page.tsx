"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Tag, ShoppingCart, Plus, Minus, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const offers = [
  {
    id: 1,
    category: "عرض خاص ولفترة محدودة",
    items: [
      {
        name: "ابرج 250مل زجاج عادية 4+1",
        price: "5.4 د.ك",
        discount: "خصم حتي 20%",
        image:
          "https://d1l6fcuu6fcorr.cloudfront.net/photos%2Fmenu_items%2Fphoto_urls%2Ffffb5f38-7517-43c7-85f3-254449513d7e%2Foriginal%2F250_Glass_Still_640x_auto_none",
      },
      {
        name: "ابرج 250مل زجاج غازية 4+1",
        price: "5.8 د.ك",
        discount: "خصم حتي 20%",
        image:
          "https://d1l6fcuu6fcorr.cloudfront.net/images%2F678028%2Fimage_urls%2Fdefault%2F419ea77ff87f6574827cff4757cc06dbfd5ddf30_640x_auto_none",
      },
      {
        name: "مناديل أبراج (1 علبة يحتوي على 200 منديل مزوج)",
        description:
          "- 200 منديل مزدوج في كل علبة\n- جودة عالية - نعومة فائقة\n- تصميم أنيق",
        price: "5.75 - 9.25 د.ك",
        discount: "خصم حتي 8%",
        image:
          "https://d1l6fcuu6fcorr.cloudfront.net/photos%2Fmenu_items%2Fphoto_urls%2Fa5baaf4a-f118-4c5c-87fa-a878894419be%2Foriginal%2FTissues_200x50_640x_auto_none",
      },
    ],
  },
  {
    id: 2,
    category: "عبوات",
    items: [
      {
        name: "مياه أبراج قلوية غطاء رياضي 750مل × 6",
        price: "1.2 - 6 د.ك",
        discount: "خصم حتي 17%",
        image:
          "https://d1l6fcuu6fcorr.cloudfront.net/photos%2Fmenu_items%2Fphoto_urls%2Ffa57ce96-f041-4734-85d0-a4f533bbb309%2Foriginal%2F750SportsCap_640x_auto_none",
      },
      {
        name: "مياه أبراج زجاج غازية حجم 750مل ×6",
        price: "2.64 - 13.2 د.ك",
        discount: "خصم حتي 17%",
        image:
          "https://d1l6fcuu6fcorr.cloudfront.net/photos%2Fmenu_items%2Fphoto_urls%2F753ac7d3-26bd-47cf-9833-d9f91e22f845%2Foriginal%2F750-Sparkling_640x_auto_none",
      },
      {
        name: "مياه أبراج زجاج عادية حجم 250 ×6",
        price: "1.32 - 6.6 د.ك",
        discount: "خصم حتي 17%",
        image:
          "https://d1l6fcuu6fcorr.cloudfront.net/photos%2Fmenu_items%2Fphoto_urls%2F3a5d156f-e6dc-4215-b76a-0bf79c3d6212%2Foriginal%2F250-Still_640x_auto_none",
      },
      {
        name: "مياه أبراج زجاج عادية حجم 750 مل ×6",
        price: "2.4 - 12 د.ك",
        discount: "خصم حتي 17%",
        image:
          "https://d1l6fcuu6fcorr.cloudfront.net/photos%2Fmenu_items%2Fphoto_urls%2Fbf28d8b7-d945-40fd-b702-068b80c935fe%2Foriginal%2F750-Still_640x_auto_none",
      },
      {
        name: "مياه أبراج قلوية - 330مل - 20 عبوة في الشدة",
        description: "صفر صوديوم",
        price: "1.5 د.ك",
        image:
          "https://d1l6fcuu6fcorr.cloudfront.net/photos%2Fmenu_items%2Fphoto_urls%2F34c309e1-b718-4eea-beb3-6894764efff6%2Foriginal%2F330x20-Alkaline-2025_640x_auto_none",
      },
      {
        name: "حجم | 200مل",
        price: "0.7 - 14 د.ك",
        discount: "خصم حتي 20%",
        image:
          "https://d1l6fcuu6fcorr.cloudfront.net/photos%2Fmenu_items%2Fphoto_urls%2F55a8a910-2af1-4fa3-a1ba-7c490556fa33%2Foriginal%2F200x20_EN_640x_auto_none",
      },
      {
        name: "حجم | 330مل",
        price: "0.8 - 16 د.ك",
        discount: "خصم حتي 20%",
        image:
          "https://d1l6fcuu6fcorr.cloudfront.net/photos%2Fmenu_items%2Fphoto_urls%2F51b84f9c-223a-40cc-859a-db244088d617%2Foriginal%2FWhatsApp_Image_2024-03-19_at_1.25.12_PM%25284%2529_640x_auto_none",
      },
      {
        name: "حجم | 1.5 لتر ب6 عبوات بالشد",
        price: "0.6 - 3 د.ك",
        discount: "خصم حتي 17%",
        image:
          "https://d1l6fcuu6fcorr.cloudfront.net/images%2F588656%2Fimage_urls%2Fdefault%2Fc8797849dd64430e8597aa52c00d29bbe3e6b991_640x_auto_none",
      },
      {
        name: "مياه أبراج - 200مل - (1×20) دبدوب",
        price: "0.7 - 14 د.ك",
        image:
          "https://d1l6fcuu6fcorr.cloudfront.net/photos%2Fmenu_items%2Fphoto_urls%2F53318298-7d57-43e4-a253-8d56c0e712ab%2Foriginal%2FDabdoob-200x20_640x_auto_none",
      },
    ],
  },
  {
    id: 3,
    category: "جالونات",
    items: [
      {
        name: "عدد 1 مياه أبراج حجم 5 جالون",
        description: "19 لتر -قنينة - غير مرتجع (للاستخدام مرة واحدة)",
        price: "1 د.ك",
        image:
          "https://d1l6fcuu6fcorr.cloudfront.net/photos%2Fmenu_items%2Fphoto_urls%2F48d79b3c-6d40-4eb1-a927-31d6a1a0c7b3%2Foriginal%2F5G_NR_2025_640x_auto_none",
      },
      {
        name: "1 دفتر 5 جالون + برادة",
        price: "54 د.ك",
        image:
          "https://d1l6fcuu6fcorr.cloudfront.net/photos%2Fmenu_items%2Fphoto_urls%2Fa0bb7709-f3f4-4f3f-a516-eaebf2677ebf%2Foriginal%2Fdispenser_640x_auto_none",
      },
      {
        name: "عدد 1 مياه أبراج حجم 3 جالون",
        description: "11 لتر -قنينة - غير مرتجع (للاستخدام مرة واحدة)",
        price: "0.7 د.ك",
        image:
          "https://d1l6fcuu6fcorr.cloudfront.net/photos%2Fmenu_items%2Fphoto_urls%2F9330d855-3998-46a2-a325-ed7a8bc3a372%2Foriginal%2F3Gallon_640x_auto_none",
      },
    ],
  },
  {
    id: 4,
    category: "المياه المستوردة",
    items: [
      {
        name: "زوي شاي مثلج بنكهة التوت 24 × 320 مل",
        description: "زوي شاي مثلج بنكهة التوت",
        price: "11.88 د.ك",
        image:
          "https://d1l6fcuu6fcorr.cloudfront.net/photos%2Fmenu_items%2Fphoto_urls%2Ff62f38a3-82cf-4289-8d0d-9212de0ab298%2Foriginal%2F5_%25282%2529_640x_auto_none",
      },
    ],
  },
  {
    id: 5,
    category: "الثلج والأكواب",
    items: [
      {
        name: "مكعبات الثلج | جاهزة للتجميد",
        price: "1.5 د.ك",
        image:
          "https://d1l6fcuu6fcorr.cloudfront.net/images%2F593761%2Fimage_urls%2Fdefault%2Fba786d9c26094ef5e9e5f475727b12c191cf275f_640x_auto_none",
      },
    ],
  },
];

export default function OffersPage() {
  const [cart, setCart] = useState<
    Array<{
      id: string;
      name: string;
      price: string;
      quantity: number;
      image: string;
    }>
  >([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (item: any, categoryId: number, itemIndex: number) => {
    const itemId = `${categoryId}-${itemIndex}`;
    const existingItem = cart.find((cartItem) => cartItem.id === itemId);

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: itemId,
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image,
        },
      ]);
    }
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getTotalItems = () =>
    cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 lg:gap-3 hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
              <span className="text-base lg:text-lg font-medium">
                العودة للرئيسية
              </span>
            </Link>

            <div className="flex items-center gap-2 lg:gap-4">
              <img
                src="https://www.abraajwater.com/themes/abraaj/assets/img/logo-ar.svg"
                width={80}
              />
            </div>
          </div>
        </div>
      </header>
      <Button
        onClick={() => setShowCart(true)}
        variant="secondary"
        className="fixed bottom-2 left-2 px-3 z-20 lg:px-4 py-2"
      >
        <ShoppingCart className="w-4 h-4 lg:w-5 lg:h-5" />
        {getTotalItems() > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
            {getTotalItems()}
          </Badge>
        )}
      </Button>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500  via-blue-50/50 to-background py-8 lg:py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-balance bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            عروض مياه أبراج الحصرية
          </h2>
          <p className="text-base lg:text-xl text-muted-foreground mb-8 text-pretty leading-relaxed max-w-2xl mx-auto">
            اكتشف مجموعتنا الكاملة من المياه النقية والمنتجات عالية الجودة
            بأسعار مميزة
          </p>
        </div>
      </section>

      {/* Offers Categories */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {offers.map((category) => (
            <div key={category.id} className="mb-12 lg:mb-16">
              {/* Category Header */}
              <div className="text-center mb-8 lg:mb-12">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-blue-500 ">
                  {category.category}
                </h3>
                <div className="w-16 lg:w-24 h-1 bg-gradient-to-r from-blue-500  to-blue-600 mx-auto rounded-full"></div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8">
                {category.items.map((item, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
                  >
                    <div className="relative">
                      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      {item.discount && (
                        <Badge className="absolute top-2 lg:top-3 right-2 lg:right-3 bg-red-500 text-white shadow-lg text-xs">
                          <Tag className="w-3 h-3 mr-1" />
                          {item.discount}
                        </Badge>
                      )}
                    </div>

                    <CardContent className="p-4 lg:p-6">
                      <h4 className="font-medium text-sm lg:text-lg mb-3 text-balance leading-tight min-h-[2.5rem] lg:min-h-[3.5rem] flex items-center">
                        {item.name}
                      </h4>

                      {item.description && (
                        <p className="text-xs lg:text-sm text-muted-foreground mb-4 leading-relaxed">
                          {item.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="text-lg lg:text-2xl font-bold text-blue-500 ">
                          {item.price}
                        </div>
                        <Button
                          onClick={() => addToCart(item, category.id, index)}
                          size="sm"
                          className="bg-blue-500  hover:bg-primary/90 text-white rounded-full px-3 lg:px-6 shadow-lg hover:shadow-xl transition-all duration-300 text-xs lg:text-sm"
                        >
                          <ShoppingCart className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                          أضف للسلة
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto">
            <div className="p-4 lg:p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-xl lg:text-2xl font-bold">سلة التسوق</h3>
                <Button
                  onClick={() => setShowCart(false)}
                  variant="ghost"
                  size="sm"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="p-4 lg:p-6">
              {cart.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  السلة فارغة
                </p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 py-4 border-b"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-primary font-bold">{item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          variant="outline"
                          size="sm"
                          className="w-8 h-8 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          variant="outline"
                          size="sm"
                          className="w-8 h-8 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="mt-6">
                    <Link href="/checkout">
                      <Button
                        onClick={() => setShowCart(false)}
                        className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-3"
                      >
                        إتمام الطلب ({getTotalItems()} منتج)
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-12 lg:py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            هل تحتاج مساعدة في الاختيار؟
          </h3>
          <p className="text-base lg:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            فريق خدمة العملاء لدينا جاهز لمساعدتك في اختيار أفضل المنتجات
            لاحتياجاتك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100 rounded-full px-6 lg:px-8 py-3 lg:py-4 shadow-xl"
            >
              اتصل بنا: 1844666
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary rounded-full px-6 lg:px-8 py-3 lg:py-4 bg-transparent"
            >
              تصفح جميع المنتجات
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-6 lg:py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-70">
            Copyright © 2025 Abraaj Water Company. All Rights Reserved.
          </p>
          <p className="text-xs opacity-50 mt-2">
            جميع الحقوق محفوظة لشركة مياه أبراج
          </p>
        </div>
      </footer>
    </div>
  );
}
