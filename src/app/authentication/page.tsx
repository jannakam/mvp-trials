'use client';

import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { SearchSection } from '@/components/SearchSection';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';
import { Icons } from '@/components/ui/Icons';

export default function AuthenticationPage() {
  const { language } = useAppContext();
  const t = translations[language];

  const verificationSteps = [
    {
      step: language === 'en' ? '1. Account Creation' : '1. إنشاء الحساب',
      title: language === 'en' ? 'Basic Information' : 'المعلومات الأساسية',
      description: language === 'en'
        ? 'Provide your name, email address, and phone number to create your account.'
        : 'قدم اسمك وعنوان بريدك الإلكتروني ورقم هاتفك لإنشاء حسابك.',
      icon: <Icons.Profile size="lg" />
    },
    {
      step: language === 'en' ? '2. Email Verification' : '2. التحقق من البريد الإلكتروني',
      title: language === 'en' ? 'Email Confirmation' : 'تأكيد البريد الإلكتروني',
      description: language === 'en'
        => 'Verify your email address by clicking the confirmation link sent to your inbox.'
        : 'تحقق من عنوان بريدك الإلكتروني بالنقر على رابط التأكيد المرسل إلى صندوق الوارد.',
      icon: <Icons.Mail size="lg" />
    },
    {
      step: language === 'en' ? '3. Phone Verification' : '3. التحقق من الهاتف',
      title: language === 'en' ? 'SMS Verification' : 'التحقق عبر الرسائل النصية',
      description: language === 'en'
        => 'Enter the verification code sent to your phone number to complete the verification process.'
        : 'أدخل رمز التحقق المرسل إلى رقم هاتفك لإكمال عملية التحقق.',
      icon: <Icons.Phone size="lg" />
    },
    {
      step: language === 'en' ? '4. Identity Verification' : '4. التحقق من الهوية',
      title: language === 'en' ? 'ID Verification' : 'التحقق من الهوية',
      description: language === 'en'
        => 'For sellers, provide a valid government-issued ID for identity verification and account security.'
        : 'للبائعين، قدم هوية صادرة عن الحكومة للتحقق من الهوية وأمان الحساب.',
      icon: <Icons.Shield size="lg" />
    }
  ];

  const securityMeasures = [
    {
      title: language === 'en' ? 'Two-Factor Authentication' : 'المصادقة الثنائية',
      description: language === 'en'
        => 'Enable 2FA for additional security. Receive codes via SMS or use authenticator apps.'
        : 'تفعيل المصادقة الثنائية لأمان إضافي. استلم الرموز عبر الرسائل النصية أو استخدم تطبيقات المصادقة.',
      icon: <Icons.Lock size="lg" />
    },
    {
      title: language === 'en' ? 'Password Requirements' : 'متطلبات كلمة المرور',
      description: language === 'en'
        => 'Strong passwords must be at least 8 characters long and include letters, numbers, and special characters.'
        : 'يجب أن تكون كلمات المرور القوية 8 أحرف على الأقل وتتضمن أحرفاً وأرقاماً ورموزاً خاصة.',
      icon: <Icons.Key size="lg" />
    },
    {
      title: language === 'en' ? 'Session Management' : 'إدارة الجلسات',
      description: language === 'en'
        => 'Monitor and manage active sessions. Log out from all devices remotely if needed.'
        : 'مراقبة وإدارة الجلسات النشطة. تسجيل الخروج من جميع الأجهزة عن بُعد إذا لزم الأمر.',
      icon: <Icons.Monitor size="lg" />
    },
    {
      title: language === 'en' ? 'Account Recovery' : 'استرداد الحساب',
      description: language === 'en'
        => 'Secure account recovery options including email verification and security questions.'
        : 'خيارات استرداد الحساب الآمنة بما في ذلك التحقق من البريد الإلكتروني والأسئلة الأمنية.',
      icon: <Icons.Refresh size="lg" />
    }
  ];

  const dataProtection = [
    {
      title: language === 'en' ? 'Data Encryption' : 'تشفير البيانات',
      description: language === 'en'
        => 'All personal information is encrypted using industry-standard SSL/TLS protocols.'
        : 'جميع المعلومات الشخصية مشفرة باستخدام بروتوكولات SSL/TLS القياسية في الصناعة.'
    },
    {
      title: language === 'en' ? 'Secure Storage' : 'التخزين الآمن',
      description: language === 'en'
        => 'Your data is stored in secure, encrypted databases with regular security audits.'
        : 'يتم تخزين بياناتك في قواعد بيانات آمنة ومشفرة مع تدقيق أمني منتظم.'
    },
    {
      title: language === 'en' ? 'Access Control' : 'التحكم في الوصول',
      description: language === 'en'
        => 'Strict access controls ensure only authorized personnel can access user data.'
        : 'ضوابط الوصول الصارمة تضمن أن الموظفين المصرح لهم فقط يمكنهم الوصول إلى بيانات المستخدم.'
    },
    {
      title: language === 'en' ? 'Regular Updates' : 'التحديثات المنتظمة',
      description: language === 'en'
        => 'Security systems are regularly updated to protect against the latest threats.'
        : 'يتم تحديث الأنظمة الأمنية بانتظام للحماية من أحدث التهديدات.'
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
              {language === 'en' ? 'Authentication Policy' : 'سياسة المصادقة'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-mobile-base md:text-lg max-w-2xl mx-auto">
              {language === 'en'
                => 'Learn about our authentication process and security measures to protect your account.'
                : 'تعرف على عملية المصادقة لدينا والتدابير الأمنية لحماية حسابك.'
              }
            </p>
          </div>

          {/* Verification Process */}
          <div className="mb-12">
            <h2 className="text-mobile-xl md:text-2xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-6 text-center">
              {language === 'en' ? 'Account Verification Process' : 'عملية التحقق من الحساب'}
            </h2>
            <div className="space-y-6">
              {verificationSteps.map((step, index) => (
                <div key={index} className="bg-background-light dark:bg-background-dark border border-neutral-beige dark:border-accent-olive-dark rounded-lg p-6">
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="text-accent-peach flex-shrink-0">
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-mobile-sm font-semibold text-accent-peach mb-2">
                        {step.step}
                      </div>
                      <h3 className="font-semibold text-accent-olive-dark dark:text-neutral-beige mb-2">
                        {step.title}
                      </h3>
                      <p className="text-mobile-sm text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Measures */}
          <div className="mb-12">
            <h2 className="text-mobile-xl md:text-2xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-6 text-center">
              {language === 'en' ? 'Security Measures' : 'التدابير الأمنية'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {securityMeasures.map((measure, index) => (
                <div key={index} className="bg-neutral-beige dark:bg-accent-olive rounded-lg p-6">
                  <div className="flex items-start space-x-3 rtl:space-x-reverse mb-4">
                    <div className="text-accent-peach flex-shrink-0">
                      {measure.icon}
                    </div>
                    <h3 className="font-semibold text-accent-olive-dark dark:text-neutral-beige">
                      {measure.title}
                    </h3>
                  </div>
                  <p className="text-mobile-sm text-gray-600 dark:text-gray-400">
                    {measure.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Data Protection */}
          <div className="mb-12">
            <h2 className="text-mobile-xl md:text-2xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-6 text-center">
              {language === 'en' ? 'Data Protection' : 'حماية البيانات'}
            </h2>
            <div className="bg-background-light dark:bg-background-dark border border-neutral-beige dark:border-accent-olive-dark rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dataProtection.map((protection, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-semibold text-accent-olive-dark dark:text-neutral-beige">
                      {protection.title}
                    </h3>
                    <p className="text-mobile-sm text-gray-600 dark:text-gray-400">
                      {protection.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Responsibilities */}
          <div className="mb-12">
            <h2 className="text-mobile-xl md:text-2xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-6 text-center">
              {language === 'en' ? 'User Responsibilities' : 'مسؤوليات المستخدم'}
            </h2>
            <div className="bg-neutral-beige dark:bg-accent-olive rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Icons.Check size="sm" className="text-accent-peach mt-1 flex-shrink-0" />
                  <p className="text-mobile-sm text-gray-600 dark:text-gray-400">
                    {language === 'en'
                      => 'Keep your login credentials secure and never share them with others.'
                      : 'احتفظ ببيانات تسجيل الدخول آمنة ولا تشاركها مع الآخرين أبداً.'
                    }
                  </p>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Icons.Check size="sm" className="text-accent-peach mt-1 flex-shrink-0" />
                  <p className="text-mobile-sm text-gray-600 dark:text-gray-400">
                    {language === 'en'
                      => 'Enable two-factor authentication for additional account security.'
                      : 'تفعيل المصادقة الثنائية لأمان إضافي للحساب.'
                    }
                  </p>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Icons.Check size="sm" className="text-accent-peach mt-1 flex-shrink-0" />
                  <p className="text-mobile-sm text-gray-600 dark:text-gray-400">
                    {language === 'en'
                      => 'Report any suspicious activity or unauthorized access immediately.'
                      : 'الإبلاغ عن أي نشاط مشبوه أو وصول غير مصرح به فوراً.'
                    }
                  </p>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Icons.Check size="sm" className="text-accent-peach mt-1 flex-shrink-0" />
                  <p className="text-mobile-sm text-gray-600 dark:text-gray-400">
                    {language === 'en'
                      => 'Keep your contact information up to date for account recovery purposes.'
                      : 'احتفظ بمعلومات الاتصال محدثة لأغراض استرداد الحساب.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-accent-peach/10 rounded-lg p-6 text-center">
            <h3 className="text-mobile-lg font-semibold text-accent-olive-dark dark:text-neutral-beige mb-4">
              {language === 'en' ? 'Need Help with Authentication?' : 'هل تحتاج مساعدة في المصادقة؟'}
            </h3>
            <p className="text-mobile-sm text-gray-600 dark:text-gray-400 mb-6">
              {language === 'en'
                => 'Our security team is here to help with any authentication or account security questions.'
                : 'فريق الأمان لدينا هنا لمساعدتك في أي أسئلة حول المصادقة أو أمان الحساب.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="mobile-button inline-flex items-center justify-center bg-accent-peach text-white px-6 py-3 rounded-lg hover:bg-accent-peach-dark transition-colors"
              >
                <Icons.Mail size="sm" className="mr-2" />
                {language === 'en' ? 'Contact Support' : 'اتصل بالدعم'}
              </a>
              <a
                href="/help"
                className="mobile-button inline-flex items-center justify-center border border-accent-peach text-accent-peach px-6 py-3 rounded-lg hover:bg-accent-peach hover:text-white transition-colors"
              >
                <Icons.Help size="sm" className="mr-2" />
                {language === 'en' ? 'Help Center' : 'مركز المساعدة'}
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
} 