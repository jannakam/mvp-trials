'use client';

import { Header } from '@/components/Header';
import { SearchSection } from '@/components/SearchSection';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';
import { Icons } from '@/components/ui/Icons';

export default function AboutPage() {
  const { language } = useAppContext();
  const t = translations[language];

  const stats = [
    {
      number: '10K+',
      label: language === 'en' ? 'Happy Customers' : 'عميل سعيد'
    },
    {
      number: '50K+',
      label: language === 'en' ? 'Vintage Items' : 'قطعة عتيقة'
    },
    {
      number: '500+',
      label: language === 'en' ? 'Trusted Sellers' : 'بائع موثوق'
    },
    {
      number: '99%',
      label: language === 'en' ? 'Authenticity Rate' : 'معدل الأصالة'
    }
  ];

  const values = [
    {
      icon: <Icons.Heart size="lg" />,
      title: language === 'en' ? 'Authenticity' : 'الأصالة',
      description: language === 'en' 
        ? 'Every item is carefully verified for authenticity before listing.'
        : 'يتم التحقق بعناية من أصالة كل قطعة قبل عرضها.'
    },
    {
      icon: <Icons.Shield size="lg" />,
      title: language === 'en' ? 'Trust & Safety' : 'الثقة والأمان',
      description: language === 'en'
        ? 'Secure transactions and buyer protection on every purchase.'
        : 'معاملات آمنة وحماية المشتري في كل عملية شراء.'
    },
    {
      icon: <Icons.Users size="lg" />,
      title: language === 'en' ? 'Community' : 'المجتمع',
      description: language === 'en'
        ? 'Building a passionate community of vintage enthusiasts in Kuwait.'
        : 'بناء مجتمع متحمس من عشاق القطع العتيقة في الكويت.'
    },
    {
      icon: <Icons.Star size="lg" />,
      title: language === 'en' ? 'Quality' : 'الجودة',
      description: language === 'en'
        ? 'Curated selection of the finest vintage pieces and collectibles.'
        : 'اختيار مدروس لأفضل القطع العتيقة والمقتنيات.'
    }
  ];

  const team = [
    {
      name: 'Ahmed Al-Sabah',
      role: language === 'en' ? 'Founder & CEO' : 'المؤسس والرئيس التنفيذي',
      image: '/team/ahmed.jpg',
      bio: language === 'en'
        ? 'Passionate vintage collector with 15+ years of experience in the industry.'
        : 'جامع متحمس للقطع العتيقة مع أكثر من 15 عاماً من الخبرة في المجال.'
    },
    {
      name: 'Fatima Al-Zahra',
      role: language === 'en' ? 'Head of Curation' : 'رئيسة التجميع',
      image: '/team/fatima.jpg',
      bio: language === 'en'
        ? 'Expert in vintage fashion and home decor with a keen eye for authenticity.'
        : 'خبيرة في الأزياء العتيقة وديكور المنزل مع عين حادة للأصالة.'
    },
    {
      name: 'Omar Al-Rashid',
      role: language === 'en' ? 'Technology Lead' : 'قائد التكنولوجيا',
      image: '/team/omar.jpg',
      bio: language === 'en'
        ? 'Building the digital platform that connects vintage lovers across Kuwait.'
        : 'بناء المنصة الرقمية التي تربط عشاق القطع العتيقة في جميع أنحاء الكويت.'
    }
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      <SearchSection />
      
      <main className="pb-24 md:pb-8 pt-4 md:pt-8">
        <div className="container mx-auto mobile-px max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-mobile-2xl md:text-5xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-6">
              {language === 'en' ? 'About DUSTED' : 'عن DUSTED'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-mobile-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {language === 'en'
                ? 'We\'re passionate about connecting vintage enthusiasts with authentic treasures. Founded in Kuwait, DUSTED is your trusted marketplace for rare finds, unique collectibles, and timeless pieces that tell stories.'
                : 'نحن متحمسون لربط عشاق القطع العتيقة بالكنوز الأصيلة. تأسست في الكويت، DUSTED هي سوقك الموثوق للعثور على القطع النادرة والمقتنيات الفريدة والقطع الخالدة التي تحكي قصصاً.'
              }
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            <div className="bg-neutral-beige dark:bg-accent-olive rounded-lg p-6 md:p-8">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <Icons.Target size="lg" className="text-accent-peach" />
                <h2 className="text-mobile-xl md:text-2xl font-bold text-accent-olive-dark dark:text-neutral-beige">
                  {language === 'en' ? 'Our Mission' : 'مهمتنا'}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-mobile-base leading-relaxed">
                {language === 'en'
                  ? 'To preserve and celebrate the beauty of vintage items while creating a sustainable marketplace that benefits both collectors and sellers. We believe every piece has a story worth sharing.'
                  : 'الحفاظ على جمال القطع العتيقة والاحتفال بها مع إنشاء سوق مستدام يفيد كل من الجامعين والبائعين. نعتقد أن كل قطعة لها قصة تستحق المشاركة.'
                }
              </p>
            </div>

            <div className="bg-neutral-beige dark:bg-accent-olive rounded-lg p-6 md:p-8">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <Icons.Eye size="lg" className="text-accent-peach" />
                <h2 className="text-mobile-xl md:text-2xl font-bold text-accent-olive-dark dark:text-neutral-beige">
                  {language === 'en' ? 'Our Vision' : 'رؤيتنا'}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-mobile-base leading-relaxed">
                {language === 'en'
                  ? 'To become the leading vintage marketplace in the Middle East, fostering a community where passion for authentic vintage items thrives and cultural heritage is preserved.'
                  : 'أن نصبح السوق الرائدة للقطع العتيقة في الشرق الأوسط، وتعزيز مجتمع يزدهر فيه شغف القطع العتيقة الأصيلة والحفاظ على التراث الثقافي.'
                }
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-mobile-2xl md:text-4xl font-bold text-accent-peach mb-2">
                  {stat.number}
                </div>
                <div className="text-mobile-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-mobile-2xl md:text-3xl font-bold text-accent-olive-dark dark:text-neutral-beige text-center mb-8">
              {language === 'en' ? 'Our Values' : 'قيمنا'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="text-center p-6 bg-background-light dark:bg-background-dark border border-neutral-beige dark:border-accent-olive-dark rounded-lg">
                  <div className="text-accent-peach mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="font-semibold text-accent-olive-dark dark:text-neutral-beige mb-2">
                    {value.title}
                  </h3>
                  <p className="text-mobile-sm text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-16">
            <h2 className="text-mobile-2xl md:text-3xl font-bold text-accent-olive-dark dark:text-neutral-beige text-center mb-8">
              {language === 'en' ? 'Meet Our Team' : 'تعرف على فريقنا'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-neutral-beige dark:bg-accent-olive rounded-full flex items-center justify-center">
                    <Icons.Profile size="xl" className="text-accent-peach" />
                  </div>
                  <h3 className="font-semibold text-accent-olive-dark dark:text-neutral-beige mb-1">
                    {member.name}
                  </h3>
                  <p className="text-accent-peach text-mobile-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-mobile-sm text-gray-600 dark:text-gray-400">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Story */}
          <div className="bg-neutral-beige dark:bg-accent-olive rounded-lg p-6 md:p-8">
            <h2 className="text-mobile-xl md:text-2xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-6">
              {language === 'en' ? 'Our Story' : 'قصتنا'}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-mobile-base leading-relaxed mb-4">
                  {language === 'en'
                    ? 'DUSTED was born from a simple observation: Kuwait has a rich history of vintage treasures waiting to be discovered. What started as a small community of collectors has grown into a thriving marketplace connecting vintage enthusiasts across the country.'
                    : 'ولدت DUSTED من ملاحظة بسيطة: الكويت لديها تاريخ غني من الكنوز العتيقة في انتظار الاكتشاف. ما بدأ كمجتمع صغير من الجامعين نما ليصبح سوقاً مزدهراً يربط عشاق القطع العتيقة في جميع أنحاء البلاد.'
                  }
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-mobile-base leading-relaxed">
                  {language === 'en'
                    ? 'Today, we continue to build on this foundation, offering a platform where authenticity meets passion, and where every vintage piece finds its perfect home.'
                    : 'اليوم، نواصل البناء على هذا الأساس، ونقدم منصة حيث تلتقي الأصالة بالشغف، وحيث تجد كل قطعة عتيقة منزلها المثالي.'
                  }
                </p>
              </div>
              <div className="bg-background-light dark:bg-background-dark rounded-lg p-6 flex items-center justify-center">
                <Icons.Heart size="xl" className="text-accent-peach" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 