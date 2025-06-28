'use client';

import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { SearchSection } from '@/components/SearchSection';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';
import { Icons } from '@/components/ui/Icons';

export default function CookiesPage() {
  const { language } = useAppContext();
  const t = translations[language];

  const cookieTypes = [
    {
      type: language === 'en' ? 'Essential Cookies' : 'ملفات تعريف الارتباط الأساسية',
      description: language === 'en'
        => 'These cookies are necessary for the website to function properly. They enable basic functions like page navigation, access to secure areas, and form submissions.'
        : 'هذه الملفات ضرورية لكي يعمل الموقع بشكل صحيح. تمكن الوظائف الأساسية مثل التنقل بين الصفحات والوصول إلى المناطق الآمنة وإرسال النماذج.',
      examples: language === 'en' 
        ? ['Authentication', 'Shopping cart', 'Security features']
        : ['المصادقة', 'سلة التسوق', 'الميزات الأمنية'],
      icon: <Icons.Shield size="lg" />
    },
    {
      type: language === 'en' ? 'Performance Cookies' : 'ملفات تعريف الارتباط للأداء',
      description: language === 'en'
        => 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.'
        : 'تساعد هذه الملفات في فهم كيفية تفاعل الزوار مع موقعنا من خلال جمع المعلومات والإبلاغ عنها بشكل مجهول.',
      examples: language === 'en'
        => ['Page load times', 'Error tracking', 'Analytics']
        : ['أوقات تحميل الصفحات', 'تتبع الأخطاء', 'التحليلات'],
      icon: <Icons.BarChart size="lg" />
    },
    {
      type: language === 'en' ? 'Functional Cookies' : 'ملفات تعريف الارتباط الوظيفية',
      description: language === 'en'
        => 'These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.'
        : 'تمكن هذه الملفات من الوظائف المحسنة والتخصيص، مثل تذكر تفضيلاتك وإعداداتك.',
      examples: language === 'en'
        => ['Language preferences', 'Theme settings', 'Search history']
        : ['تفضيلات اللغة', 'إعدادات المظهر', 'سجل البحث'],
      icon: <Icons.Settings size="lg" />
    },
    {
      type: language === 'en' ? 'Marketing Cookies' : 'ملفات تعريف الارتباط التسويقية',
      description: language === 'en'
        => 'These cookies are used to track visitors across websites to display relevant advertisements and measure campaign effectiveness.'
        : 'تُستخدم هذه الملفات لتتبع الزوار عبر المواقع لعرض الإعلانات ذات الصلة وقياس فعالية الحملات.',
      examples: language === 'en'
        => ['Ad targeting', 'Social media integration', 'Campaign tracking']
        : ['استهداف الإعلانات', 'تكامل وسائل التواصل الاجتماعي', 'تتبع الحملات'],
      icon: <Icons.Target size="lg" />
    }
  ];

  const cookieManagement = [
    {
      title: language === 'en' ? 'Browser Settings' : 'إعدادات المتصفح',
      description: language === 'en'
        => 'You can control cookies through your browser settings. Most browsers allow you to block or delete cookies, though this may affect website functionality.'
        : 'يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات المتصفح. معظم المتصفحات تسمح لك بحظر أو حذف ملفات تعريف الارتباط، على الرغم من أن هذا قد يؤثر على وظائف الموقع.',
      icon: <Icons.Monitor size="lg" />
    },
    {
      title: language === 'en' ? 'Cookie Consent' : 'موافقة ملفات تعريف الارتباط',
      description: language === 'en'
        => 'When you first visit our website, you\'ll see a cookie consent banner. You can choose which types of cookies to accept or reject.'
        : 'عندما تزور موقعنا لأول مرة، ستشاهد شريط موافقة ملفات تعريف الارتباط. يمكنك اختيار أنواع ملفات تعريف الارتباط التي تريد قبولها أو رفضها.',
      icon: <Icons.CheckCircle size="lg" />
    },
    {
      title: language === 'en' ? 'Third-Party Cookies' : 'ملفات تعريف الارتباط من أطراف ثالثة',
      description: language === 'en'
        => 'Some cookies are set by third-party services we use, such as analytics and advertising partners. You can manage these through their respective privacy policies.'
        : 'بعض ملفات تعريف الارتباط يتم تعيينها بواسطة خدمات الأطراف الثالثة التي نستخدمها، مثل شركاء التحليلات والإعلانات. يمكنك إدارة هذه من خلال سياسات الخصوصية الخاصة بهم.',
      icon: <Icons.ExternalLink size="lg" />
    }
  ];

  const dataRetention = [
    {
      type: language === 'en' ? 'Session Cookies' : 'ملفات تعريف الارتباط للجلسة',
      duration: language === 'en' ? 'Until browser is closed' : 'حتى إغلاق المتصفح',
      description: language === 'en'
        => 'These cookies are temporary and are deleted when you close your browser.'
        : 'هذه الملفات مؤقتة ويتم حذفها عند إغلاق المتصفح.'
    },
    {
      type: language === 'en' ? 'Persistent Cookies' : 'ملفات تعريف الارتباط الدائمة',
      duration: language === 'en' ? 'Up to 2 years' : 'حتى سنتين',
      description: language === 'en'
        => 'These cookies remain on your device for a specified period or until manually deleted.'
        : 'تبقى هذه الملفات على جهازك لفترة محددة أو حتى يتم حذفها يدوياً.'
    },
    {
      type: language === 'en' ? 'Analytics Cookies' : 'ملفات تعريف الارتباط التحليلية',
      duration: language === 'en' ? 'Up to 26 months' : 'حتى 26 شهراً',
      description: language === 'en'
        => 'These cookies help us understand website usage and are retained for analytics purposes.'
        : 'تساعد هذه الملفات في فهم استخدام الموقع ويتم الاحتفاظ بها لأغراض التحليل.'
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
              {language === 'en' ? 'Cookie Policy' : 'سياسة ملفات تعريف الارتباط'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-mobile-base md:text-lg max-w-2xl mx-auto">
              {language === 'en'
                => 'Learn about how we use cookies and similar technologies to enhance your browsing experience.'
                : 'تعرف على كيفية استخدامنا لملفات تعريف الارتباط والتقنيات المماثلة لتحسين تجربة التصفح.'
              }
            </p>
          </div>

          {/* What are Cookies */}
          <div className="mb-12">
            <h2 className="text-mobile-xl md:text-2xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-6 text-center">
              {language === 'en' ? 'What are Cookies?' : 'ما هي ملفات تعريف الارتباط؟'}
            </h2>
            <div className="bg-neutral-beige dark:bg-accent-olive rounded-lg p-6">
              <p className="text-mobile-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {language === 'en'
                  => 'Cookies are small text files that are stored on your device when you visit a website. They help websites remember information about your visit, such as your preferred language and other settings.'
                  : 'ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم تخزينها على جهازك عند زيارة موقع ويب. تساعد المواقع في تذكر معلومات حول زيارتك، مثل لغتك المفضلة والإعدادات الأخرى.'
                }
              </p>
              <p className="text-mobile-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {language === 'en'
                  => 'Cookies make your next visit easier and the site more useful to you. They can also help us improve our website and provide you with a better experience.'
                  : 'تجعل ملفات تعريف الارتباط زيارتك التالية أسهل والموقع أكثر فائدة لك. يمكنها أيضاً مساعدتنا في تحسين موقعنا وتزويدك بتجربة أفضل.'
                }
              </p>
            </div>
          </div>

          {/* Types of Cookies */}
          <div className="mb-12">
            <h2 className="text-mobile-xl md:text-2xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-6 text-center">
              {language === 'en' ? 'Types of Cookies We Use' : 'أنواع ملفات تعريف الارتباط التي نستخدمها'}
            </h2>
            <div className="space-y-6">
              {cookieTypes.map((cookie, index) => (
                <div key={index} className="bg-background-light dark:bg-background-dark border border-neutral-beige dark:border-accent-olive-dark rounded-lg p-6">
                  <div className="flex items-start space-x-4 rtl:space-x-reverse mb-4">
                    <div className="text-accent-peach flex-shrink-0">
                      {cookie.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-accent-olive-dark dark:text-neutral-beige mb-2">
                        {cookie.type}
                      </h3>
                      <p className="text-mobile-sm text-gray-600 dark:text-gray-400 mb-3">
                        {cookie.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {cookie.examples.map((example, exampleIndex) => (
                          <span key={exampleIndex} className="text-mobile-xs bg-accent-peach/10 text-accent-peach px-2 py-1 rounded">
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cookie Management */}
          <div className="mb-12">
            <h2 className="text-mobile-xl md:text-2xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-6 text-center">
              {language === 'en' ? 'Managing Cookies' : 'إدارة ملفات تعريف الارتباط'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cookieManagement.map((management, index) => (
                <div key={index} className="bg-neutral-beige dark:bg-accent-olive rounded-lg p-6">
                  <div className="text-accent-peach mb-4 flex justify-center">
                    {management.icon}
                  </div>
                  <h3 className="font-semibold text-accent-olive-dark dark:text-neutral-beige mb-3 text-center">
                    {management.title}
                  </h3>
                  <p className="text-mobile-sm text-gray-600 dark:text-gray-400 text-center">
                    {management.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Data Retention */}
          <div className="mb-12">
            <h2 className="text-mobile-xl md:text-2xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-6 text-center">
              {language === 'en' ? 'Cookie Retention Periods' : 'فترات الاحتفاظ بملفات تعريف الارتباط'}
            </h2>
            <div className="bg-background-light dark:bg-background-dark border border-neutral-beige dark:border-accent-olive-dark rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-beige dark:bg-accent-olive">
                    <tr>
                      <th className="px-6 py-3 text-left text-mobile-sm font-semibold text-accent-olive-dark dark:text-neutral-beige">
                        {language === 'en' ? 'Cookie Type' : 'نوع الملف'}
                      </th>
                      <th className="px-6 py-3 text-left text-mobile-sm font-semibold text-accent-olive-dark dark:text-neutral-beige">
                        {language === 'en' ? 'Duration' : 'المدة'}
                      </th>
                      <th className="px-6 py-3 text-left text-mobile-sm font-semibold text-accent-olive-dark dark:text-neutral-beige">
                        {language === 'en' ? 'Description' : 'الوصف'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-beige dark:divide-accent-olive-dark">
                    {dataRetention.map((retention, index) => (
                      <tr key={index} className="hover:bg-neutral-beige/50 dark:hover:bg-accent-olive/50">
                        <td className="px-6 py-4 text-mobile-sm text-accent-olive-dark dark:text-neutral-beige font-medium">
                          {retention.type}
                        </td>
                        <td className="px-6 py-4 text-mobile-sm text-gray-600 dark:text-gray-400">
                          {retention.duration}
                        </td>
                        <td className="px-6 py-4 text-mobile-sm text-gray-600 dark:text-gray-400">
                          {retention.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Updates to Policy */}
          <div className="mb-12">
            <h2 className="text-mobile-xl md:text-2xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-6 text-center">
              {language === 'en' ? 'Updates to This Policy' : 'تحديثات هذه السياسة'}
            </h2>
            <div className="bg-neutral-beige dark:bg-accent-olive rounded-lg p-6">
              <p className="text-mobile-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {language === 'en'
                  => 'We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on this page.'
                  : 'قد نحدث سياسة ملفات تعريف الارتباط هذه من وقت لآخر لتعكس التغييرات في ممارساتنا أو لأسباب تشغيلية أو قانونية أو تنظيمية أخرى. سنخطرك بأي تغييرات جوهرية من خلال نشر السياسة المحدثة على هذه الصفحة.'
                }
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-accent-peach/10 rounded-lg p-6 text-center">
            <h3 className="text-mobile-lg font-semibold text-accent-olive-dark dark:text-neutral-beige mb-4">
              {language === 'en' ? 'Questions About Cookies?' : 'أسئلة حول ملفات تعريف الارتباط؟'}
            </h3>
            <p className="text-mobile-sm text-gray-600 dark:text-gray-400 mb-6">
              {language === 'en'
                => 'If you have any questions about our use of cookies, please contact our privacy team.'
                : 'إذا كان لديك أي أسئلة حول استخدامنا لملفات تعريف الارتباط، يرجى الاتصال بفريق الخصوصية.'
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
                href="/privacy"
                className="mobile-button inline-flex items-center justify-center border border-accent-peach text-accent-peach px-6 py-3 rounded-lg hover:bg-accent-peach hover:text-white transition-colors"
              >
                <Icons.Shield size="sm" className="mr-2" />
                {language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
} 