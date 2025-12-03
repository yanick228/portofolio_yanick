import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { HiExternalLink, HiCode } from 'react-icons/hi';
import { SiReact, SiJavascript, SiNodedotjs, SiMongodb, SiTailwindcss } from 'react-icons/si';
import { getProjects } from '../services/portfolioService';

const Projects = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback to empty array if error
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filters = [
    { id: 'all', label: t('projects.all') },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'fullstack', label: 'Full Stack' },
  ];

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((project) => project.category === filter);

  if (loading) {
    return (
      <section
        id="projects"
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

  const getIcon = (tag) => {
    const iconMap = {
      React: SiReact,
      JavaScript: SiJavascript,
      'Node.js': SiNodedotjs,
      MongoDB: SiMongodb,
      Tailwind: SiTailwindcss,
    };
    return iconMap[tag] || HiCode;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section
      id="projects"
      className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gray-50 dark:bg-dark-900 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
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
            {t('projects.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg mb-3 sm:mb-4">{t('projects.subtitle')}</p>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12"
        >
          {filters.map((filterItem) => (
            <motion.button
              key={filterItem.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(filterItem.id)}
              className={`px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 ${
                filter === filterItem.id
                  ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white'
                  : 'bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-dark-700'
              }`}
            >
              {filterItem.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                whileHover={{ y: -10 }}
                className="group bg-gray-100 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary-500/50 transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={project.image_url || 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800'}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 to-transparent" />
                </div>

                {/* Project Content */}
                <div className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2 group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {project.tags.map((tag, index) => {
                      const Icon = getIcon(tag);
                      return (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 bg-gray-50 dark:bg-dark-900 rounded-full text-xs text-gray-700 dark:text-gray-300"
                        >
                          <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                          {tag}
                        </span>
                      );
                    })}
                  </div>

                  {/* Links */}
                  {(project.demo_url || project.code_url) && (
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                      {project.demo_url && (
                        <motion.a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors text-xs sm:text-sm font-medium"
                        >
                          <HiExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {t('projects.viewDemo')}
                        </motion.a>
                      )}
                      {project.code_url && (
                        <motion.a
                          href={project.code_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-700 hover:border-primary-500 text-gray-700 dark:text-gray-300 hover:text-primary-400 rounded-lg transition-colors text-xs sm:text-sm font-medium"
                        >
                          <HiCode className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {t('projects.viewCode')}
                        </motion.a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;

