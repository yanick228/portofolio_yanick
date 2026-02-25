import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight, HiCode, HiCursorClick, HiDownload } from 'react-icons/hi';
import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';

const Hero = () => {
  const { t } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Chemin de l'image de profil - vous pouvez changer cela
  const profileImagePath = '/profile.png';

  // Chemin du CV - placez votre CV dans le dossier public
  const cvPath = '/CV_Yanick_ASSOGBA.pdf';

  // Fonction pour ouvrir le CV dans le navigateur
  const handleDownloadCV = () => {
    window.open(cvPath, '_blank');
  };

  // Liste des titres qui défilent
  const titles = [
    'Développeur Full Stack',
    'Développeur Web',
    'Développeur Mobile',
    'Développeur Frontend',
    'Développeur Backend',
    'Full Stack Developer'
  ];

  // Effet Typewriter
  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    let timeout;

    if (!isDeleting && displayedText.length < currentTitle.length) {
      // Ajouter une lettre
      timeout = setTimeout(() => {
        setDisplayedText(currentTitle.slice(0, displayedText.length + 1));
      }, 100); // Vitesse de frappe
    } else if (!isDeleting && displayedText.length === currentTitle.length) {
      // Attendre avant de commencer à effacer
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000); // Temps d'affichage avant effacement
    } else if (isDeleting && displayedText.length > 0) {
      // Effacer une lettre
      timeout = setTimeout(() => {
        setDisplayedText(currentTitle.slice(0, displayedText.length - 1));
      }, 50); // Vitesse d'effacement (plus rapide)
    } else if (isDeleting && displayedText.length === 0) {
      // Passer au titre suivant
      setIsDeleting(false);
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [displayedText, isDeleting, currentTitleIndex]);

  // Réinitialiser le texte quand on change de titre
  useEffect(() => {
    setDisplayedText('');
    setIsDeleting(false);
  }, [currentTitleIndex]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-dark-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 relative z-10 pt-20 sm:pt-24 md:pt-16 lg:pt-0">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left order-2 md:order-1"
          >
            <p className="text-primary-500 font-medium mb-3 sm:mb-4 text-base sm:text-lg">
              {t('hero.greeting')}
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6">
              <span className="block text-gray-900 dark:text-white">{t('hero.name').split(' ')[0]}</span>
              <span className="block text-primary-600 dark:text-primary-500">
                {t('hero.name').split(' ')[1]}
              </span>
            </h1>

            <div className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 md:mb-7 lg:mb-8 min-h-[1.75rem] sm:min-h-[2rem] md:min-h-[2.5rem] lg:min-h-[3rem] flex items-center justify-center md:justify-start">
              <h2 className="text-gray-700 dark:text-gray-300 font-semibold">
                {displayedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                  className="inline-block w-0.5 h-6 md:h-8 bg-primary-500 ml-1 align-middle"
                />
              </h2>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-5 sm:mb-6 md:mb-7 lg:mb-10 text-sm sm:text-base md:text-base lg:text-lg max-w-xl mx-auto md:mx-0">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 justify-center md:justify-start">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-5 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 md:py-3.5 lg:py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold text-xs sm:text-sm md:text-sm lg:text-base flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300"
              >
                {t('hero.cta')}
                <HiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="px-5 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 md:py-3.5 lg:py-4 border-2 border-primary-600 text-primary-600 dark:text-primary-500 hover:bg-primary-600 hover:text-white rounded-lg font-semibold text-xs sm:text-sm md:text-sm lg:text-base transition-all duration-300"
              >
                {t('hero.cta2')}
              </button>

              <button
                onClick={handleDownloadCV}
                className="px-5 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 md:py-3.5 lg:py-4 bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 text-white rounded-lg font-semibold text-xs sm:text-sm md:text-sm lg:text-base flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300"
              >
                <HiDownload className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Télécharger CV</span>
                <span className="sm:hidden">CV</span>
              </button>
            </div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 md:order-2 mb-6 sm:mb-8 md:mb-0"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-[320px] lg:max-w-md xl:max-w-lg mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-square relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-dark-800">
                  {!imageError ? (
                    <img
                      src={profileImagePath}
                      alt="Profile"
                      className="w-full h-full object-cover object-center object-top"
                      onError={() => setImageError(true)}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary-600 rounded-2xl flex items-center justify-center">
                      <HiCode className="w-32 h-32 text-white opacity-50" />
                    </div>
                  )}
                </div>
                {/* Decorative Border */}
                <div className="absolute inset-0 rounded-2xl border border-gray-200 dark:border-gray-800 pointer-events-none"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Simplified */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-700 rounded-full flex justify-center">
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-1 h-2 bg-primary-500 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

