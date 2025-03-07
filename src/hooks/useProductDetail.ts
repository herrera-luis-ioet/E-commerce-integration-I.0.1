import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Product } from '../types/product';
import productService from '../services/productService';
import { setSelectedProduct, setLoading, setError } from '../store/slices/productSlice';
import { RootState } from '../store';

interface UseProductDetailResult {
  product: Product | null;
  relatedProducts: Product[];
  loading: boolean;
  error: string | null;
  fetchProduct: (id: string) => Promise<void>;
  fetchRelatedProducts: (id: string) => Promise<void>;
}

// PUBLIC_INTERFACE
/**
 * Custom hook for fetching and managing product detail data
 * Provides methods for fetching product details and related products
 * Manages loading states and error handling
 * @returns Object containing product data, loading state, error state, and fetch methods
 */
const useProductDetail = (): UseProductDetailResult => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  // Get product state from Redux store
  const { selectedProduct, loading, error } = useSelector((state: RootState) => state.products);

  /**
   * Fetch product details by ID
   * @param productId - The ID of the product to fetch
   */
  const fetchProduct = useCallback(async (productId: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const data = await productService.getProductById(productId);
      dispatch(setSelectedProduct(data));
    } catch (err) {
      console.error('Error fetching product:', err);
      dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch product details'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  /**
   * Fetch related products for a specific product ID
   * @param productId - The ID of the product to fetch related products for
   */
  const fetchRelatedProducts = useCallback(async (productId: string) => {
    try {
      const data = await productService.getRelatedProducts(productId);
      setRelatedProducts(data);
    } catch (err) {
      console.error('Error fetching related products:', err);
      // We don't set global error state for related products as it's not critical
      setRelatedProducts([]);
    }
  }, []);

  // Fetch product and related products when ID changes
  useEffect(() => {
    if (id) {
      fetchProduct(id);
      fetchRelatedProducts(id);
    }
    
    // Cleanup function to reset selected product when component unmounts
    return () => {
      dispatch(setSelectedProduct(null));
    };
  }, [id, fetchProduct, fetchRelatedProducts, dispatch]);

  return {
    product: selectedProduct,
    relatedProducts,
    loading,
    error,
    fetchProduct,
    fetchRelatedProducts
  };
};

export default useProductDetail;