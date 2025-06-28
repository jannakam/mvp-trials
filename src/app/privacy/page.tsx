'use client';

import { Header } from '@/components/Header';
import { SearchSection } from '@/components/SearchSection';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';

export default function PrivacyPage() {
  const { language } = useAppContext();
  const t = translations[language];

  const sections = [
    {
      title: language === 'en' ? 'Information We Collect' : 'المعلومات التي نجمعها',
      content: language === 'en'
        ? 'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This may include your name, email address, phone number, shipping address, and payment information. We also collect information about your use of our services, including your browsing history, search queries, and interactions with our platform.'
        : 'نجمع المعلومات التي تقدمها لنا مباشرة، مثل عندما تنشئ حساباً أو تقوم بعملية شراء أو تتصل بنا. قد يشمل ذلك اسمك وعنوان بريدك الإلكتروني ورقم هاتفك وعنوان الشحن ومعلومات الدفع. كما نجمع معلومات حول استخدامك لخدماتنا، بما في ذلك سجل التصفح واستعلامات البحث والتفاعلات مع منصتنا.'
    },
    {
      title: language === 'en' ? 'How We Use Your Information' : 'كيف نستخدم معلوماتك',
      content: language === 'en'
        ? 'We use the information we collect to provide, maintain, and improve our services, process transactions, communicate with you, and personalize your experience. We may also use your information to detect and prevent fraud, comply with legal obligations, and for other legitimate business purposes.'
        : 'نستخدم المعلومات التي نجمعها لتوفير وصيانة وتحسين خدماتنا، ومعالجة المعاملات، والتواصل معك، وتخصيص تجربتك. كما قد نستخدم معلوماتك للكشف عن الاحتيال ومنعه، والامتثال للالتزامات القانونية، ولأغراض تجارية مشروعة أخرى.'
    },
    {
      title: language === 'en' ? 'Information Sharing' : 'مشاركة المعلومات',
      content: language === 'en'
        ? 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with service providers who assist us in operating our platform, processing payments, or providing customer support. We may also share information when required by law or to protect our rights and safety.'
        : 'لا نبيع أو نتاجر أو ننقل معلوماتك الشخصية إلى أطراف ثالثة دون موافقتك، إلا كما هو موضح في هذه السياسة. قد نشارك معلوماتك مع مقدمي الخدمات الذين يساعدوننا في تشغيل منصتنا أو معالجة المدفوعات أو تقديم دعم العملاء. كما قد نشارك المعلومات عندما يقتضي القانون ذلك أو لحماية حقوقنا وسلامتنا.'
    },
    {
      title: language === 'en' ? 'Data Security' : 'أمان البيانات',
      content: language === 'en'
        ? 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.'
        : 'نطبق تدابير تقنية وتنظيمية مناسبة لحماية معلوماتك الشخصية ضد الوصول غير المصرح به أو التعديل أو الكشف أو التدمير. ومع ذلك، لا توجد طريقة إرسال عبر الإنترنت أو تخزين إلكتروني آمنة بنسبة 100%، ولا يمكننا ضمان الأمان المطلق.'
    },
    {
      title: language === 'en' ? 'Cookies and Tracking' : 'ملفات تعريف الارتباط والتتبع',
      content: language === 'en'
        ? 'We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookie settings through your browser preferences, though disabling cookies may affect the functionality of our website.'
        : 'نستخدم ملفات تعريف الارتباط وتقنيات التتبع المماثلة لتحسين تجربة التصفح الخاصة بك، وتحليل حركة الموقع، وفهم من أين يأتي زوارنا. يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال تفضيلات المتصفح، على الرغم من أن تعطيل ملفات تعريف الارتباط قد يؤثر على وظائف موقعنا الإلكتروني.'
    },
    {
      title: language === 'en' ? 'Your Rights' : 'حقوقك',
      content: language === 'en'
        ? 'You have the right to access, correct, or delete your personal information. You may also have the right to restrict or object to certain processing of your information. To exercise these rights, please contact us using the information provided below. We will respond to your request within a reasonable timeframe.'
        : 'لديك الحق في الوصول إلى معلوماتك الشخصية أو تصحيحها أو حذفها. كما قد يكون لديك الحق في تقييد أو الاعتراض على معالجة معينة لمعلوماتك. لممارسة هذه الحقوق، يرجى الاتصال بنا باستخدام المعلومات المقدمة أدناه. سنرد على طلبك في غضون إطار زمني معقول.'
    },
    {
      title: language === 'en' ? 'Data Retention' : 'الاحتفاظ بالبيانات',
      content: language === 'en'
        ? 'We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we will securely delete or anonymize it.'
        : 'نحتفظ بمعلوماتك الشخصية طالما كان ذلك ضرورياً لتوفير خدماتنا، والامتثال للالتزامات القانونية، وحل النزاعات، وتنفيذ اتفاقياتنا. عندما لم نعد بحاجة إلى معلوماتك، سنقوم بحذفها أو إخفاء هويتها بشكل آمن.'
    },
    {
      title: language === 'en' ? 'Children\'s Privacy' : 'خصوصية الأطفال',
      content: language === 'en'
        ? 'Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.'
        : 'خدماتنا ليست مخصصة للأطفال دون سن 13 عاماً. لا نجمع عمداً معلومات شخصية من الأطفال دون سن 13. إذا كنت أحد الوالدين أو الوصي وتعتقد أن طفلك قد زودنا بمعلومات شخصية، يرجى الاتصال بنا فوراً.'
    },
    {
      title: language === 'en' ? 'International Transfers' : 'التحويلات الدولية',
      content: language === 'en'
        ? 'Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and that your information receives adequate protection.'
        : 'قد يتم نقل معلوماتك ومعالجتها في بلدان أخرى غير بلدك. نتأكد من أن هذه التحويلات تتوافق مع قوانين حماية البيانات السارية وأن معلوماتك تتلقى حماية كافية.'
    },
    {
      title: language === 'en' ? 'Changes to This Policy' : 'التغييرات على هذه السياسة',
      content: language === 'en'
        ? 'We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.'
        : 'قد نحدث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات جوهرية من خلال نشر السياسة الجديدة على هذه الصفحة وتحديث تاريخ "آخر تحديث". استمرارك في استخدام خدماتنا بعد هذه التغييرات يشكل قبول السياسة المحدثة.'
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
              {language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-mobile-base md:text-lg">
              {language === 'en'
                ? 'Last updated: January 2024'
                : 'آخر تحديث: يناير 2024'
              }
            </p>
          </div>

          {/* Privacy Content */}
          <div className="bg-background-light dark:bg-background-dark border border-neutral-beige dark:border-accent-olive-dark rounded-lg p-6 md:p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 dark:text-gray-400 text-mobile-base mb-8">
                {language === 'en'
                  ? 'At DUSTED, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.'
                  : 'في DUSTED، نحن ملتزمون بحماية خصوصيتك وضمان أمان معلوماتك الشخصية. توضح سياسة الخصوصية هذه كيف نجمع ونستخدم ونكشف ونحمي معلوماتك عند استخدام موقعنا الإلكتروني وخدماتنا.'
                }
              </p>

              {sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-mobile-lg md:text-xl font-semibold text-accent-olive-dark dark:text-neutral-beige mb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-mobile-base leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}

              {/* Contact Information */}
              <div className="mt-12 p-6 bg-neutral-beige dark:bg-accent-olive rounded-lg">
                <h3 className="text-mobile-lg font-semibold text-accent-olive-dark dark:text-neutral-beige mb-4">
                  {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-mobile-base mb-4">
                  {language === 'en'
                    ? 'If you have any questions about this Privacy Policy or our data practices, please contact us:'
                    : 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو ممارسات البيانات لدينا، يرجى الاتصال بنا:'
                  }
                </p>
                <div className="space-y-2 text-mobile-sm text-gray-600 dark:text-gray-400">
                  <p>Email: privacy@dusted.kw</p>
                  <p>Phone: +965 1234 5678</p>
                  <p>Address: Kuwait City, Kuwait</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 