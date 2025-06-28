'use client';

import { Header } from '@/components/Header';
import { SearchSection } from '@/components/SearchSection';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';
import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';

export default function ContactPage() {
  const { language } = useAppContext();
  const t = translations[language];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <Icons.Profile size="lg" />,
      title: language === 'en' ? 'Customer Support' : 'دعم العملاء',
      details: [
        language === 'en' ? 'Available 24/7' : 'متاح على مدار الساعة',
        language === 'en' ? 'Response within 2 hours' : 'استجابة خلال ساعتين'
      ]
    },
    {
      icon: <Icons.Mail size="lg" />,
      title: language === 'en' ? 'Email' : 'البريد الإلكتروني',
      details: [
        'support@dusted.kw',
        'info@dusted.kw'
      ]
    },
    {
      icon: <Icons.Phone size="lg" />,
      title: language === 'en' ? 'Phone' : 'الهاتف',
      details: [
        '+965 1234 5678',
        '+965 9876 5432'
      ]
    },
    {
      icon: <Icons.Location size="lg" />,
      title: language === 'en' ? 'Office' : 'المكتب',
      details: [
        language === 'en' ? 'Kuwait City, Kuwait' : 'مدينة الكويت، الكويت',
        language === 'en' ? 'Business Hours: 9 AM - 6 PM' : 'ساعات العمل: 9 صباحاً - 6 مساءً'
      ]
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
              {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-mobile-base md:text-lg max-w-2xl mx-auto">
              {language === 'en' 
                ? 'Have questions or need assistance? We\'re here to help! Reach out to our team and we\'ll get back to you as soon as possible.'
                : 'هل لديك أسئلة أو تحتاج مساعدة؟ نحن هنا لمساعدتك! تواصل مع فريقنا وسنرد عليك في أقرب وقت ممكن.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="bg-background-light dark:bg-background-dark border border-neutral-beige dark:border-accent-olive-dark rounded-lg p-6 md:p-8">
              <h2 className="text-mobile-xl md:text-2xl font-semibold text-accent-olive-dark dark:text-neutral-beige mb-6">
                {language === 'en' ? 'Send us a message' : 'أرسل لنا رسالة'}
              </h2>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg">
                  <p className="text-green-800 dark:text-green-200 text-mobile-sm">
                    {language === 'en' 
                      ? 'Thank you for your message! We\'ll get back to you soon.'
                      : 'شكراً لك على رسالتك! سنرد عليك قريباً.'
                    }
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-mobile-sm font-medium text-accent-olive-dark dark:text-neutral-beige mb-2">
                    {language === 'en' ? 'Full Name' : 'الاسم الكامل'} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-beige dark:border-accent-olive-dark rounded-lg bg-white dark:bg-background-dark text-accent-olive-dark dark:text-neutral-beige focus:outline-none focus:ring-2 focus:ring-accent-peach focus:border-transparent"
                    placeholder={language === 'en' ? 'Enter your full name' : 'أدخل اسمك الكامل'}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-mobile-sm font-medium text-accent-olive-dark dark:text-neutral-beige mb-2">
                    {language === 'en' ? 'Email Address' : 'عنوان البريد الإلكتروني'} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-beige dark:border-accent-olive-dark rounded-lg bg-white dark:bg-background-dark text-accent-olive-dark dark:text-neutral-beige focus:outline-none focus:ring-2 focus:ring-accent-peach focus:border-transparent"
                    placeholder={language === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-mobile-sm font-medium text-accent-olive-dark dark:text-neutral-beige mb-2">
                    {language === 'en' ? 'Subject' : 'الموضوع'} *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-beige dark:border-accent-olive-dark rounded-lg bg-white dark:bg-background-dark text-accent-olive-dark dark:text-neutral-beige focus:outline-none focus:ring-2 focus:ring-accent-peach focus:border-transparent"
                  >
                    <option value="">{language === 'en' ? 'Select a subject' : 'اختر موضوعاً'}</option>
                    <option value="general">{language === 'en' ? 'General Inquiry' : 'استفسار عام'}</option>
                    <option value="support">{language === 'en' ? 'Technical Support' : 'الدعم الفني'}</option>
                    <option value="billing">{language === 'en' ? 'Billing Question' : 'سؤال في الفواتير'}</option>
                    <option value="partnership">{language === 'en' ? 'Partnership' : 'شراكة'}</option>
                    <option value="other">{language === 'en' ? 'Other' : 'أخرى'}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-mobile-sm font-medium text-accent-olive-dark dark:text-neutral-beige mb-2">
                    {language === 'en' ? 'Message' : 'الرسالة'} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-neutral-beige dark:border-accent-olive-dark rounded-lg bg-white dark:bg-background-dark text-accent-olive-dark dark:text-neutral-beige focus:outline-none focus:ring-2 focus:ring-accent-peach focus:border-transparent resize-none"
                    placeholder={language === 'en' ? 'Tell us how we can help you...' : 'أخبرنا كيف يمكننا مساعدتك...'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mobile-button px-6 py-3 bg-accent-peach text-white font-semibold rounded-lg hover:bg-accent-peach-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting 
                    ? (language === 'en' ? 'Sending...' : 'جاري الإرسال...')
                    : (language === 'en' ? 'Send Message' : 'إرسال الرسالة')
                  }
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-mobile-xl md:text-2xl font-semibold text-accent-olive-dark dark:text-neutral-beige mb-6">
                  {language === 'en' ? 'Get in touch' : 'تواصل معنا'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-mobile-base mb-6">
                  {language === 'en' 
                    ? 'We\'re here to help and answer any questions you might have. We look forward to hearing from you.'
                    : 'نحن هنا لمساعدتك والإجابة على أي أسئلة قد تكون لديك. نتطلع إلى سماع منك.'
                  }
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse p-4 bg-neutral-beige dark:bg-accent-olive rounded-lg">
                    <div className="text-accent-peach flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-accent-olive-dark dark:text-neutral-beige mb-1">
                        {info.title}
                      </h3>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-mobile-sm text-gray-600 dark:text-gray-400">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ Link */}
              <div className="bg-accent-peach/10 rounded-lg p-6">
                <h3 className="font-semibold text-accent-olive-dark dark:text-neutral-beige mb-2">
                  {language === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة'}
                </h3>
                <p className="text-mobile-sm text-gray-600 dark:text-gray-400 mb-4">
                  {language === 'en' 
                    ? 'Find quick answers to common questions in our FAQ section.'
                    : 'اعثر على إجابات سريعة للأسئلة الشائعة في قسم الأسئلة الشائعة.'
                  }
                </p>
                <a
                  href="/help"
                  className="mobile-button inline-flex items-center text-accent-peach hover:text-accent-peach-dark font-medium transition-colors"
                >
                  {language === 'en' ? 'View FAQ' : 'عرض الأسئلة الشائعة'}
                  <Icons.ArrowRight size="sm" className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 