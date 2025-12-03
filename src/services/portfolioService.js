import { supabase } from '../config/supabase';

// Récupérer tous les projets
export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  return data || [];
};

// Récupérer toutes les expériences
export const getExperiences = async () => {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
  return data || [];
};

// Récupérer toutes les formations
export const getEducations = async () => {
  const { data, error } = await supabase
    .from('educations')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching educations:', error);
    return [];
  }
  return data || [];
};

// Récupérer les données About
export const getAbout = async () => {
  const { data, error } = await supabase
    .from('about')
    .select('*')
    .single();
  
  if (error) {
    console.error('Error fetching about:', error);
    return null;
  }
  return data;
};

