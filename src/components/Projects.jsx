import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { HiExternalLink, HiCode } from 'react-icons/hi';
import { SiReact, SiJavascript, SiNodedotjs, SiMongodb, SiTailwindcss } from 'react-icons/si';

const Projects = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce platform with shopping cart, payment integration, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      tags: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
      demo: '#',
      code: '#',
      category: 'fullstack',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team collaboration features.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
      tags: ['React', 'JavaScript', 'Firebase'],
      demo: '#',
      code: '#',
      category: 'frontend',
    },
    {
      id: 3,
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media metrics with interactive charts and data visualization.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      tags: ['React', 'TypeScript', 'Tailwind'],
      demo: '#',
      code: '#',
      category: 'frontend',
    },
    {
      id: 4,
      title: 'REST API Backend',
      description: 'Scalable REST API with authentication, authorization, and comprehensive documentation.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      tags: ['Node.js', 'Express', 'MongoDB'],
      demo: '#',
      code: '#',
      category: 'backend',
    },
    {
      id: 5,
      title: 'Portfolio Website',
      description: 'A beautiful and responsive portfolio website showcasing projects and skills.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
      tags: ['React', 'Tailwind', 'Framer Motion'],
      demo: '#',
      code: '#',
      category: 'frontend',
    },
    {
      id: 6,
      title: 'Weather App',
      description: 'Real-time weather application with location-based forecasts and beautiful UI.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800',
      tags: ['React', 'JavaScript', 'API'],
      demo: '#',
      code: '#',
      category: 'frontend',
    },
  ];

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
      className="py-20 md:py-32 bg-gray-50 dark:bg-dark-900 relative overflow-hidden"
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
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
            {t('projects.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">{t('projects.subtitle')}</p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filterItem) => (
            <motion.button
              key={filterItem.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(filterItem.id)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
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
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 to-transparent" />
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => {
                      const Icon = getIcon(tag);
                      return (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-gray-50 dark:bg-dark-900 rounded-full text-xs text-gray-700 dark:text-gray-300"
                        >
                          <Icon className="w-4 h-4" />
                          {tag}
                        </span>
                      );
                    })}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      <HiExternalLink className="w-4 h-4" />
                      {t('projects.viewDemo')}
                    </motion.a>
                    <motion.a
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 hover:border-primary-500 text-gray-700 dark:text-gray-300 hover:text-primary-400 rounded-lg transition-colors text-sm font-medium"
                    >
                      <HiCode className="w-4 h-4" />
                      {t('projects.viewCode')}
                    </motion.a>
                  </div>
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

