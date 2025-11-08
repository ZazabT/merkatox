export interface Category {
  slug: string;
  name: string;
  url: string;
}

export type CategoryResponse = Category[] | string[];
