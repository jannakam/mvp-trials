'use client';

import { Header } from '@/components/Header';
import { SearchSection } from '@/components/SearchSection';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';

export default function TermsPage() {
  const { language } = useAppContext();
  const t = translations[language];

  const sections = [
    {
      title: language === 'en' ? '1. Acceptance of Terms' : '1. قبول الشروط',
      content: language === 'en' 
        ? 'By accessing and using DUSTED, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
        : 'من خلال الوصول إلى DUSTED واستخدامها، فإنك تقبل وتوافق على الالتزام بشروط وأحكام هذه الاتفاقية. إذا كنت لا توافق على الالتزام بما سبق، يرجى عدم استخدام هذه الخدمة.'
    },
    {
      title: language === 'en' ? '2. Use License' : '2. ترخيص الاستخدام',
      content: language === 'en'
        ? 'Permission is granted to temporarily download one copy of the materials on DUSTED for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to reverse engineer any software contained on DUSTED; remove any copyright or other proprietary notations from the materials.'
        : 'يُمنح الإذن لتحميل نسخة مؤقتة واحدة من المواد على DUSTED للعرض الشخصي غير التجاري المؤقت فقط. هذا منح ترخيص، وليس نقل ملكية، وتحت هذا الترخيص لا يجوز لك: تعديل أو نسخ المواد؛ استخدام المواد لأي غرض تجاري أو لأي عرض عام؛ محاولة الهندسة العكسية لأي برنامج موجود في DUSTED؛ إزالة أي حقوق نشر أو رموز ملكية أخرى من المواد.'
    },
    {
      title: language === 'en' ? '3. Disclaimer' : '3. إخلاء المسؤولية',
      content: language === 'en'
        ? 'The materials on DUSTED are provided on an \'as is\' basis. DUSTED makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.'
        : 'يتم توفير المواد على DUSTED على أساس "كما هي". لا تقدم DUSTED أي ضمانات، صريحة أو ضمنية، وتتنصل هنا من جميع الضمانات الأخرى بما في ذلك، على سبيل المثال لا الحصر، الضمانات الضمنية أو شروط القابلية للتسويق، والملاءمة لغرض معين، أو عدم انتهاك الملكية الفكرية أو انتهاك آخر للحقوق.'
    },
    {
      title: language === 'en' ? '4. Limitations' : '4. القيود',
      content: language === 'en'
        ? 'In no event shall DUSTED or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on DUSTED, even if DUSTED or a DUSTED authorized representative has been notified orally or in writing of the possibility of such damage.'
        : 'في أي حال من الأحوال لا تكون DUSTED أو مورديها مسؤولة عن أي أضرار (بما في ذلك، على سبيل المثال لا الحصر، الأضرار الناتجة عن فقدان البيانات أو الأرباح، أو بسبب انقطاع الأعمال) الناشئة عن استخدام أو عدم القدرة على استخدام المواد على DUSTED، حتى لو تم إخطار DUSTED أو ممثل DUSTED المعتمد شفهياً أو كتابياً بإمكانية حدوث مثل هذا الضرر.'
    },
    {
      title: language === 'en' ? '5. Accuracy of Materials' : '5. دقة المواد',
      content: language === 'en'
        ? 'The materials appearing on DUSTED could include technical, typographical, or photographic errors. DUSTED does not warrant that any of the materials on its website are accurate, complete, or current. DUSTED may make changes to the materials contained on its website at any time without notice.'
        : 'قد تتضمن المواد الظاهرة على DUSTED أخطاء تقنية أو مطبعية أو فوتوغرافية. لا تضمن DUSTED أن أي من المواد على موقعها الإلكتروني دقيقة أو كاملة أو حديثة. قد تقوم DUSTED بإجراء تغييرات على المواد الموجودة على موقعها الإلكتروني في أي وقت دون إشعار.'
    },
    {
      title: language === 'en' ? '6. Links' : '6. الروابط',
      content: language === 'en'
        ? 'DUSTED has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by DUSTED of the site. Use of any such linked website is at the user\'s own risk.'
        : 'لم تراجع DUSTED جميع المواقع المرتبطة بموقعها الإلكتروني وليست مسؤولة عن محتويات أي موقع مرتبط من هذا القبيل. لا يعني تضمين أي رابط تأييد DUSTED للموقع. استخدام أي موقع مرتبط من هذا القبيل على مسؤولية المستخدم الخاصة.'
    },
    {
      title: language === 'en' ? '7. Modifications' : '7. التعديلات',
      content: language === 'en'
        ? 'DUSTED may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions of Use.'
        : 'قد تنقح DUSTED شروط الخدمة هذه لموقعها الإلكتروني في أي وقت دون إشعار. من خلال استخدام هذا الموقع الإلكتروني، فإنك توافق على الالتزام بالإصدار الحالي من شروط وأحكام الاستخدام هذه.'
    },
    {
      title: language === 'en' ? '8. Governing Law' : '8. القانون الحاكم',
      content: language === 'en'
        ? 'These terms and conditions are governed by and construed in accordance with the laws of Kuwait and you irrevocably submit to the exclusive jurisdiction of the courts in that location.'
        : 'تخضع هذه الشروط والأحكام وتحكم وفقاً لقوانين الكويت وتخضع بشكل لا رجعة فيه للاختصاص الحصري لمحاكم ذلك الموقع.'
    },
    {
      title: language === 'en' ? '9. User Accounts' : '9. حسابات المستخدمين',
      content: language === 'en'
        ? 'When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account. You agree not to disclose your password to any third party.'
        : 'عند إنشاء حساب معنا، يجب عليك تقديم معلومات دقيقة وكاملة وحديثة في جميع الأوقات. أنت مسؤول عن حماية كلمة المرور وعن جميع الأنشطة التي تحدث تحت حسابك. توافق على عدم الكشف عن كلمة المرور الخاصة بك لأي طرف ثالث.'
    },
    {
      title: language === 'en' ? '10. Prohibited Uses' : '10. الاستخدامات المحظورة',
      content: language === 'en'
        ? 'You may use our service only for lawful purposes and in accordance with these Terms. You agree not to use the service: in any way that violates any applicable federal, state, local, or international law or regulation; to transmit, or procure the sending of, any advertising or promotional material; to impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.'
        : 'يمكنك استخدام خدمتنا للأغراض القانونية فقط ووفقاً لهذه الشروط. توافق على عدم استخدام الخدمة: بأي طريقة تنتهك أي قانون أو لائحة فيدرالية أو محلية أو دولية سارية؛ لنقل أو الحصول على إرسال أي مادة إعلانية أو ترويجية؛ لانتحال شخصية أو محاولة انتحال شخصية الشركة أو موظف الشركة أو مستخدم آخر أو أي شخص أو كيان آخر.'
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
              {language === 'en' ? 'Terms & Conditions' : 'الشروط والأحكام'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-mobile-base md:text-lg">
              {language === 'en'
                ? 'Last updated: January 2024'
                : 'آخر تحديث: يناير 2024'
              }
            </p>
          </div>

          {/* Terms Content */}
          <div className="bg-background-light dark:bg-background-dark border border-neutral-beige dark:border-accent-olive-dark rounded-lg p-6 md:p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 dark:text-gray-400 text-mobile-base mb-8">
                {language === 'en'
                  ? 'Welcome to DUSTED. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, we assume you accept these terms and conditions in full.'
                  : 'مرحباً بك في DUSTED. تحدد هذه الشروط والأحكام القواعد واللوائح لاستخدام موقعنا الإلكتروني وخدماتنا. من خلال الوصول إلى هذا الموقع الإلكتروني، نفترض أنك تقبل هذه الشروط والأحكام بالكامل.'
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
                  {language === 'en' ? 'Contact Information' : 'معلومات الاتصال'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-mobile-base mb-4">
                  {language === 'en'
                    ? 'If you have any questions about these Terms and Conditions, please contact us:'
                    : 'إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يرجى الاتصال بنا:'
                  }
                </p>
                <div className="space-y-2 text-mobile-sm text-gray-600 dark:text-gray-400">
                  <p>Email: legal@dusted.kw</p>
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