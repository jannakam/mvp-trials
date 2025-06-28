'use client';

import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';
import Link from 'next/link';
import { Icons } from './ui/Icons';

export const Footer = () => {
  const { language } = useAppContext();
  const t = translations[language];

  const footerLinks = {
    company: [
      { name: language === 'en' ? 'About Us' : 'من نحن', href: '/about' },
      { name: language === 'en' ? 'Contact Us' : 'اتصل بنا', href: '/contact' },
      { name: language === 'en' ? 'Careers' : 'وظائف', href: '/careers' },
      { name: language === 'en' ? 'Press' : 'صحافة', href: '/press' },
    ],
    support: [
      { name: language === 'en' ? 'Help Center' : 'مركز المساعدة', href: '/help' },
      { name: language === 'en' ? 'Shipping & Delivery' : 'الشحن والتوصيل', href: '/shipping' },
      { name: language === 'en' ? 'Returns & Refunds' : 'الإرجاع والاسترداد', href: '/returns' },
      { name: language === 'en' ? 'Size Guide' : 'دليل المقاسات', href: '/size-guide' },
    ],
    legal: [
      { name: language === 'en' ? 'Terms & Conditions' : 'الشروط والأحكام', href: '/terms' },
      { name: language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية', href: '/privacy' },
      { name: language === 'en' ? 'Cookie Policy' : 'سياسة ملفات تعريف الارتباط', href: '/cookies' },
      { name: language === 'en' ? 'Authentication Policy' : 'سياسة المصادقة', href: '/authentication' },
    ],
    business: [
      { name: language === 'en' ? 'Sell on DUSTED' : 'بيع على DUSTED', href: '/sell' },
      { name: language === 'en' ? 'Become a Partner' : 'كن شريكاً', href: '/partner' },
      { name: language === 'en' ? 'Wholesale' : 'البيع بالجملة', href: '/wholesale' },
      { name: language === 'en' ? 'Affiliate Program' : 'برنامج الشركاء', href: '/affiliate' },
    ]
  };

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com/dusted.kw', icon: <Icons.Instagram size="sm" /> },
    { name: 'Facebook', href: 'https://facebook.com/dusted.kw', icon: <Icons.Facebook size="sm" /> },
    { name: 'Twitter', href: 'https://twitter.com/dusted.kw', icon: <Icons.Twitter size="sm" /> },
    { name: 'YouTube', href: 'https://youtube.com/dusted.kw', icon: <Icons.YouTube size="sm" /> },
    { name: 'TikTok', href: 'https://tiktok.com/@dusted.kw', icon: <Icons.TikTok size="sm" /> }
  ];

  return (
    <footer className="bg-accent-olive-dark dark:bg-background-dark border-t border-neutral-beige dark:border-accent-olive-dark">
      <div className="container mx-auto mobile-px py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-neutral-beige mb-2">DUSTED</h3>
              <p className="text-mobile-sm text-gray-300 dark:text-gray-400 mb-4">
                {language === 'en'
                  ? 'Kuwait\'s premier vintage marketplace. Discover rare treasures and timeless pieces.'
                  : 'السوق الرائد للقطع العتيقة في الكويت. اكتشف الكنوز النادرة والقطع الخالدة.'
                }
              </p>
            </div>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 rtl:space-x-reverse">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-beige hover:text-accent-peach transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-neutral-beige mb-4">
              {language === 'en' ? 'Company' : 'الشركة'}
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-mobile-sm text-gray-300 dark:text-gray-400 hover:text-accent-peach transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-neutral-beige mb-4">
              {language === 'en' ? 'Support' : 'الدعم'}
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-mobile-sm text-gray-300 dark:text-gray-400 hover:text-accent-peach transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-neutral-beige mb-4">
              {language === 'en' ? 'Legal' : 'القانونية'}
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-mobile-sm text-gray-300 dark:text-gray-400 hover:text-accent-peach transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Links */}
          <div>
            <h4 className="font-semibold text-neutral-beige mb-4">
              {language === 'en' ? 'Business' : 'الأعمال'}
            </h4>
            <ul className="space-y-2">
              {footerLinks.business.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-mobile-sm text-gray-300 dark:text-gray-400 hover:text-accent-peach transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-neutral-beige/20 dark:border-accent-olive-dark pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-mobile-sm text-gray-300 dark:text-gray-400">
              <p>
                © 2024 DUSTED. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
              </p>
            </div>
            
            <div className="flex items-center space-x-6 rtl:space-x-reverse text-mobile-sm text-gray-300 dark:text-gray-400">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Icons.Shield size="sm" />
                <span>{language === 'en' ? 'Secure Payment' : 'دفع آمن'}</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Icons.Truck size="sm" />
                <span>{language === 'en' ? 'Fast Delivery' : 'توصيل سريع'}</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Icons.CheckCircle size="sm" />
                <span>{language === 'en' ? 'Authentic Items' : 'قطع أصلية'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 