import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { HiAcademicCap, HiCalendar } from 'react-icons/hi';
import { getEducations } from '../services/portfolioService';

const Education = () => {
  const { t } = useLanguage();
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const data = await getEducations();
        setEducations(data);
      } catch (error) {
        console.error('Error fetching educations:', error);
        setEducations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEducations();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
        id="education"
        className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gray-50 dark:bg-dark-900 relative overflow-hidden"
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
      id="education"
      className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gray-50 dark:bg-dark-900 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
            {t('education.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg mb-3 sm:mb-4">{t('education.subtitle')}</p>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8"
        >
          {educations.map((education) => (
            <motion.div
              key={education.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -10 }}
              className="bg-gray-100 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200 dark:border-gray-800 hover:border-primary-500/50 transition-all duration-300 relative overflow-hidden"
            >
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-primary-500/10 rounded-full -mr-12 -mt-12 sm:-mr-14 sm:-mt-14 md:-mr-16 md:-mt-16" />

              <div className="relative z-10">
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="p-2 sm:p-2.5 md:p-3 bg-primary-500/20 rounded-lg flex-shrink-0">
                    <HiAcademicCap className="w-5 h-5 sm:w-6 sm:h-6 text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {education.degree}
                    </h3>
                    <p className="text-primary-400 font-medium mb-1 text-sm sm:text-base">
                      {education.institution}
                    </p>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                      <HiCalendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>{education.period}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                      {education.location}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                  {education.description}
                </p>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-3 sm:pt-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    Principales matières:
                  </h4>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {education.courses.map((course, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-1.5 sm:gap-2 text-gray-600 dark:text-gray-400 text-xs sm:text-sm"
                      >
                        <span className="text-primary-400 mt-1">▹</span>
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;

