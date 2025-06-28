'use client';

import { Header } from '@/components/Header';
import { SearchSection } from '@/components/SearchSection';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';
import { Icons } from '@/components/ui/Icons';

export default function ShippingPage() {
  const { language } = useAppContext();
  const t = translations[language];

  const shippingMethods = [
    {
      name: language === 'en' ? 'Standard Delivery' : 'التوصيل القياسي',
      time: language === 'en' ? '3-5 business days' : '3-5 أيام عمل',
      price: language === 'en' ? '5 KWD' : '5 د.ك',
      description: language === 'en'
        ? 'Reliable delivery to your doorstep with tracking updates.'
        : 'توصيل موثوق إلى باب منزلك مع تحديثات التتبع.',
      icon: <Icons.Truck size="lg" />
    },
    {
      name: language === 'en' ? 'Express Delivery' : 'التوصيل السريع',
      time: language === 'en' ? '1-2 business days' : '1-2 يوم عمل',
      price: language === 'en' ? '12 KWD' : '12 د.ك',
      description: language === 'en'
        ? 'Fast delivery for when you need your items quickly.'
        : 'توصيل سريع عندما تحتاج قطعك بسرعة.',
      icon: <Icons.Zap size="lg" />
    },
    {
      name: language === 'en' ? 'Same Day Delivery' : 'التوصيل في نفس اليوم',
      time: language === 'en' ? 'Same day (Kuwait City)' : 'نفس اليوم (مدينة الكويت)',
      price: language === 'en' ? '20 KWD' : '20 د.ك',
      description: language === 'en'
        ? 'Ultra-fast delivery available in Kuwait City only.'
        : 'توصيل فائق السرعة متاح في مدينة الكويت فقط.',
      icon: <Icons.Clock size="lg" />
    }
  ];

  const coverageAreas = [
    {
      region: language === 'en' ? 'Kuwait City' : 'مدينة الكويت',
      deliveryTime: language === 'en' ? '1-3 days' : '1-3 أيام',
      freeShippingThreshold: language === 'en' ? 'Free over 50 KWD' : 'مجاني فوق 50 د.ك'
    },
    {
      region: language === 'en' ? 'Hawalli' : 'حولي',
      deliveryTime: language === 'en' ? '2-4 days' : '2-4 أيام',
      freeShippingThreshold: language === 'en' ? 'Free over 75 KWD' : 'مجاني فوق 75 د.ك'
    },
    {
      region: language === 'en' ? 'Salmiya' : 'السالمية',
      deliveryTime: language === 'en' ? '2-4 days' : '2-4 أيام',
      freeShippingThreshold: language === 'en' ? 'Free over 75 KWD' : 'مجاني فوق 75 د.ك'
    },
    {
      region: language === 'en' ? 'Jahra' : 'الجهراء',
      deliveryTime: language === 'en' ? '3-5 days' : '3-5 أيام',
      freeShippingThreshold: language === 'en' ? 'Free over 100 KWD' : 'مجاني فوق 100 د.ك'
    },
    {
      region: language === 'en' ? 'Ahmadi' : 'الأحمدي',
      deliveryTime: language === 'en' ? '3-5 days' : '3-5 أيام',
      freeShippingThreshold: language === 'en' ? 'Free over 100 KWD' : 'مجاني فوق 100 د.ك'
    }
  ];

  const faqs = [
    {
      question: language === 'en' ? 'When will my order ship?' : 'متى سيتم شحن طلبي؟',
      answer: language === 'en'
        ? 'Orders are typically processed and shipped within 24 hours of placement. You\'ll receive a confirmation email with tracking information once your order ships.'
        : 'يتم عادةً معالجة وشحن الطلبات خلال 24 ساعة من التقديم. ستتلقى بريداً إلكترونياً للتأكيد مع معلومات التتبع بمجرد شحن طلبك.'
    },
    {
      question: language === 'en' ? 'Can I track my order?' : 'هل يمكنني تتبع طلبي؟',
      answer: language === 'en'
        ? 'Yes! You\'ll receive a tracking number via email and SMS once your order ships. You can also track your order through your account dashboard.'
        : 'نعم! ستتلقى رقم تتبع عبر البريد الإلكتروني والرسائل النصية بمجرد شحن طلبك. يمكنك أيضاً تتبع طلبك من خلال لوحة تحكم حسابك.'
    },
    {
      question: language === 'en' ? 'What if I\'m not home for delivery?' : 'ماذا لو لم أكن في المنزل عند التوصيل؟',
      answer: language === 'en'
        ? 'Our delivery partners will attempt delivery twice. If you\'re not available, they\'ll leave a card with instructions for pickup or rescheduling.'
        : 'شركاؤنا في التوصيل سيحاولون التوصيل مرتين. إذا لم تكن متاحاً، سيتركون بطاقة مع تعليمات للاستلام أو إعادة الجدولة.'
    },
    {
      question: language === 'en' ? 'Do you ship fragile items?' : 'هل تشحنون القطع الهشة؟',
      answer: language === 'en'
        ? 'Yes, all vintage items are carefully packaged with appropriate protective materials. Fragile items receive extra care and are clearly marked for special handling.'
        : 'نعم، جميع القطع العتيقة يتم تعبئتها بعناية بمواد حماية مناسبة. القطع الهشة تتلقى رعاية إضافية ويتم تمييزها بوضوح للمعالجة الخاصة.'
    }
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      <SearchSection />
      
      <main className="pb-24 md:pb-8 pt-4 md:pt-8">
        <div className="container mx-auto mobile-px max-w-4xl">
          {/* Page Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-mobile-2xl md:text-4xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-4">
              {language === 'en' ? 'Shipping & Delivery' : 'الشحن والتوصيل'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-mobile-base md:text-lg max-w-2xl mx-auto">
              {language === 'en'
                ? 'Fast, reliable delivery across Kuwait. Choose the shipping option that works best for you.'
                : 'توصيل سريع وموثوق في جميع أنحاء الكويت. اختر خيار الشحن الذي يناسبك.'
              }
            </p>
          </div>

          {/* Shipping Methods */}
          <div className="mb-12">
            <h2 className="text-mobile-xl md:text-2xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-6 text-center">
              {language === 'en' ? 'Shipping Methods' : 'طرق الشحن'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shippingMethods.map((method, index) => (
                <div key={index} className="bg-background-light dark:bg-background-dark border border-neutral-beige dark:border-accent-olive-dark rounded-lg p-6 text-center">
                  <div className="text-accent-peach mb-4 flex justify-center">
                    {method.icon}
                  </div>
                  <h3 className="font-semibold text-accent-olive-dark dark:text-neutral-beige mb-2">
                    {method.name}
                  </h3>
                  <div className="text-mobile-lg font-bold text-accent-peach mb-2">
                    {method.price}
                  </div>
                  <div className="text-mobile-sm text-gray-600 dark:text-gray-400 mb-3">
                    {method.time}
                  </div>
                  <p className="text-mobile-sm text-gray-600 dark:text-gray-400">
                    {method.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Coverage Areas */}
          <div className="mb-12">
            <h2 className="text-mobile-xl md:text-2xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-6 text-center">
              {language === 'en' ? 'Delivery Coverage' : 'مناطق التوصيل'}
            </h2>
            <div className="bg-background-light dark:bg-background-dark border border-neutral-beige dark:border-accent-olive-dark rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-beige dark:bg-accent-olive">
                    <tr>
                      <th className="px-6 py-3 text-left text-mobile-sm font-semibold text-accent-olive-dark dark:text-neutral-beige">
                        {language === 'en' ? 'Region' : 'المنطقة'}
                      </th>
                      <th className="px-6 py-3 text-left text-mobile-sm font-semibold text-accent-olive-dark dark:text-neutral-beige">
                        {language === 'en' ? 'Delivery Time' : 'وقت التوصيل'}
                      </th>
                      <th className="px-6 py-3 text-left text-mobile-sm font-semibold text-accent-olive-dark dark:text-neutral-beige">
                        {language === 'en' ? 'Free Shipping' : 'الشحن المجاني'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-beige dark:divide-accent-olive-dark">
                    {coverageAreas.map((area, index) => (
                      <tr key={index} className="hover:bg-neutral-beige/50 dark:hover:bg-accent-olive/50">
                        <td className="px-6 py-4 text-mobile-sm text-accent-olive-dark dark:text-neutral-beige font-medium">
                          {area.region}
                        </td>
                        <td className="px-6 py-4 text-mobile-sm text-gray-600 dark:text-gray-400">
                          {area.deliveryTime}
                        </td>
                        <td className="px-6 py-4 text-mobile-sm text-gray-600 dark:text-gray-400">
                          {area.freeShippingThreshold}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="mb-12">
            <h2 className="text-mobile-xl md:text-2xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-6 text-center">
              {language === 'en' ? 'Important Information' : 'معلومات مهمة'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-beige dark:bg-accent-olive rounded-lg p-6">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Icons.Info size="lg" className="text-accent-peach flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-accent-olive-dark dark:text-neutral-beige mb-2">
                      {language === 'en' ? 'Business Days' : 'أيام العمل'}
                    </h3>
                    <p className="text-mobile-sm text-gray-600 dark:text-gray-400">
                      {language === 'en'
                        ? 'Delivery times are based on business days (Sunday-Thursday). Orders placed on weekends will be processed on the next business day.'
                        : 'أوقات التوصيل مبنية على أيام العمل (الأحد-الخميس). الطلبات المقدمة في عطلات نهاية الأسبوع ستتم معالجتها في يوم العمل التالي.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-beige dark:bg-accent-olive rounded-lg p-6">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Icons.Shield size="lg" className="text-accent-peach flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-accent-olive-dark dark:text-neutral-beige mb-2">
                      {language === 'en' ? 'Package Protection' : 'حماية الطرود'}
                    </h3>
                    <p className="text-mobile-sm text-gray-600 dark:text-gray-400">
                      {language === 'en'
                        ? 'All packages are fully insured and carefully packaged to ensure your vintage items arrive in perfect condition.'
                        : 'جميع الطرود مؤمنة بالكامل ومغلفة بعناية لضمان وصول قطعك العتيقة في حالة مثالية.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-mobile-xl md:text-2xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-6 text-center">
              {language === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة'}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
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
          </div>

          {/* Contact Support */}
          <div className="bg-accent-peach/10 rounded-lg p-6 text-center">
            <h3 className="text-mobile-lg font-semibold text-accent-olive-dark dark:text-neutral-beige mb-4">
              {language === 'en' ? 'Need Help with Shipping?' : 'هل تحتاج مساعدة في الشحن؟'}
            </h3>
            <p className="text-mobile-sm text-gray-600 dark:text-gray-400 mb-6">
              {language === 'en'
                ? 'Our customer support team is here to help with any shipping questions or concerns.'
                : 'فريق دعم العملاء لدينا هنا لمساعدتك في أي أسئلة أو استفسارات حول الشحن.'
              }
            </p>
            <a
              href="/contact"
              className="mobile-button inline-flex items-center bg-accent-peach text-white px-6 py-3 rounded-lg hover:bg-accent-peach-dark transition-colors"
            >
              {language === 'en' ? 'Contact Support' : 'اتصل بالدعم'}
              <Icons.ArrowRight size="sm" className="ml-2" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
} 