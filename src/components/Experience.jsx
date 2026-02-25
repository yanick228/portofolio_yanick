import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { HiBriefcase } from 'react-icons/hi';
import { getExperiences } from '../services/portfolioService';

const Experience = () => {
  const { t } = useLanguage();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await getExperiences();
        setExperiences(data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
        setExperiences([]);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  if (loading) {
    return (
      <section
        id="experience"
        className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gray-100 dark:bg-dark-800 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="experience"
      className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gray-100 dark:bg-dark-800 relative overflow-hidden"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
            {t('experience.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg mb-3 sm:mb-4">{t('experience.subtitle')}</p>
          <div className="w-20 sm:w-24 h-1 bg-primary-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          {/* Timeline line */}
          {experiences.length > 0 && (
            <div className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 transform md:-translate-x-1/2" />
          )}

          {experiences.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-200 dark:bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiBriefcase className="w-10 h-10 text-gray-400 dark:text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Aucune expérience disponible
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Les expériences professionnelles seront affichées ici une fois ajoutées depuis le panneau d'administration.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-8 sm:space-y-10 md:space-y-12">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    } items-start md:items-center gap-4 sm:gap-6 md:gap-8`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 sm:left-6 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-primary-500 rounded-full border-2 sm:border-4 border-gray-100 dark:border-dark-800 z-10" />

                  {/* Content Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8 lg:pr-12' : 'md:ml-auto md:pl-8 lg:pl-12'
                      } bg-gray-50 dark:bg-dark-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200 dark:border-gray-800 hover:border-primary-500/50 transition-all duration-300 ml-6 sm:ml-8 md:ml-0`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="p-2 sm:p-3 bg-primary-500/20 rounded-lg flex-shrink-0">
                        <HiBriefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {experience.title}
                        </h3>
                        <p className="text-primary-400 font-medium mb-1 text-sm sm:text-base">
                          {experience.company}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-2">
                          {experience.location} • {experience.period}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                      {experience.description}
                    </p>

                    <ul className="space-y-1.5 sm:space-y-2">
                      {experience.achievements.map((achievement, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-1.5 sm:gap-2 text-gray-600 dark:text-gray-400 text-xs sm:text-sm"
                        >
                          <span className="text-primary-400 mt-1">▹</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;

