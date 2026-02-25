import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { HiCode, HiCheckCircle, HiLightBulb } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { getAbout } from '../services/portfolioService';

const About = () => {
  const { t, language } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Chemin de l'image "À propos" - placez votre image dans le dossier public
  const aboutImagePath = '/about-image.png';

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await getAbout();
        setAboutData(data);
      } catch (error) {
        console.error('Error fetching about:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const stats = [
    {
      icon: HiCode,
      value: aboutData ? `${aboutData.experience_years || 0}+` : '3+',
      label: t('about.experience')
    },
    {
      icon: HiCheckCircle,
      value: aboutData ? `${aboutData.projects_count || 0}+` : '20+',
      label: t('about.projects')
    },
    {
      icon: HiLightBulb,
      value: aboutData ? `${aboutData.clients_count || 0}+` : '15+',
      label: t('about.clients')
    },
  ];

  const description = aboutData
    ? (language === 'fr' ? aboutData.description_fr : aboutData.description_en) || t('about.description')
    : t('about.description');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  if (loading) {
    return (
      <section
        id="about"
        className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gray-50 dark:bg-dark-900 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="about"
      className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gray-50 dark:bg-dark-900 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
            {t('about.title')}
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-[320px] lg:max-w-md mx-auto">
              {/* Main image container */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden border-2 border-primary-500/30 shadow-2xl"
              >
                <div className="aspect-square relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
                  {!imageError ? (
                    <img
                      src={aboutImagePath}
                      alt="À propos de moi"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: '50% 15%' }}
                      onError={() => setImageError(true)}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-600 to-purple-600 flex items-center justify-center">
                      <span className="text-6xl font-bold text-white/20">YA</span>
                    </div>
                  )}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-purple-500/10 pointer-events-none"></div>
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-primary-500/20 rounded-full border-2 border-primary-500/50 flex items-center justify-center backdrop-blur-sm"
              >
                <HiCode className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8"
          >
            <motion.div variants={itemVariants}>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-base lg:text-lg leading-relaxed mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                {description}
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="text-center p-3 sm:p-4 md:p-5 lg:p-6 bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary-500/50 transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-primary-500/20 rounded-full mb-3 sm:mb-3.5 md:mb-4"
                  >
                    <stat.icon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary-400" />
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-1.5 md:mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-xs sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

