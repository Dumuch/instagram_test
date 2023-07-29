export interface PhotosAPI {
  success: boolean;
  message: string;
  offset: number;
  limit: number;
  photos: Photo[];
}

export interface PhotosFetchAll {
  offset: number;
  limit: number;
}

export interface Photo {
  title: string;
  user: number;
  id: number;
  description: string;
  url: string;
}

export interface PhotoListFilter {
  title: string;
}

