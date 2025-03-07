import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setSearchQuery, 
  setCategories, 
  setPriceRange, 
  setSortBy, 
  setSortOrder, 
  resetFilters,
  setAppliedFilters
} from '../store/slices/filterSlice';
import { RootState } from '../store';

// PUBLIC_INTERFACE
/**
 * Custom hook for managing filter state and logic
 * Provides methods to update search query, categories, price range, and sort options
 * Also provides a method to reset all filters
 */
const useFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  
  // Update search query
  const updateSearchQuery = useCallback((query: string) => {
    dispatch(setSearchQuery(query));
  }, [dispatch]);
  
  // Update selected categories
  const updateCategories = useCallback((categories: string[]) => {
    dispatch(setCategories(categories));
  }, [dispatch]);
  
  // Toggle a single category
  const toggleCategory = useCallback((category: string) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(cat => cat !== category)
      : [...filters.categories, category];
    
    dispatch(setCategories(updatedCategories));
  }, [dispatch, filters.categories]);
  
  // Update price range
  const updatePriceRange = useCallback((min: number, max: number) => {
    dispatch(setPriceRange({ min, max }));
  }, [dispatch]);
  
  // Update sort options
  const updateSortOptions = useCallback((sortBy: string, sortOrder: 'asc' | 'desc') => {
    dispatch(setSortBy(sortBy));
    dispatch(setSortOrder(sortOrder));
  }, [dispatch]);
  
  // Apply all filters
  const applyFilters = useCallback(() => {
    const appliedFilters = {
      search: filters.searchQuery,
      categories: filters.categories,
      priceRange: filters.priceRange,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder
    };
    
    dispatch(setAppliedFilters(appliedFilters));
  }, [dispatch, filters]);
  
  // Reset all filters
  const clearAllFilters = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);
  
  return {
    filters,
    updateSearchQuery,
    updateCategories,
    toggleCategory,
    updatePriceRange,
    updateSortOptions,
    applyFilters,
    clearAllFilters
  };
};

export default useFilters;