import api from './api';
import { Product, ProductQueryParams, ProductResponse } from '../types/product';

// PUBLIC_INTERFACE
/**
 * Product service for interacting with the product API
 */
const productService = {
  /**
   * Get products with optional filtering parameters
   * @param params - Query parameters for filtering products
   * @returns Promise with product response
   */
  getProducts: async (params: ProductQueryParams): Promise<ProductResponse> => {
    const response = await api.get('/products', { params });
    return response.data;
  },
  
  /**
   * Get a product by ID
   * @param id - Product ID
   * @returns Promise with product data
   */
  getProductById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  
  /**
   * Get related products for a specific product
   * @param id - Product ID
   * @returns Promise with array of related products
   */
  getRelatedProducts: async (id: string): Promise<Product[]> => {
    const response = await api.get(`/products/${id}/related`);
    return response.data;
  },
  
  /**
   * Get product categories
   * @returns Promise with array of category names
   */
  getCategories: async (): Promise<string[]> => {
    const response = await api.get('/categories');
    return response.data;
  },
  
  /**
   * Get product brands
   * @returns Promise with array of brand names
   */
  getBrands: async (): Promise<string[]> => {
    const response = await api.get('/brands');
    return response.data;
  }
};

export default productService;