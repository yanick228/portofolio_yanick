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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
            {t('education.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg mb-3 sm:mb-4">{t('education.subtitle')}</p>
          <div className="w-20 sm:w-24 h-1 bg-primary-500 mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {educations.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-white dark:bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 dark:border-gray-800">
                  <HiAcademicCap className="w-10 h-10 text-gray-400 dark:text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Aucune formation disponible
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Les formations seront affichées ici une fois ajoutées depuis le panneau d'administration.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
              {educations.map((education) => (
                <div
                  key={education.id}
                  className="bg-white dark:bg-dark-800 rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-100 dark:border-gray-800 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-md"
                >
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex-shrink-0">
                        <HiAcademicCap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {education.degree}
                        </h3>
                        <p className="text-primary-600 dark:text-primary-400 font-medium mb-1 text-sm">
                          {education.institution}
                        </p>
                        <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 text-xs">
                          <HiCalendar className="w-3.5 h-3.5" />
                          <span>{education.period}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                      {education.description}
                    </p>

                    <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Principales matières:
                      </h4>
                      <ul className="space-y-1.5">
                        {education.courses.map((course, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm"
                          >
                            <span className="text-primary-500 mt-1">▹</span>
                            <span>{course}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Education;
