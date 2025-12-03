import { supabase } from '../../config/supabase';

// ============ STORAGE - IMAGES ============
const BUCKET_NAME = 'project-images';

// Upload une image vers Supabase Storage
export const uploadProjectImage = async (file, projectId = null) => {
  try {
    // Générer un nom de fichier unique
    const fileExt = file.name.split('.').pop();
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 9);
    const fileName = projectId 
      ? `${projectId}-${timestamp}-${randomId}.${fileExt}`
      : `temp-${timestamp}-${randomId}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload du fichier
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    // Récupérer l'URL publique
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Supprimer une image de Supabase Storage
export const deleteProjectImage = async (imageUrl) => {
  try {
    // Extraire le nom du fichier de l'URL
    const urlParts = imageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1].split('?')[0];
    
    if (!fileName || fileName === '') return;

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([fileName]);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting image:', error);
    // Ne pas bloquer si la suppression échoue
  }
};

// ============ PROJECTS ============
export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const createProject = async (project) => {
  const { data, error } = await supabase
    .from('projects')
    .insert([{ ...project, updated_at: new Date().toISOString() }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateProject = async (id, project) => {
  const { data, error } = await supabase
    .from('projects')
    .update({ ...project, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteProject = async (id) => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// ============ EXPERIENCES ============
export const getExperiences = async () => {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const createExperience = async (experience) => {
  const { data, error } = await supabase
    .from('experiences')
    .insert([{ ...experience, updated_at: new Date().toISOString() }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateExperience = async (id, experience) => {
  const { data, error } = await supabase
    .from('experiences')
    .update({ ...experience, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteExperience = async (id) => {
  const { error } = await supabase
    .from('experiences')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// ============ EDUCATIONS ============
export const getEducations = async () => {
  const { data, error } = await supabase
    .from('educations')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const createEducation = async (education) => {
  const { data, error } = await supabase
    .from('educations')
    .insert([{ ...education, updated_at: new Date().toISOString() }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateEducation = async (id, education) => {
  const { data, error } = await supabase
    .from('educations')
    .update({ ...education, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteEducation = async (id) => {
  const { error } = await supabase
    .from('educations')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// ============ ABOUT ============
export const getAbout = async () => {
  const { data, error } = await supabase
    .from('about')
    .select('*')
    .single();
  
  if (error) throw error;
  return data;
};

export const updateAbout = async (aboutData) => {
  // Si aucun enregistrement n'existe, on en crée un
  const existing = await getAbout().catch(() => null);
  
  if (existing) {
    const { data, error } = await supabase
      .from('about')
      .update({ ...aboutData, updated_at: new Date().toISOString() })
      .eq('id', existing.id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('about')
      .insert([{ ...aboutData, updated_at: new Date().toISOString() }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

