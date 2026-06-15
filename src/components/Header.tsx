/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Dumbbell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

export default function Header({ isDark, onThemeToggle }: HeaderProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check which section is in view on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'career-history', 'results', 'services', 'plans', 'assessment', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section === 'career-history' ? 'about' : section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'services', label: 'SERVICES' },
    { id: 'about', label: 'ABOUT' },
    { id: 'results', label: 'THE WORK' },
    { id: 'plans', label: 'PROGRAMS' },
    { id: 'assessment', label: 'ASSESSMENT' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ease-in-out ${
      isScrolled 
        ? 'py-3 bg-surface/90 backdrop-blur-md shadow-md border-outline/20' 
        : 'py-5 bg-transparent border-transparent'
    }`}>
      <div className="flex justify-between items-center px-6 md:px-12 max-w-7xl mx-auto">
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}
          className="flex items-center gap-3 group"
          id="nav-logo"
        >
          <img 
            src="/images/logo.png" 
            alt="The Mad Fitness Logo" 
            className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform group-hover:scale-110 duration-300 rounded-full"
          />
          <span className={`font-anton text-2xl md:text-3xl tracking-tighter uppercase ${!isScrolled ? 'text-white' : 'text-on-surface'}`}>
            THE MAD <span className="text-primary italic">FITNESS</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-mono text-xs uppercase" id="desktop-menu">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); handleLinkClick(item.id); }}
              className={`transition-all duration-300 pb-1 border-b-2 hover:text-primary ${
                activeSection === item.id 
                  ? 'text-primary border-primary font-bold' 
                  : `${!isScrolled ? 'text-white' : 'text-on-surface/80'} border-transparent`
              }`}
            >
              {item.label}
            </a>
          ))}

          {/* Theme Toggle */}
          <button 
            onClick={onThemeToggle}
            aria-label="Toggle Theme" 
            className={`${!isScrolled ? 'text-white' : 'text-on-surface'} hover:text-primary transition-colors p-2 cursor-pointer border border-outline/20 hover:border-primary/50 flex items-center justify-center bg-surface-container/30`}
          >
            {isDark ? <Sun className="w-4 h-4 text-primary" /> : <Moon className="w-4 h-4 text-primary" />}
          </button>
        </div>

        {/* CTA Button */}
        <a 
          href="#assessment"
          onClick={(e) => { e.preventDefault(); handleLinkClick('assessment'); }}
          className="hidden md:inline-flex bg-primary hover:bg-[#ff3c0a] text-white hover:text-white font-anton text-xs uppercase tracking-widest px-5 py-2.5 transition-colors duration-300 border border-primary/20 hover:scale-105 active:scale-95"
          id="nav-cta-btn"
        >
          FREE ASSESSMENT
        </a>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <button 
            onClick={onThemeToggle}
            aria-label="Toggle Theme" 
            className={`${!isScrolled ? 'text-white' : 'text-on-surface'} hover:text-primary transition-colors p-2 cursor-pointer border border-outline/20`}
          >
            {isDark ? <Sun className="w-4.5 h-4.5 text-primary" /> : <Moon className="w-4.5 h-4.5 text-primary" />}
          </button>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`${!isScrolled ? 'text-white' : 'text-on-surface'} p-1.5 focus:outline-none focus:ring-1 focus:ring-primary border border-outline/20 bg-surface-container/40`}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-x-0 top-[65px] bg-surface border-b border-outline/20 px-6 py-6 space-y-4 shadow-xl flex flex-col z-40 max-h-[80vh] overflow-hidden" 
            id="mobile-drawer"
          >
            {navItems.map((item, idx) => (
              <motion.a
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 + 0.1 }}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick(item.id); }}
                className={`block py-2 font-mono text-sm border-l-2 pl-3 ${
                  activeSection === item.id 
                    ? 'text-primary border-primary font-bold bg-primary-container/10' 
                    : 'text-on-surface/80 border-transparent hover:text-primary hover:border-primary/50'
                }`}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleLinkClick('contact'); }}
              className="block text-center bg-primary text-white font-anton text-sm py-3 uppercase tracking-wider hover:opacity-90"
            >
              JOIN NOW
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
