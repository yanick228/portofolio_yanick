import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiFolder, HiBriefcase, HiAcademicCap, HiUser } from 'react-icons/hi';
import {
  getProjects,
  getExperiences,
  getEducations,
  getAbout,
} from '../services/supabaseService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    experiences: 0,
    educations: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, experiences, educations] = await Promise.all([
          getProjects(),
          getExperiences(),
          getEducations(),
        ]);

        setStats({
          projects: projects.length,
          experiences: experiences.length,
          educations: educations.length,
          loading: false,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Projets',
      value: stats.projects,
      icon: HiFolder,
      color: 'from-blue-500 to-blue-600',
      link: '/admin/projects',
    },
    {
      title: 'Expériences',
      value: stats.experiences,
      icon: HiBriefcase,
      color: 'from-green-500 to-green-600',
      link: '/admin/experiences',
    },
    {
      title: 'Formations',
      value: stats.educations,
      icon: HiAcademicCap,
      color: 'from-purple-500 to-purple-600',
      link: '/admin/educations',
    },
    {
      title: 'À propos',
      value: 'Gérer',
      icon: HiUser,
      color: 'from-orange-500 to-orange-600',
      link: '/admin/about',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Dashboard
      </h1>

      {stats.loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.title}
                to={stat.link}
                className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </Link>
            );
          })}
        </div>
      )}

      <div className="mt-8 bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Actions rapides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/projects"
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Ajouter un projet
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Créer un nouveau projet pour votre portfolio
            </p>
          </Link>
          <Link
            to="/admin/experiences"
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Ajouter une expérience
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ajouter une nouvelle expérience professionnelle
            </p>
          </Link>
          <Link
            to="/admin/educations"
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Ajouter une formation
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ajouter une nouvelle formation académique
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

