import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import { HiArrowUp } from 'react-icons/hi';

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: FaLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaGithub, url: 'https://github.com', label: 'GitHub' },
    { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: FaInstagram, url: 'https://instagram.com', label: 'Instagram' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-50 dark:bg-dark-900 border-t border-gray-200 dark:border-gray-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent mb-3 sm:mb-4">
              Yanick ASSOGBA
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
              Full Stack Developer passionate about creating innovative web
              solutions and exceptional user experiences.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-gray-900 dark:text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">{t('footer.quickLinks')}</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map(
                (link) => (
                  <li key={link}>
                    <button
                      onClick={() => {
                        const element = document.getElementById(link);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-400 transition-colors text-xs sm:text-sm"
                    >
                      {t(`nav.${link}`)}
                    </button>
                  </li>
                )
              )}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-gray-900 dark:text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">{t('footer.social')}</h4>
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 sm:p-3 bg-gray-100 dark:bg-dark-800 hover:bg-primary-500/20 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-primary-500/50 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 hover:text-primary-400 transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm text-center md:text-left"
          >
            © {new Date().getFullYear()} Yanick ASSOGBA. {t('footer.rights')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm"
          >
            {t('footer.madeWith')} <span className="text-red-500">❤️</span> {t('footer.by')}{' '}
            <span className="text-primary-400">Yanick</span>
          </motion.p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 p-3 sm:p-4 bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600 text-white rounded-full shadow-lg shadow-primary-500/50 transition-all duration-300 z-50"
        aria-label="Scroll to top"
      >
        <HiArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.button>
    </footer>
  );
};

export default Footer;

