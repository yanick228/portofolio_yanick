import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { HiBriefcase } from 'react-icons/hi';

const Experience = () => {
  const { t } = useLanguage();

  const experiences = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'Tech Company Inc.',
      location: 'Remote',
      period: '2022 - Present',
      description: 'Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and implementing best practices.',
      achievements: [
        'Improved application performance by 40%',
        'Led a team of 5 developers',
        'Implemented CI/CD pipelines',
      ],
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Paris, France',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple client projects using modern web technologies. Collaborated with designers and product managers.',
      achievements: [
        'Built 10+ production applications',
        'Reduced load time by 50%',
        'Implemented automated testing',
      ],
    },
    {
      id: 3,
      title: 'Junior Frontend Developer',
      company: 'Digital Agency',
      location: 'Lyon, France',
      period: '2019 - 2020',
      description: 'Created responsive and interactive user interfaces using React and JavaScript. Worked closely with UX/UI designers.',
      achievements: [
        'Developed 15+ websites',
        'Learned modern frameworks',
        'Collaborated with cross-functional teams',
      ],
    },
  ];

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

  return (
    <section
      id="experience"
      className="py-20 md:py-32 bg-gray-100 dark:bg-dark-800 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
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
            {t('experience.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">{t('experience.subtitle')}</p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-purple-500 to-primary-500 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-start md:items-center gap-8`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-dark-800 z-10" />

                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                  } bg-gray-50 dark:bg-dark-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-primary-500/50 transition-all duration-300`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-primary-500/20 rounded-lg">
                      <HiBriefcase className="w-6 h-6 text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {experience.title}
                      </h3>
                      <p className="text-primary-400 font-medium mb-1">
                        {experience.company}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                        {experience.location} • {experience.period}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {experience.description}
                  </p>

                  <ul className="space-y-2">
                    {experience.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm"
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
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;

