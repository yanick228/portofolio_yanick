import { useEffect, useState } from 'react';
import { getAbout, updateAbout } from '../services/supabaseService';

const About = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    description_fr: '',
    description_en: '',
    experience_years: 0,
    projects_count: 0,
    clients_count: 0,
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      setLoading(true);
      const data = await getAbout();
      if (data) {
        setFormData({
          description_fr: data.description_fr || '',
          description_en: data.description_en || '',
          experience_years: data.experience_years || 0,
          projects_count: data.projects_count || 0,
          clients_count: data.clients_count || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching about:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateAbout(formData);
      alert('Données mises à jour avec succès !');
    } catch (error) {
      console.error('Error updating about:', error);
      alert('Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Gestion de la section À propos
      </h1>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description (Français)
            </label>
            <textarea
              value={formData.description_fr}
              onChange={(e) =>
                setFormData({ ...formData, description_fr: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-dark-900 text-gray-900 dark:text-white"
              placeholder="Description en français..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description (English)
            </label>
            <textarea
              value={formData.description_en}
              onChange={(e) =>
                setFormData({ ...formData, description_en: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-dark-900 text-gray-900 dark:text-white"
              placeholder="Description in English..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Années d'expérience
              </label>
              <input
                type="number"
                value={formData.experience_years}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience_years: parseInt(e.target.value) || 0,
                  })
                }
                min="0"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-dark-900 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre de projets
              </label>
              <input
                type="number"
                value={formData.projects_count}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    projects_count: parseInt(e.target.value) || 0,
                  })
                }
                min="0"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-dark-900 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre de clients
              </label>
              <input
                type="number"
                value={formData.clients_count}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    clients_count: parseInt(e.target.value) || 0,
                  })
                }
                min="0"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-dark-900 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Sauvegarde...' : 'Enregistrer'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default About;

