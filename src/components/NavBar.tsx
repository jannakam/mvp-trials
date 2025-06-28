import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Explore', href: '/explore' },
  { name: 'Collections', href: '/collections' },
  { name: 'Brands', href: '/brands' },
];

export const NavBar = () => {
  const pathname = usePathname();
  return (
    <nav className="md:hidden w-full bg-background-light dark:bg-background-dark">
      <div className="container mx-auto flex items-center justify-center py-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-6 py-3 font-medium text-mobile-base transition-colors touch-target border-b-2 ${
              pathname === link.href 
                ? 'text-accent-peach border-accent-peach' 
                : 'text-gray-600 dark:text-gray-400 border-transparehnt hover:text-accent-peach hover:border-accent-peach/50'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}; 