// PUBLIC_INTERFACE
/**
 * Product interface representing a product in the catalog
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  images: string[];
  thumbnail: string;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  attributes: {
    [key: string]: string | number | boolean;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * Product query parameters for API requests
 */
export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  [key: string]: string | number | undefined;
}

/**
 * Product response from the API
 */
export interface ProductResponse {
  products: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}