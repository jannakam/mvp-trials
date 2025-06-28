'use client';

import { Header } from '@/components/Header';
import { SearchSection } from '@/components/SearchSection';
import { useCart } from '@/context/CartContext';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';
import { Icons } from '@/components/ui/Icons';
import { Image } from '@/components/ui/Image';
import Link from 'next/link';

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const { language } = useAppContext();
  const t = translations[language];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KW', {
      style: 'currency',
      currency: 'KWD',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const getConditionText = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return language === 'en' ? 'Excellent' : 'ممتاز';
      case 'good':
        return language === 'en' ? 'Good' : 'جيد';
      case 'fair':
        return language === 'en' ? 'Fair' : 'مقبول';
      default:
        return condition;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return 'text-green-600';
      case 'good':
        return 'text-yellow-600';
      case 'fair':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <Header />
        <SearchSection />
        
        <main className="pb-24 md:pb-8 pt-4 md:pt-8">
          <div className="container mx-auto mobile-px max-w-4xl">
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-neutral-beige dark:bg-accent-olive rounded-full flex items-center justify-center">
                <Icons.Cart size="xl" className="text-accent-peach" />
              </div>
              <h1 className="text-mobile-2xl md:text-3xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-4">
                {language === 'en' ? 'Your Cart is Empty' : 'عربة التسوق فارغة'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-mobile-lg mb-8">
                {language === 'en' 
                  ? 'Start shopping for vintage treasures!'
                  : 'ابدأ التسوق للكنوز العتيقة!'
                }
              </p>
              <Link
                href="/explore"
                className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-accent-peach text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-peach-dark transition-colors"
              >
                <Icons.ShoppingBag size="sm" />
                <span>{language === 'en' ? 'Start Shopping' : 'ابدأ التسوق'}</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      <SearchSection />
      
      <main className="pb-24 md:pb-8 pt-4 md:pt-8">
        <div className="container mx-auto mobile-px max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-mobile-2xl md:text-3xl font-bold text-accent-olive-dark dark:text-neutral-beige">
              {language === 'en' ? 'Shopping Cart' : 'عربة التسوق'}
            </h1>
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 text-mobile-sm font-medium flex items-center space-x-1 rtl:space-x-reverse"
            >
              <Icons.Trash size="sm" />
              <span>{language === 'en' ? 'Clear Cart' : 'إفراغ العربة'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-background-light dark:bg-background-dark border border-neutral-beige dark:border-accent-olive-dark rounded-lg p-4"
                  >
                    <div className="flex space-x-4 rtl:space-x-reverse">
                      {/* Item Image */}
                      <div className="flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                          fallbackSrc="/placeholder-product.jpg"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-accent-olive-dark dark:text-neutral-beige text-mobile-base mb-1">
                              {item.name}
                            </h3>
                            <p className="text-mobile-sm text-gray-600 dark:text-gray-400 mb-2">
                              {language === 'en' ? 'Seller' : 'البائع'}: {item.seller.name}
                            </p>
                            {item.size && (
                              <p className="text-mobile-sm text-gray-600 dark:text-gray-400 mb-2">
                                {language === 'en' ? 'Size' : 'المقاس'}: {item.size}
                              </p>
                            )}
                            <span className={`text-mobile-sm font-medium ${getConditionColor(item.condition)}`}>
                              {getConditionText(item.condition)}
                            </span>
                          </div>
                          
                          {/* Price */}
                          <div className="text-right">
                            <p className="font-semibold text-accent-peach text-mobile-lg">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center border border-neutral-beige dark:border-accent-olive-dark rounded hover:bg-neutral-beige dark:hover:bg-accent-olive transition-colors"
                            >
                              <Icons.Minus size="sm" />
                            </button>
                            <span className="w-12 text-center font-medium text-accent-olive-dark dark:text-neutral-beige">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center border border-neutral-beige dark:border-accent-olive-dark rounded hover:bg-neutral-beige dark:hover:bg-accent-olive transition-colors"
                            >
                              <Icons.Plus size="sm" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700 p-2"
                          >
                            <Icons.Trash size="sm" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-background-light dark:bg-background-dark border border-neutral-beige dark:border-accent-olive-dark rounded-lg p-6 sticky top-4">
                <h2 className="text-mobile-xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-6">
                  {language === 'en' ? 'Order Summary' : 'ملخص الطلب'}
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      {language === 'en' ? 'Items' : 'المنتجات'} ({state.totalItems})
                    </span>
                    <span className="font-medium text-accent-olive-dark dark:text-neutral-beige">
                      {formatPrice(state.totalPrice)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      {language === 'en' ? 'Shipping' : 'الشحن'}
                    </span>
                    <span className="font-medium text-green-600">
                      {language === 'en' ? 'Free' : 'مجاني'}
                    </span>
                  </div>
                  
                  <div className="border-t border-neutral-beige dark:border-accent-olive-dark pt-4">
                    <div className="flex justify-between">
                      <span className="font-bold text-mobile-lg text-accent-olive-dark dark:text-neutral-beige">
                        {language === 'en' ? 'Total' : 'المجموع'}
                      </span>
                      <span className="font-bold text-mobile-lg text-accent-peach">
                        {formatPrice(state.totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-accent-peach text-white py-3 rounded-lg font-medium hover:bg-accent-peach-dark transition-colors mb-4">
                  {language === 'en' ? 'Proceed to Checkout' : 'إتمام الشراء'}
                </button>
                
                <Link
                  href="/explore"
                  className="w-full inline-flex items-center justify-center space-x-2 rtl:space-x-reverse border border-accent-peach text-accent-peach py-3 rounded-lg font-medium hover:bg-accent-peach hover:text-white transition-colors"
                >
                  <Icons.ShoppingBag size="sm" />
                  <span>{language === 'en' ? 'Continue Shopping' : 'مواصلة التسوق'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 