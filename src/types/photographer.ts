export interface Photographer {
  id: number;
  photographer_first_name?: string;
  photographer_last_name?: string;
  profile_image?: string | null;
  photographer_whatsapp_no?: string | null;
  photographer_email?: string | null;
}

export interface PhotographerFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  image: string | null;
}

export type UploadMethod = 'url' | 'upload';