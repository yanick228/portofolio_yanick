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
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-20 w-72 h-72 bg-primary-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 relative z-10 pt-20 sm:pt-24 md:pt-16 lg:pt-0">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left order-2 md:order-1"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-primary-400 font-medium mb-3 sm:mb-4 text-base sm:text-lg"
            >
              {t('hero.greeting')}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6"
            >
              <span className="block text-gray-900 dark:text-white">{t('hero.name').split(' ')[0]}</span>
              <span className="block bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                {t('hero.name').split(' ')[1]}
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 md:mb-7 lg:mb-8 min-h-[1.75rem] sm:min-h-[2rem] md:min-h-[2.5rem] lg:min-h-[3rem] flex items-center justify-center md:justify-start"
            >
              <h2 className="bg-gradient-to-r from-primary-500 to-purple-500 bg-clip-text text-transparent font-semibold">
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
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-gray-600 dark:text-gray-400 mb-5 sm:mb-6 md:mb-7 lg:mb-10 text-sm sm:text-base md:text-base lg:text-lg max-w-xl mx-auto md:mx-0"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 justify-center md:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('projects')}
                className="px-5 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 md:py-3.5 lg:py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg font-semibold text-xs sm:text-sm md:text-sm lg:text-base flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-primary-500/50 transition-all duration-300"
              >
                {t('hero.cta')}
                <HiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="px-5 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 md:py-3.5 lg:py-4 border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white rounded-lg font-semibold text-xs sm:text-sm md:text-sm lg:text-base transition-all duration-300"
              >
                {t('hero.cta2')}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadCV}
                className="px-5 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 md:py-3.5 lg:py-4 bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 text-white rounded-lg font-semibold text-xs sm:text-sm md:text-sm lg:text-base flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg transition-all duration-300"
              >
                <HiDownload className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Télécharger CV</span>
                <span className="sm:hidden">CV</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 md:order-2 mb-6 sm:mb-8 md:mb-0"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-[320px] lg:max-w-md xl:max-w-lg mx-auto">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative"
              >
                {/* Profile Image Container */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="aspect-square relative overflow-hidden rounded-2xl">
                    {!imageError ? (
                      <img
                        src={profileImagePath}
                        alt="Profile"
                        className="w-full h-full object-cover object-center object-top"
                        onError={() => setImageError(true)}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl flex items-center justify-center">
                        <HiCode className="w-32 h-32 text-white opacity-50" />
                      </div>
                    )}
                  </div>

                  {/* Decorative Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-primary-400/40 pointer-events-none"></div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5 pointer-events-none"></div>
                </div>

                {/* Floating Icons */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-primary-500 rounded-full flex items-center justify-center shadow-lg z-10"
                >
                  <HiCursorClick className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-1 h-3 bg-primary-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

