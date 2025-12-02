import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiMoon, HiSun, HiChevronDown } from 'react-icons/hi';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { t, setLanguage, language } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷', short: 'FR' },
    { code: 'en', label: 'English', flag: '🇬🇧', short: 'EN' },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLangMenuOpen && !event.target.closest('.language-selector')) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLangMenuOpen]);

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'education', label: t('nav.education') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-dark-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Yanick
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-400 transition-colors duration-200 font-medium"
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-dark-800 hover:bg-gray-300 dark:hover:bg-dark-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <HiSun className="w-5 h-5 text-yellow-500" />
              ) : (
                <HiMoon className="w-5 h-5 text-gray-700" />
              )}
            </motion.button>
            <div className="relative language-selector">
              <motion.button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-400 transition-colors duration-200 font-medium"
                aria-label="Select language"
              >
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="hidden lg:inline">{currentLanguage.short}</span>
                <motion.div
                  animate={{ rotate: isLangMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    {languages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                        className={`relative w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-200 ${
                          language === lang.code
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                        }`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span className="font-medium">{lang.label}</span>
                        {language === lang.code && (
                          <motion.div
                            layoutId="underline"
                            initial={false}
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-dark-800 hover:bg-gray-300 dark:hover:bg-dark-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <HiSun className="w-5 h-5 text-yellow-500" />
              ) : (
                <HiMoon className="w-5 h-5 text-gray-700" />
              )}
            </motion.button>
            <div className="relative language-selector">
              <motion.button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-2 py-1.5 text-gray-700 dark:text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm font-medium"
                aria-label="Select language"
              >
                <span className="text-base">{currentLanguage.flag}</span>
                <span>{currentLanguage.short}</span>
                <motion.div
                  animate={{ rotate: isLangMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiChevronDown className="w-3 h-3" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 bg-white dark:bg-dark-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    {languages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                        className={`relative w-full flex items-center gap-2 px-3 py-2.5 text-left text-sm transition-colors duration-200 ${
                          language === lang.code
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="font-medium">{lang.label}</span>
                        {language === lang.code && (
                          <motion.div
                            layoutId="underlineMobile"
                            initial={false}
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-400 transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/98 dark:bg-dark-900/98 backdrop-blur-md border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left text-gray-700 dark:text-gray-300 hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-dark-800 px-4 py-3 rounded-lg transition-colors duration-200 font-medium"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

