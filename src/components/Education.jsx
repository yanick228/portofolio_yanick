import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { HiAcademicCap, HiCalendar } from 'react-icons/hi';

const Education = () => {
  const { t } = useLanguage();

  const educations = [
    {
      id: 1,
      degree: 'Master en Informatique',
      institution: 'Université Paris-Saclay',
      location: 'Paris, France',
      period: '2017 - 2019',
      description: 'Spécialisation en développement web et architectures logicielles. Mention Bien.',
      courses: [
        'Architecture des applications web',
        'Bases de données avancées',
        'Ingénierie logicielle',
        'Projet de fin d\'études',
      ],
    },
    {
      id: 2,
      degree: 'Licence en Informatique',
      institution: 'Université Lyon 1',
      location: 'Lyon, France',
      period: '2014 - 2017',
      description: 'Formation générale en informatique avec focus sur la programmation et les systèmes.',
      courses: [
        'Algorithmes et structures de données',
        'Programmation orientée objet',
        'Bases de données',
        'Réseaux et systèmes',
      ],
    },
    {
      id: 3,
      degree: 'Baccalauréat Scientifique',
      institution: 'Lycée Technique',
      location: 'Lyon, France',
      period: '2011 - 2014',
      description: 'Baccalauréat avec spécialité Mathématiques et Sciences de l\'Ingénieur.',
      courses: [
        'Mathématiques',
        'Physique-Chimie',
        'Sciences de l\'Ingénieur',
      ],
    },
  ];

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

  return (
    <section
      id="education"
      className="py-20 md:py-32 bg-gray-50 dark:bg-dark-900 relative overflow-hidden"
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
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
            {t('education.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">{t('education.subtitle')}</p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {educations.map((education) => (
            <motion.div
              key={education.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -10 }}
              className="bg-gray-100 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-primary-500/50 transition-all duration-300 relative overflow-hidden"
            >
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full -mr-16 -mt-16" />

              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-primary-500/20 rounded-lg flex-shrink-0">
                    <HiAcademicCap className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {education.degree}
                    </h3>
                    <p className="text-primary-400 font-medium mb-1">
                      {education.institution}
                    </p>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <HiCalendar className="w-4 h-4" />
                      <span>{education.period}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                      {education.location}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                  {education.description}
                </p>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Principales matières:
                  </h4>
                  <ul className="space-y-2">
                    {education.courses.map((course, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm"
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

