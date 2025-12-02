import { useLanguage } from '../context/LanguageContext';
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiFigma,
  SiVuedotjs,
  SiLaravel,
  SiSupabase,
  SiBootstrap,
  SiNextdotjs,
} from 'react-icons/si';

const Skills = () => {
  const { t } = useLanguage();

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', icon: SiReact, level: 90, color: 'text-blue-400' },
        { name: 'Next.js', icon: SiNextdotjs, level: 85, color: 'text-gray-900 dark:text-white' },
        { name: 'JavaScript', icon: SiJavascript, level: 95, color: 'text-yellow-400' },
        { name: 'TypeScript', icon: SiTypescript, level: 85, color: 'text-blue-500' },
        { name: 'HTML5', icon: SiHtml5, level: 95, color: 'text-orange-400' },
        { name: 'CSS3', icon: SiCss3, level: 90, color: 'text-blue-400' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, level: 90, color: 'text-cyan-400' },
        { name: 'Bootstrap', icon: SiBootstrap, level: 85, color: 'text-purple-600' },
        { name: 'Vue.js', icon: SiVuedotjs, level: 75, color: 'text-green-400' },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', icon: SiNodedotjs, level: 85, color: 'text-green-500' },
        { name: 'Laravel', icon: SiLaravel, level: 85, color: 'text-red-500' },
        { name: 'Python', icon: SiPython, level: 80, color: 'text-yellow-500' },
      ],
    },
    {
      title: 'Database & Tools',
      skills: [
        { name: 'MySQL', icon: SiMysql, level: 85, color: 'text-blue-600' },
        { name: 'PostgreSQL', icon: SiPostgresql, level: 80, color: 'text-blue-500' },
        { name: 'Supabase', icon: SiSupabase, level: 85, color: 'text-green-500' },
        { name: 'Git', icon: SiGit, level: 90, color: 'text-orange-400' },
        { name: 'Figma', icon: SiFigma, level: 70, color: 'text-purple-400' },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="py-20 md:py-32 bg-gray-100 dark:bg-dark-800 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
            {t('skills.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">{t('skills.subtitle')}</p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full mt-4" />
        </div>

        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-gray-50 dark:bg-dark-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-primary-500 to-purple-500 rounded-full" />
                {category.title}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {category.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="group relative bg-gray-100 dark:bg-dark-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-primary-500/50 transition-all duration-300"
                  >
                    <div className="flex flex-col items-center text-center space-y-4">
                      <skill.icon
                        className={`w-12 h-12 ${skill.color}`}
                      />
                      <div className="w-full">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-900 dark:text-white font-medium text-sm">
                            {skill.name}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400 text-xs">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                          <div
                            style={{ width: `${skill.level}%` }}
                            className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

