'use client';

import { Header } from '@/components/Header';
import { SearchSection } from '@/components/SearchSection';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';
import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';

export default function HelpPage() {
  const { language } = useAppContext();
  const t = translations[language];
  const [activeCategory, setActiveCategory] = useState('general');

  const categories = [
    { id: 'general', name: language === 'en' ? 'General' : 'عام', icon: <Icons.Help size="sm" /> },
    { id: 'account', name: language === 'en' ? 'Account' : 'الحساب', icon: <Icons.Profile size="sm" /> },
    { id: 'orders', name: language === 'en' ? 'Orders' : 'الطلبات', icon: <Icons.ShoppingBag size="sm" /> },
    { id: 'shipping', name: language === 'en' ? 'Shipping' : 'الشحن', icon: <Icons.Truck size="sm" /> },
    { id: 'returns', name: language === 'en' ? 'Returns' : 'الإرجاع', icon: <Icons.Refresh size="sm" /> },
    { id: 'payment', name: language === 'en' ? 'Payment' : 'الدفع', icon: <Icons.CreditCard size="sm" /> }
  ];

  const faqs = {
    general: [
      {
        question: language === 'en' ? 'What is DUSTED?' : 'ما هو DUSTED؟',
        answer: language === 'en'
          ? 'DUSTED is Kuwait\'s premier vintage marketplace, connecting collectors and enthusiasts with authentic vintage treasures. We specialize in rare finds, unique collectibles, and timeless pieces.'
          : 'DUSTED هو السوق الرائد للقطع العتيقة في الكويت، يربط الجامعين والعشاق بالكنوز العتيقة الأصيلة. نتخصص في القطع النادرة والمقتنيات الفريدة والقطع الخالدة.'
      },
      {
        question: language === 'en' ? 'How do I verify item authenticity?' : 'كيف أتحقق من أصالة القطعة؟',
        answer: language === 'en'
          ? 'All items on DUSTED undergo a rigorous authentication process. Our expert team verifies each item before listing, and we provide detailed authenticity certificates for high-value items.'
          : 'جميع القطع على DUSTED تخضع لعملية مصادقة صارمة. فريق الخبراء لدينا يتحقق من كل قطعة قبل عرضها، ونقدم شهادات أصالة مفصلة للقطع عالية القيمة.'
      },
      {
        question: language === 'en' ? 'Can I sell items on DUSTED?' : 'هل يمكنني بيع قطع على DUSTED؟',
        answer: language === 'en'
          ? 'Yes! DUSTED is a marketplace for both buyers and sellers. To start selling, create an account and submit your items for review. Our team will verify authenticity before approval.'
          : 'نعم! DUSTED هو سوق للمشترين والبائعين. للبدء في البيع، أنشئ حساباً وقدم قطعك للمراجعة. فريقنا سيتحقق من الأصالة قبل الموافقة.'
      }
    ],
    account: [
      {
        question: language === 'en' ? 'How do I create an account?' : 'كيف أنشئ حساباً؟',
        answer: language === 'en'
          ? 'Click the "Sign Up" button in the top right corner. You can register using your email address or social media accounts. Follow the verification steps to complete your registration.'
          : 'انقر على زر "إنشاء حساب" في الزاوية العلوية اليمنى. يمكنك التسجيل باستخدام عنوان بريدك الإلكتروني أو حسابات وسائل التواصل الاجتماعي. اتبع خطوات التحقق لإكمال تسجيلك.'
      },
      {
        question: language === 'en' ? 'How do I reset my password?' : 'كيف أعيد تعيين كلمة المرور؟',
        answer: language === 'en'
          ? 'Go to the login page and click "Forgot Password?" Enter your email address and follow the instructions sent to your inbox to reset your password.'
          : 'اذهب إلى صفحة تسجيل الدخول وانقر على "نسيت كلمة المرور؟" أدخل عنوان بريدك الإلكتروني واتبع التعليمات المرسلة إلى صندوق الوارد لإعادة تعيين كلمة المرور.'
      },
      {
        question: language === 'en' ? 'Can I change my account information?' : 'هل يمكنني تغيير معلومات حسابي؟',
        answer: language === 'en'
          ? 'Yes, you can update your account information anytime from your profile settings. Go to your account dashboard and click on "Edit Profile" to make changes.'
          : 'نعم، يمكنك تحديث معلومات حسابك في أي وقت من إعدادات الملف الشخصي. اذهب إلى لوحة تحكم حسابك وانقر على "تعديل الملف الشخصي" لإجراء التغييرات.'
      }
    ],
    orders: [
      {
        question: language === 'en' ? 'How do I track my order?' : 'كيف أتتبع طلبي؟',
        answer: language === 'en'
          ? 'Once your order ships, you\'ll receive a tracking number via email and SMS. You can also track your order through your account dashboard under "My Orders."'
          : 'بمجرد شحن طلبك، ستتلقى رقم تتبع عبر البريد الإلكتروني والرسائل النصية. يمكنك أيضاً تتبع طلبك من خلال لوحة تحكم حسابك تحت "طلباتي".'
      },
      {
        question: language === 'en' ? 'Can I cancel my order?' : 'هل يمكنني إلغاء طلبي؟',
        answer: language === 'en'
          ? 'You can cancel your order within 1 hour of placing it, as long as it hasn\'t been shipped yet. Go to "My Orders" and click "Cancel Order" next to the item.'
          : 'يمكنك إلغاء طلبك خلال ساعة واحدة من تقديمه، طالما لم يتم شحنه بعد. اذهب إلى "طلباتي" وانقر على "إلغاء الطلب" بجانب القطعة.'
      },
      {
        question: language === 'en' ? 'What if my order is damaged?' : 'ماذا لو كان طلبي تالفاً؟',
        answer: language === 'en'
          ? 'If your order arrives damaged, take photos and contact us within 24 hours. We\'ll arrange a replacement or refund. All shipments are insured for your protection.'
          : 'إذا وصل طلبك تالفاً، التقط صوراً واتصل بنا خلال 24 ساعة. سنرتب بديلاً أو استرداداً. جميع الشحنات مؤمنة لحمايتك.'
      }
    ],
    shipping: [
      {
        question: language === 'en' ? 'How long does shipping take?' : 'كم من الوقت يستغرق الشحن؟',
        answer: language === 'en'
          ? 'Shipping times vary by location and method. Standard delivery takes 3-5 business days, express delivery takes 1-2 days, and same-day delivery is available in Kuwait City.'
          : 'تختلف أوقات الشحن حسب الموقع والطريقة. يستغرق التوصيل القياسي 3-5 أيام عمل، والتوصيل السريع 1-2 يوم، والتوصيل في نفس اليوم متاح في مدينة الكويت.'
      },
      {
        question: language === 'en' ? 'Do you ship internationally?' : 'هل تشحنون دولياً؟',
        answer: language === 'en'
          ? 'Currently, we only ship within Kuwait. We\'re working on expanding our shipping services to other countries in the region.'
          : 'حالياً، نشحن فقط داخل الكويت. نحن نعمل على توسيع خدمات الشحن لدينا إلى دول أخرى في المنطقة.'
      },
      {
        question: language === 'en' ? 'Is shipping free?' : 'هل الشحن مجاني؟',
        answer: language === 'en'
          ? 'Free shipping is available for orders over certain amounts depending on your location. Check our shipping page for detailed information about free shipping thresholds.'
          : 'الشحن المجاني متاح للطلبات التي تزيد عن مبالغ معينة حسب موقعك. تحقق من صفحة الشحن للحصول على معلومات مفصلة حول عتبات الشحن المجاني.'
      }
    ],
    returns: [
      {
        question: language === 'en' ? 'What is your return policy?' : 'ما هي سياسة الإرجاع لديكم؟',
        answer: language === 'en'
          ? 'We accept returns within 14 days of delivery for items in original condition. Vintage items are carefully inspected before resale. Some items may have different return policies.'
          : 'نقبل الإرجاع خلال 14 يوماً من التوصيل للقطع في حالتها الأصلية. يتم فحص القطع العتيقة بعناية قبل إعادة البيع. قد يكون لبعض القطع سياسات إرجاع مختلفة.'
      },
      {
        question: language === 'en' ? 'How do I return an item?' : 'كيف أرجع قطعة؟',
        answer: language === 'en'
          ? 'Go to "My Orders" and click "Return Item" next to the order. Fill out the return form and we\'ll provide you with a return shipping label. Pack the item securely and drop it off.'
          : 'اذهب إلى "طلباتي" وانقر على "إرجاع القطعة" بجانب الطلب. املأ نموذج الإرجاع وسنوفر لك ملصق شحن الإرجاع. احزم القطعة بأمان وسلمها.'
      },
      {
        question: language === 'en' ? 'When will I get my refund?' : 'متى سأحصل على استردادي؟',
        answer: language === 'en'
          ? 'Refunds are processed within 5-7 business days after we receive your returned item. The refund will be credited to your original payment method.'
          : 'يتم معالجة الاسترداد خلال 5-7 أيام عمل بعد استلام القطعة المرجعة. سيتم خصم الاسترداد على طريقة الدفع الأصلية.'
      }
    ],
    payment: [
      {
        question: language === 'en' ? 'What payment methods do you accept?' : 'ما هي طرق الدفع التي تقبلونها؟',
        answer: language === 'en'
          ? 'We accept major credit cards (Visa, MasterCard, American Express), debit cards, and cash on delivery. We also support digital wallets and bank transfers.'
          : 'نقبل بطاقات الائتمان الرئيسية (فيزا، ماستركارد، أمريكان إكسبريس)، وبطاقات الخصم، والدفع نقداً عند الاستلام. كما ندعم المحافظ الرقمية والتحويلات البنكية.'
      },
      {
        question: language === 'en' ? 'Is my payment information secure?' : 'هل معلومات الدفع الخاصة بي آمنة؟',
        answer: language === 'en'
          ? 'Yes, we use industry-standard SSL encryption to protect your payment information. We never store your full credit card details on our servers.'
          : 'نعم، نستخدم تشفير SSL القياسي في الصناعة لحماية معلومات الدفع الخاصة بك. لا نخزن أبداً تفاصيل بطاقة الائتمان الكاملة على خوادمنا.'
      },
      {
        question: language === 'en' ? 'Can I pay in installments?' : 'هل يمكنني الدفع على أقساط؟',
        answer: language === 'en'
          ? 'Yes, we offer installment payment options for orders over 100 KWD. You can choose from 3, 6, or 12-month payment plans at checkout.'
          : 'نعم، نقدم خيارات الدفع على أقساط للطلبات التي تزيد عن 100 د.ك. يمكنك الاختيار من خطط الدفع لمدة 3 أو 6 أو 12 شهراً عند الدفع.'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      <SearchSection />
      
      <main className="pb-24 md:pb-8 pt-4 md:pt-8">
        <div className="container mx-auto mobile-px max-w-4xl">
          {/* Page Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-mobile-2xl md:text-4xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-4">
              {language === 'en' ? 'Help Center' : 'مركز المساعدة'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-mobile-base md:text-lg max-w-2xl mx-auto">
              {language === 'en'
                ? 'Find answers to common questions and get the support you need.'
                : 'اعثر على إجابات للأسئلة الشائعة واحصل على الدعم الذي تحتاجه.'
              }
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder={language === 'en' ? 'Search for help...' : 'ابحث عن المساعدة...'}
                className="w-full px-4 py-3 pl-10 border border-neutral-beige dark:border-accent-olive-dark rounded-lg bg-white dark:bg-background-dark text-accent-olive-dark dark:text-neutral-beige focus:outline-none focus:ring-2 focus:ring-accent-peach focus:border-transparent"
              />
              <Icons.Search size="sm" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mb-8">
            <div className="border-b border-neutral-beige dark:border-accent-olive-dark">
              <div className="flex flex-wrap justify-center">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center space-x-2 rtl:space-x-reverse px-6 py-3 text-mobile-sm font-medium transition-colors border-b-2 ${
                      activeCategory === category.id
                        ? 'text-accent-peach border-accent-peach'
                        : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-accent-peach hover:border-accent-peach/50'
                    }`}
                  >
                    {category.icon}
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="space-y-6">
            {faqs[activeCategory as keyof typeof faqs]?.map((faq, index) => (
              <div key={index} className="bg-background-light dark:bg-background-dark border border-neutral-beige dark:border-accent-olive-dark rounded-lg p-6">
                <h3 className="font-semibold text-accent-olive-dark dark:text-neutral-beige mb-3">
                  {faq.question}
                </h3>
                <p className="text-mobile-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="mt-12 bg-accent-peach/10 rounded-lg p-6 text-center">
            <h3 className="text-mobile-lg font-semibold text-accent-olive-dark dark:text-neutral-beige mb-4">
              {language === 'en' ? 'Still Need Help?' : 'هل ما زلت تحتاج مساعدة؟'}
            </h3>
            <p className="text-mobile-sm text-gray-600 dark:text-gray-400 mb-6">
              {language === 'en'
                ? 'Our customer support team is available 24/7 to help you with any questions or concerns.'
                : 'فريق دعم العملاء لدينا متاح على مدار الساعة لمساعدتك في أي أسئلة أو استفسارات.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="mobile-button inline-flex items-center justify-center bg-accent-peach text-white px-6 py-3 rounded-lg hover:bg-accent-peach-dark transition-colors"
              >
                <Icons.Mail size="sm" className="mr-2" />
                {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
              </a>
              <a
                href="tel:+96512345678"
                className="mobile-button inline-flex items-center justify-center border border-accent-peach text-accent-peach px-6 py-3 rounded-lg hover:bg-accent-peach hover:text-white transition-colors"
              >
                <Icons.Phone size="sm" className="mr-2" />
                {language === 'en' ? 'Call Us' : 'اتصل بنا'}
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 