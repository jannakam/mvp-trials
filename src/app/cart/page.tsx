'use client';

import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';
import { useState } from 'react';
import Image from 'next/image';

// Mock cart data
const mockCartItems = [
  {
    id: '1',
    name: 'Vintage Persian Rug',
    price: 250,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    condition: 'excellent' as const,
    seller: {
      name: 'Amina',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    }
  },
  {
    id: '3',
    name: 'Vintage Ceramic Vase',
    price: 120,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    condition: 'excellent' as const,
    seller: {
      name: 'Layla',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
    }
  }
];

export default function CartPage() {
  const { language } = useAppContext();
  const t = translations[language];
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [quantities, setQuantities] = useState<Record<string, number>>({
    '1': 1,
    '3': 1
  });

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantities(prev => ({
      ...prev,
      [itemId]: newQuantity
    }));
  };

  const removeItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    setQuantities(prev => {
      const newQuantities = { ...prev };
      delete newQuantities[itemId];
      return newQuantities;
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * quantities[item.id]), 0);
  const shipping = 15; // Fixed shipping cost
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      
      <main className="pb-20 pt-4">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-2">
              {t.cart}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {cartItems.length} {language === 'en' ? 'items' : 'عناصر'}
            </p>
          </div>

          {cartItems.length > 0 ? (
            <div className="space-y-6">
              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-background-light dark:bg-background-dark rounded-lg border border-neutral-beige dark:border-accent-olive-dark p-4">
                    <div className="flex space-x-4 rtl:space-x-reverse">
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-accent-olive-dark dark:text-neutral-beige mb-1 line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {language === 'en' ? 'Seller' : 'البائع'}: {item.seller.name}
                        </p>
                        <p className="text-lg font-bold text-accent-peach-dark dark:text-accent-peach">
                          {item.price * quantities[item.id]} {t.currency}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end space-y-2">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-gray-400 hover:text-danger transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <button
                            onClick={() => updateQuantity(item.id, quantities[item.id] - 1)}
                            className="w-8 h-8 rounded-full bg-neutral-beige dark:bg-accent-olive text-accent-olive-dark dark:text-neutral-beige hover:bg-neutral-beige-dark dark:hover:bg-accent-olive-dark transition-colors flex items-center justify-center"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-8 text-center font-medium text-accent-olive-dark dark:text-neutral-beige">
                            {quantities[item.id]}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, quantities[item.id] + 1)}
                            className="w-8 h-8 rounded-full bg-neutral-beige dark:bg-accent-olive text-accent-olive-dark dark:text-neutral-beige hover:bg-neutral-beige-dark dark:hover:bg-accent-olive-dark transition-colors flex items-center justify-center"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-neutral-beige dark:bg-accent-olive rounded-lg p-4">
                <h3 className="text-lg font-semibold text-accent-olive-dark dark:text-neutral-beige mb-4">
                  {language === 'en' ? 'Order Summary' : 'ملخص الطلب'}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-accent-olive-dark dark:text-neutral-beige">
                      {language === 'en' ? 'Subtotal' : 'المجموع الفرعي'}
                    </span>
                    <span className="text-accent-olive-dark dark:text-neutral-beige">
                      {subtotal} {t.currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-accent-olive-dark dark:text-neutral-beige">
                      {language === 'en' ? 'Shipping' : 'الشحن'}
                    </span>
                    <span className="text-accent-olive-dark dark:text-neutral-beige">
                      {shipping} {t.currency}
                    </span>
                  </div>
                  <div className="border-t border-accent-olive-dark dark:border-neutral-beige pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-accent-olive-dark dark:text-neutral-beige">
                        {language === 'en' ? 'Total' : 'المجموع'}
                      </span>
                      <span className="font-semibold text-accent-peach-dark dark:text-accent-peach">
                        {total} {t.currency}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full px-6 py-4 bg-accent-peach text-white font-semibold rounded-lg hover:bg-accent-peach-dark transition-colors">
                {language === 'en' ? 'Proceed to Checkout' : 'إتمام الشراء'}
              </button>
            </div>
          ) : (
            /* Empty Cart State */
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-neutral-beige dark:bg-accent-olive rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-accent-olive-dark dark:text-neutral-beige" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-accent-olive-dark dark:text-neutral-beige mb-2">
                {language === 'en' ? 'Your cart is empty' : 'سلة التسوق فارغة'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {language === 'en' 
                  ? 'Start shopping to add items to your cart' 
                  : 'ابدأ التسوق لإضافة عناصر إلى سلة التسوق'
                }
              </p>
              <button className="px-6 py-3 bg-accent-peach text-white font-medium rounded-lg hover:bg-accent-peach-dark transition-colors">
                {t.explore}
              </button>
            </div>
          )}
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
} 