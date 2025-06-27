'use client';

import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';
import Image from 'next/image';

export default function ProfilePage() {
  const { language } = useAppContext();
  const t = translations[language];

  const profileSections = [
    {
      title: t.myAccount,
      items: [
        { label: language === 'en' ? 'Personal Information' : 'المعلومات الشخصية', icon: 'user' },
        { label: language === 'en' ? 'My Listings' : 'إعلاناتي', icon: 'list' },
        { label: language === 'en' ? 'Purchase History' : 'سجل المشتريات', icon: 'shopping-bag' },
        { label: language === 'en' ? 'Sales History' : 'سجل المبيعات', icon: 'chart' },
      ]
    },
    {
      title: t.settings,
      items: [
        { label: language === 'en' ? 'Notifications' : 'الإشعارات', icon: 'bell' },
        { label: language === 'en' ? 'Privacy' : 'الخصوصية', icon: 'shield' },
        { label: language === 'en' ? 'Payment Methods' : 'طرق الدفع', icon: 'credit-card' },
        { label: language === 'en' ? 'Shipping Addresses' : 'عناوين الشحن', icon: 'location' },
      ]
    }
  ];

  const getIcon = (iconName: string) => {
    const iconClasses = "w-5 h-5 text-accent-olive-dark dark:text-neutral-beige";
    switch (iconName) {
      case 'user':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'list':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      case 'shopping-bag':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        );
      case 'chart':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'bell':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.83 2.83A4 4 0 0011 8.27V11a4 4 0 006 3.45l2.27 2.27a4 4 0 001.9.92L21 19.17A4 4 0 0019.17 21l-2.27-2.27a4 4 0 00-3.45-6H8.27a4 4 0 00-5.44-3.44z" />
          </svg>
        );
      case 'shield':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'credit-card':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      case 'location':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      
      <main className="pb-20 pt-4">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-neutral-beige dark:bg-accent-olive">
              <Image
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
                alt="Profile"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
            <h1 className="text-2xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-1">
              Amina Al-Rashid
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'en' ? 'Member since 2023' : 'عضو منذ 2023'}
            </p>
          </div>

          {/* Profile Sections */}
          <div className="space-y-6">
            {profileSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h2 className="text-lg font-semibold text-accent-olive-dark dark:text-neutral-beige mb-3">
                  {section.title}
                </h2>
                <div className="bg-background-light dark:bg-background-dark rounded-lg border border-neutral-beige dark:border-accent-olive-dark overflow-hidden">
                  {section.items.map((item, itemIndex) => (
                    <button
                      key={itemIndex}
                      className="w-full flex items-center justify-between p-4 hover:bg-neutral-beige dark:hover:bg-accent-olive transition-colors border-b border-neutral-beige dark:border-accent-olive-dark last:border-b-0"
                    >
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        {getIcon(item.icon)}
                        <span className="text-accent-olive-dark dark:text-neutral-beige">
                          {item.label}
                        </span>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Logout Button */}
            <div className="pt-4">
              <button className="w-full px-6 py-4 bg-danger text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
                {t.logout}
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
} 