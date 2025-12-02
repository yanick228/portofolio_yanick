import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { HiCode, HiCheckCircle, HiLightBulb } from 'react-icons/hi';

const About = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: HiCode, value: '3+', label: t('about.experience') },
    { icon: HiCheckCircle, value: '20+', label: t('about.projects') },
    { icon: HiLightBulb, value: '15+', label: t('about.clients') },
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
      id="about"
      className="py-20 md:py-32 bg-gray-50 dark:bg-dark-900 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Main image container */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden border-2 border-primary-500/30"
              >
                <div className="aspect-square bg-gradient-to-br from-primary-600 to-purple-600 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white/20">YA</span>
                </div>
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
                className="absolute -top-6 -right-6 w-24 h-24 bg-primary-500/20 rounded-full border-2 border-primary-500/50 flex items-center justify-center backdrop-blur-sm"
              >
                <HiCode className="w-12 h-12 text-primary-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                {t('about.description')}
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Je suis spécialisé dans le développement d'applications web modernes
                utilisant les dernières technologies. Mon approche se concentre sur
                la création de solutions élégantes et performantes qui offrent une
                expérience utilisateur exceptionnelle.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="text-center p-6 bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary-500/50 transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-12 h-12 bg-primary-500/20 rounded-full mb-4"
                  >
                    <stat.icon className="w-6 h-6 text-primary-400" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
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

